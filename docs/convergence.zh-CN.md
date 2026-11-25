# 从世界模型到世界动作模型

[English](<convergence.en.md>)

<a id="origins"></a>

## WAM 从哪里来？看机制的出现，而不是找一个生日

**阅读约定.** 本站沿用 Wang 等的较宽定义：要有可度量的未来状态目标，还要与动作生成耦合；级联与联合都可能满足。按 Yao 等的评测视角，架构标签只能说明系统怎样工作，不能证明预测改变了实际结果。下列年份按早期公开记录；并列不表示继承。　[Wang et al. · Fig. 3, §§2–4](<https://arxiv.org/abs/2605.12090v1>) · [Yao et al. · Figs. 2, 5; Table 4](<https://arxiv.org/abs/2609.16697v1>)

**1991 · 行动是否总要先建模？.** Brooks 从环境反馈直接组织行为；Dyna 用真实经验学习模型，再用模拟转移改善决策。二者提出的是不同设计选择，不是新路线淘汰旧路线。　[Intelligence without representation](<https://doi.org/10.1016/0004-3702(91)90053-M>) · [Dyna](<https://doi.org/10.1145/122344.122377>)

**2016–2020 · 预测第一次怎样进入这次决策？.** Visual Foresight 比较不同推法下的像素运动；PlaNet 改在潜状态里搜索；Dreamer 则在想象轨迹上训练策略，部署时不必重复搜索。这是“预测什么”和“什么时候用预测”的两次分叉。　[Deep Visual Foresight](<https://arxiv.org/abs/1610.00696>) · [PlaNet](<https://proceedings.mlr.press/v97/hafner19a.html>) · [Dreamer](<https://arxiv.org/abs/1912.01603>)

**2022–2024 · 另一条路：让语言和示范直接教机器人行动.** RT-2 把动作写成符号；Diffusion Policy 生成连续动作序列；OpenVLA 与 π0 分别展示离散与连续的视觉语言动作接口。无需在每一步生成未来视频，也能形成闭环。　[RT-2](<https://proceedings.mlr.press/v229/zitkovich23a.html>) · [Diffusion Policy](<https://roboticsproceedings.org/rss19/p026.html>) · [OpenVLA](<https://proceedings.mlr.press/v270/kim25c.html>) · [π0](<https://arxiv.org/abs/2410.24164>)

**2023 · 两条线已开始相遇，而不只是到 2026 年才相遇.** 1 月 31 日首次提交的 UniPi 先生成文字引导的视觉计划，再由逆动力学提取动作；SuSIE 改用间歇刷新的子目标图与目标条件策略。12 月 20 日首次提交的 GR-1 在共享时序上下文中预测未来图像和动作。这些是后来 WAM 分类的早期实例，不是对首创权或命名日期的断言。　[UniPi](<https://arxiv.org/abs/2302.00111>) · [SuSIE](<https://arxiv.org/abs/2310.10639>) · [GR-1](<https://arxiv.org/abs/2312.13139v2>) · [Wang et al. · Fig. 3, §§2–4](<https://arxiv.org/abs/2605.12090v1>)

**2025–2026 · 从共享监督到可切换的执行路径.** UWM 通过视频与动作各自的噪声时间步切换预测任务；DreamZero 在 2026 年 2 月已明确自称 WAM；Fast-WAM 保留视频训练目标，但执行时省去未来视频采样。Wang 等于 5 月 12 日发布综述，整理级联和联合两类路径。这是系统化命名的文献坐标，不是术语首创权或机制发明日。　[Unified World Models](<https://arxiv.org/abs/2504.02792v3>) · [DreamZero](<https://arxiv.org/abs/2602.15922>) · [Fast-WAM](<https://arxiv.org/abs/2603.16666v2>) · [Wang et al. · Fig. 3, §§2–4](<https://arxiv.org/abs/2605.12090v1>)

**把“统一”写成可检查的接口.** 记 o 为观测、g 为目标、a 为动作、f 为可能的未来。策略回答 p(a | o,g)，前向模型回答 p(f | o,a)。在 WAM 口径下可以建模 p(f,a | o,g)：级联先取 f，再根据 o、g、f 产生 a；联合模型则让世界与动作目标共享学习过程。概率分解本身不是工程架构，更不是物理因果：环境里仍然是动作改变状态。只在外部用模拟器训练或给策略评分，不足以把被测策略叫 WAM。　[Wang et al. · Fig. 3, §§2–4](<https://arxiv.org/abs/2605.12090v1>) · [UniPi](<https://arxiv.org/abs/2302.00111>) · [Unified World Models](<https://arxiv.org/abs/2504.02792v3>) · [Yao et al. · Figs. 2, 5; Table 4](<https://arxiv.org/abs/2609.16697v1>)

<a id="research-routes"></a>

## 研究者路线：沿同一接口逐篇比较

**F · 预测：比较的究竟是哪种未来？.** 从图像运动读到可交互画面，再到目标特征。读 Visual Foresight、Genie、V-JEPA 2-AC 时分别记下动作条件、预测量和执行者；潜动作按钮并非机械臂命令。 [运行图 →](<https://hyfine.github.io/embodied-world-models-atlas/runtime.zh.html#wm-2>)　[Deep Visual Foresight](<https://arxiv.org/abs/1610.00696>) · [Genie](<https://arxiv.org/abs/2402.15391>) · [V-JEPA 2 / 2-AC](<https://arxiv.org/abs/2506.09985>)

**M · 规划与学习：何时为想象付费？.** 先对照 PlaNet 的候选序列搜索与 Dreamer 的想象 actor–critic：从“在线迭代选动作”变成“离线于当前决策训练一个 actor”。再看 DreamerV3 如何用归一化等稳定化手段跨任务沿用同一配置。比较实测回报、收集的交互数及决策时延；不要把模拟控制回报外推到家务操作。 [运行图 →](<https://hyfine.github.io/embodied-world-models-atlas/runtime.zh.html#wm-1>)　[PlaNet](<https://proceedings.mlr.press/v97/hafner19a.html>) · [Dreamer](<https://arxiv.org/abs/1912.01603>) · [DreamerV3](<https://www.nature.com/articles/s41586-025-08744-2>)

**P · 策略：动作如何被表示和执行？.** 原版 OpenVLA 每步解码动作符号；π0 生成连续动作块。Diffusion Policy 同样可输出动作块，却不要求语言或未来视频。动作编码、输出跨度和是否使用世界模型是三件事。 [运行图 →](<https://hyfine.github.io/embodied-world-models-atlas/runtime.zh.html#eai-2>)　[OpenVLA](<https://proceedings.mlr.press/v270/kim25c.html>) · [π0](<https://arxiv.org/abs/2410.24164>) · [Diffusion Policy](<https://roboticsproceedings.org/rss19/p026.html>)

**J · 世界—动作耦合：未来怎样进入控制？.** 先对照 UniPi 与 GR-1 的中间接口，再拆 UWM、DreamZero、Fast-WAM 的训练图与部署图。级联可以传子目标或潜特征；联合训练也不规定部署时必须解码全部模态。 [运行图 →](<https://hyfine.github.io/embodied-world-models-atlas/runtime.zh.html#wm-6>)　[UniPi](<https://arxiv.org/abs/2302.00111>) · [GR-1](<https://arxiv.org/abs/2312.13139v2>) · [Unified World Models](<https://arxiv.org/abs/2504.02792v3>) · [DreamZero](<https://arxiv.org/abs/2602.15922>) · [Fast-WAM](<https://arxiv.org/abs/2603.16666v2>) · [Wang et al. · Fig. 3, §§2–4](<https://arxiv.org/abs/2605.12090v1>)

**E / S · 支撑层，不是另外两种策略.** E 区分数据、环境、任务判据和真机校准。S 提供阅读与评测视角：从相同初态换动作，再问预测在等预算下是否改变选择。漂亮视频、动作遵从和决策收益不能互相代证。　[Open X-Embodiment / RT-X](<https://arxiv.org/abs/2310.08864>) · [Habitat](<https://openaccess.thecvf.com/content_ICCV_2019/html/Savva_Habitat_A_Platform_for_Embodied_AI_Research_ICCV_2019_paper.html>) · [LIBERO](<https://arxiv.org/abs/2306.03310>) · [SIMPLER](<https://arxiv.org/abs/2405.05941>) · [Yao et al. · Figs. 2, 5; Table 4](<https://arxiv.org/abs/2609.16697v1>)

继续到固定版本源码：[PlaNet](<deep-dives.zh-CN.md#case-planet>) · [V-JEPA 2-AC](<deep-dives.zh-CN.md#case-vjepa2>) · [Diffusion Policy](<deep-dives.zh-CN.md#case-diffusion-policy>) · [DreamZero](<deep-dives.zh-CN.md#case-dreamzero>) · [SIMPLER](<deep-dives.zh-CN.md#case-simpler>)

<a id="frontier"></a>

## 前沿观察 · 截至 2026-11-25

**执行成本.** 已报告：Fast-WAM 的受控变体中，去掉视频共训与跳过测试时视频采样不是同一种消融。 本站判断：预计更多工作比较“训练时学未来、部署时按需计算”。若在相同硬件与截止时间下，显式采样在困难恢复任务上持续更好，就应当保留它。　[Fast-WAM](<https://arxiv.org/abs/2603.16666v2>) · [DreamZero](<https://arxiv.org/abs/2602.15922>)

**语言、视频与动作的对齐.** 已报告：2026-11 的 SWAM 分开研究视频语言监督与动作监督，并在固定训练预算下比较混合数据。真实任务范围有限，不能从汇集小时数推出普适规模律。 本站判断：预测：对齐质量可能比原始时长更能解释迁移；反证是等预算、等本体条件下，弱对齐数据也能稳定复现收益。　[SWAM](<https://arxiv.org/abs/2611.12870v2>) · [Open X-Embodiment / RT-X](<https://arxiv.org/abs/2310.08864>)

**从场景预测到身体响应.** 已报告：ζ0（2026-11-22 预印本）预测未来视觉特征和关节轨迹，作者在两个 VLA 基座上报告提升。它展示了非像素未来的一条路径，而非 WAM 已覆盖所有接触物理。 本站判断：预测：当遮挡或滑移决定成败时，本体感知或触觉未来更值得建模。对照必须匹配观测、策略容量和时延；如果只增加传感器就能得到相同收益，不能把因果归给预测。　[ζ0](<https://arxiv.org/abs/2611.29277v1>) · [The Feeling of Success](<https://proceedings.mlr.press/v78/calandra17a.html>) · [Yao et al. · Figs. 2, 5; Table 4](<https://arxiv.org/abs/2609.16697v1>)

<a id="terms"></a>

## 术语速读：按系统职责记，不按字母背

**WM · World Model · 世界模型.** 给定当前状态及可能的干预，预测后续状态；有些模型只预测决策需要的量。　[Yao et al. · Figs. 2, 5; Table 4](<https://arxiv.org/abs/2609.16697v1>)

**VLA · Vision–Language–Action.** 视觉与指令进入系统，动作从系统输出；不单凭这个接口判断模型内部有没有世界知识。　[OpenVLA](<https://proceedings.mlr.press/v270/kim25c.html>)

**WAM · World Action Model · 世界动作模型.** 未来状态的建模与动作生成耦合；是系统层定义，不要求一个解码器或视频输出。　[Wang et al. · Fig. 3, §§2–4](<https://arxiv.org/abs/2605.12090v1>)

**MPC · Model Predictive Control · 模型预测控制.** 用模型比较备选动作，执行首步或前缀，用新观测再次规划。　[PlaNet](<https://proceedings.mlr.press/v97/hafner19a.html>)

**IDM · Inverse Dynamics Model · 逆动力学.** 根据当前与目标状态变化推断可能动作。同一视觉变化未必唯一确定动作。　[UniPi](<https://arxiv.org/abs/2302.00111>)

**JEPA · Joint-Embedding Predictive Architecture.** 预测表征而不是重建像素；V-JEPA 2 的视频预训练与 2-AC 的动作条件控制接口要分开。　[V-JEPA 2 / 2-AC](<https://arxiv.org/abs/2506.09985>)

**RL · Reinforcement Learning · 强化学习.** 利用奖励或回报改善策略；真实环境和模型想象可提供不同来源的经验。　[Dreamer](<https://arxiv.org/abs/1912.01603>)

**Action chunk · 动作块.** 一次提出一段动作，不等于整段盲目执行；要区分预测长度和执行前缀。　[Diffusion Policy](<https://roboticsproceedings.org/rss19/p026.html>)

**AR · Autoregressive · 自回归.** 后一个预测条件于已有上下文；可用共享时序主干、不同输出头，不等于只有一个动作词表。　[GR-1](<https://arxiv.org/abs/2312.13139v2>)

**Diffusion · 扩散生成.** 训练去噪网络，再以多步去噪采样。去噪对象可以是视频，也可以是动作；UWM 给两者各自的噪声控制。　[Unified World Models](<https://arxiv.org/abs/2504.02792v3>)

**Ablation · 消融实验.** 固定可比条件，移除一个组件或训练目标。去掉未来监督和仅跳过执行时视频生成是不同的对照。　[Fast-WAM](<https://arxiv.org/abs/2603.16666v2>)
