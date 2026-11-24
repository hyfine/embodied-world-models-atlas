# 检索与证据口径 · Search & evidence

## Expanded workbook edition · 2026-11-24

The workbook input (SHA-256 `5bb5ae15d0236441097563ebb0ff0ff5b1f0abcc54d04febe8026074fc45e2c8`) has seven sheets. `Paper_Repo_List` contributes 320 rows and `Supplementary_List` another 70. `README` defines its fields, `Taxonomy` its 15 directions, `Family_Tree` its 30 proposed lines, `Trends_2026` its 12 hypotheses, and `Timeline_Stats` aggregates the main sheet by year. Only the first two lists are counted as source records. The accompanying technical review was used as a set of hypotheses to check, not as independent validation.

**行 ≠ 论文。** 同一工作可出现两次；一行也可能代表多个版本、一个代码库、一张数据卡或一次企业发布。`main-N` 与 `supplement-N` 保留原行号以便查错，不把 390 行称为 390 篇独立论文。提供的两个 Awesome 合集是线索，不把其中的每个外链自动计入工作簿。入门树的六个决策家族和工作簿的 15 个技术方向是不同的分类轴，不强行一一对应。

**Reading depth.** The [ledger](https://hyfine.github.io/embodied-world-models-atlas/evidence.html) gives actual scope and location per row: version-level full reading (only if supported), selected body sections, abstract, repository/project evidence, or unresolved identity/access. A section read is not a claim to have checked every appendix. A fetched PDF is not counted as reading evidence. A repository inspection does not imply successful installation, reproduced scores or that the associated weights are open for commercial use.

**PDF shelf.** The [public manifest](data/pdf-shelf.json) contains source URL, revision, title, first arXiv submission date, relative filename, size, page count and SHA-256. First arXiv date is a reproducible naming convention, not necessarily the earliest announcement anywhere. Third-party PDFs, extracted text and the original workbook are not bundled. Original bilingual commentary and redrawings are distinct from authors’ claims and diagrams.

## Introductory atlas edition

**2026-11-23** · Curated narrative survey / 叙述性综述，非系统性综述或元分析。

**研究问题 / Question.** 预测的对象是什么，谁用预测选动作，有什么证据证明在测试的身体上有用？ What is predicted, who uses the prediction to select actions, and what evidence connects it to the tested body?

| 检索面 / Surface | 检索入口与关键词示例 / Discovery examples | 收录时的凭据 / Acceptance check |
|---|---|---|
| arXiv / web | `action-conditioned world model`, `robot manipulation world action models`, `latent dynamics`, `vision-language-action`, `counterfactual`, `2610` / `2611` + `world action model` | 原文摘要、方法或作者项目链接；不从新闻转载抽取成绩。Resolve the paper page; inspect the stated prediction target and evaluation. |
| Proceedings / journals | ICML & CoRL via [PMLR](https://proceedings.mlr.press/), RSS via [Robotics Proceedings](https://roboticsproceedings.org/), ICCV via [CVF](https://openaccess.thecvf.com/), Nature, ACM DOI / Crossref | 核对题名与载体。例如 [PlaNet](https://proceedings.mlr.press/v97/hafner19a.html)、[Habitat](https://openaccess.thecvf.com/content_ICCV_2019/html/Savva_Habitat_A_Platform_for_Embodied_AI_Research_ICCV_2019_paper.html)、[DreamerV3](https://www.nature.com/articles/s41586-025-08744-2)。Dyna 的 DOI 元数据另以 [Crossref](https://api.crossref.org/works/10.1145/122344.122377) 核验。 |
| GitHub | Paper/project name + `github`, author/team repository handles, GitHub repository metadata | 链到作者团队工程、实验仓库或对应软件库，不把同名 fork 当官方实现。A working repository is not evidence of complete training code. |
| Hugging Face | Model names in the Hub, `facebook` + `vjepa2`, OpenVLA / SmolVLA / DreamZero model cards; LeRobot dataset viewer | 区分模型卡、编码器和数据卡。E.g. [V-JEPA 2 encoder](https://huggingface.co/facebook/vjepa2-vitg-fpc64-384) vs [PushT data](https://huggingface.co/datasets/lerobot/pusht). A card does not imply unrestricted use. |

**选择与排除 / Selection.** 从代表性机制与两篇综述出发，沿引用、作者主页与发布卡追到一手来源；同时检索近月预印本，纳入能检验旧假设的反例。保留对技术路线有区分度的工作；排除没有可定位原文的二手榜单、重复版本与缺乏交互/决策联系的纯视频宣传。经典反应式控制、触觉预测和基准是对照项，不把它们标为通用世界模型。以操作为主；导航、足式与触觉为边界例子。自动驾驶、SLAM 和工业控制未做系统覆盖。

We started from mechanisms and two survey lenses, traced claims to primary papers and release artifacts, and searched recent preprints for contrasting approaches. Entries must clarify a decision role or supply an important counterexample, dataset or evaluation. We exclude duplicate versions, untraceable rankings and pure video demos without a decision-relevant connection. The center of gravity is manipulation; navigation, locomotion and touch establish boundaries. Autonomous driving, SLAM and industrial control are not systematically covered.

**版本 / Versions.** `year` is an early public release year, not a journal year. [PlaNet preprint](https://arxiv.org/abs/1811.04551) is 2018 / ICML 2019; [MuZero preprint](https://arxiv.org/abs/1911.08265) is 2019 / Nature 2020; [DreamerV3 preprint](https://arxiv.org/abs/2301.04104) is 2023 / Nature 2025. OpenVLA is CoRL 2024 with a 2025 proceedings volume. `arXiv` describes the cited source; it does **not** certify absence of subsequent peer review. 会议收录与预印本链接可同时成立；新版不另计一条。

**计数 / Counts.** One record per work/series entry, one primary reading family for navigation. A single record may link multiple artifact types. Count distinct nonempty code and Hub URLs, not “fully open models”; repeated `openpi` counts once. Blank means **not indexed**, not known closed. No star counts or incomparable success-rate leaderboard. Each external paper, codebase, dataset and checkpoint retains its own license; no third-party figures, weights or datasets are bundled.

**证据强度 / Interpretation.** The catalog summarizes the authors' claims; no robot policies were trained or reproduced for this edition. A benchmark is not a policy; a learned simulator is not independent evidence about itself. Outlook chapters label editorial judgments separately and state what would falsify them. Corrections should cite a specific primary source and say which claim, version or artifact changes.
