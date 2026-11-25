import assert from 'node:assert/strict';

// Labels describe the illustrated system(s), not the entire research domain.
export const architecturePlacement={
  'WM-1':['F → M','动力学为搜索或想象学习供样本','Dynamics supplies rollouts for search or policy learning.'],
  'WM-2':['F → M','未来特征由目标条件规划器读取','A goal-conditioned planner reads predicted features.'],
  'WM-3':['F','动作条件生成器返回未来画面，不输出机器人命令','The interactive generator returns frames, not robot commands.'],
  'WM-4':['F','用持久几何生成新视角，不自动解决接触控制','Persistent geometry supports new views, not necessarily contact control.'],
  'WM-5':['F / M','MagicDrive 生成街景；Drive-WM 用预测为候选轨迹评分','MagicDrive generates scenes; Drive-WM scores candidate trajectories.'],
  'WM-6':['J','级联传递子目标；联合模型在训练中耦合未来与动作','Cascades pass subgoals; joint models couple futures and actions in training.'],
  'EAI-1':['P','高层模块选技能或规定约束，另有低层执行器','The high-level module selects skills or specifies constraints for an executor.'],
  'EAI-2':['P','从视觉与指令生成动作，不以未来图像作为必要输出','Vision and instructions condition actions; future images are not required outputs.'],
  'EAI-3':['P / E','区分动作策略与采集示范的硬件接口','Distinguish the action policy from the demonstration-collection interface.'],
  'EAI-4':['E / P','轨迹是训练资源；消费轨迹的模型才是策略','Trajectories supply data; the trained model is the policy.'],
  'EAI-5':['P','动作控制还受本体动态和控制周期约束','Body dynamics and control deadlines constrain the policy.'],
  'EAI-6':['P / E','语义地图支持导航；机器人仍需执行移动与抓放','Maps support navigation; the robot still executes motion and manipulation.'],
  'EAI-7':['E','区分提供状态转移的模拟器与定义成功的基准','Distinguish the simulator supplying transitions from the benchmark defining success.'],
  'EAI-8':['P / E','真实或模拟经验进入策略更新，不必联合预测视频','Experience feeds policy updates; joint video prediction is not required.'],
  SURVEY:['S','梳理设计与验证主张，不产生动作','Organizes design and evidence, not control commands.'],
};
// Each substantive block has primary references or a locatable survey section.
// History rows compare interfaces, not unverified paper-to-paper descent.
const history=[
  ['1991','行动是否总要先建模？','Must a robot always model before acting?',
    'Brooks 从环境反馈直接组织行为；Dyna 用真实经验学习模型，再用模拟转移改善决策。二者提出的是不同设计选择，不是新路线淘汰旧路线。','Brooks builds behavior from sensor–action feedback; Dyna learns from real transitions and reuses simulated experience for decisions. These are alternative designs, not successive winners.',['brooks','dyna']],
  ['2016–2020','预测第一次怎样进入这次决策？','How can a forecast change this decision?',
    'Visual Foresight 比较不同推法下的像素运动；PlaNet 改在潜状态里搜索；Dreamer 则在想象轨迹上训练策略，部署时不必重复搜索。这是“预测什么”和“什么时候用预测”的两次分叉。','Visual Foresight compares pixel motion under candidate pushes. PlaNet searches in latent state; Dreamer trains an actor on imagined trajectories instead of repeating the search at execution. What is predicted and when it is consumed are separate choices.',['foresight','planet','dreamer']],
  ['2022–2024','另一条路：让语言和示范直接教机器人行动','A parallel route: learn actions from language and demonstrations',
    'RT-2 把动作写成符号；Diffusion Policy 生成连续动作序列；OpenVLA 与 π0 分别展示离散与连续的视觉语言动作接口。无需在每一步生成未来视频，也能形成闭环。','RT-2 represents controls as tokens; Diffusion Policy generates continuous sequences. OpenVLA and π0 illustrate discrete and continuous vision-language-action interfaces. A policy can observe again after acting without generating a future video.',['rt2','diffusion-policy','openvla','pi0']],
  ['2023','两条线已开始相遇，而不只是到 2026 年才相遇','The paths were already meeting in 2023',
    '1 月 31 日首次提交的 UniPi 先生成文字引导的视觉计划，再由逆动力学提取动作；SuSIE 改用间歇刷新的子目标图与目标条件策略。12 月 20 日首次提交的 GR-1 在共享时序上下文中预测未来图像和动作。这些是后来 WAM 分类的早期实例，不是对首创权或命名日期的断言。','UniPi (first submitted 31 January) converts a text-guided video plan into controls using inverse dynamics; SuSIE connects refreshed subgoal images to a goal-conditioned policy. GR-1 (first submitted 20 December) predicts future images and actions from shared temporal context. These are early examples in the later WAM taxonomy, not a claim of coinage or priority.',['unipi','susie','gr1','wang']],
  ['2025–2026','从共享监督到可切换的执行路径','From shared supervision to different execution paths',
    'UWM 通过视频与动作各自的噪声时间步切换预测任务；DreamZero 在 2026 年 2 月已明确自称 WAM；Fast-WAM 保留视频训练目标，但执行时省去未来视频采样。Wang 等于 5 月 12 日发布综述，整理级联和联合两类路径。这是系统化命名的文献坐标，不是术语首创权或机制发明日。','UWM changes the prediction task through separate noise levels for video and action. DreamZero explicitly called itself a WAM in February 2026; Fast-WAM retained video supervision without sampling future video at execution. Wang et al. published their synthesis of cascaded and joint approaches on 12 May. This dates a taxonomy, not the coinage of the term or the invention of its mechanisms.',['uwm','dreamzero','fastwam','wang']],
];
const routes=[
  ['F','预测：比较的究竟是哪种未来？','Prediction: what future is being compared?',
    '从图像运动读到可交互画面，再到目标特征。读 Visual Foresight、Genie、V-JEPA 2-AC 时分别记下动作条件、预测量和执行者；潜动作按钮并非机械臂命令。','Compare image motion, interactive frames and goal features. For Visual Foresight, Genie and V-JEPA 2-AC write down the action condition, prediction and executor. A latent game control is not a calibrated arm command.',['foresight','genie','vjepa2'],'wm-2'],
  ['M','规划与学习：何时为想象付费？','Planning and learning: when do you pay for imagination?',
    '先对照 PlaNet 的候选序列搜索与 Dreamer 的想象 actor–critic：从“在线迭代选动作”变成“离线于当前决策训练一个 actor”。再看 DreamerV3 如何用归一化等稳定化手段跨任务沿用同一配置。比较实测回报、收集的交互数及决策时延；不要把模拟控制回报外推到家务操作。','Compare PlaNet’s candidate-sequence search with Dreamer’s imagined actor–critic: repeated search at each decision gives way to training an actor on model rollouts. Then examine how DreamerV3 stabilizes training across tasks with normalization and a common configuration. Compare measured return, interactions and decision latency; simulated control returns are not household manipulation results.',['planet','dreamer','dreamerv3'],'wm-1'],
  ['P','策略：动作如何被表示和执行？','Policies: how is an action encoded and executed?',
    '原版 OpenVLA 每步解码动作符号；π0 生成连续动作块。Diffusion Policy 同样可输出动作块，却不要求语言或未来视频。动作编码、输出跨度和是否使用世界模型是三件事。','Base OpenVLA decodes action tokens per step; π0 generates continuous chunks. Diffusion Policy also generates chunks without requiring language or future video. Action encoding, output horizon and world modeling are separate dimensions.',['openvla','pi0','diffusion-policy'],'eai-2'],
  ['J','世界—动作耦合：未来怎样进入控制？','World-action coupling: how does foresight enter control?',
    '先对照 UniPi 与 GR-1 的中间接口，再拆 UWM、DreamZero、Fast-WAM 的训练图与部署图。级联可以传子目标或潜特征；联合训练也不规定部署时必须解码全部模态。','Compare the interfaces in UniPi and GR-1; then draw separate training and deployment graphs for UWM, DreamZero and Fast-WAM. A cascade can pass subgoals or features. Joint training need not decode every modality during control.',['unipi','gr1','uwm','dreamzero','fastwam','wang'],'wm-6'],
];
const frontier=[
  ['执行成本','Cost at execution',
    'Fast-WAM 的受控变体中，去掉视频共训与跳过测试时视频采样不是同一种消融。','Fast-WAM compares removing video co-training with skipping test-time video sampling; these ablations change different things.',
    '预计更多工作比较“训练时学未来、部署时按需计算”。若在相同硬件与截止时间下，显式采样在困难恢复任务上持续更好，就应当保留它。','Expect more comparisons of training with foresight and computing it only when useful. Keep explicit sampling where it consistently improves recovery at matched hardware and deadlines.',['fastwam','dreamzero']],
  ['语言、视频与动作的对齐','Language–video–action alignment',
    '2026-11 的 SWAM 分开研究视频语言监督与动作监督，并在固定训练预算下比较混合数据。真实任务范围有限，不能从汇集小时数推出普适规模律。','In November 2026 SWAM studies language–video versus action supervision and compares mixtures under fixed training budgets. Its physical-task scope does not turn total hours into a universal scaling law.',
    '预测：对齐质量可能比原始时长更能解释迁移；反证是等预算、等本体条件下，弱对齐数据也能稳定复现收益。','Hypothesis: alignment may explain transfer better than raw hours. It weakens if poorly aligned data reliably gives the same gains at matched budget and embodiment.',['swam','oxe']],
  ['从场景预测到身体响应','From scene changes to body response',
    'ζ0（2026-11-22 预印本）预测未来视觉特征和关节轨迹，作者在两个 VLA 基座上报告提升。它展示了非像素未来的一条路径，而非 WAM 已覆盖所有接触物理。','The ζ0 preprint (22 Nov 2026) predicts visual features and joint trajectories and reports gains on two VLA bases. This is one non-pixel future, not coverage of arbitrary contact physics.',
    '预测：当遮挡或滑移决定成败时，本体感知或触觉未来更值得建模。对照必须匹配观测、策略容量和时延；如果只增加传感器就能得到相同收益，不能把因果归给预测。','Body or contact futures may matter where occlusion or slip determines success. Match observations, capacity and latency; if merely adding the sensor yields the same gain, credit cannot go to prediction.',['zeta0','touch','yao']],
];
const terms=[
  ['WM','World Model · 世界模型','给定当前状态及可能的干预，预测后续状态；有些模型只预测决策需要的量。','Predicts a subsequent state or decision-relevant quantity, possibly conditioned on an intervention.','yao'],
  ['VLA','Vision–Language–Action','视觉与指令进入系统，动作从系统输出；不单凭这个接口判断模型内部有没有世界知识。','Vision and language enter, actions leave. This interface alone does not tell us what physical knowledge is represented.','openvla'],
  ['WAM','World Action Model · 世界动作模型','未来状态的建模与动作生成耦合；是系统层定义，不要求一个解码器或视频输出。','Couples future-state modeling with action generation at system level; neither a single decoder nor video output is required.','wang'],
  ['MPC','Model Predictive Control · 模型预测控制','用模型比较备选动作，执行首步或前缀，用新观测再次规划。','Compare candidate controls in a model, execute a prefix, then replan from a measurement.','planet'],
  ['IDM','Inverse Dynamics Model · 逆动力学','根据当前与目标状态变化推断可能动作。同一视觉变化未必唯一确定动作。','Infers a possible control from a state change. A pair of images need not uniquely determine the control.','unipi'],
  ['JEPA','Joint-Embedding Predictive Architecture','预测表征而不是重建像素；V-JEPA 2 的视频预训练与 2-AC 的动作条件控制接口要分开。','Predicts representations rather than reconstructing pixels. Distinguish V-JEPA 2 pretraining from the 2-AC action-conditioned interface.','vjepa2'],
  ['RL','Reinforcement Learning · 强化学习','利用奖励或回报改善策略；真实环境和模型想象可提供不同来源的经验。','Improves a policy using rewards or returns; experience may come from a real environment or model imagination.','dreamer'],
  ['Action chunk','动作块','一次提出一段动作，不等于整段盲目执行；要区分预测长度和执行前缀。','Several predicted controls per query. The predicted horizon need not equal the executed prefix.','diffusion-policy'],
  ['AR','Autoregressive · 自回归','后一个预测条件于已有上下文；可用共享时序主干、不同输出头，不等于只有一个动作词表。','A prediction conditions on preceding context; a shared temporal trunk need not imply a single vocabulary or output head.','gr1'],
  ['Diffusion','扩散生成','训练去噪网络，再以多步去噪采样。去噪对象可以是视频，也可以是动作；UWM 给两者各自的噪声控制。','Fit a denoiser and sample by reversing corruption. The target can be imagery or action; UWM separately controls the two noise levels.','uwm'],
  ['Ablation','消融实验','固定可比条件，移除一个组件或训练目标。去掉未来监督和仅跳过执行时视频生成是不同的对照。','Remove one component or objective under comparable conditions. Removing future supervision is not the same experiment as skipping runtime generation.','fastwam'],
];

