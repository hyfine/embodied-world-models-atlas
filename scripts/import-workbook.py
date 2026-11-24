"""Export public bibliographic pointers, not private workbook prose or binaries."""
import argparse
import json
import re
from pathlib import Path
from urllib.parse import urlsplit

from openpyxl import load_workbook


def public_link(value):
    if not value:
        return None
    u = urlsplit(str(value).strip())
    if u.scheme not in ("http", "https") or not u.hostname or u.username or u.password or re.search(r"\s", str(value).strip()):
        return None
    return u.geturl()


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("workbook", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    wb = load_workbook(args.workbook, read_only=True, data_only=True)
    out = []
    for sheet, key in [("Paper_Repo_List", "main"), ("Supplementary_List", "supplement")]:
        for row in wb[sheet].iter_rows(min_row=3, values_only=True):
            if not isinstance(row[0], int):
                continue
            main = key == "main"
            item = dict(sheet=key, no=row[0], name=row[1], category=row[2] if main else "SUP")
            for name, cell in zip(("paper","code","hub"), row[16:19] if main else (row[5], None, None)):
                values = re.split(r"\s*;\s*(?=https?://)", str(cell or ""))
                links = [url for v in values if (url := public_link(v))]
                item[name] = links[0] if links else None
                if len(links) > 1:
                    item.setdefault("also", []).extend(links[1:])
            out.append(item)
    args.output.write_text(json.dumps(out, ensure_ascii=False, indent=1) + "\n")
