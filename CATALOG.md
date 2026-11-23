# 研究索引 · Research catalog

[中文导读](docs/guide.zh-CN.md) · [English guide](docs/guide.en.md) · [Interactive atlas](https://hyfine.github.io/embodied-world-models-atlas/) · [Selection rules](EVIDENCE.md)

38 entries · 2026-11-23. 年份指早期公开版本，source 指链接或标明的发表版本。Year denotes early public release, not necessarily proceedings year. Missing links mean not indexed, not unavailable.

## M · 想象与规划 / Imagination & planning

<a id="dreamerv3"></a>

### 2023 · DreamerV3

沿用潜空间想象，用归一化等稳定化设计跨域训练。多种控制环境的证据不能直接外推到家务机器人。

Normalization and other stabilizers make latent imagination work across diverse control domains. That breadth is not a household-robot trial.

[Nature 2025](<https://www.nature.com/articles/s41586-025-08744-2>) · [GitHub](<https://github.com/danijar/dreamerv3>)

<a id="tdmpc2"></a>

### 2023 · TD-MPC2

在任务导向潜空间做短视野规划，再用终端价值估计更远的回报；无需让每个像素都可解码。

Plan short trajectories in a task-oriented latent space and use terminal value to estimate what lies beyond. Pixel reconstruction is not required.

[ICLR 2024 · preprint](<https://arxiv.org/abs/2310.16828>) · [GitHub](<https://github.com/nicklashansen/tdmpc2>)

<a id="dreamer"></a>

### 2019 · Dreamer

在模型想象的轨迹上训练策略和价值函数，把规划的部分成本移到训练期。部署时无需每步穷举未来。

Train an actor and value function on imagined latent trajectories. This shifts work to training rather than searching over futures at every decision.

[ICLR 2020 · preprint](<https://arxiv.org/abs/1912.01603>) · [GitHub](<https://github.com/danijar/dreamer>)

<a id="muzero"></a>

### 2019 · MuZero

只学习搜索需要的奖励、价值和策略先验，用树搜索择步；不要求重建棋盘或游戏画面。

Learn reward, value and policy priors for tree search rather than reconstructing the board or screen. Accuracy is tied to the decision task.

[Nature 2020](<https://www.nature.com/articles/s41586-020-03051-4>)

<a id="planet"></a>

### 2018 · PlaNet

从像素学习带记忆的潜状态，在里面比较候选动作序列，执行第一步再规划。速度与搜索预算直接相关。

Learn a recurrent latent state from pixels, compare candidate action sequences in that state, execute the first step and replan. Search costs time at each decision.

[ICML 2019 · PMLR](<https://proceedings.mlr.press/v97/hafner19a.html>) · [GitHub](<https://github.com/google-research/planet>)

<a id="world-models"></a>

### 2018 · World Models

视觉编码器压缩画面，循环模型预测潜状态，小控制器读出动作。控制器在梦中找到的捷径未必存在于真实环境。

A visual encoder compresses frames; a recurrent model predicts latent dynamics; a small controller acts. A shortcut found inside the dream need not exist in the environment.

[NeurIPS 2018 · preprint](<https://arxiv.org/abs/1803.10122>) · [GitHub](<https://github.com/hardmaru/WorldModelsExperiments>)

<a id="dyna"></a>

### 1991 · Dyna

同一学习器既消费真实转移，也消费模型模拟的转移。模型的价值是让一次真实经验被多用几次，不是生成画面。

The learner updates from both experienced and model-generated transitions. The point is to reuse real experience, not to generate pictures.

[ACM SIGART Bulletin](<https://doi.org/10.1145/122344.122377>)

## F · 感知与未来预测 / Predicting observations

<a id="dreamtrue"></a>

### 2026 · DreamTrue

用反事实动作和学习到的交互反馈修正视频预测。它研究动作遵从度，而非仅让画面逼真；预测成功仍需真机核对。

Use counterfactual actions and learned interaction feedback to improve action following, not just visual fidelity. Predicted success still needs real-world calibration.

[arXiv](<https://arxiv.org/abs/2610.12468>) · [GitHub](<https://github.com/brave-eai/DreamTrue>)

<a id="cosmos"></a>

### 2025 · Cosmos World Foundation Model Platform

把生成式视频先验做成可适配的平台；给出提示或视频条件不等同于精确遵循机器人动作。

Package generative video priors for downstream adaptation. Conditioning on prompts or video alone does not establish sensitivity to precise robot actions.

[arXiv](<https://arxiv.org/abs/2501.03575>) · [GitHub](<https://github.com/NVIDIA/Cosmos>) · [Hugging Face](<https://huggingface.co/nvidia/Cosmos-1.0-Diffusion-7B-Video2World>)

<a id="vjepa2"></a>

### 2025 · V-JEPA 2 / 2-AC

先从无动作视频预测特征，再固定编码器、用机器人交互训练动作条件预测器，以目标图像特征做规划。Hub 链接是视频编码器，不是完整控制器。

First predict video features; freeze the encoder and train an action-conditioned predictor on robot interactions for goal-image planning. The linked Hub card is the video encoder, not the controller.

[arXiv](<https://arxiv.org/abs/2506.09985>) · [GitHub](<https://github.com/facebookresearch/vjepa2>) · [Hugging Face](<https://huggingface.co/facebook/vjepa2-vitg-fpc64-384>)

<a id="diamond"></a>

### 2024 · DIAMOND

直接扩散生成动作条件画面，并在生成环境里训练 Atari 策略。小物体细节影响得分，但游戏不是实物接触。

Generate action-conditioned pixels with diffusion and train an Atari policy in the resulting environment. Small details affect score; game dynamics are not physical contact.

[NeurIPS 2024 · preprint](<https://arxiv.org/abs/2405.12399>) · [GitHub](<https://github.com/eloialonso/diamond>)

<a id="genie"></a>

### 2024 · Genie

从无动作标签的视频学习离散潜动作，再按潜动作生成交互轨迹；可玩按钮不等于机器人的关节指令。

Infer discrete latent actions from videos without action labels, then condition an interactive generator on them. A playable button is not a calibrated robot command.

[ICML 2024 · preprint](<https://arxiv.org/abs/2402.15391>)

<a id="touch"></a>

### 2017 · The Feeling of Success

比较视觉、触觉及二者结合对抓取结果的预测。它预测成功事件，不生成整段未来，展示了比视频更窄但有用的预测目标。

Compare vision, touch and their combination for predicting grasp outcomes. This event predictor illustrates a narrower target than a video; it is not a general simulator.

[CoRL 2017 · PMLR](<https://proceedings.mlr.press/v78/calandra17a.html>)

<a id="foresight"></a>

### 2016 · Deep Visual Foresight

给视频预测器不同的电机指令，用预测的像素运动挑选推物轨迹，再从新图像重规划。这里画面的用途是选动作。

Condition a video predictor on candidate motor commands, use predicted pixel motion to select a push and replan from a new image. The image is useful because it changes the action choice.

[ICRA 2017 · preprint](<https://arxiv.org/abs/1610.00696>)

## P · 技能与动作策略 / Skills & policies

<a id="pi05"></a>

### 2025 · π0.5

结合异构数据、高层子任务与低层动作，研究未见家庭环境中的指令执行；新家庭并不等于任意新本体。

Combine heterogeneous data, high-level subtasks and low-level actions for instructions in unseen homes. An unseen home is not an arbitrary unseen embodiment.

[arXiv](<https://arxiv.org/abs/2504.16054>) · [GitHub](<https://github.com/Physical-Intelligence/openpi>)

<a id="smolvla"></a>

### 2025 · SmolVLA

用紧凑的视觉语言动作模型和异步执行降低实验门槛；测延迟时要包含相机、推理和控制的端到端链路。

A compact VLA and asynchronous execution lower the barrier to experiments. Measure latency across camera, inference and control, not just the forward pass.

[arXiv](<https://arxiv.org/abs/2506.01844>) · [GitHub](<https://github.com/huggingface/lerobot>) · [Hugging Face](<https://huggingface.co/lerobot/smolvla_base>)

<a id="octo"></a>

### 2024 · Octo

用多机器人轨迹训练可适配不同观测和动作空间的通用策略；新接口仍可能需要微调。

Pretrain a generalist policy on cross-robot trajectories and adapt input/output interfaces. New embodiments can still require fine-tuning.

[RSS 2024 · preprint](<https://arxiv.org/abs/2405.12213>) · [GitHub](<https://github.com/octo-models/octo>) · [Hugging Face](<https://huggingface.co/rail-berkeley/octo-base-1.5>)

<a id="openvla"></a>

### 2024 · OpenVLA

融合视觉特征，用语言模型输出离散动作。运行权重之前，先核对动作反归一化统计对应哪台机器人。

Fuse visual features and generate discrete robot actions with a language model. Check the embodiment-specific unnormalization statistics before interpreting its outputs.

[CoRL 2024 · PMLR 2025](<https://proceedings.mlr.press/v270/kim25c.html>) · [GitHub](<https://github.com/openvla/openvla>) · [Hugging Face](<https://huggingface.co/openvla/openvla-7b>)

<a id="pi0"></a>

### 2024 · π0

在视觉语言骨干旁加入流匹配动作专家，生成连续动作块；相同语言指令仍需对应具体坐标系。

Attach a flow-matching action expert to a vision-language backbone to generate continuous action chunks. Instructions still need a concrete coordinate frame.

[arXiv](<https://arxiv.org/abs/2410.24164>) · [GitHub](<https://github.com/Physical-Intelligence/openpi>)

<a id="act"></a>

### 2023 · ACT / ALOHA

从低成本双臂示范学习成段的关节动作，对重叠预测做时间集成以稳定动作。效果依赖示范和控制接口。

Learn joint-action chunks from low-cost bimanual demonstrations and ensemble overlapping predictions over time. Results depend on demonstrations and the control interface.

[RSS 2023 · preprint](<https://arxiv.org/abs/2304.13705>) · [GitHub](<https://github.com/tonyzhaozh/act>)

<a id="diffusion-policy"></a>

### 2023 · Diffusion Policy

对动作序列而非世界画面去噪，能表达绕物体左走或右走等多种解；只执行一段便重新观测。

Denoise action sequences rather than images of the future. Multiple routes around an object can coexist; execute a prefix before observing again.

[RSS 2023](<https://roboticsproceedings.org/rss19/p026.html>) · [GitHub](<https://github.com/real-stanford/diffusion_policy>)

<a id="rt2"></a>

### 2023 · RT-2

把动作编码成文本符号，将机器人示范与视觉语言任务一起微调。语义迁移不证明获得了精确的物理预测器。

Encode actions as text tokens and co-fine-tune on robot demonstrations and vision-language tasks. Semantic transfer is not proof of precise physical prediction.

[CoRL 2023 · PMLR](<https://proceedings.mlr.press/v229/zitkovich23a.html>)

<a id="rt1"></a>

### 2022 · RT-1

把图像和指令编码后预测离散化机器人动作；覆盖许多任务不等于掌握任意新硬件的控制接口。

Encode images and instructions to predict discretized actions. Task breadth does not confer a control interface for arbitrary new hardware.

[RSS 2023 · preprint](<https://arxiv.org/abs/2212.06817>) · [GitHub](<https://github.com/google-research/robotics_transformer>)

<a id="saycan"></a>

### 2022 · SayCan

语言模型判断哪个技能符合指令，价值函数判断当前能否完成，再调用已有技能。技能库外的动作不会自动出现。

Combine language-based usefulness with a learned feasibility score, then execute an existing skill. The planner cannot summon actions absent from its skill library.

[CoRL · preprint](<https://arxiv.org/abs/2204.01691>) · [GitHub](<https://github.com/google-research/google-research/tree/master/saycan>)

<a id="legged"></a>

### 2021 · Learning to Walk in Minutes

用大量并行模拟环境训练四足运动策略，再迁移到真机。这是具身策略，但策略不必预测下一帧。

Train locomotion policies in many parallel simulated environments, then transfer to hardware. This is embodied learning without requiring next-frame prediction.

[CoRL · preprint](<https://arxiv.org/abs/2109.11978>) · [GitHub](<https://github.com/leggedrobotics/legged_gym>)

<a id="brooks"></a>

### 1991 · Intelligence without representation

从在真实环境中运行的分层感知—行动行为出发，质疑必须先建统一内部表征的假设。它是设计立场，不是关于所有任务的定理。

Start with layers of situated sensor-to-action behavior rather than a single central representation. This is a design position, not a theorem about every task.

[Artificial Intelligence](<https://doi.org/10.1016/0004-3702(91)90053-M>)

## J · 世界—动作耦合 / World-action coupling

<a id="dreamzero"></a>

### 2026 · DreamZero

从视频扩散骨干联合预测视觉未来和机器人动作。读结果要区分任务进度与完整成功，也要区分不同本体的检查点。

Use a video-diffusion backbone to jointly predict visual futures and actions. Distinguish task progress from complete success and compare the correct embodiment checkpoint.

[arXiv](<https://arxiv.org/abs/2602.15922>) · [GitHub](<https://github.com/dreamzero0/dreamzero>) · [Hugging Face](<https://huggingface.co/GEAR-Dreams/DreamZero-DROID>)

<a id="geact"></a>

### 2026 · GE-Act 2.0

先压缩保留控制所需信息，再单步预测视觉未来，用逆动力学反推动作。能达到同一画面的动作可能不止一条。

Compress control-relevant information, predict a visual future in one step and infer actions with inverse dynamics. More than one action can reach a similar image.

[arXiv](<https://arxiv.org/abs/2609.05588>)

<a id="phoenix"></a>

### 2026 · Phoenix

先学场景结构表征，再用于世界—动作模型；读跨平台成绩要核对每个基准的后训练，不能笼统称为零样本。

Learn scene-structure representations for world-action modeling. Check benchmark-specific post-training before interpreting cross-platform results as zero-shot.

[arXiv](<https://arxiv.org/abs/2611.24938>)

<a id="spatialumi"></a>

### 2026 · Spatial-UMI-Dream

从 RGB-D 示范先学世界、再联合学视频、度量深度与动作。显式距离有助于区分看起来相同但够不着的物体；需要合适的传感数据。

Train first on the world, then jointly predict RGB, metric depth and actions from RGB-D demonstrations. Depth can distinguish apparent proximity from reachability, but requires suitable sensor data.

[arXiv](<https://arxiv.org/abs/2611.07229>)

## E · 环境、数据与评测 / Environments, data & evaluation

<a id="droid"></a>

### 2024 · DROID

用标准化硬件从多个站点收集真实轨迹，让背景和操作员更多样。站点多不等于机型多。

Collect real trajectories across sites using standardized hardware to diversify scenes and operators. Many sites do not mean many robot types.

[RSS 2024 · preprint](<https://arxiv.org/abs/2403.12945>) · [GitHub](<https://github.com/droid-dataset/droid>)

<a id="simpler"></a>

### 2024 · SIMPLER

用成对仿真和真机实验校准策略评测；关注排序及其偏差。一个设置下相关，不保证换夹爪后还相关。

Calibrate simulated policy evaluation with paired real trials. Correlated rankings on one setup do not establish correlation after changing grippers.

[arXiv](<https://arxiv.org/abs/2405.05941>) · [GitHub](<https://github.com/simpler-env/SimplerEnv>)

<a id="libero"></a>

### 2023 · LIBERO

按空间、物体、目标等划分操作任务，研究终身学习与知识迁移。应交代套件与任务顺序，不只报均值。

Group manipulation tasks by spatial, object and goal variation to study lifelong transfer. Report the suite and task order, not just a pooled average.

[NeurIPS 2023 · preprint](<https://arxiv.org/abs/2306.03310>) · [GitHub](<https://github.com/Lifelong-Robot-Learning/LIBERO>)

<a id="oxe"></a>

### 2023 · Open X-Embodiment / RT-X

汇集不同机器人数据，比较共享预训练的迁移收益。统一存储格式不会自动统一坐标、频率与夹爪语义。

Pool datasets across robots to study transfer from shared training. A common storage format does not align coordinates, control rates or gripper semantics.

[ICRA 2024 · preprint](<https://arxiv.org/abs/2310.08864>) · [GitHub](<https://github.com/google-deepmind/open_x_embodiment>)

<a id="habitat"></a>

### 2019 · Habitat

用可配置传感器、任务和三维模拟器研究在环导航；模拟器提供环境，不是智能体自己学出的世界模型。

Configurable sensors, tasks and a 3D simulator enable closed-loop navigation experiments. The simulator supplies the environment; the agent did not learn it.

[ICCV 2019 · CVF](<https://openaccess.thecvf.com/content_ICCV_2019/html/Savva_Habitat_A_Platform_for_Embodied_AI_Research_ICCV_2019_paper.html>) · [GitHub](<https://github.com/facebookresearch/habitat-lab>)

<a id="r2r"></a>

### 2017 · Room-to-Room / VLN

把自然语言路线与室内视点图配对，评估智能体能否走到目标。图上的可走边不等于真实底盘动力学。

Pair natural-language routes with indoor viewpoint graphs and ask whether an agent reaches the goal. Traversable graph edges are not mobile-base dynamics.

[CVPR 2018 · preprint](<https://arxiv.org/abs/1711.07280>) · [GitHub](<https://github.com/peteanderson80/Matterport3DSimulator>)

## S · 综述入口 / Survey lenses

<a id="survey-wm"></a>

### 2025 · A Comprehensive Survey on World Models for Embodied AI

按功能、时间建模、空间表征分轴比较。与本站按决策用途分组交叉阅读，避免把表征类型误当用途。

Compare functionality, temporal modeling and spatial representation. Cross this with the atlas's decision-role grouping rather than treating a representation as a use case.

[arXiv](<https://arxiv.org/abs/2510.16732>)

<a id="survey-vla"></a>

### 2024 · A Survey on Vision-Language-Action Models for Embodied AI

从组件、控制策略和任务规划梳理 VLA；适合补齐政策路线，但不是另一次独立真机验证。

Use the component, control and planning taxonomy to orient a VLA reading list. A survey is not an independent robot trial.

[arXiv](<https://arxiv.org/abs/2405.14093>)