export function overviewArt(en) {
  const t=(a,b)=>en?b:a;
  const text=(x,y,s,size=18,color='#e9f2de')=>`<text x="${x}" y="${y}" fill="${color}" font-size="${size}">${s}</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 374" role="img" aria-labelledby="t d">
<title id="t">${t('预测与行动的汇合','Where prediction meets action')}</title><desc id="d">${t('F 预测，M 用模型做决策，P 出动作。J 把未来与动作耦合。执行结果还须独立验证。','F predicts, M uses predictions for decisions, P acts. J couples foresight to action. Outcomes still need independent evidence.')}</desc>
<defs><pattern id="g" width="21" height="21" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.8" fill="#577871"/></pattern><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0l10 5-10 5z" fill="#8fd5c0"/></marker></defs>
<rect width="900" height="374" rx="15" fill="#133436"/><rect width="900" height="374" rx="15" fill="url(#g)"/>
<g font-family="system-ui,sans-serif">${text(25,31,t('系统接口图　/　概念连接，不表示引用关系','SYSTEM INTERFACES   /   conceptual connections, not ancestry'),14,'#b5d7c6')}
<g fill="#204643" stroke="#749988"><rect x="26" y="55" width="243" height="62" rx="8"/><rect x="26" y="214" width="243" height="62" rx="8"/><rect x="337" y="54" width="260" height="52" rx="8"/><rect x="337" y="123" width="260" height="100" rx="11" fill="#2f4a43" stroke="#ffcc87"/><rect x="670" y="131" width="202" height="78" rx="8"/></g>
${text(42,80,t('F　预测未来','F　Predict futures'),20,'#97dfde')}${text(42,103,t('画面、特征、状态或回报','Pixels, features, state or reward'),14)}
${text(42,240,t('P　产生动作','P　Generate actions'),20,'#ffcc87')}${text(42,263,t('示范、技能、语言条件策略','Skills, imitation, language policies'),14)}
${text(350,77,t('M　用预测改善决策','M　Decide with a model'),18,'#97dfde')}${text(350,97,t('规划器，或在想象中训练策略','Planner or imagination-trained policy'),13)}
${text(355,153,'J　WAM',25,'#ffcc87')}${text(355,180,t('级联：未来 → 动作','Cascade: future → action'),17)}${text(355,205,t('联合：未来 ∥ 动作','Joint: future ∥ action'),17)}
${text(685,163,t('执行与再观测','Act and observe'),20)}${text(685,188,t('真实反馈 ≠ 想象','Feedback ≠ imagination'),14,'#a9d2c0')}
<g fill="none" stroke="#8fd5c0" stroke-width="2.6" marker-end="url(#arr)"><path d="M269 82H332"/><path d="M597 80H770V126"/><path d="M269 97Q309 97 332 149"/><path d="M269 235Q308 235 332 199"/><path d="M598 170h66"/><path d="M269 250H770V214"/></g>
${text(342,270,t('直接策略：不必解码未来','Direct policy: no future decoding required'),14,'#b6c9ba')}
<path d="M25 294H875" stroke="#66847d"/>
${text(26,322,t('E　数据与评测：核对实测后果','E　Data &amp; tests: measure outcomes'),16,'#d4d6f6')}${text(478,322,t('S　综述：解释框架，不是控制器','S　Surveys: evidence lenses, not controllers'),16,'#e4cf96')}
${text(26,350,t('反馈问题：换一种动作，实测会变吗？预测是否改进决策？','Feedback test: does an intervention change the outcome, and does foresight improve the decision?'),14,'#b6c9ba')}
</g></svg>\n`;
}

