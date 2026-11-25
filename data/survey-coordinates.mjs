// Coordinate the illustrated interface, not every component or release in a series.
// Multiple values in a field are intentional. Unknown is not the same as N/A.
export const axes = {
  role: {name:['决策角色（可多选归属）','Decision roles (overlap allowed)'], values:{
    M:['想象或规划','Imagine / plan'], F:['预测状态或结果','Predict state / outcome'], P:['选择技能或动作','Select skill / act'], J:['耦合未来与动作','Couple future and action'], E:['资源与评测','Resources / evaluation'], S:['研究综述','Survey synthesis']}},
  target: {name:['世界侧预测量','World-side target'], values:{
    state:['状态或潜特征','State / latent features'],value:['奖励、价值或结果','Reward, value or outcome'],image:['画面','Imagery'],geometry:['几何量','Geometry'],none:['所示路径无显式未来','No explicit future in this path'],na:['不适用','Not applicable']}},
  form:{name:['动作或控制信号表示','Action / control representation'],values:{
    token:['离散化动作符号','Quantized action tokens'],continuous:['连续量','Continuous commands'],latent:['潜动作码','Latent action codes'],skill:['技能或行为选择','Skill / behavior selection'],game:['离散游戏动作','Discrete game inputs'],varies:['随任务或本体变化','Task / body specific'],unspecified:['未细标','Not indexed'],na:['无此执行接口','No such action interface']}},
  horizon:{name:['动作输出跨度（非预测视野）','Action output span (not forecast horizon)'],values:{
    step:['单步命令','Single command'],chunk:['多步动作块','Action chunk'],skill:['技能级','Skill-level choice'],unspecified:['未细标','Not indexed'],na:['无此动作输出','No such action output']}},
  test:{name:['所引证据场景（非等级）','Evidence setting (not a grade)'],values:{
    offline:['离线数据或视频','Offline data / video'],sim:['仿真或游戏','Simulation / game'],real:['实物试验','Physical trials'],concept:['概念或设计论证','Conceptual argument'],collection:['数据采集','Data collection'],review:['二手综合','Literature synthesis']}},
};

