"""Create an external, versioned local arXiv shelf. Requires openpyxl and pypdf."""
import argparse
import concurrent.futures
import datetime
import hashlib
import html
import json
import os
import re
import subprocess
import tempfile
import unicodedata
from pathlib import Path
from urllib.parse import quote

from openpyxl import load_workbook
from pypdf import PdfReader


SELECTION = [
    1, 2, 3, 4, 5, 6, 8, 10, 12, 14,
    22, 23, 24, 25, 26, 29, 31, 35, 37, 39,
    41, 42, 44, 47, 50, 51, 54, 58, 62, 69,
    70, 71, 72, 73, 74, 75, 76, 77, 78,
    84, 86, 87, 88, 89, 90, 91, 92, 95, 97,
    104, 105, 106, 107, 112, 113, 119, 123, 124, 126,
    132, 133, 134, 136, 138, 139, 141, 143, 145, 147,
    154, 155, 157, 159, 160, 163, 168, 171, 172, 175,
    201, 203, 204, 205, 206, 207, 208, 211, 213, 218,
    224, 225, 226, 227, 228, 229, 230, 231, 232, 234,
    239, 240, 241, 242, 243, 244, 245, 246, 250, 252,
    253, 254, 255, 256, 257, 259, 260, 261, 263, 265,
    268, 269, 270, 271, 272, 273, 275, 276, 278, 284,
    295, 296, 297, 298, 300, 302, 303, 305, 307, 309,
    311, 312, 313, 315, 316, 318, 319,
]
EXTRAS = [
    ("SURVEY", "WAM-Survey", "2605.12090"),
    ("SURVEY", "EmbodiedAI-Survey", "2103.04918"),
]
PAPER_ALIASES = {
    "2511.04831": "IsaacLab", "2510.25889": "PiRL", "2511.14759": "Pi06-RECAP",
    "2609.16697": "PCA-Survey", "2407.06886": "EmbodiedAI-Alignment",
    "2411.14499": "WM-Survey", "2606.00133": "WM-Comprehensive",
}


def clean(s, limit):
    s = unicodedata.normalize("NFKC", html.unescape(s))
    s = re.sub(r"[\\/:*?\"<>|_\x00-\x1f$]+", " ", s)
    return " ".join(s.split()).encode()[:limit].decode(errors="ignore").strip(" .-")


def curl(url, path):
    subprocess.run(["curl", "-fsSL", "--proto", "=https", "--max-time", "100",
                    "--max-filesize", "180000000", "--retry", "2", "--retry-delay", "2",
                    "-o", str(path), url], check=True, capture_output=True)


def shelf_index(directory, rows):
    lines = ["# 本地论文书架 · Local paper shelf", "",
             "日期为 arXiv 首次提交日（YYMMDD），不一定是 PDF 修订日。"
             "链接打开本地文件；原始版本、页数与校验值见 [manifest](manifest.json)。", ""]
    for category in sorted({r["category"] for r in rows}):
        group = sorted((r for r in rows if r["category"] == category), key=lambda r: r["date"])
        lines += [f"## {category} · {len(group)}", ""]
        for r in group:
            lines.append(f"- {r['date']} · [{r['title']}]({quote(r['file'])}) · "
                         f"[arXiv:{r['arxiv']}{r['version']}]({r['source']}) · {r['pages']} pp.")
        lines.append("")
    (directory / "INDEX.md").write_text("\n".join(lines))


