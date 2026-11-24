# 九篇综述复核：分类按问题，代表作按角色

[15 个方向的代表作对照](https://hyfine.github.io/embodied-world-models-atlas/runtime.zh.html) · [English comparisons](https://hyfine.github.io/embodied-world-models-atlas/runtime.html) · [本地版本与校验值](../data/pdf-shelf.json)

**结论：保留入口，修正它们的含义。** “自动驾驶”“预测表征”“跨本体预训练”“基准”分别回答应用在哪里、预测什么、在哪个阶段学习、如何验证。这些问题都值得有入口，却不能构成一棵互斥的算法分类树。同样，一个便于画系统图的例子，不一定能代表一个方向内的所有路线。

**English verdict.** Keep the 15 workbook IDs for navigation, but name the axis and role of each exemplar. Keep the six introductory families as reading routes, not a partition of all research. Pair works where one representative conceals a real difference in the execution path. Neither publication frequency nor benchmark rank was a selection criterion.

## 复核范围与判据

输入是书架中 SURVEY 分类的 **9 个本地 PDF，合计 501 个物理页（含书目）**。以下页码从 PDF 首页算 1。文件名前六位表示首次 arXiv 提交日；判断以**本地修订版**为准。这里复核的是各篇的分类论证、例子和证据边界；没有把所有被引论文算作独立精读，也没有重新运行论文实验。下文把**作者怎么分**与**图谱因此怎么改**分开。

挑代表作有三条规则：① 能说清输入、中间量、输出及消费者；② 有一手来源能定位到该组件或实验；③ 若该例不能说明同类中的另一种关键机制，增列对照，不用“最强”遮盖差异。一个工作可有多个角色；原工作簿行号和 PDF 的存放类别不因解读变化而改写。

## 逐篇判读 · What each survey changes

### Duan 等：先分清平台、任务和数据

[2103.04918v8](https://arxiv.org/abs/2103.04918v8)，17 页。**p.3 Table I** 比较模拟器的真实感、可扩展性、可交互性；**p.6 Table III / Fig. 5、p.11 Fig. 6** 把模拟器、场景数据和研究任务放在不同位置。作者讨论的是模拟研究生态，图中的任务复杂度不是用同一套实验测得的能力等级。

**决定：** Habitat-Sim 提供状态转移，PointNav 定义要完成的任务，场景数据可以来自 Matterport3D；R2R 则提供路线和指令。由实景扫描建成的环境也不自动具有可信的接触动力学。EAI-6 按“导航 / 移动操作”读，EAI-7 按“平台 / 基准 / 校准”读。 *A simulator, a task and the dataset behind it are different artifacts.*

### Ma 等：VLA 是动作接口，不是一种固定的动作头

[2405.14093v8](https://arxiv.org/abs/2405.14093v8)，54 页。**p.3 Fig. 3** 把组件、控制策略、任务规划、数据与基准分开；**p.8 Table III** 分列动作表示、训练目标与评测环境；**p.14 Table V** 对照采集方式、本体和场景。后续工作也收在附录，不宜拿 v8 的覆盖范围反推 v1 已收录它们。

**决定：** EAI-1 留给给出技能或约束的规划器，EAI-2 留给输出可执行动作的策略。Octo 可以用跨本体数据训练，但“Octo 怎么出动作”和“哪些数据真的跨本体”要分别回答：对照 OXE/RT-X 与 DROID，而不把地点数当作机型数。 *Separate action heads and planning roles from the data on which they are trained.*

### Liu 等：采集接口不等于策略，策略也不等于执行成功

[2407.06886v8](https://arxiv.org/abs/2407.06886v8)，21 页。**p.11 Fig. 9** 将场景感知、高层任务规划和低层控制连接起来；**p.13 Fig. 10** 比较学习管线，而不是把生成、潜表示和知识约束排成能力等级。**p.14 §VII-B.1** 讨论用 UMI 手持接口采集动态示范。

**决定：** UMI 是“如何获取并部署示范”的好例子，也确实有执行策略；但若问题是“遇到两种可行推法时，怎样学习动作分布”，Diffusion Policy 更直接。保留两张运行图，不把 UMI 简化成只有数据。 *Acquisition and policy execution can belong to one system without being the same contribution.*

### Ding 等：按功能划分有效，但必须回看真正的预测目标

[2411.14499v4](https://arxiv.org/abs/2411.14499v4)，49 页。**p.6 §2.3 Fig. 2** 从内部表征与未来预测出发；**pp.15–17 Tables 2–3、Fig. 5** 区分生成视频与具身环境；**pp.28–29 §5.5** 进一步追踪模型究竟是数据来源、环境、评测器，还是智能体决策所用的组件。**pp.21–22 Table 4 / §5.2.2** 说明不能按表格里的 “Video Prediction” 字样便断言 V-JEPA 2 输出未来像素。

**决定：** F 类按“预测观测、特征或事件”阅读；V-JEPA 2-AC 的特征由外部规划器消费，允许同时从 M 的角度讨论它。WM-4 中的场景渲染不替代动态占用预测。 *A table heading is not a specification of the runtime signal.*

### Zhong 等：中间接口是目标图还是电机动作？

[2507.01925v1](https://arxiv.org/abs/2507.01925v1)，70 页。**p.13 Table 1、p.26 Table 6、pp.33–34 Table 8** 从模块间传递的表示比较语言、轨迹、目标状态、原始动作等。这里广义的 *action token* 可指中间目标，不等于它是离散词元或已可执行。控制频率也须结合硬件与执行前缀来读。

**决定：** OpenVLA 保留为原版离散自回归路线，补 π0 解释连续流匹配动作块；不要把 OpenVLA-OFT 的实现写成原版 OpenVLA。SuSIE 的中间目标图需要一个低层策略，不能与 DreamZero 的联合输出画成同一种接口。 *Name the producer, payload and consumer of an “action token.”*

### Li 等：把“用途”“时间”“空间”分轴

[2510.16732v3](https://arxiv.org/abs/2510.16732v3)，23 页。**p.3 Fig. 1、§III** 先区分是否和决策耦合，再看逐步展开或整体预测、紧凑向量或更显式的空间表示。**pp.11–12 §IV-A、Table III** 区分模拟平台、交互基准、离线数据和真实机器人平台。**pp.14–16 Tables IV–VIII** 分开报告视觉生成、占用、回报、操作与开环规划。

**决定：** 保留 PlaNet 与 V-JEPA 2-AC 的不同教学入口，同时注明二者都能为规划提供预测。把 Habitat、CALVIN、SIMPLER 分标为平台、任务判据、配对校准；不能把占用 mIoU、任务链成功和真实策略排序校准排成一榜。 *Representation, coupling and evaluation are independent coordinates.*

### Wang 等：用“未来是否参与出动作”识别 WAM

[2605.12090v1](https://arxiv.org/abs/2605.12090v1)，69 页。**p.5 Fig. 3、pp.5–6 §2** 区分给定观测出动作、给定动作推演状态、预测状态且与动作生成耦合。**pp.14–18 §4.1、Fig. 5、Table 1** 说明级联可以传像素、几何或潜表征；**pp.18–26 §4.2、Tables 2–3** 区分联合预测中的自回归与扩散实现。**pp.34–40 §6、Tables 8–9** 对世界预测和策略分别设验证问题。

**决定：** WM-6 用 DreamZero 讲联合生成、SuSIE 讲子目标与低层策略，不再让后者独自代表 WAM。视频骨干本身不是入选条件；预测下一帧和控制成功也是两项证据。[指定 PDF 的逐页精读与图表定位](wam-survey-deep-dive.md)。 *Classify by the future–action interface, not the backbone’s ancestry.*

### Zidan 等：相同的“想象”可能出现在完全不同的环节

[2606.00133v1](https://arxiv.org/abs/2606.00133v1)，147 页。**p.7、§§3–6** 将架构、方法族、推理策略与应用并列；**p.21 Table 1、p.32 Table 2、pp.64–65 Tables 3–4** 则分别讨论输入、学习范式、机器人用途及动作条件。**pp.98–99 Tables 9–10、pp.106–107 §9** 提醒生成模拟器、决策系统和评测不是同一件事。

**决定：** 不采纳所有二手归类。例如 p.54 §5.1.1 会给人 PlaNet 与 Dreamer 都靠想象训练策略的印象，而该综述 pp.27、37 的说明及 [PlaNet 原论文算法 1](https://arxiv.org/abs/1811.04551) 更精确：PlaNet 的规划器在决策时搜索，Dreamer 则在训练时用想象更新 actor。两篇应并列，而不是互作同义词。 *When taxonomy and implementation disagree, follow the primary algorithm.*

### Yao 等：把能力阶梯放在实验列，而不是家族树上

[2609.16697v1](https://arxiv.org/abs/2609.16697v1)，51 页。**pp.9–12 Fig. 2、§3、Table 2** 将状态可信、干预可控、决策有用，与几何/物理/动作对齐、数据/奖励/策略/模型自身更新交叉。**pp.25–27 §7、Table 3** 问更新环里到底传递什么。**pp.31–32 §9.2、Table 4** 要求分别查状态一致性、从同一状态改变动作后的响应、以及与无模型或等预算对照的决策收益。

**决定：** 不给整篇方法贴一个永久的 “actionable” 等级。同一模型可能有可靠的视角控制，但没有对摩擦或抓取的对应证据。MagicDrive 的条件生成与感知增强不等于用模型选择轨迹；增加 Drive-WM 作为规划对照，也不把后者的 nuScenes 指标升格为真车安全证据。 *Evidence is specific to the intervention, task, budget and test environment.*

## 方法路线图：四条决策路线，两层研究支撑

路线图回答“第一次读它，应先追踪哪条信息流”，不回答“它只能归哪一类”。**M、F、P、J** 构成树冠；**E、S** 分别列在下方的基础设施与综述带。[交叉阅读界面](https://hyfine.github.io/embodied-world-models-atlas/perspectives.zh.html)保留唯一条目，同时标记角色、世界侧预测量、动作表示、动作输出跨度和证据场景。比如 V-JEPA 2-AC 的主入口是 F，却能在“规划 × 特征 × 实物试验”中找到；这不意味着它在所有场景下达到某一级可控性。

| 入口 | 保留的主例 | 修正的边界 |
|---|---|---|
| M · 想象与规划 | PlaNet | 分清部署时搜索与用模型生成训练经验。Dyna 生成的是模拟转移，不必有视频解码器。 |
| F · 未来预测 | V-JEPA 2-AC | 把特征预测与抓取结果预测拆支。只预测局部事件的分类器不是通用世界模拟器；2-AC 的预测也可供 M 类规划器使用。 |
| P · 策略与技能 | Diffusion Policy | 把反应式运动控制与高层技能选择拆支。SayCan 选择已有技能，不直接输出每个关节命令。 |
| J · 未来与动作耦合 | DreamZero | 保留联合与级联两支；“使用预测生成动作”不要求全系统只有一张网络，也不要求部署时一定解码像素。 |
| E · 数据、环境与评测 | SIMPLER | 它是校准路线的例子，不能代表所有基础设施；树上将数据、仿真平台、任务基准、仿真/实机校准分为四支。R2R 也含数据，但此处按导航任务与基准展示。 |
| S · 综述视角 | Li 等 | 其图是阅读工作流，不是控制流。设计分类、动作接口、证据阶梯分别对照 Li、Ma、Yao，不以单篇综述定义整个领域。 |

## 实际改动：哪些要换，哪些不必换？

| 原来容易引发的理解 | 本次处理 | 可核对的一手证据 |
|---|---|---|
| 用 SuSIE 解释所有 WAM | **改主例，保留对照。** 主图 DreamZero 给对齐的未来与动作；SuSIE 图仍可展开，图像编辑器生成子目标，另一个策略执行。 | [DreamZero](https://arxiv.org/abs/2602.15922)；[SuSIE §4、Alg. 1](https://arxiv.org/abs/2310.10639) |
| 用 UMI 解释视觉运动策略的动作分布 | **改主例，保留对照。** Diffusion Policy 解释条件动作分布与滚动执行；UMI 解释数据采集、坐标和延迟匹配，保留其部署图。 | [Diffusion Policy Fig. 1、Fig. 3](https://arxiv.org/abs/2303.04137)；[UMI §§III、V–VI](https://arxiv.org/abs/2402.10329) |
| 驾驶街景生成就是驾驶规划 | **增加并列代表。** MagicDrive 用布局等条件生成多视图，Drive-WM 则用图像奖励给候选未来打分。需要时另读 OccWorld 的占用/自车运动预测。 | [MagicDrive Fig. 3](https://arxiv.org/abs/2310.02601)；[Drive-WM Fig. 5、Tables 3–4](https://arxiv.org/abs/2311.17918)；[OccWorld](https://arxiv.org/abs/2311.16038) |
| 数据多样性、跨本体训练、评测平台是同一类贡献 | **拆角色，不重复计数。** OXE 看跨机器人数据，Octo 看消费轨迹的策略，DROID 对照同型硬件、不同站点；另将 Habitat、CALVIN、SIMPLER 分开。 | [OXE](https://arxiv.org/abs/2310.08864)；[Octo](https://arxiv.org/abs/2405.12213)；[DROID](https://arxiv.org/abs/2403.12945) |
| 一个干净的代表作就能定义全类 | **保留好例子，注明覆盖范围。** PlaNet/Dreamer 分别展示部署搜索和训练想象；OpenVLA/π0 分别展示离散符号和连续动作块；SERL/RECAP 分别展示在线 RL 和已有 VLA 的经验后训练。 | [PlaNet](https://arxiv.org/abs/1811.04551) / [Dreamer](https://arxiv.org/abs/1912.01603)；[OpenVLA](https://arxiv.org/abs/2406.09246) / [π0](https://arxiv.org/abs/2410.24164)；[SERL](https://arxiv.org/abs/2401.16013) / [RECAP Alg. 1](https://arxiv.org/abs/2511.14759) |

**为什么没有把九篇综述投票合并成一个“标准分类”？** 一篇讲语言动作接口的综述不会为所有几何表示命名；一篇讨论可控视频的综述也不负责界定运动控制频率。缺席不等于否定，后发综述多次提及也不是独立复现实验。本站的取舍是为读者定位**问题与反例**，不是发布新的学科标准。