export function convergence(works,en,format) {
  const md=format==='md',t=(a,b)=>en?b:a;
  const refs=new Map(works.map(w=>[w.id,[w.name,w.paper]]));
  refs.set('wang',['Wang et al. · Fig. 3, §§2–4','https://arxiv.org/abs/2605.12090v1']);
  refs.set('yao',['Yao et al. · Figs. 2, 5; Table 4','https://arxiv.org/abs/2609.16697v1']);
  const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
  const a=(s,url)=>md?`[${s}](<${url}>)`:`<a href="${escape(url)}">${escape(s)}</a>`;
  const citations=ids=>ids.map(id=>{assert(refs.has(id),`Missing convergence source: ${id}`);return a(...refs.get(id));}).join(' · ');
  const heading=(id,s)=>md?`<a id="${id}"></a>\n\n## ${s}`:`<h2 id="${id}">${s}</h2>`;
  const block=(title,s,ids)=>md?`**${title}.** ${s}　${citations(ids)}`:`<article class="contrast"><h3>${title}</h3><p>${s}</p><small>${citations(ids)}</small></article>`;
  const base=md?'https://hyfine.github.io/embodied-world-models-atlas/':'';
  const runtime=base+t('runtime.zh.html','runtime.html');
  const out=[];
  if(md)out.push(`# ${t('从世界模型到世界动作模型','From world models to world action models')}`,a(t('English','简体中文'),`convergence.${en?'zh-CN':'en'}.md`));
  out.push(heading('origins',t('WAM 从哪里来？看机制的出现，而不是找一个生日','Where did WAM come from? Date the mechanisms, not a birthday')),
    block(t('阅读约定','Reading convention'),t('本站沿用 Wang 等的较宽定义：要有可度量的未来状态目标，还要与动作生成耦合；级联与联合都可能满足。按 Yao 等的评测视角，架构标签只能说明系统怎样工作，不能证明预测改变了实际结果。下列年份按早期公开记录；并列不表示继承。','We use Wang et al.’s broad definition: a measurable future-state target coupled to action generation, whether cascaded or joint. Under Yao et al.’s evaluation lens, architecture says how a system works, not whether prediction improved a real outcome. Dates mark early public records; juxtaposition is not descent.'),['wang','yao']));
  for(const [date,zh,eng,cz,ce,ids] of history)out.push(block(`${date} · ${t(zh,eng)}`,t(cz,ce),ids));
  out.push(block(t('把“统一”写成可检查的接口','Make “unified” an inspectable interface'),t('记 o 为观测、g 为目标、a 为动作、f 为可能的未来。策略回答 p(a | o,g)，前向模型回答 p(f | o,a)。在 WAM 口径下可以建模 p(f,a | o,g)：级联先取 f，再根据 o、g、f 产生 a；联合模型则让世界与动作目标共享学习过程。概率分解本身不是工程架构，更不是物理因果：环境里仍然是动作改变状态。只在外部用模拟器训练或给策略评分，不足以把被测策略叫 WAM。','Let o be an observation, g a goal, a an action and f a possible future. A policy models p(a | o,g); a forward model predicts p(f | o,a). A WAM can model p(f,a | o,g): a cascade first proposes f and then produces a conditioned on o, g and f; a joint system learns coupled world and action targets. The probability factorization alone is not an implementation or a causal assertion: actions still change the physical environment. An external simulator used only for training or scoring does not turn the evaluated policy into a WAM.'),['wang','unipi','uwm','yao']));
  out.push(heading('research-routes',t('研究者路线：沿同一接口逐篇比较','Research routes: follow one interface across papers')));
  for(const [k,zh,eng,cz,ce,ids,section] of routes)out.push(block(`${k} · ${t(zh,eng)}`,t(cz,ce)+' '+a(t('运行图 →','Runtime diagram →'),`${runtime}#${section}`),ids));
  out.push(block(t('E / S · 支撑层，不是另外两种策略','E / S · Support layers, not two more policies'),t('E 区分数据、环境、任务判据和真机校准。S 提供阅读与评测视角：从相同初态换动作，再问预测在等预算下是否改变选择。漂亮视频、动作遵从和决策收益不能互相代证。','E separates data, environments, task oracles and real-world calibration. S supplies ways to read and test: change the action from a matched start, then ask whether prediction changes decisions at equal budget. Fidelity, action following and decision utility need separate evidence.'),['oxe','habitat','libero','simpler','yao']));
  const reads=md?`deep-dives.${en?'en':'zh-CN'}.md`:`https://github.com/hyfine/embodied-world-models-atlas/blob/main/docs/deep-dives.${en?'en':'zh-CN'}.md`;
  out.push(t('继续到固定版本源码：','Continue to pinned implementation readings: ')+[['PlaNet','planet'],['V-JEPA 2-AC','vjepa2'],['Diffusion Policy','diffusion-policy'],['DreamZero','dreamzero'],['SIMPLER','simpler']].map(([name,id])=>a(name,`${reads}#case-${id}`)).join(' · '));
  out.push(heading('frontier',t('前沿观察 · 截至 2026-11-25','Frontier watch · evidence through 2026-11-25')));
  for(const [zh,eng,cz,ce,jz,je,ids] of frontier)out.push(block(t(zh,eng),`${t('已报告：','Reported: ')}${t(cz,ce)} ${t('本站判断：','Atlas judgment: ')}${t(jz,je)}`,ids));
  out.push(heading('terms',t('术语速读：按系统职责记，不按字母背','Terms: learn the job, not just the initials')));
  for(const [abbr,full,cz,ce,id] of terms)out.push(block(`${abbr} · ${full}`,t(cz,ce),[id]));
  return out.join(md?'\n\n':'\n')+'\n';
}