// roles | world target | signal format | output span | selected evidence settings
export const coordinates = {
  dyna:'M|state value|varies|unspecified|sim',
  'world-models':'M F P|state|varies|step|sim',
  planet:'M F|state value|continuous|step|sim',
  dreamer:'M F P|state value|continuous|step|sim',
  muzero:'M|value|game|step|sim',
  dreamerv3:'M F P|state value|varies|step|sim',
  tdmpc2:'M F|state value|continuous|step|sim',
  genie:'F|image|latent|na|offline sim',
  diamond:'F M|image|game|step|sim',
  vjepa2:'F M|state|continuous|step|offline real',
  cosmos:'F|image|na|na|offline',
  r2r:'E|na|na|na|sim',
  habitat:'E|na|na|na|sim',
  legged:'P|none|continuous|step|sim real',
  saycan:'P|value|skill|skill|real',
  rt1:'P|none|token|step|real',
  rt2:'P|none|token|step|real',
  act:'P|none|continuous|chunk|real',
  'diffusion-policy':'P|none|continuous|chunk|sim real',
  octo:'P|none|continuous|chunk|real',
  openvla:'P|none|token|step|real',
  pi0:'P|none|continuous|chunk|real',
  pi05:'P|none|continuous|chunk|real',
  smolvla:'P|none|continuous|chunk|sim real',
  oxe:'E P|na|varies|unspecified|collection real',
  libero:'E|na|na|na|sim',
  droid:'E|na|na|na|collection real',
  simpler:'E|na|na|na|sim real',
  dreamzero:'J F P|image|continuous|chunk|real',
  geact:'J F P|state|continuous|unspecified|real',
  dreamtrue:'F|image|continuous|na|offline',
  spatialumi:'J F P|image geometry|continuous|chunk|sim real',
  phoenix:'J F P|state|continuous|unspecified|sim real',
  'survey-vla':'S|na|na|na|review',
  'survey-wm':'S|na|na|na|review',
  brooks:'P|none|varies|unspecified|concept real',
  foresight:'F M|image|continuous|step|real',
  touch:'F|value|na|na|real',
  unipi:'J F P|image|varies|unspecified|sim real',
  susie:'J F P|image|continuous|chunk|sim real',
  gr1:'J F P|image|continuous|unspecified|sim real',
  uwm:'J F P|image|continuous|chunk|sim real',
  fastwam:'J F P|image|continuous|chunk|sim real',
  swam:'J F P|image|continuous|unspecified|sim real',
  zeta0:'J F P|state|continuous|unspecified|sim real',
};
// These comparisons apply a survey's question. They are not its own labels or an assertion of citation.
export const surveyLenses = [
  {author:'Duan',rev:'2103.04918v8',where:'Fig. 6 · p.11', axis:'role', compare:['habitat','r2r'],direction:'eai-7',
    question:['环境、任务与数据，各自提供什么？','What does the platform, task or dataset supply?'],
    take:['Habitat 提供可交互环境；R2R 提供路线、指令与任务。它们都支持导航研究，都不是导航控制器。','Habitat supplies an interactive environment; R2R supplies routes, instructions and a task. Neither is the navigation controller.']},
  {author:'Ma',rev:'2405.14093v8',where:'Fig. 3 · p.3; Table III · p.8',axis:'form',compare:['saycan','openvla'],direction:'eai-1',
    question:['语言模块输出的是技能，还是可执行动作？','Does the language interface emit a skill or a motor command?'],
    take:['SayCan 从可行技能中选择；原版 OpenVLA 逐坐标输出量化动作。都有指令输入，不能因此归为同一种动作头。','SayCan selects a feasible skill; base OpenVLA emits quantized action coordinates. An instruction input does not determine the action head.']},
  {author:'Liu',rev:'2407.06886v8',where:'Fig. 9 · p.11; §VII-B.1 · p.14',axis:'test',compare:['droid','diffusion-policy'],direction:'eai-3',
    question:['记录身体活动与让身体行动，有什么区别？','What separates recording interaction from executing a policy?'],
    take:['DROID 提供实景示范；Diffusion Policy 消费示范生成动作。采集过真机数据和实机验证过策略是不同的主张。','DROID supplies demonstrations; Diffusion Policy learns actions from demonstrations. Physical data collection and physical policy evaluation are different claims.']},
  {author:'Ding',rev:'2411.14499v4',where:'Fig. 2 · p.6; §5.5 · pp.28–29',axis:'role',compare:['genie','diamond'],direction:'wm-3',
    question:['生成未来是为了交互，还是为了训练另一个策略？','Is generation used for interaction or to train another policy?'],
    take:['Genie 让玩家改变生成帧；DIAMOND 还用生成的 Atari 经验训练策略。看起来都是视频，消费者不同。','Genie lets the player steer generated frames. DIAMOND also uses generated Atari experience to train a policy. Similar outputs have different consumers.']},
  {author:'Zhong',rev:'2507.01925v1',where:'Table 6 · p.26; Table 8 · pp.33–34',axis:'horizon',compare:['openvla','pi0'],direction:'eai-2',
    question:['传递什么格式？一次传几个时间步？','What is the action format, and how many time steps does it encode?'],
    take:['原版 OpenVLA 给单步离散符号，π0 给连续动作块。这不是二分法：FAST 也能把动作块编码成离散序列（工作簿主表 163）。','Base OpenVLA uses tokens for one step; π0 emits a continuous chunk. These are not opposites: FAST can tokenize a whole action chunk (ledger main-163).']},
  {author:'Li',rev:'2510.16732v3',where:'Fig. 1 · p.3; Tables V–VIII · pp.15–16',axis:'target',compare:['planet','vjepa2'],direction:'wm-2',
    question:['表示方式改变了，用于决策的角色一定改变吗？','Can two different representations serve the same decision role?'],
    take:['两者都搜索动作。PlaNet 预测回报，2-AC 则比较未来与目标的特征距离。角色有交集，评分信号不能混为一谈。','Both search over actions. PlaNet scores predicted reward; 2-AC scores future-to-goal feature distance. Shared use does not imply an identical objective.']},
  {author:'Wang',rev:'2605.12090v1',where:'Fig. 3 · p.5; §4 · pp.14–26',axis:'role',compare:['geact','dreamzero'],direction:'wm-6',
    question:['动作来自预测的子目标，还是与未来一起生成？','Is an action derived from a predicted goal or generated with the future?'],
    take:['GE-Act 2.0 用视觉计划连接逆动力学；DreamZero 联合生成视觉未来与动作。都是 J，不是一条相同的数据流。','GE-Act 2.0 passes a visual plan to inverse dynamics. DreamZero generates visual futures with actions. Both fit J, but have different signal paths.']},
  {author:'Zidan',rev:'2606.00133v1',where:'§§3–6 · p.7; §§3.4.2, 4.1 · pp.27, 37',axis:'role',compare:['planet','dreamer'],direction:'wm-1',
    question:['想象发生在训练时，还是选动作时？','Is the imagined rollout consumed at training time or decision time?'],
    take:['PlaNet 在决策时筛选候选动作；Dreamer 用想象轨迹训练 actor。两者都学习动力学，却以不同方式付出计算成本。','PlaNet selects candidates at decision time; Dreamer trains an actor on imagined trajectories. Both learn dynamics but pay the computational cost differently.']},
  {author:'Yao',rev:'2609.16697v1',where:'Table 2 · p.12; Table 4 · p.32',axis:'test',compare:['dreamtrue','simpler'],direction:'eai-7',
    question:['实验验证了画面、干预后果，还是决策收益？','Does the test establish plausibility, intervention fidelity or decision utility?'],
    take:['DreamTrue 检查预测视频是否遵从动作；SIMPLER 用成对仿真与真机结果校准策略评测。一个不能代替另一个，也不构成给论文打分的阶梯。','DreamTrue tests action following in video; SIMPLER calibrates policy evaluation against physical trials. Neither test substitutes for the other or assigns a universal capability grade.']},
];

export function facetsOf(id) {
  const fields=coordinates[id].split('|');
  if(fields.length!==Object.keys(axes).length)throw new Error(`Invalid coordinate arity: ${id}`);
  return Object.fromEntries(Object.keys(axes).map((axis,i)=>[axis,fields[i].split(' ')]));
}
