<p align="center"><strong>简体中文</strong> · <a href="README.en.md">English</a></p>

[![具身智能与世界模型：从一次观测分出三条预测轨迹，执行后回到真实观测](assets/field-map.svg)](https://hyfine.github.io/embodied-world-models-atlas/)

# 具身智能 × 世界模型研究图谱

**如果机器人能生成一段杯子被推到目标的逼真视频，为什么它还可能推空？** 因为知道“画面通常怎样变”、知道“我的动作会造成什么变化”和知道“现在该怎么做”，是三个不同的问题。这份图谱沿着三者的交点讲技术史。

**[打开交互图谱 ↗](https://hyfine.github.io/embodied-world-models-atlas/)** · [双语论文索引](CATALOG.md) · [趋势与反证](docs/outlook.zh-CN.md) · [检索口径](EVIDENCE.md)

| 第一次来？ | 建议路线 | 读完能做什么 |
|---|---|---|
| **3 分钟** | [试试桌面推杯实验](https://hyfine.github.io/embodied-world-models-atlas/) | 自己选“不动 / 轻推 / 重推”，理解模型为何不是策略 |
| **15 分钟** | [读两条技术史与家族树](docs/guide.zh-CN.md) | 分清 PlaNet、Diffusion Policy、V-JEPA 2-AC、DreamZero 的输入、输出和失败条件 |
| **30 分钟** | [打开论文标本架](https://hyfine.github.io/embodied-world-models-atlas/#library) → [读实验收据](docs/outlook.zh-CN.md) | 找论文、代码、权重，对照作者到底测了画质、进度还是真机成功 |

### 同一个任务，四种做法

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
- 无需下载模型。用浏览器打开 `index.html` 即可离线浏览；更新后运行 `node scripts/build.mjs`，检查用 `node scripts/build.mjs --check`。
