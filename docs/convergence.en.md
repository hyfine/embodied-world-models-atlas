# From world models to world action models

[简体中文](<convergence.zh-CN.md>)

<a id="origins"></a>

## Where did WAM come from? Date the mechanisms, not a birthday

**Reading convention.** We use Wang et al.’s broad definition: a measurable future-state target coupled to action generation, whether cascaded or joint. Under Yao et al.’s evaluation lens, architecture says how a system works, not whether prediction improved a real outcome. Dates mark early public records; juxtaposition is not descent.　[Wang et al. · Fig. 3, §§2–4](<https://arxiv.org/abs/2605.12090v1>) · [Yao et al. · Figs. 2, 5; Table 4](<https://arxiv.org/abs/2609.16697v1>)

**1991 · Must a robot always model before acting?.** Brooks builds behavior from sensor–action feedback; Dyna learns from real transitions and reuses simulated experience for decisions. These are alternative designs, not successive winners.　[Intelligence without representation](<https://doi.org/10.1016/0004-3702(91)90053-M>) · [Dyna](<https://doi.org/10.1145/122344.122377>)

**2016–2020 · How can a forecast change this decision?.** Visual Foresight compares pixel motion under candidate pushes. PlaNet searches in latent state; Dreamer trains an actor on imagined trajectories instead of repeating the search at execution. What is predicted and when it is consumed are separate choices.　[Deep Visual Foresight](<https://arxiv.org/abs/1610.00696>) · [PlaNet](<https://proceedings.mlr.press/v97/hafner19a.html>) · [Dreamer](<https://arxiv.org/abs/1912.01603>)

**2022–2024 · A parallel route: learn actions from language and demonstrations.** RT-2 represents controls as tokens; Diffusion Policy generates continuous sequences. OpenVLA and π0 illustrate discrete and continuous vision-language-action interfaces. A policy can observe again after acting without generating a future video.　[RT-2](<https://proceedings.mlr.press/v229/zitkovich23a.html>) · [Diffusion Policy](<https://roboticsproceedings.org/rss19/p026.html>) · [OpenVLA](<https://proceedings.mlr.press/v270/kim25c.html>) · [π0](<https://arxiv.org/abs/2410.24164>)

**2023 · The paths were already meeting in 2023.** UniPi (first submitted 31 January) converts a text-guided video plan into controls using inverse dynamics; SuSIE connects refreshed subgoal images to a goal-conditioned policy. GR-1 (first submitted 20 December) predicts future images and actions from shared temporal context. These are early examples in the later WAM taxonomy, not a claim of coinage or priority.　[UniPi](<https://arxiv.org/abs/2302.00111>) · [SuSIE](<https://arxiv.org/abs/2310.10639>) · [GR-1](<https://arxiv.org/abs/2312.13139v2>) · [Wang et al. · Fig. 3, §§2–4](<https://arxiv.org/abs/2605.12090v1>)

**2025–2026 · From shared supervision to different execution paths.** UWM changes the prediction task through separate noise levels for video and action. DreamZero explicitly called itself a WAM in February 2026; Fast-WAM retained video supervision without sampling future video at execution. Wang et al. published their synthesis of cascaded and joint approaches on 12 May. This dates a taxonomy, not the coinage of the term or the invention of its mechanisms.　[Unified World Models](<https://arxiv.org/abs/2504.02792v3>) · [DreamZero](<https://arxiv.org/abs/2602.15922>) · [Fast-WAM](<https://arxiv.org/abs/2603.16666v2>) · [Wang et al. · Fig. 3, §§2–4](<https://arxiv.org/abs/2605.12090v1>)

**Make “unified” an inspectable interface.** Let o be an observation, g a goal, a an action and f a possible future. A policy models p(a | o,g); a forward model predicts p(f | o,a). A WAM can model p(f,a | o,g): a cascade first proposes f and then produces a conditioned on o, g and f; a joint system learns coupled world and action targets. The probability factorization alone is not an implementation or a causal assertion: actions still change the physical environment. An external simulator used only for training or scoring does not turn the evaluated policy into a WAM.　[Wang et al. · Fig. 3, §§2–4](<https://arxiv.org/abs/2605.12090v1>) · [UniPi](<https://arxiv.org/abs/2302.00111>) · [Unified World Models](<https://arxiv.org/abs/2504.02792v3>) · [Yao et al. · Figs. 2, 5; Table 4](<https://arxiv.org/abs/2609.16697v1>)

<a id="research-routes"></a>

## Research routes: follow one interface across papers

**F · Prediction: what future is being compared?.** Compare image motion, interactive frames and goal features. For Visual Foresight, Genie and V-JEPA 2-AC write down the action condition, prediction and executor. A latent game control is not a calibrated arm command. [Runtime diagram →](<https://hyfine.github.io/embodied-world-models-atlas/runtime.html#wm-2>)　[Deep Visual Foresight](<https://arxiv.org/abs/1610.00696>) · [Genie](<https://arxiv.org/abs/2402.15391>) · [V-JEPA 2 / 2-AC](<https://arxiv.org/abs/2506.09985>)

**M · Planning and learning: when do you pay for imagination?.** Compare PlaNet’s candidate-sequence search with Dreamer’s imagined actor–critic: repeated search at each decision gives way to training an actor on model rollouts. Then examine how DreamerV3 stabilizes training across tasks with normalization and a common configuration. Compare measured return, interactions and decision latency; simulated control returns are not household manipulation results. [Runtime diagram →](<https://hyfine.github.io/embodied-world-models-atlas/runtime.html#wm-1>)　[PlaNet](<https://proceedings.mlr.press/v97/hafner19a.html>) · [Dreamer](<https://arxiv.org/abs/1912.01603>) · [DreamerV3](<https://www.nature.com/articles/s41586-025-08744-2>)

**P · Policies: how is an action encoded and executed?.** Base OpenVLA decodes action tokens per step; π0 generates continuous chunks. Diffusion Policy also generates chunks without requiring language or future video. Action encoding, output horizon and world modeling are separate dimensions. [Runtime diagram →](<https://hyfine.github.io/embodied-world-models-atlas/runtime.html#eai-2>)　[OpenVLA](<https://proceedings.mlr.press/v270/kim25c.html>) · [π0](<https://arxiv.org/abs/2410.24164>) · [Diffusion Policy](<https://roboticsproceedings.org/rss19/p026.html>)

**J · World-action coupling: how does foresight enter control?.** Compare the interfaces in UniPi and GR-1; then draw separate training and deployment graphs for UWM, DreamZero and Fast-WAM. A cascade can pass subgoals or features. Joint training need not decode every modality during control. [Runtime diagram →](<https://hyfine.github.io/embodied-world-models-atlas/runtime.html#wm-6>)　[UniPi](<https://arxiv.org/abs/2302.00111>) · [GR-1](<https://arxiv.org/abs/2312.13139v2>) · [Unified World Models](<https://arxiv.org/abs/2504.02792v3>) · [DreamZero](<https://arxiv.org/abs/2602.15922>) · [Fast-WAM](<https://arxiv.org/abs/2603.16666v2>) · [Wang et al. · Fig. 3, §§2–4](<https://arxiv.org/abs/2605.12090v1>)

**E / S · Support layers, not two more policies.** E separates data, environments, task oracles and real-world calibration. S supplies ways to read and test: change the action from a matched start, then ask whether prediction changes decisions at equal budget. Fidelity, action following and decision utility need separate evidence.　[Open X-Embodiment / RT-X](<https://arxiv.org/abs/2310.08864>) · [Habitat](<https://openaccess.thecvf.com/content_ICCV_2019/html/Savva_Habitat_A_Platform_for_Embodied_AI_Research_ICCV_2019_paper.html>) · [LIBERO](<https://arxiv.org/abs/2306.03310>) · [SIMPLER](<https://arxiv.org/abs/2405.05941>) · [Yao et al. · Figs. 2, 5; Table 4](<https://arxiv.org/abs/2609.16697v1>)

Continue to pinned implementation readings: [PlaNet](<deep-dives.en.md#case-planet>) · [V-JEPA 2-AC](<deep-dives.en.md#case-vjepa2>) · [Diffusion Policy](<deep-dives.en.md#case-diffusion-policy>) · [DreamZero](<deep-dives.en.md#case-dreamzero>) · [SIMPLER](<deep-dives.en.md#case-simpler>)

<a id="frontier"></a>

## Frontier watch · evidence through 2026-11-25

**Cost at execution.** Reported: Fast-WAM compares removing video co-training with skipping test-time video sampling; these ablations change different things. Atlas judgment: Expect more comparisons of training with foresight and computing it only when useful. Keep explicit sampling where it consistently improves recovery at matched hardware and deadlines.　[Fast-WAM](<https://arxiv.org/abs/2603.16666v2>) · [DreamZero](<https://arxiv.org/abs/2602.15922>)

**Language–video–action alignment.** Reported: In November 2026 SWAM studies language–video versus action supervision and compares mixtures under fixed training budgets. Its physical-task scope does not turn total hours into a universal scaling law. Atlas judgment: Hypothesis: alignment may explain transfer better than raw hours. It weakens if poorly aligned data reliably gives the same gains at matched budget and embodiment.　[SWAM](<https://arxiv.org/abs/2611.12870v2>) · [Open X-Embodiment / RT-X](<https://arxiv.org/abs/2310.08864>)

**From scene changes to body response.** Reported: The ζ0 preprint (22 Nov 2026) predicts visual features and joint trajectories and reports gains on two VLA bases. This is one non-pixel future, not coverage of arbitrary contact physics. Atlas judgment: Body or contact futures may matter where occlusion or slip determines success. Match observations, capacity and latency; if merely adding the sensor yields the same gain, credit cannot go to prediction.　[ζ0](<https://arxiv.org/abs/2611.29277v1>) · [The Feeling of Success](<https://proceedings.mlr.press/v78/calandra17a.html>) · [Yao et al. · Figs. 2, 5; Table 4](<https://arxiv.org/abs/2609.16697v1>)

<a id="terms"></a>

## Terms: learn the job, not just the initials

**WM · World Model · 世界模型.** Predicts a subsequent state or decision-relevant quantity, possibly conditioned on an intervention.　[Yao et al. · Figs. 2, 5; Table 4](<https://arxiv.org/abs/2609.16697v1>)

**VLA · Vision–Language–Action.** Vision and language enter, actions leave. This interface alone does not tell us what physical knowledge is represented.　[OpenVLA](<https://proceedings.mlr.press/v270/kim25c.html>)

**WAM · World Action Model · 世界动作模型.** Couples future-state modeling with action generation at system level; neither a single decoder nor video output is required.　[Wang et al. · Fig. 3, §§2–4](<https://arxiv.org/abs/2605.12090v1>)

**MPC · Model Predictive Control · 模型预测控制.** Compare candidate controls in a model, execute a prefix, then replan from a measurement.　[PlaNet](<https://proceedings.mlr.press/v97/hafner19a.html>)

**IDM · Inverse Dynamics Model · 逆动力学.** Infers a possible control from a state change. A pair of images need not uniquely determine the control.　[UniPi](<https://arxiv.org/abs/2302.00111>)

**JEPA · Joint-Embedding Predictive Architecture.** Predicts representations rather than reconstructing pixels. Distinguish V-JEPA 2 pretraining from the 2-AC action-conditioned interface.　[V-JEPA 2 / 2-AC](<https://arxiv.org/abs/2506.09985>)

**RL · Reinforcement Learning · 强化学习.** Improves a policy using rewards or returns; experience may come from a real environment or model imagination.　[Dreamer](<https://arxiv.org/abs/1912.01603>)

**Action chunk · 动作块.** Several predicted controls per query. The predicted horizon need not equal the executed prefix.　[Diffusion Policy](<https://roboticsproceedings.org/rss19/p026.html>)

**AR · Autoregressive · 自回归.** A prediction conditions on preceding context; a shared temporal trunk need not imply a single vocabulary or output head.　[GR-1](<https://arxiv.org/abs/2312.13139v2>)

**Diffusion · 扩散生成.** Fit a denoiser and sample by reversing corruption. The target can be imagery or action; UWM separately controls the two noise levels.　[Unified World Models](<https://arxiv.org/abs/2504.02792v3>)

**Ablation · 消融实验.** Remove one component or objective under comparable conditions. Removing future supervision is not the same experiment as skipping runtime generation.　[Fast-WAM](<https://arxiv.org/abs/2603.16666v2>)
