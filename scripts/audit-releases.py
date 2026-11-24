"""Resolve public code/model/data pointers. This is not a training or replication test."""
import concurrent.futures
import json
import re
import subprocess
from pathlib import Path
from urllib.parse import quote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
items = json.loads((ROOT / "data/workbook-index.json").read_text())
urls = sorted({u for r in items for u in [r["paper"], r["code"], r["hub"], *r.get("also", [])]
               if u and urlsplit(u).hostname in {"github.com", "huggingface.co"}})


def api(command):
    proc = subprocess.run(command, capture_output=True, text=True, timeout=45)
    if proc.returncode:
        raise ValueError((re.search(r"(?:HTTP |error: )(\d{3})", proc.stderr) or [None, "unavailable"])[1])
    return json.loads(proc.stdout)


def hub(path):
    return api(["curl", "-fsSL", "--retry", "1", "--max-time", "18", "https://huggingface.co/api/" + path])


def check(url):
    host, path = urlsplit(url).hostname, urlsplit(url).path.strip("/").split("/")
    if host == "github.com":
        slug = "/".join(path[:2])
        info = api(["gh", "api", f"repos/{slug}"])
        branch = info["default_branch"]
        head = api(["gh", "api", f"repos/{slug}/commits/{quote(branch,safe='')}"])
        sha = head["sha"]
        # Only inspect root names; do not bundle the repository or claim execution.
        tree = api(["gh", "api", f"repos/{slug}/git/trees/{sha}"])["tree"]
        paths = [x["path"] for x in tree]
        entry = next((n for n in paths if n.lower() == "readme.md"), None)
        return dict(kind="GitHub", revision=sha, entry=entry or "", license=(info.get("license") or {}).get("spdx_id"),
                    source=f'https://github.com/{info["full_name"]}/tree/{sha}', archived=info["archived"])
    if path[0] in ("blog","docs","papers","spaces") or len(path) < 2:
        return dict(kind="Hub directory / page", source=url)
    if path[0] == "collections":
        data = hub("/".join(path))
        return dict(kind="Hub collection", source=url, members=len(data["items"]))
    category = "datasets" if path[0]=="datasets" else "models"
    slug = "/".join(path[1:3] if category=="datasets" else path[:2])
    info = hub(category + "/" + slug)
    sha = info.get("sha")
    if not sha:
        raise ValueError("missing revision")
    return dict(kind="Hub dataset" if category=="datasets" else "Hub model",revision=sha,
                source="https://huggingface.co/"+("datasets/" if category=="datasets" else "")+info["id"]+"/tree/"+sha,
                license=(info.get("cardData") or {}).get("license"))


def audit(url):
    try:
        result=check(url)
    except (ValueError, KeyError, subprocess.TimeoutExpired) as err:
        result=dict(kind="unresolved",source=url,reason=str(err)[:100])
    return {"url":url,**result}


if __name__=="__main__":
    with concurrent.futures.ThreadPoolExecutor(5) as pool:
        results=list(pool.map(audit,urls))
    (ROOT/"data/release-pointers.json").write_text(json.dumps(results,ensure_ascii=False,indent=1)+"\n")
    from collections import Counter
    print(Counter(row["kind"] for row in results))