def fetch(item, output, previous):
    family, method, identifier = item
    directory = output / family
    directory.mkdir(exist_ok=True)
    with tempfile.TemporaryDirectory(dir=directory) as tmp:
        page = Path(tmp) / "abstract"
        abs_url = "https://arxiv.org/abs/" + identifier
        curl(abs_url, page)
        body = page.read_text()

        def meta(name):
            hit = re.search(r'name="citation_' + name + r'" content="([^"]+)"', body)
            if not hit:
                raise ValueError(f"Missing citation_{name} for {identifier}")
            return html.unescape(hit[1])

        date = datetime.datetime.strptime(meta("date"), "%Y/%m/%d").date()
        title = meta("title")
        versions = re.findall(r"\[v(\d+)\]", body[body.index('Submission history'):])
        if not versions:
            raise ValueError(f"Missing version history for {identifier}")
        version = "v" + str(max(map(int, versions)))
        # The supplied WAM-survey file is specifically v1; do not overwrite it.
        supplied = output / "20260512-World Action Models- The Next Frontier in Embodied AI .pdf"
        use_original = identifier == "2605.12090" and supplied.is_file()
        if use_original:
            version = "v1"
        url = "https://arxiv.org/pdf/" + identifier + version
        abbrev = PAPER_ALIASES.get(identifier) or clean(re.split(r"\s+\(|\s+/\s+|\s+→\s+", method)[0], 45)
        dest = directory / (date.strftime("%y%m%d") + "_" + abbrev + "_" + clean(title, 167) + ".pdf")
        temp = Path(tmp) / "paper.pdf"
        cached = previous.get(dest.relative_to(output).as_posix())
        if dest.exists() and cached and cached["source"] == url:
            with dest.open("rb") as f:
                if hashlib.file_digest(f, "sha256").hexdigest() != cached["sha256"]:
                    raise ValueError(f"Cached PDF changed; inspect {dest.name}")
        else:
            if use_original:
                os.link(supplied, temp)
            else:
                curl(url, temp)
            pdf = PdfReader(temp)
            if not len(pdf.pages):
                raise ValueError(f"Zero pages for {identifier}")
            if dest.exists():
                with temp.open("rb") as a, dest.open("rb") as b:
                    if hashlib.file_digest(a, "sha256").digest() != hashlib.file_digest(b, "sha256").digest():
                        raise ValueError(f"Different existing revision; preserve and inspect {dest.name}")
            else:
                os.link(temp, dest)
        pdf = PdfReader(dest)
        with dest.open("rb") as f:
            sha = hashlib.file_digest(f, "sha256").hexdigest()
        return dict(category=family, method=method, title=title, date=date.isoformat(),
                    arxiv=identifier, version=version, source=url, file=dest.relative_to(output).as_posix(),
                    pages=len(pdf.pages), bytes=dest.stat().st_size, sha256=sha)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("workbook", type=Path)
    parser.add_argument("shelf", type=Path)
    args = parser.parse_args()
    out = args.shelf.resolve()
    repo = Path(__file__).resolve().parents[1]
    if out == repo or out.is_relative_to(repo):
        parser.error("PDF shelf must be outside the public repository")
    out.mkdir(parents=True, exist_ok=True)
    wb = load_workbook(args.workbook, read_only=True, data_only=True)
    selected = []
    for r in wb["Paper_Repo_List"].iter_rows(min_row=3, values_only=True):
        if r[0] in SELECTION:
            m = re.fullmatch(r"https?://arxiv.org/(?:abs|pdf|html)/(\d{4}\.\d{4,5})(?:v\d+)?(?:\.pdf)?/?", str(r[16]))
            if not m:
                raise ValueError(f"Unexpected arXiv URL in row {r[0]}: {r[16]}")
            selected.append((r[2], r[1], m[1]))
    selected.extend(EXTRAS)
    results, failures = [], []
    manifest = out / "manifest.json"
    cached = {r["file"]: r for r in json.loads(manifest.read_text())} if manifest.exists() else {}
    with concurrent.futures.ThreadPoolExecutor(4) as pool:
        futures = {pool.submit(fetch, item, out, cached): item for item in selected}
        for future in concurrent.futures.as_completed(futures):
            item = futures[future]
            try:
                entry = future.result()
            except (OSError, ValueError, subprocess.CalledProcessError) as err:
                failures.append(dict(category=item[0], method=item[1], arxiv=item[2], error=str(err)))
                print("FAILED", item, err, flush=True)
            else:
                results.append(entry)
                print(len(results), entry["file"], flush=True)
    for name, rows in [("manifest.json", results), ("download-errors.json", failures)]:
        (out / name).write_text(json.dumps(sorted(rows,key=lambda r:(r["category"],r["arxiv"])),
                                          ensure_ascii=False, indent=2) + "\n")
    shelf_index(out, results)
    print(f"{len(results)}/{len(selected)} validated PDFs; {len(failures)} failed.")
    raise SystemExit(bool(failures))
