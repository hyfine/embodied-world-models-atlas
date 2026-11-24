// Branches are reading groups, not claims of technical descent.
export const layouts = {
  M: {
    branches: [
      ['模型生成训练经验', 'Model-generated experience', 'dyna world-models dreamer dreamerv3'],
      ['决策时搜索', 'Search at decision time', 'planet muzero tdmpc2'],
    ],
    flow: [
      ['经验 (o,a,r)', 'Experience (o,a,r)'],
      ['估计潜状态', 'Estimate latent state'],
      ['候选动作 → 预测回报', 'Actions → predicted returns'],
      ['择优执行 → 再观测', 'Act on best plan → observe'],
    ],
    note: ['图示为部署时规划。Dreamer 是另一支：训练时用预测轨迹更新 actor，部署时让 actor 直接给动作。', 'This path shows online planning. Dreamer takes the other branch: train an actor on imagined trajectories, then use the actor at deployment.'],
    focus: 'planet',
  },
  F: {
    branches: [
      ['视觉未来与干预', 'Future views & interventions', 'foresight genie diamond cosmos dreamtrue'],
      ['预测任务特征', 'Predict task features', 'vjepa2'],
      ['局部结果预测', 'Predict a task outcome', 'touch'],
    ],
    flow: [
      ['历史观测 + 候选动作', 'History + candidate action'],
      ['编码历史', 'Encode context'],
      ['预测未来特征', 'Predict future features'],
      ['与目标特征比较', 'Compare to goal features'],
    ],
    note: ['图示为动作条件特征预测。像素预测器换掉输出头；触觉结果预测只需事件概率；潜动作不必等于电机命令。', 'This is an action-conditioned feature predictor. Pixel models change the output; grasp-outcome prediction needs only an event probability. A latent action need not be a motor command.'],
    focus: 'vjepa2',
  },
  P: {
    branches: [
      ['反应式与运动控制', 'Reactive & motor control', 'brooks legged'],
      ['选择高层技能', 'Select an available skill', 'saycan'],
      ['量化动作输出', 'Quantized control output', 'rt1 rt2 openvla'],
      ['连续动作输出', 'Continuous control output', 'act diffusion-policy octo pi0 pi05 smolvla'],
    ],
    flow: [
      ['观测历史 (及任务)', 'Observations (+ task)'],
      ['构建条件特征', 'Encode conditioning'],
      ['生成动作序列', 'Generate action chunk'],
      ['执行前缀 → 更新观测', 'Execute prefix → observe'],
    ],
    note: ['图示为动作块策略；去噪对象是动作而非画面。RT-2 解码符号，SayCan 则选择已有技能。', 'The diagram follows a chunk policy: the denoising target is action, not imagery. RT-2 instead decodes tokens, while SayCan selects an available skill.'],
    focus: 'diffusion-policy',
  },
  J: {
    branches: [
      ['联合预测', 'Joint futures & actions', 'dreamzero spatialumi phoenix'],
      ['视觉计划与逆动力学', 'Visual plan + inverse dynamics', 'geact'],
    ],
    flow: [
      ['观测、指令、本体状态', 'Observation, instruction, state'],
      ['时序生成骨干', 'Temporal generative backbone'],
      ['并行读出：未来 ∥ 动作', 'Paired outputs: future ∥ action'],
      ['执行动作 → 接入真观测', 'Execute action → real feedback'],
    ],
    note: ['联合输出不是先生成视频再检索动作。GE-Act 2.0 是有意保留视觉计划 → 逆动力学接口的对照路线。', 'Joint output need not mean generating a video first and retrieving actions later. GE-Act 2.0 is a contrasting design with an explicit visual-plan → inverse-dynamics interface.'],
    focus: 'dreamzero',
  },
  E: {
    branches: [
      ['轨迹与数据集', 'Trajectories & datasets', 'oxe droid'],
      ['仿真平台', 'Simulation platform', 'habitat'],
      ['任务与基准', 'Tasks & benchmarks', 'r2r libero'],
      ['仿真与实机校准', 'Sim/real calibration', 'simpler'],
    ],
    flow: [
      ['任务与重置分布', 'Tasks & reset distribution'],
      ['固定策略 / 控制接口', 'Fix policy & control interface'],
      ['仿真 ∥ 真机试验', 'Sim ∥ physical trials'],
      ['比较成功率与排序', 'Compare rates & rankings'],
    ],
    note: ['这里是评测管线，不是神经网络。数据集提供轨迹，模拟器提供交互，实机对照检验代理指标。三者不能互换。', 'This is an evaluation pipeline, not a neural network. A dataset supplies trajectories, a simulator supplies interaction, and real trials calibrate a proxy. These roles are not interchangeable.'],
    focus: 'simpler',
  },
  S: {
    branches: [
      ['从动作接口分类', 'Read by action interface', 'survey-vla'],
      ['从世界表示分类', 'Read by representation', 'survey-wm'],
    ],
    flow: [
      ['界定研究问题', 'Define research question'],
      ['选择分类轴', 'Choose comparison axes'],
      ['用一手研究填表', 'Map primary evidence'],
      ['保留例外与缺口', 'Expose exceptions & gaps'],
    ],
    note: ['这是综述的阅读流程，不是可执行模型。沿功能、时间、空间轴复核同一系统，可避免把架构名误作性能等级。', 'This is a survey-reading workflow, not an executable model. Reclassify one system by function, time and space rather than treating an architecture label as a capability score.'],
    focus: 'survey-wm',
  },
};
