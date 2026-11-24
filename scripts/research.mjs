import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';

const partitions=['wm-a','wm-b','eai-a','eai-b','eai-c','supplement'];
const titles={
  'WM-1':['潜动力学与基于模型的强化学习','Latent dynamics & model-based RL'],
  'WM-2':['特征预测与对象表示','Predictive representations'],
  'WM-3':['视频生成与交互模拟','Interactive video worlds'],
  'WM-4':['三维场景与四维演化','3D and 4D scene models'],
  'WM-5':['驾驶世界模型','Driving world models'],
  'WM-6':['机器人世界模型与 WAM','Robot worlds & world-action models'],
  'EAI-1':['语言、可行性与规划','Language and grounded planning'],
  'EAI-2':['视觉语言动作基础模型','Vision-language-action policies'],
  'EAI-3':['示范采集与动作策略','Demonstrations & visuomotor policies'],
  'EAI-4':['跨本体数据与预训练','Cross-embodiment data & pretraining'],
  'EAI-5':['足式与人形控制','Legged & humanoid control'],
  'EAI-6':['导航与移动操作','Navigation & mobile manipulation'],
  'EAI-7':['模拟器与评测协议','Simulators & evaluation'],
  'EAI-8':['强化学习后训练','RL post-training'],
  SURVEY:['综述与资源地图','Survey lenses'],
};
const levels={full:['指定版本全文','Full version'],sections:['正文选节','Selected sections'],abstract:['摘要','Abstract'],repo:['仓库或项目资料','Repository / project'],unresolved:['待核实','Unresolved']};
const labels={index:['图谱','Overview'],research:['研究综合','Synthesis'],runtime:['运行架构','Runtime plates'],evidence:['逐项证据','Evidence ledger'],shelf:['论文书架','PDF shelf']};
const root='https://github.com/hyfine/embodied-world-models-atlas';
const read=p=>JSON.parse(readFileSync(p,'utf8'));
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const local=(page,en)=>page==='index'?(en?'index.html':'zh.html'):`${page}${en?'':'.zh'}.html`;
const key=r=>`${r.sheet}-${r.no}`;
const http=s=>typeof s==='string'&&/^https?:\/\/[^\s<>]+$/.test(s);
const link=(text,url)=>{assert(http(url),`Invalid URL: ${url}`);return `<a href="${esc(url)}">${esc(text)}</a>`;};
const doc=(text,file,anchor='')=>link(text,`${root}/blob/main/docs/${file}${anchor}`);
const absBrief=(r,en)=>doc(en?'Full reading note':'展开完整精读',`readings-${r.partition}.md`,`#${r.code.toLowerCase()}`);
export function tabNav(en,active) {
  return `<nav class="desk-tabs" aria-label="${en?'Atlas sections':'图谱栏目'}">${Object.entries(labels).map(([id,pair])=>`<a href="${local(id,en)}"${id===active?' aria-current="page"':''}>${pair[+en]}</a>`).join('')}</nav>`;
}
function wrap(page,en,lead,body,asset) {
  const l=+en,lang=en?'en':'zh-CN',label=labels[page][l];
  return `<!doctype html><html lang="${lang}"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${label} · Embodied World Models Atlas</title><link rel="stylesheet" href="${asset('assets/atlas.css')}"><link rel="stylesheet" href="${asset('assets/research.css')}"><script defer src="${asset('assets/research.js')}"></script><body><header><div class="bar"><a class="wordmark" href="${local('index',en)}">◉ FIELD ATLAS</a><nav><a href="${root}">GitHub</a><a href="${local(page,!en)}">${en?'中文':'English'}</a></nav></div></header><main class="wrap desk">${tabNav(en,page)}<div class="kicker">RESEARCH DESK　/　2026-11-24</div><h1>${label}</h1><p class="lead">${lead}</p>${body}<footer><a href="${local('index',en)}">← ${labels.index[l]}</a> · ${link(en?'Selection and evidence rules':'检索与证据口径',`${root}/blob/main/EVIDENCE.md`)}</footer></main></body></html>\n`;
}
function sources(r,en) {
  return [r.paper&&link(en?'Workbook source':'表内主链接',r.paper),r.code&&link('Code / project',r.code),
    r.hub&&link('Hub',r.hub),...(r.also||[]).map(u=>link(en?'Additional link':'附加链接',u)),
    http(r.reading.source)&&r.reading.source!==r.paper&&link(en?'Reviewed source':'实读来源',r.reading.source)].filter(Boolean).join(' · ');
}
function ledger(rows,en,pointers) {
  const l=+en,t=(zh,eng)=>en?eng:zh;
  const counts=Object.fromEntries(Object.keys(levels).map(k=>[k,rows.filter(r=>r.reading.level===k).length]));
  const referenceLines=r=>[...new Set([r.paper,r.code,r.hub,...(r.also||[])])]
    .map(url=>pointers.get(url)).filter(Boolean).map(p=>`<li>${link(p.kind,p.source)}${p.revision?` · <code>${esc(p.revision.slice(0,10))}</code>`:''}${p.entry?` · ${esc(p.entry)}`:''}${p.license?` · ${esc(p.license)}`:''}${p.archived?' · archived':''}${p.kind==='unresolved'?` · ${esc(p.reason)}`:''}</li>`).join('');
  return `<div class="chips">${Object.entries(counts).map(([k,n])=>`<span>${levels[k][l]} <b>${n}</b></span>`).join('')}</div>
<p>${t('行号以主表或补表为前缀。等级指该行最强的实际阅读证据，不代表每个链接均达到同等深度。正文选节不等于逐页阅读全文；发行说明、模型卡、代码仓和论文不是同一类证据。','IDs refer to the main or supplementary sheet. The level denotes the strongest material actually examined for that row, not equal depth for every link. Selected sections do not mean a cover-to-cover reading. Release notes, model cards, repositories and papers are different kinds of evidence.')}</p>
<div class="desk-filters"><label>${t('检索','Search')} <input type="search" id="find-row"></label><label>${t('方向','Family')} <select id="row-family"><option value="">${t('全部','All')}</option>${Object.keys(titles).concat('SUP').map(k=>`<option>${k}</option>`).join('')}</select></label><label>${t('证据','Level')} <select id="row-level"><option value="">${t('全部','All')}</option>${Object.entries(levels).map(([k,p])=>`<option value="${k}">${p[l]}</option>`).join('')}</select></label><output id="row-count" aria-live="polite">${rows.length} / ${rows.length}</output></div>
<p><a href="data/release-pointers.json">${t('代码与 Hub 版本核验清单','Code and Hub pointer snapshot')}</a> · ${t('版本核验只确认发布物身份，不提升精读等级。','Revision checks identify artifacts and do not upgrade reading depth.')}</p>
<p>${t('纠错示例：OpenVLA-OFT 行原填的 GitHub 地址返回 404；','Correction: the workbook’s OpenVLA-OFT GitHub URL returns 404; the ')}${link(t('作者项目页','authors’ project page'),'https://openvla-oft.github.io/')} ${t('实际指向','points to')} ${link('moojink/openvla-oft','https://github.com/moojink/openvla-oft')}.</p>
<div class="ledger">${rows.map(r=>`<details data-row data-family="${r.category}" data-level="${r.reading.level}" id="row-${key(r)}"><summary><small>${key(r)} · ${r.category}</small> <strong>${esc(r.name)}</strong> <em>${levels[r.reading.level][l]}</em></summary><p>${esc(r.reading.note)}</p><p class="locator">${esc(r.reading.locator)}</p><p>${sources(r,en)}</p><ul>${referenceLines(r)}</ul></details>`).join('\n')}</div>`;
}
function runtime(cards,en) {
  const l=+en,t=(zh,eng)=>en?eng:zh;
  return `<nav class="chips">${cards.map(c=>`<a href="#${c.code.toLowerCase()}">${c.code}</a>`).join('')}</nav><p>${t('下图是按论文重画的逻辑数据流，不是真机时序测量。训练和部署、动作与视觉预测、数据管线与控制器分别标明；按“逐步”追踪一次。','These are original logical data paths, not measured robot timing. Separate training from deployment, actions from predictions, and dataset pipelines from controllers. Step through a path to read it in order.')}</p>`+
  cards.map(c=>`<article class="runtime-plate" id="${c.code.toLowerCase()}"><small>${c.code} / ${titles[c.code][l]}</small><h2>${esc(c.representative)}</h2><ol class="runtime-flow">${c.stages.map((pair,i)=>`<li><b>${String(i+1).padStart(2,'0')}</b>${esc(pair[l])}</li>`).join('')}</ol><div class="step-controls" hidden><button type="button" data-step>${t('逐步追踪','Trace next step')} →</button><button type="button" data-reset>${t('重置','Reset')}</button><output aria-live="polite"></output></div><p><strong>${t('反馈与边界','Feedback & boundary')}.</strong> ${esc(c.feedback[l])}</p><p><strong>${t('怎样验证','Evidence test')}.</strong> ${esc(c.test[l])}</p><p class="locator">${link(t('原始来源','Primary source'),c.source)} · ${esc(c.locator)} · ${absBrief(c,en)}</p></article>`).join('\n');
}
const contrasts=[
  ['让想象参与哪次决策？','When does imagination enter the decision?',
    'PlaNet 对候选序列估回报，在部署时反复规划；Dreamer 把模型当训练环境。视频画质不是两者共同的目标函数。比较要同时报真实交互量、搜索预算与回报。',
    'PlaNet searches candidate sequences during deployment; Dreamer uses the model as a training environment. Frame fidelity is not their shared objective. Compare real interactions, search budgets and realized returns together.','wm-1'],
  ['视频、特征和几何分别保留什么？','What do video, features and geometry preserve?',
    '预测像素可以保留微小物体，也可能浪费算力重画背景。特征距离适合目标图规划，但可能看不见滑移。显式几何能检查换视角后的位置一致性，却不会自动给出力学。用相同初始状态、不同动作做配对测试。',
    'Pixels preserve small objects but can waste compute redrawing a background. Feature distance can guide goal-image planning while missing slip. Geometry tests viewpoint consistency without guaranteeing forces. Use the same starting state with different actions.','wm-2'],
  ['“知道后果”怎样变成电机命令？','How does a predicted future become a motor command?',
    '把预测交给规划器、用逆动力学反推动作、直接联合生成动作与状态，是三种接口。联合预测不等于显式搜索；只在训练时预测未来，也不同于执行时必须解码视频。消融要分开这两个时间点。',
    'Scoring candidate actions, inverting a desired transition and jointly generating states and actions are distinct interfaces. Joint output is not explicit search. Ablate future supervision during training separately from decoding futures during execution.','wm-6'],
  ['哪些数据能跨本体迁移？','What transfers across bodies?',
    '网络视频能提供物体变化线索，不能直接告诉策略“这个数字是米还是弧度”。检查坐标系、时间对齐、夹爪含义与相机视角；再在固定本体和新本体上分别报告结果。多站点不一定是多机型。',
    'Web video can show object motion without saying whether a control is in meters or radians. Check frames, synchronization, gripper semantics and camera views; report held-out sites separately from held-out bodies.','eai-4'],
  ['部署时，哪一步最迟可以完成？','Which computation has a deadline?',
    '上层语言计划、动作块生成和全身控制面对不同频率。不能用一次网络前向的平均时间代替端到端延迟：长动作块省算力，也会压缩纠错窗口。对照实验应固定动作频率与执行前缀。',
    'Language planning, chunk generation and whole-body control have different deadlines. Mean forward-pass latency is not end-to-end latency: longer chunks save compute but shorten the recovery window. Match control rate and executed prefix.','eai-5'],
  ['谁来给成功判分？','Who judges success?',
    '生成模型如果既产生训练经验又给策略打分，就可能同时遗漏同一种失败。用独立真机子集核对假阳性、排序反转和失败恢复。奖励模型、成功检测器和独立评测器不能互相当证明。',
    'A model supplying both practice and evaluation can miss the same failure twice. Calibrate false positives, reversals in policy ranking and recovery on independent physical trials. A reward model, success detector and external evaluator are not interchangeable.','eai-7'],
];
function synthesis(cards,en){
  const l=+en,t=(zh,eng)=>en?eng:zh;
  return `<div class="research-callout"><b>${t('怎么读这批材料','How to read this collection')}</b><p>${t('先沿一个任务区分「预测什么、谁用预测、谁验证」，再去找论文。原工作簿的 30 条家族线和 12 个趋势是发现线索，不是已验证的因果谱系；年度计数是收录偏好，不是份额或增长率。','Start with the prediction target, its consumer and its judge. The workbook’s 30 lineage sketches and 12 trend theses are discovery aids, not verified causal ancestry. Annual counts describe a curated sample, not adoption or growth rates.')}</p></div>`+
  contrasts.map(([zh,enTitle,cz,ce,cat],i)=>`<article class="contrast"><small>0${i+1} / ${cat.toUpperCase()}</small><h2>${t(zh,enTitle)}</h2><p>${t(cz,ce)}</p><a href="${local('runtime',en)}#${cat}">${t('沿运行图核查','Trace the runtime path')} →</a></article>`).join('')+
  `<h2>${t('三张实验收据：数据、评测、部署','Three experimental receipts: data, evaluation, deployment')}</h2>
<p><b>${link('Data Scaling Laws in IL · Fig. 5','https://arxiv.org/abs/2410.18647')}.</b> ${t('横轴换成物体数、环境数或两者组合数时，作者在所测操作任务中观察到近似幂律；固定多样性后，添加同类示范并没有同样清晰的关系。这不等于跨所有控制任务的普适规模律。','The authors report approximate power-law trends with numbers of objects, environments or environment–object pairs. Adding demonstrations while keeping diversity fixed does not show the same clear relation. The fitted curves are not universal laws for all control tasks.')}</p>
<p><b>${link('SIMPLER · Fig. 3, physical PDF p. 8','https://arxiv.org/abs/2405.05941')}.</b> ${t('应当问「选模型会不会选错」。在文中可乐罐、移动靠近、抽屉三个测试的表内平均，视觉匹配的 MMRV 为 0.056，验证集动作 MSE 代理为 0.375（越低越好）。这是排序违背指标，不是任务成功率或跨机器人保证。','Ask whether evaluation picks the wrong policy. Across the reported can, move-near and drawer comparison, average mean maximum rank violation is 0.056 for visual matching versus 0.375 for the validation-action-MSE proxy (lower is better). This is a ranking metric, not a success rate or a guarantee on another robot.')}</p>
<p><b>${link('SERL · Table 2','https://arxiv.org/abs/2401.16013')}.</b> ${t('三个设置都列了 20 条示范，但面板插入使用真实成功信号，线缆布线与物体搬运使用二分类器；搬运另有正向和反向策略。复用论文的“训练分钟数”前，先问奖励、复位和操作员成本由谁承担。','All three setups list 20 demonstrations, but PCB insertion uses ground truth while cable routing and relocation use binary classifiers; relocation also has forward and backward policies. Before quoting training minutes, account for rewards, resets and human effort.')}</p>`+
  `<h2>${t('按研究方向展开','Read by research direction')}</h2><div class="research-grid">${cards.map(c=>`<a href="${local('runtime',en)}#${c.code.toLowerCase()}"><b>${c.code}</b> ${titles[c.code][l]}<small>${esc(c.representative)}</small></a>`).join('')}</div>
<h2>${t('从综述回到一手证据','From surveys back to primary evidence')}</h2><p>${doc(t('指定 WAM 综述逐页精读','WAM survey: edition-specific reading'),'wam-survey-deep-dive.md')} · <a href="assets/wam-survey/foresight-paths.html">${t('交互图：未来预测在哪个阶段运行？','Interactive figure: when does foresight actually run?')}</a> · ${doc(t('补表：交叉对照与修正','Supplementary contrasts & corrections'),'readings-supplement.md')} · ${doc(t('趋势与反证','Falsifiable outlook'),en?'outlook.en.md':'outlook.zh-CN.md')}</p>
<p>${link('AwesomeWorldModels @ 19c44f6','https://github.com/Li-Zn-H/AwesomeWorldModels/tree/19c44f619a1b4d823ae1c7578049b519124434da')} · ${link('Awesome-WAM @ aa6cd05','https://github.com/OpenMOSS/Awesome-WAM/tree/aa6cd0508a089e7556dd2fa0347e847c91ca986b')}. ${t('合集用于发现来源，不是独立复现；仓库链接或权重链接都不能替代实验协议。','Collections aid discovery, not replication. A code or weight link does not substitute for an experimental protocol.')}</p>`;
}
function shelf(pdfs,en) {
  const l=+en,t=(zh,eng)=>en?eng:zh;
  return `<p>${t('书架按 arXiv v1 提交日命名，PDF 可以是后来修订的版本。日期不是会议日期；分类计数不是阅读完成数。仅发布索引和校验值，第三方全文留本地。','Filenames use the arXiv v1 submission date; the PDF can be a later revision. This is not a conference date or a count of papers read in full. Only the index and checksums are published; PDF files stay local.')}</p><p><a href="data/pdf-shelf.json">${t('下载版本与校验值清单','Download the version & checksum manifest')}</a></p>`+
    Object.keys(titles).map(code=>{
      const rs=pdfs.filter(p=>p.category===code);
      return `<details class="shelf-group"><summary>${code} · ${titles[code][l]} <b>${rs.length}</b></summary><ul>${rs.map(p=>`<li>${link(p.title,p.source)} <small>${esc(p.date)} · ${esc(p.version)} · ${p.pages} pp.</small><br><code>${esc(p.file)}</code></li>`).join('')}</ul></details>`;
    }).join('');
}
export function researchOutputs(asset) {
  const idx=read('data/workbook-index.json');
  const keyed=new Map();
  const cards=[];
  for(const partition of partitions) {
    for(const r of read(`data/reading-${partition}.json`)){
      assert(!keyed.has(key(r))&&Object.hasOwn(levels,r.level)&&r.note&&r.locator,`Invalid/duplicate note: ${key(r)}`);
      keyed.set(key(r),r);
    }
    if(partition!=='supplement') cards.push(...read(`data/runtime-${partition}.json`).map(c=>({...c,partition})));
  }
  assert.deepEqual(cards.map(c=>c.code).sort(),Object.keys(titles).sort());
  for(const c of cards) {
    assert(http(c.source)&&c.locator&&c.stages.length>=3,c.code);
    for(const pair of [c.feedback,c.test,...c.stages])assert(Array.isArray(pair)&&pair.length===2&&pair.every(s=>typeof s==='string'&&s.length>0),c.code);
    assert(readFileSync(`docs/readings-${c.partition}.md`,'utf8').includes(`id="${c.code.toLowerCase()}"`),`Missing chapter anchor ${c.code}`);
  }
  assert.equal(keyed.size,idx.length);
  assert.equal(new Set(idx.map(key)).size,idx.length,'Duplicate workbook key');
  const rows=idx.map(r=>{assert(keyed.has(key(r)),`Missing ${key(r)}`);return {...r,reading:keyed.get(key(r))};});
  const pdfs=read('data/pdf-shelf.json');
  const pointers=new Map(read('data/release-pointers.json').map(p=>[p.url,p]));
  for(const p of pdfs)assert(p.pages>0 && p.bytes>0 && /^[0-9a-f]{64}$/.test(p.sha256) &&
    p.file.startsWith(`${p.category}/${p.date.replaceAll('-','').slice(2)}_`)&&p.file.endsWith('.pdf'),`Invalid PDF manifest: ${p.file}`);
  const out=[];
  for(const en of [true,false]){
    const t=(zh,eng)=>en?eng:zh;
    for(const [page,lead,body] of [
      ['research',t('从问题、运行机制到可证伪的结论。','Start with the question; follow the mechanism to a falsifiable claim.'),synthesis(cards,en)],
      ['runtime',t(`${cards.length} 个工作簿方向，各追踪一项代表作。`,`${cards.length} workbook directions, each traced through one representative work.`),runtime(cards,en)],
      ['evidence',t(`${rows.length} 条来源记录，包括主表与补表；保留原行号，不把重复行冒充独立成果。`,`${rows.length} main and supplementary source records. Row identities are preserved; overlapping records are not independent findings.`),ledger(rows,en,pointers)],
      ['shelf',t(`${pdfs.length} 个本地版本的书目、来源和校验信息。`,`${pdfs.length} versioned local PDFs with bibliographic and checksum records.`),shelf(pdfs,en)],
    ])out.push([local(page,en),wrap(page,en,lead,body,asset)]);
  }
  return out;
}
