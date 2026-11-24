# Contributing · 参与维护

Open an issue or pull request with the work's original paper, the proposed decision family and one limitation. 欢迎提交漏收研究与事实纠错；请给原文位置，说明它改变了哪一个技术判断，而不只是提供榜单排名。

1. Read [EVIDENCE.md](EVIDENCE.md). Edit [data/works.tsv](data/works.tsv): stable lowercase `id`, early public `year`, a main `family`, method `name`, source/venue, primary paper URL, optional GitHub and Hub paths, Chinese and English notes. Do not insert literal tabs or newlines inside fields.
2. Distinguish repositories, model weights and dataset cards; do not assume a model card means all training code is public. Link upstream instead of copying papers, figures or weights.
3. For substantive changes, update both language guides, commentary and snapshot counts where applicable. Preserve old IDs so existing citations work.
   Place every new work in exactly one reading branch in [the family layouts](data/method-families.mjs). Generated timeline, swimlanes and tree share the paper IDs; representative architecture plates and [case notes](data/deep-dives.mjs) must distinguish models from evaluation/survey workflows. Pin implementation references to commits.
4. From the repository root, with Node.js 20+ and no package install:

   ```sh
   node scripts/build.mjs
   node scripts/build.mjs --check
   node scripts/check-links.mjs
   ```

5. Open `index.html` (English) and `zh.html` (Chinese); `en.html` remains an English compatibility URL. Test the language switch, action demo, decision animation/replay, reduced-motion still diagram, combined family/text filter and empty state. Commit both input and generated files. CI checks the generated pages and local reading links without network access.

`assets/field-map.svg` is an original teaching diagram. Family relationships are editorial, not assertions of descent. See [LICENSE](LICENSE) for the atlas's own material; upstream terms are separate.

## Maintaining the workbook edition

The site rebuild still needs only Node. The optional import/download tools need Python 3.11+, `openpyxl`, `pypdf`, and `curl`; release-pointer inspections also use an authenticated `gh` CLI. They are not run in CI.

```sh
# From the repository root; PDFs stay in the external shelf.
python3 scripts/import-workbook.py ../Embodied_AI_World_Models_Survey_2026.xlsx data/workbook-index.json
python3 scripts/fetch-papers.py ../Embodied_AI_World_Models_Survey_2026.xlsx ../papers
```

Inspect the local manifest and download-error file before updating the public shelf manifest. A changed revision must not silently replace an existing edition. Preserve the original workbook IDs when updating readings. Each row-level note needs a scope, inspectable source location and an original finding or an explicit gap. Each runtime plate needs a representative, a primary reference, bilingual ordered stages, a feedback boundary and an evidence test.

Keep the bilingual module and signal definitions in [the system schematics](data/system-schematics.mjs) aligned with those runtime records. Label setup separately and draw a feedback edge only when the source describes one. The home studio and runtime reference use the same renderer.

For a new introductory work, assign one primary map address and add a [coordinate profile](data/survey-coordinates.mjs). Overlapping roles are allowed; time lanes count primary addresses, not tag memberships. Keep signal format separate from output horizon, and distinguish an unknown value from an inapplicable one. Survey lenses must cite the exact local shelf edition and describe an editorial comparison, not attribute atlas labels to survey authors.
