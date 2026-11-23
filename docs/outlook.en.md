# Outlook: what would change our minds?

[简体中文](outlook.zh-CN.md) · [Field guide](guide.en.md) · [Catalog](../CATALOG.md)

**As of 2026-11-23; horizon: 12–24 months.** These are editorial judgments, not a consensus or leaderboard. High/medium denotes qualitative confidence in a direction, not a probability of success.

### 1 · Evaluation shifts from looking right to responding correctly to changed actions | High

**Evidence.** [SIMPLER](https://arxiv.org/abs/2405.05941) used about 1,500 episodes across two embodiments in paired simulation/physical evaluations of policy rankings. This supports correlation in the tested settings, not “simulation success = real success.” [DreamTrue](https://arxiv.org/abs/2610.12468) reports human-rated interaction defects falling from 48.12% to 6.25% on its AgiBot evaluation after feedback-guided post-training. This is an **author-reported video defect rate**, not a robot failure rate.

**Call.** If a model screens policies, the costliest mistake can be a false positive: the imagined grasp works but the real object slips. Action following, false positives and calibration to real-world rankings will be more informative than fidelity alone. **Disconfirmation:** in blind tests on held-out contact tasks, operators and robots, a single fidelity measure reliably predicts real rankings and counterfactual tests add no information.

### 2 · Video priors need aligned action evidence | High

**Evidence.** The latent actions in [Genie](https://arxiv.org/abs/2402.15391) have no inherent units of meters, radians or gripper opening. [V-JEPA 2](https://arxiv.org/abs/2506.09985) starts with large-scale video, then trains an action-conditioned predictor on about 62 hours of DROID robot interaction. “Unlabeled” does not mean “without motor commands”; zero-shot in a new room does not mean zero robot data.

**Call.** Aligned camera/action sequences, failed attempts and unexpected contact may be a better marginal investment than more generic video. **Test:** hold the encoder, budget and embodiment fixed; add in-distribution video to one arm and time-aligned interaction to the other. Measure sensitivity to actions and closed-loop success on held-out objects. Downgrade the call if action-free training consistently matches the grounded arm across new embodiments.

### 3 · World-action models become an option, not a universal replacement for VLAs | Medium

**Evidence.** [DreamZero](https://arxiv.org/abs/2602.15922) jointly predicts videos and actions. [GE-Act 2.0](https://arxiv.org/abs/2609.05588) separates a visual plan from inverse dynamics. [π0](https://arxiv.org/abs/2410.24164) generates action chunks directly. They all emit actions, but pay different inference costs and impose different future constraints.

**Call.** Ask whether a predicted future actually changes an action. It may help in detours and recovery, whereas fast repetitive moves can favor direct policies. **Disconfirmation:** removing future prediction on matched trajectories, hardware and action rates changes neither recovery after perturbation nor data efficiency. Ablate future prediction during training separately from future generation during inference.

### 4 · Geometry and contact complement rather than replace RGB | Medium

**Evidence.** [Spatial-UMI-Dream](https://arxiv.org/abs/2611.07229) pairs metric depth with RGB and actions. [Phoenix](https://arxiv.org/abs/2611.24938) models scene structure and uses benchmark-specific post-training. Earlier [visuotactile grasping](https://proceedings.mlr.press/v78/calandra17a.html) exposed cues hard to see in RGB. These are not head-to-head results.

**Call.** Value depends on the failure: depth can resolve scale without detecting slip; touch says little before contact. **Disconfirmation:** with matched compute and collection budgets, and independent holdouts for camera poses and contact perturbations, an RGB-only system consistently closes the gap. Account for calibration, missing sensors and transfer costs.

## Request an experimental receipt

| Required field | Why it changes the conclusion |
|---|---|
| Prediction target, action units, coordinate frame, control rate | A good next frame does not guarantee a valid command before the deadline |
| Training data and splits by episode, site and robot | Adjacent frames on opposite sides of a split turn memorization into apparent generalization |
| Offline video, learned rollout, independent simulator or physical test | Using the same biased model for both practice and evaluation can reward its own errors |
| Denominator, reset rules, interventions, completion vs progress | Half-completing a task is not succeeding on half the episodes; selecting successful videos changes the denominator |
| Latency distribution, executed prefix and recovery | Long chunks save compute but may prevent timely response to a slipping object |
| Baseline and uncertainty | Match data and compute; report trials, per-task outcomes and intervals rather than subtracting scores across papers |

**Decision rule:** start with PushT/action chunks to learn policies, use paired same-start/different-action tests to study controllable prediction, and calibrate simulation rankings against real trials before replacing hardware evaluation. A generated success clip is not an acceptance test.
