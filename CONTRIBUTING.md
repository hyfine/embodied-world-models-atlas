# Contributing · 参与维护

Open an issue or pull request with the work's original paper, the proposed decision family and one limitation. 欢迎提交漏收研究与事实纠错；请给原文位置，说明它改变了哪一个技术判断，而不只是提供榜单排名。

1. Read [EVIDENCE.md](EVIDENCE.md). Edit [data/works.tsv](data/works.tsv): stable lowercase `id`, early public `year`, a main `family`, method `name`, source/venue, primary paper URL, optional GitHub and Hub paths, Chinese and English notes. Do not insert literal tabs or newlines inside fields.
2. Distinguish repositories, model weights and dataset cards; do not assume a model card means all training code is public. Link upstream instead of copying papers, figures or weights.
3. For substantive changes, update both language guides, commentary and snapshot counts where applicable. Preserve old IDs so existing citations work.
4. From the repository root, with Node.js 20+ and no package install:

   ```sh
   node scripts/build.mjs
   node scripts/build.mjs --check
   node scripts/check-links.mjs
   ```

5. Open `index.html` and `en.html`; test the action demo, combined family/text filter and empty state. Commit both input and generated files. CI checks the generated pages and local reading links without network access.

`assets/field-map.svg` is an original teaching diagram. Family relationships are editorial, not assertions of descent. See [LICENSE](LICENSE) for the atlas's own material; upstream terms are separate.
