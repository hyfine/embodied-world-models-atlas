// A node's second label names the signal or state at its interface.
// Links are in reading order, not a claim that concurrent branches run serially.
export const schematics = {
  'P': {
    prep:'用示范拟合观测条件下的动作去噪网络；学习目标不是未来画面。|Fit an observation-conditioned action denoiser on demonstrations, not future frames.',
    nodes:[['obs',0,0,'in','观测窗口|Observation window','近期图像与状态|Recent images and state'],['enc',1,0,'op','观测编码器|Observation encoder','视觉条件|Visual condition'],['unet',2,0,'op','动作去噪网络|Action denoiser','噪声预测|Noise prediction'],['robot',0,1,'out','执行器|Robot','执行动作前缀|Execute a prefix'],['slice',1,1,'op','反归一化与切片|Unnormalize & slice','取待执行动作段|Execution chunk'],['sched',2,1,'op','扩散调度器|Diffusion scheduler','当前动作轨迹样本|Current trajectory sample']],
    edges:[['obs','enc','编码历史观测|Encode the observation history'],['enc','unet','在给定观测下估计噪声|Condition the denoiser on observations'],['unet','sched','按当前噪声步更新轨迹|Update the action trajectory'],['sched','unet','对尚未完成的动作轨迹继续去噪|Repeat for remaining denoising steps','','inner'],['sched','slice','输出完整预测窗口|Deliver the final sampled horizon'],['slice','robot','只执行动作块前缀|Execute the selected prefix'],['robot','obs','重新采集真实观测|Acquire new measurements','','feedback']]
  },
  'J': {
    prep:'用时间对齐的机器人视频和动作适配视频骨干，学习二者的联合生成。|Adapt the video backbone on time-aligned robot video and actions to learn joint generation.',
    nodes:[['obs',0,0,'in','真实观测|Real observation','视觉和机器人状态|Vision and robot state'],['ctx',1,0,'op','上下文编码|Context encoding','历史与指令|History and instruction'],['joint',2,0,'op','联合生成骨干|Joint generative trunk','对齐的未来与动作|Aligned futures and actions'],['robot',0,1,'out','机器人执行|Robot execution','真实状态变化|Actual state change'],['act',1,1,'op','动作解码|Action decoding','可执行动作块|Executable chunk'],['vid',2,1,'out','视觉未来|Visual future','预测视频，不是观测|Prediction, not observation']],
    edges:[['obs','ctx','编码真实历史并加入任务条件|Encode real history and task context'],['ctx','joint','条件化联合时序生成|Condition temporal generation'],['joint','vid','读出未来视频|Read out the visual future'],['joint','act','从联合生成读出时间对齐的动作|Read aligned actions from joint generation'],['act','robot','执行动作块|Execute the action chunk'],['robot','obs','用新的实测信息更新上下文|Refresh context with real measurements','','feedback']]
  },
  'E': {
    prep:'匹配相机、控制和任务，固定待测策略。校准仿真是为了比较策略，不是训练新的策略。|Match cameras, control and tasks, then freeze the policies. Calibrate the simulator to compare policies, not train another one.',
    nodes:[['setup',0,0,'in','任务与重置协议|Task & reset protocol','对照策略集合|Compared policies'],['sim',1,0,'op','仿真试验|Simulated trials','相同任务与策略|Matched tasks and policies'],['sr',2,0,'op','仿真统计|Simulator outcomes','各策略成功率|Per-policy success'],['real',0,1,'op','实机对照|Physical trials','成对实机设置|Paired physical setups'],['rr',1,1,'op','真机统计|Physical outcomes','各策略成功率|Per-policy success'],['judge',2,1,'out','排序校准|Ranking calibration','相关性与排序违背|Correlation & rank violations']],
    edges:[['setup','sim','在匹配或变体环境中运行策略|Run policies in matched or varied simulation'],['setup','real','收集对应实机试验|Collect corresponding physical trials'],['sim','sr','按回合记录成功或失败|Record episode outcomes'],['real','rr','按对应任务聚合成功率|Aggregate matched real outcomes'],['sr','judge','输入仿真策略排序|Supply simulated rankings'],['rr','judge','用真机排序检查代理指标|Validate the proxy against real rankings']]
  },
  'WM-1': {
    prep:'用图像、动作与奖励学 RSSM；运行时使用已学动力学与奖励头。|Fit the RSSM on images, actions and rewards; use the learned dynamics and reward head at decision time.',
    nodes:[
      ['obs',0,0,'in','相机与动作记录|Camera & action log','当前帧、上次动作|Frame, previous action'],
      ['rssm',1,0,'op','RSSM 状态估计|RSSM state filter','当前信念状态|Posterior belief'],
      ['dyn',2,0,'op','想象动力学|Imagined dynamics','每个候选的潜状态轨迹|Latent rollout per candidate'],
      ['score',2,1,'op','奖励头|Reward head','每条轨迹的预测回报|Return per trajectory'],
      ['cem',1,1,'op','CEM 规划器|CEM planner','候选分布、首步动作|Proposals, first action'],
      ['env',0,1,'out','环境|Environment','执行后产生的新观测|Measurement after acting']],
    edges:[['obs','rssm','用真实帧校正状态|Correct the belief with a real frame'],['rssm','dyn','以当前信念为想象起点|Start rollouts at the current belief'],['cem','dyn','采样候选动作序列|Sample candidate action sequences'],['dyn','score','读出各步奖励并累加|Predict and sum step rewards'],['score','cem','按高回报样本重拟合，继续搜索|Refit to elites and repeat the search','','inner'],['cem','env','只执行最佳计划的第一步|Execute only the first action'],['env','obs','真实反馈，不是想象帧|Return a measurement, not an imagined frame','','feedback']]
  },
  'WM-2': {
    prep:'视频预训练学习表示；再用机器人轨迹训练动作条件预测器，编码器冻结。|Video pretraining learns features; robot trajectories train the action-conditioned predictor with the encoder frozen.',
    nodes:[
      ['images',0,0,'in','相机与目标图|Camera & goal image','当前图像、期望终态|Current and desired views'],
      ['enc',1,0,'op','冻结视频编码器|Frozen encoder','当前与目标 patch 特征|Current and goal features'],
      ['ac',2,0,'op','2-AC 预测器|2-AC predictor','动作条件的未来特征|Action-conditioned features'],
      ['dist',2,1,'op','目标距离|Goal distance','终态特征的 L1 距离|Terminal feature L1 cost'],
      ['cem',1,1,'op','CEM 搜索|CEM search','末端动作序列|End-effector sequences'],
      ['arm',0,1,'out','机械臂|Robot arm','末端位置与新相机图|Arm state and camera view']],
    edges:[['images','enc','分别编码观测和目标|Encode the observation and the goal'],['enc','ac','当前特征作为展开起点|Initialize rollouts with current features'],['cem','ac','候选动作及本体状态|Supply candidate commands and arm state'],['ac','dist','预测终点而非生成像素|Deliver predicted end features, not pixels'],['enc','dist','目标图特征作为比较基准|Use the goal embedding as reference','top-right'],['dist','cem','保留距离较小的候选并重采样|Keep and resample low-cost sequences','','inner'],['cem','arm','执行首步末端指令|Execute the first command'],['arm','images','获取新观测再规划|Reobserve and replan','','feedback']]
  },
  'WM-3': {
    prep:'训练时从视频推断潜动作；游玩时玩家选码，不再运行这个动作推断网络。|A latent-action model infers actions from training video; at play time a person selects codes instead.',
    nodes:[
      ['prompt',0,0,'in','起始图|Prompt image','初始视觉条件|Starting view'],
      ['tok',1,0,'op','视频分词器|Video tokenizer','历史视觉 token|Visual token history'],
      ['dyn',2,0,'op','时空动力学|Dynamics model','下一帧 token|Next-frame tokens'],
      ['player',0,1,'in','玩家|Player','所选潜动作码|Selected latent action'],
      ['view',1,1,'out','交互画面|Playable view','生成的画面而非实测|Generated, not measured'],
      ['dec',2,1,'op','视觉解码器|Visual decoder','下一帧像素|Next-frame pixels']],
    edges:[['prompt','tok','编码初始画面|Encode the starting view'],['tok','dyn','读取历史上下文|Read the visual history'],['player','dyn','本次动作码控制下一帧|Condition the next frame on the chosen code'],['dyn','dec','解码预测 token|Decode predicted tokens'],['dec','view','展示生成的视频帧|Display the generated frame'],['dyn','tok','把生成 token 加入历史|Append generated tokens to history','top','inner'],['view','player','玩家观察结果并再次输入|Player sees the result and acts again','','feedback']]
  },
  'WM-4': {
    prep:'从单图初始化分层几何。下图是一次新视角扩展，不是每帧都重新训练场景生成器。|Initialize layered geometry from one image. The graph shows one scene extension, not retraining a generator per frame.',
    nodes:[
      ['user',0,0,'in','用户输入|User input','相机位姿与提示词|Camera pose and prompt'],
      ['render',1,0,'op','局部渲染|Partial renderer','已知区域、重叠深度|Known view, overlap depth'],
      ['paint',2,0,'op','外绘生成器|Outpainting model','补全的新视图|Completed view'],
      ['depth',2,1,'op','深度与分层拟合|Depth & layer fitting','新面元几何|New surfel geometry'],
      ['scene',1,1,'op','持久场景|Persistent scene','分层几何集合|Layered surfels'],
      ['view',0,1,'out','浏览器视图|Rendered view','供用户选择新视角|View for the next choice']],
    edges:[['user','render','指定要观察的位置|Choose a new viewpoint'],['scene','render','读取已有几何|Render from retained geometry'],['render','paint','用可见区域约束外绘|Condition outpainting on known content'],['paint','depth','估计并对齐新增区域深度|Estimate and align new depth'],['render','depth','提供重叠区的深度约束|Supply depth constraints in the overlap'],['depth','scene','追加拟合后的面元|Commit fitted surfels','','inner'],['scene','view','渲染更新后的三维场景|Render the extended scene'],['view','user','用户决定是否继续扩展|User chooses another pose','','feedback']]
  },
  'WM-5': {
    prep:'训练条件扩散模型。运行时从指定的几何与文字生成六视图；这里没有驾驶策略。|Train a conditional diffusion model. At inference, render six views from specified geometry and text; no driving policy acts.',
    nodes:[
      ['map',0,0,'in','路图|Road layout','鸟瞰栅格|BEV raster'],
      ['raster',1,0,'op','路图编码器|Map encoder','空间条件特征|Spatial conditioning'],
      ['denoise',2,0,'op','多视图去噪|Multi-view denoiser','相邻视角交换特征|Neighbor-view attention'],
      ['ctx',0,1,'in','场景条件|Scene conditions','框、相机、文字|Boxes, cameras, text'],
      ['tokens',1,1,'op','条件编码|Condition encoders','物体与场景 token|Object and scene tokens'],
      ['images',2,1,'out','图像解码器|Image decoder','六路街景；离线增强|Six views for offline use']],
    edges:[['map','raster','编码 BEV 空间结构|Encode BEV layout'],['ctx','tokens','编码物体、相机和文本|Encode objects, cameras and text'],['raster','denoise','注入栅格特征|Inject spatial features'],['tokens','denoise','用 token 调制去噪|Condition denoising on tokens'],['denoise','images','解码六个相机视图，流程到此结束|Decode six camera views; no control feedback']]
  },
  'WM-6': {
    prep:'微调图像编辑器以生成子目标；另用轨迹学习目标图条件策略。运行时两者以不同频率协作。|Fine-tune the editor for subgoals and learn a separate goal-image policy from trajectories. Their runtime rates differ.',
    nodes:[
      ['obs',0,0,'in','真实观测|Camera observation','当前帧|Current frame'],
      ['edit',1,0,'op','图像编辑器|Image editor','指令条件子目标|Instruction-conditioned goal'],
      ['goal',2,0,'op','子目标缓存|Held subgoal','每 20 步刷新|Refresh every 20 steps'],
      ['policy',2,1,'op','低层策略|Low-level policy','四步动作预测|Four-action prediction'],
      ['ensemble',1,1,'op','时间集成|Temporal ensemble','当前动作|Current command'],
      ['arm',0,1,'out','机械臂|Robot arm','执行一步|Execute one step']],
    edges:[['obs','edit','按刷新计划输入观测与指令|Condition on the frame and instruction when due'],['edit','goal','保存采样的子目标图|Store the sampled goal image'],['goal','policy','复用目标图|Reuse the held goal'],['obs','policy','低层每步直接读真实新帧|Read a fresh frame on each control step'],['policy','ensemble','按控制时刻对齐重叠预测|Align overlapping predictions by target time'],['ensemble','arm','执行当下的动作|Execute the current command'],['arm','obs','重观测；不是每步都重画子目标|Reobserve without regenerating the goal every step','','feedback']]
  },
  'EAI-1': {
    prep:'先标注场景关键点并让 VLM 写约束；持续控制时复用约束，不必每步询问 VLM。|Mark scene keypoints and ask the VLM for constraints up front; reuse them during control.',
    nodes:[
      ['scene',0,0,'in','RGB-D 与指令|RGB-D & instruction','关键点编号、任务|Point IDs and task'],
      ['vlm',1,0,'op','VLM 约束生成|VLM constraint writer','各阶段路径与终点条件|Path and terminal constraints'],
      ['solve',2,0,'op','子目标求解器|Subgoal solver','目标末端位姿|End-effector goal pose'],
      ['track',0,1,'op','关键点跟踪|Keypoint tracker','实时点位与状态|Live points and state'],
      ['act',1,1,'out','低层控制器|Arm controller','执行路径前缀|Execute a path prefix'],
      ['path',2,1,'op','路径求解器|Path solver','满足约束的轨迹|Constraint-aware trajectory']],
    edges:[['scene','vlm','从标点图与指令生成约束|Generate constraints from marked image and task'],['vlm','solve','本阶段约束|Supply stage constraints'],['track','solve','检查点位，必要时回退阶段|Check live points and backtrack if needed'],['solve','path','求到达目标位姿的路径|Plan motions to reach the subgoal'],['vlm','path','路径约束同时限制中间运动|Constrain intermediate motions'],['path','act','交给控制器一段路径|Send a trajectory prefix'],['act','track','执行后更新跟踪点|Track the scene after execution','','feedback']]
  },
  'EAI-2': {
    prep:'离线从示范学习动作 token；部署时需要目标数据集的动作尺度，不在线改权重。|Learn action tokens from demonstrations offline. Deployment needs the target action scale, not online weight updates.',
    nodes:[
      ['frame',0,0,'in','相机|Camera','一张 RGB 图|One RGB frame'],
      ['vision',1,0,'op','双视觉编码器|Dual vision encoder','DINOv2 + SigLIP'],
      ['llm',2,0,'op','Llama 2|Llama 2','逐坐标动作 token|Action-coordinate tokens'],
      ['lang',1,1,'in','语言指令|Instruction','文本 token|Text tokens'],
      ['decode',2,1,'op','动作解码器|Action decoder','区间中心、反归一化|Bin centers, unnormalization'],
      ['arm',0,1,'out','机械臂与夹爪|Arm and gripper','一次末端命令|One physical command']],
    edges:[['frame','vision','编码并拼接图块特征|Encode and concatenate patch features'],['vision','llm','投影为语言模型的视觉 token|Project into the language embedding space'],['lang','llm','文本指令与视觉 token 一同输入|Condition on the instruction'],['llm','decode','逐维解码离散动作|Decode the generated action tokens'],['decode','arm','按数据集统计还原动作尺度并执行|Restore robot units and execute','bottom'],['arm','frame','真实图像开始下一次查询|Start the next query with a real frame','','feedback']]
  },
  'EAI-3': {
    prep:'手持示范经 SLAM 恢复轨迹并离线训练策略；示范 SLAM 不在部署回路中。|Recover demonstration trajectories with SLAM and fit the policy offline. Demonstration SLAM does not run in this control loop.',
    nodes:[
      ['wrist',0,0,'in','腕部相机|Wrist camera','鱼眼图像与时间戳|Fisheye frames and times'],
      ['sync',1,0,'op','时刻对齐|Time alignment','同步的观测历史|Aligned observation window'],
      ['policy',2,0,'op','扩散策略|Diffusion policy','相对末端轨迹、开度|Relative poses and widths'],
      ['state',0,1,'in','机械臂传感器|Arm sensors','位姿与夹爪开度|Pose and jaw width'],
      ['robot',1,1,'out','轨迹跟踪|Robot tracking','机械臂与夹爪执行|Arm and gripper actuation'],
      ['sched',2,1,'op','延迟补偿调度|Latency scheduler','仅保留未过期目标|Time-valid targets only']],
    edges:[['wrist','sync','以相机采集时刻为参考|Use image capture times as reference'],['state','sync','插值或对齐本体状态|Align robot states to those times'],['sync','policy','从历史预测动作块|Predict a chunk from the aligned window'],['policy','sched','相对轨迹与预期执行时刻|Provide relative targets and times'],['sched','robot','按执行器延迟发送剩余命令|Dispatch remaining targets per actuator'],['robot','state','读取新位姿与开度|Measure new pose and jaw width','','feedback'],['robot','wrist','采集下一轮图像|Acquire the next image window','','feedback']]
  },
  'EAI-4': {
    prep:'跨机器人轨迹训练共享主干；新增输入或动作接口的参数适配在线下进行。|Pretrain a shared trunk on cross-robot trajectories. Adapt new sensor or action interfaces offline.',
    nodes:[
      ['obs',0,0,'in','近期观测|Recent observations','传感器窗口|Sensor window'],
      ['tokens',1,0,'op','模态分词器|Modality tokenizers','掩蔽缺失模态|Mask missing inputs'],
      ['trunk',2,0,'op','共享 Transformer|Shared transformer','读出 token|Readout tokens'],
      ['goal',0,1,'in','任务条件|Task condition','语言或目标图|Language or goal image'],
      ['robot',1,1,'out','本体接口|Robot interface','执行动作前缀|Execute a chunk prefix'],
      ['head',2,1,'op','扩散动作头|Diffusion action head','去噪后的动作块|Denoised action chunk']],
    edges:[['obs','tokens','为现有传感器产生 token|Tokenize available sensor inputs'],['goal','tokens','加入语言或图像任务条件|Add the task condition'],['tokens','trunk','应用掩码计算共享特征|Apply masks and compute shared features'],['trunk','head','用读出 token 条件化块内去噪|Condition chunk denoising on the readout'],['head','robot','转换为本体动作并执行一段|Map to robot units and execute a prefix'],['robot','obs','刷新观测窗，不在去噪迭代中读传感器|Refresh observations between queries, not denoising iterations','','feedback']]
  },
  'EAI-5': {
    prep:'仿真训练基础策略和适应器；实机适应指估计上下文，不是在线更新网络参数。|Train the base policy and adaptor in simulation. Physical adaptation estimates context rather than updating weights.',
    nodes:[
      ['sense',0,0,'in','本体感知|Proprioception','关节、倾角、触点|Joints, tilt, contacts'],
      ['history',1,0,'op','历史缓冲区|History buffer','最近 50 步状态与动作|50 state/action steps'],
      ['adapt',2,0,'op','慢适应器|Slow adaptor','约 10 Hz 的潜变量|Context latent at ~10 Hz'],
      ['body',0,1,'out','四足机器人|Quadruped','真实接触动力学|Physical contact'],
      ['pd',1,1,'op','PD 控制器|PD controller','关节力矩|Joint torques'],
      ['base',2,1,'op','快速基础策略|Fast base policy','100 Hz，12 个关节目标|100 Hz, 12 joint targets']],
    edges:[['sense','history','维护状态—动作历史|Maintain the state/action window'],['history','adapt','从过去交互估计环境|Infer context from past interaction'],['adapt','base','读取最近估计值，不等待慢线程|Use the latest estimate without waiting'],['sense','base','快回路独立读取当前状态|Feed current state to the fast loop'],['base','history','把已发动作写入缓冲区|Record the issued action'],['base','pd','给出目标关节角|Issue joint-angle targets'],['pd','body','施加关节力矩|Apply joint torques'],['body','sense','接触后读取真实测量值|Measure the body after contact','','feedback']]
  },
  'EAI-6': {
    prep:'有人预扫带位姿的 RGB-D 并构建地图；执行阶段重新观测局部物体，不假设全局地图在线刷新。|Build the map from a human prescan. Execution refreshes local perception, not the entire semantic map.',
    nodes:[
      ['map',0,0,'in','预扫地图与任务|Prescan map & task','语义、障碍、文本|Semantics, obstacles, text'],
      ['nav',1,0,'op','检索与导航|Retrieval & navigation','物体接近位姿、A*|Object approach pose, A*'],
      ['grasp',2,0,'op','掩模筛选抓姿|Mask-filtered grasps','现场 RGB-D、AnyGrasp|Live RGB-D, AnyGrasp'],
      ['release',0,1,'out','放置与松爪|Place & release','按当前点云放下物体|Drop from current geometry'],
      ['dest',1,1,'op','目的地导航|Destination navigation','检索放置地并接近|Retrieve and approach site'],
      ['pick',2,1,'op','机械臂执行|Arm execution','选定的抓取动作|Selected grasp']],
    edges:[['map','nav','从文本检索物体并规划接近路径|Retrieve the named object and plan approach'],['nav','grasp','到达后从现场感知候选抓姿|Acquire grasp candidates at the site'],['grasp','pick','执行被目标掩模选中的抓姿|Execute the mask-selected grasp'],['pick','dest','抓取后转向放置任务|Switch to the placement task'],['map','dest','复用预扫地图检索目的地|Reuse the prescan to locate the destination'],['dest','release','重新分割放置区并释放|Reobserve the placement cloud and release']]
  },
  'EAI-7': {
    prep:'先准备固定的被测策略和可行任务链。这里是评测系统，不训练或更新策略。|Provide a fixed policy and feasible chains before evaluation. This is a benchmark, not a training loop.',
    nodes:[
      ['chain',0,0,'in','任务链与场景|Task chain & scene','五条指令、可行初态|Five instructions, initial state'],
      ['task',1,0,'op','指令调度|Instruction gate','当前语言子任务|Current subtask'],
      ['policy',2,0,'op','被测策略|Policy under test','机械臂、夹爪动作|Arm and gripper action'],
      ['score',0,1,'out','评测记录|Score recorder','完成的前缀长度|Completed prefix length'],
      ['oracle',1,1,'op','任务判据|Subtask oracle','是否成功、是否超时|Success and timeout'],
      ['sim',2,1,'op','仿真环境|Simulator','状态与传感器读数|State and sensor readings']],
    edges:[['chain','task','设置初态与第一条指令|Set the initial condition and first instruction'],['task','policy','当前语言指令|Supply current instruction'],['policy','sim','动作驱动仿真步进|Advance simulation under the command'],['sim','policy','新传感器观测供策略继续执行|Return fresh sensor observations','','feedback'],['sim','oracle','用仿真状态检查本子任务|Check subtask completion from simulator state'],['oracle','task','成功才推进到下一指令|Advance the instruction on success','','inner'],['oracle','score','超时或链结束时记录成绩|Score when the chain ends or times out']]
  },
  'EAI-8': {
    prep:'先收集示范并定义奖励与复位。与冻结策略部署不同，此图包含异步在线学习。|Collect demonstrations and define rewards and resets first. This system includes asynchronous online learning, not just frozen-policy deployment.',
    nodes:[
      ['obs',0,0,'in','腕部图像与状态|Wrist view & state','当前实机观测|Live measurement'],
      ['actor',1,0,'op','Actor 策略|Actor policy','末端控制目标|End-effector set-point'],
      ['robot',2,0,'out','控制器与真机|Controller & robot','新观测、任务奖励|New observation and reward'],
      ['demo',0,1,'in','先验示范|Prior demonstrations','示范转移|Demo transitions'],
      ['learn',1,1,'op','异步学习器|Async learner','更新策略与价值网络|Actor and critic updates'],
      ['replay',2,1,'op','在线回放|Online replay','实机产生的转移|Physical transitions']],
    edges:[['obs','actor','当前观测进入 actor|Read the current observation'],['actor','robot','跟踪策略给出的末端目标|Track the commanded set-point'],['robot','obs','真实测量闭合控制环|Close the control loop with a real measurement','top','feedback'],['robot','replay','存入含奖励的交互样本|Store a rewarded transition'],['replay','learn','抽取在线样本|Sample online experience'],['demo','learn','混入示范样本|Mix in offline demonstrations'],['learn','actor','异步发布更新后的策略权重|Publish updated policy weights asynchronously','','inner']]
  },
  SURVEY: {
    prep:'本图描绘读者核查证据的流程。综述没有训练损失、机器人或电机输出。|This is a reader’s evidence workflow. A survey has no training loss, robot or motor output.',
    nodes:[
      ['claim',0,0,'in','综述主张|Survey claim','待核对的结论|Claim to check'],
      ['study',1,0,'op','原始研究|Primary study','条件、目标、表示|Condition, target, representation'],
      ['role',2,0,'op','决策接口|Decision interface','谁使用预测？|Who consumes predictions?'],
      ['open',1,1,'op','开环预测协议|Open-loop protocol','保真度、状态误差|Fidelity or state error'],
      ['closed',2,1,'op','闭环控制协议|Closed-loop protocol','任务、预算、传感器|Tasks, budgets, sensors'],
      ['record',0,1,'out','证据记录|Evidence record','只保留已测结论|Only supported claims']],
    edges:[['claim','study','追溯来源版本|Trace the claim to its source'],['study','role','按功能、时间、空间表示分类|Classify function, time and representation'],['role','open','若无动作执行，检查预测实验|Without an executor, examine prediction tests'],['role','closed','若规划器或策略用预测，查控制实验|If a planner or policy acts, inspect control trials'],['open','record','记录预测指标，不推断控制表现|Record prediction metrics, not control performance'],['closed','record','按实际实验条件限定结论|Bound claims by the tested protocol','bottom']]
  }
};
