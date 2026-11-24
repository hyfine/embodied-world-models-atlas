<p align="center"><a href="https://hyfine.github.io/embodied-world-models-atlas/zh.html"><img src="assets/atlas-mark.svg" width="72" height="72" alt="研究图谱指南针标识"></a></p>

<h1 align="center">具身智能 × 世界模型研究图谱</h1>
<p align="center"><strong>世界模型预测一推会怎样，策略决定这一推怎么做。</strong></p>
<p align="center"><a href="README.md">English</a> · <strong>简体中文</strong></p>

[![先预测三种可能的未来，再选择推法，最后比较实测落点 4 与预测落点 7。](assets/readme-push.svg)](https://hyfine.github.io/embodied-world-models-atlas/zh.html#cup-lab)

模型预测杯子会到 **7**，实际却停在 **4**。下一步就得从 4 重新决定。这个教学例子串起了整份图谱：**预测的是什么，谁来行动，又拿什么验证？**

**[探索方法家族树 ↗](https://hyfine.github.io/embodied-world-models-atlas/zh.html#family-tree)**　·　[追踪系统运行](https://hyfine.github.io/embodied-world-models-atlas/zh.html#system-studio)　·　[查找论文证据](https://hyfine.github.io/embodied-world-models-atlas/evidence.zh.html)

### 扩展研究版：按问题选标签页

| 你想弄清楚什么？ | 从这里进入 |
|---|---|
| 从预测下一帧，到规划、再到出动作，关键差别在哪里？ | [跨家族研究综合](https://hyfine.github.io/embodied-world-models-atlas/research.zh.html) |
| 工作簿的 15 个方向，部署时究竟运行哪些组件？ | [在主页选择系统](https://hyfine.github.io/embodied-world-models-atlas/zh.html#system-studio)，或[浏览全部系统图](https://hyfine.github.io/embodied-world-models-atlas/runtime.zh.html)。沿信号线区分内部更新与实测反馈，再查对应的论文图表。 |
| 某条论文或仓库，实际核读到哪一层？ | [按来源和阅读深度查询 320 条主表与 70 条补表记录](https://hyfine.github.io/embodied-world-models-atlas/evidence.zh.html) |
| 本地存的是哪个版本？ | [分方向论文书架](https://hyfine.github.io/embodied-world-models-atlas/shelf.zh.html) · [指定 WAM 综述精读](docs/wam-survey-deep-dive.md) |

下方的 38 片叶子是**入门精选**，不是扩展书目的总数。一条表格记录、一个可核的仓库、一份下载的 PDF 和一次逐页精读不能混作同一指标。

[![方法生长树：六色家族从感知与行动的树根展开，38 个作品各占一片有名称的叶子](assets/growth-tree.zh-CN.svg)](https://hyfine.github.io/embodied-world-models-atlas/zh.html#family-tree)

**从根读到叶。** 按年份回放，可以看到各支路线何时长出；放大后拖动图面，点叶片读论文与实现。枝条是阅读分类，不是已证实的技术继承。

**先看全貌，再选一篇读：** [回放方法时间轨迹](https://hyfine.github.io/embodied-world-models-atlas/zh.html#trajectory) · [对照家族泳道](https://hyfine.github.io/embodied-world-models-atlas/zh.html#swimlanes) · [展开家族树](https://hyfine.github.io/embodied-world-models-atlas/zh.html#family-tree)。再沿一张[模块架构图](https://hyfine.github.io/embodied-world-models-atlas/zh.html#architectures)走到[论文与源码精读](docs/deep-dives.zh-CN.md)。

| 第一次来？ | 建议路线 | 读完能做什么 |
|---|---|---|
| **3 分钟** | [试试桌面推杯实验](https://hyfine.github.io/embodied-world-models-atlas/zh.html#cup-lab) | 自己选“不动 / 轻推 / 重推”，理解模型为何不是策略 |
| **15 分钟** | [读两条技术史与家族树](docs/guide.zh-CN.md) | 分清 PlaNet、Diffusion Policy、V-JEPA 2-AC、DreamZero 的输入、输出和失败条件 |
| **30 分钟** | [打开论文标本架](https://hyfine.github.io/embodied-world-models-atlas/zh.html#library) → [读实验收据](docs/outlook.zh-CN.md) | 找论文、代码、权重，对照作者到底测了画质、进度还是真机成功 |

### 同一个任务，四种做法

[![上轨：策略根据观测直接输出动作。下轨：规划器比较三个预测终点，选择最靠近目标 8 的推法。两条路线在执行后都重新观测。](assets/decision-loop.svg)](https://hyfine.github.io/embodied-world-models-atlas/zh.html#decision-loop)

沿亮线从左读到右：上轨直接给动作；下轨先比较不动、轻推、重推的预测。**7 是预测，4 才是执行后的观测**。数字是教学设定，不是评测结果。[重播决策过程 ↗](https://hyfine.github.io/embodied-world-models-atlas/zh.html#decision-loop)

| 面对桌上的杯子 | 读哪一支 | 代表作 |
|---|---|---|
| **先在心里试几种推法，再做决定** | M · 模型规划和想象学习。区分部署时搜索和训练时想象 | [PlaNet](CATALOG.md#planet) · [DreamerV3](CATALOG.md#dreamerv3) |
| **预测下一帧，或预测够用的特征** | F · 感知未来。重点是预测是否跟着动作正确变化 | [Visual Foresight](CATALOG.md#foresight) · [V-JEPA 2-AC](CATALOG.md#vjepa2) |
| **从示范直接学怎样动** | P · 技能、动作符号与连续动作块。策略不一定生成未来 | [Diffusion Policy](CATALOG.md#diffusion-policy) · [OpenVLA](CATALOG.md#openvla) · [π0](CATALOG.md#pi0) |
| **把未来与可执行动作放在同一模型里** | J · 联合生成或通过逆动力学连接；两种并不相同 | [DreamZero](CATALOG.md#dreamzero) · [GE-Act 2.0](CATALOG.md#geact) |

另设 **E**（环境、数据和评测）与 **S**（其他综述）。导航、四足运动、视触觉抓取是对照案例，不把具身智能等同于单臂桌面操作。

### 当前判断

**与其先问“视频像不像真的”，不如先问“把动作换掉，预测的后果是否跟着正确变化”。** [DreamTrue](CATALOG.md#dreamtrue) 研究动作遵从，[SIMPLER](CATALOG.md#simpler) 对照仿真与实机排序：前者不能替代后者。[四条可被推翻的判断 →](docs/outlook.zh-CN.md)

### 收录与复用

**2026-11-23 版**：1991–2026 年，38 个精选条目、25 个不重复的代码入口、6 张 Hugging Face 模型卡。数据卡另列，不混入权重数。跨平台精选，**不是全网穷举或独立复现实验**。

- [可机读 TSV](data/works.tsv) → [双语索引](CATALOG.md) 与中英文静态站使用同一份数据。
- [收录规则与版本差异](EVIDENCE.md) · [贡献](CONTRIBUTING.md) · [引用](CITATION.cff) · [许可](LICENSE)。
- 无需下载模型。用浏览器打开 `zh.html` 即可离线浏览中文版；更新后运行 `node scripts/build.mjs`，检查用 `node scripts/build.mjs --check`。
