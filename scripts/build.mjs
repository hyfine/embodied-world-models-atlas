import {readFileSync, writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
import {deepGuide,mapSections,panorama,validateMap} from './maps.mjs';

process.chdir(fileURLToPath(new URL('../', import.meta.url)));
const root = 'https://github.com/hyfine/embodied-world-models-atlas';
const docs = `${root}/blob/main/docs/`;
const cutoff = '2026-11-23';
const decisionDiagram = readFileSync('assets/decision-loop.svg', 'utf8');
const families = {
  M: ['想象与规划', 'Imagination & planning'],
  F: ['感知与未来预测', 'Predicting observations'],
  P: ['技能与动作策略', 'Skills & policies'],
  J: ['世界—动作耦合', 'World-action coupling'],
  E: ['环境、数据与评测', 'Environments, data & evaluation'],
  S: ['综述入口', 'Survey lenses'],
};
const [header, ...lines] = readFileSync('data/works.tsv', 'utf8').trimEnd().split(/\r?\n/);
const columns = 'id year family name source paper github hub zh en'.split(' ');
assert.deepEqual(header.split('\t'), columns);
const ids = new Set();
const works = lines.map((line, i) => {
  const values = line.split('\t');
  assert.equal(values.length, columns.length, `columns on line ${i + 2}`);
  const r = Object.fromEntries(columns.map((name, j) => [name, values[j]]));
  assert(/^[a-z0-9-]+$/.test(r.id) && !ids.has(r.id), `bad or duplicate id: ${r.id}`);
  ids.add(r.id);
  assert(Object.hasOwn(families, r.family) && /^\d{4}$/.test(r.year) && +r.year <= +cutoff.slice(0, 4), r.id);
  assert(r.name && r.zh && r.en && r.source && new URL(r.paper).protocol === 'https:', r.id);
  for (const path of [r.github, r.hub].filter(Boolean)) assert(/^[\w.-]+(?:\/[\w.-]+)+$/.test(path), path);
  return r;
}).sort((a, b) => b.year - a.year || a.id.localeCompare(b.id, 'en'));
const esc = s => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
validateMap(works,families);
const links = (r, paperLabel) => [
  [paperLabel, r.paper],
  ...(r.github ? [['GitHub', `https://github.com/${r.github}`]] : []),
  ...(r.hub ? [['Hugging Face', `https://huggingface.co/${r.hub}`]] : []),
];
const catalog = `# 研究索引 · Research catalog\n\n[中文导读](docs/guide.zh-CN.md) · [English guide](docs/guide.en.md) · [Interactive atlas](${root.replace('github.com/hyfine', 'hyfine.github.io')}/) · [Selection rules](EVIDENCE.md)\n\n${works.length} entries · ${cutoff}. 年份指早期公开版本，source 指链接或标明的发表版本。Year denotes early public release, not necessarily proceedings year. Missing links mean not indexed, not unavailable.\n\n` +
  Object.entries(families).map(([f, [zh, en]]) => `## ${f} · ${zh} / ${en}\n\n` + works.filter(r => r.family === f).map(r => `<a id="${r.id}"></a>\n\n### ${r.year} · ${r.name}\n\n${r.zh}\n\n${r.en}\n\n${links(r, r.source).map(([label, url]) => `[${label}](<${url}>)`).join(' · ')}\n`).join('\n')).join('\n');

function page(en) {
  const t = (zh, eng) => en ? eng : zh;
  const lang = t('zh-CN', 'en');
  const guide = `${docs}guide.${lang}.md`, outlook = `${docs}outlook.${lang}.md`;
  const card = r => `<article class="record" data-family="${r.family}" data-extra="${esc([r.github, r.hub, r.zh, r.en].join(' '))}" id="${r.id}">
<div class="meta"><b>${r.year}</b> · ${r.family} / ${families[r.family][+en]}</div><h3>${esc(r.name)}</h3><p>${esc(t(r.zh, r.en))}</p><small>${esc(r.source)}</small><div class="links">${links(r, t('论文 ↗', 'Paper ↗')).map(([k, u]) => `<a href="${esc(u)}">${k}</a>`).join('')}</div></article>`;
  const count = (col) => new Set(works.map(r => r[col]).filter(Boolean)).size;
  return `<!doctype html>
<html lang="${lang}"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${t('具身智能 × 世界模型研究图谱','Embodied AI × World Models Atlas')}</title>
<meta name="description" content="${t('从推杯子读懂预测、规划和动作：双语研究图谱。','A bilingual field guide to prediction, planning and action, starting with a cup on a table.')}">
<link rel="stylesheet" href="assets/atlas.css"><link rel="stylesheet" href="assets/maps.css"><script defer src="assets/atlas.js"></script><script defer src="assets/maps.js"></script>
<body><a class="skip" href="#main">${t('跳到正文','Skip to content')}</a><header><div class="bar"><a href="#main" class="wordmark">◉ FIELD ATLAS</a><nav><a href="#maps">${t('演进','Evolution')}</a><a href="#architectures">${t('架构','Architecture')}</a><a href="#library">${t('索引','Library')}</a><a href="${root}">GitHub</a><a lang="${t('en','zh-CN')}" href="${t('index','zh')}.html">${t('English','中文')}</a></nav></div></header>
<main id="main"><div class="hero"><div class="wrap hero-grid"><div><div class="kicker">RESEARCH FIELDNOTES &nbsp; / &nbsp; ${cutoff}</div>
<h1>${t('具身智能<br><em>× 世界模型</em>','Embodied AI<br><em>× World Models</em>')}</h1>
<p>${t('会生成杯子滑动的视频，为什么还会推空？从一次接触出发，拆开预测、规划与动作。','A model can generate a cup sliding into place and still miss the cup. Start at the point of contact to separate prediction, planning and action.')}</p>
<a class="button" href="#maps">${t('探索技术演进','Explore the timeline')} →</a> <a class="hero-link" href="#decision-loop">${t('先看推杯实验','Start with the cup')}</a></div>
<a class="panorama" href="#swimlanes"><img src="assets/panorama.${lang}.svg" alt="${t('四个时期、六个家族的代表作；打开完整泳道图','Milestones across four eras and six families; open the full swimlanes')}"><span>${t('从反应式控制，到想象中的规划，再到未来与动作联合生成。完整泳道 →','From reactive control to imagined plans to joint futures and actions. Full swimlanes →')}</span></a></div></div>
<div class="wrap">${mapSections({works,families,en,esc,docs})}
<section id="cup-lab"><div class="plate"><div class="kicker">CUP LAB &nbsp; / &nbsp; MPC</div><h2>${t('选一个动作，看预测落在哪里。','Pick an action. Where does the prediction land?')}</h2>
<div class="track" aria-hidden="true"><span class="goal"></span><span class="cup">▰</span></div>
<div class="controls" id="actions">${[t('不动','Wait'),t('轻推','Gentle push'),t('重推','Hard push')].map((a,i) => `<button type="button" data-i="${i}" aria-pressed="${i===1}">${a}</button>`).join('')}</div>
<p id="prediction" aria-live="polite" data-label="${t('预测终点 / 距目标','Endpoint / distance to goal')}">${t('预测终点 / 距目标','Endpoint / distance to goal')}: 7 / 1</p><small>${t('教学假设：目标 = 8。模型不是实物；行动后必须再观察。','Toy example: goal = 8. The model is not the cup; observe again after acting.')}</small></div></section>
<section id="decision-loop"><div class="kicker">PLATE 02 &nbsp; / &nbsp; DECISION PATHS</div><h2>${t('同一只杯子，两条决策路线','One cup, two decision paths')}</h2>
<figure class="decision-diagram">${decisionDiagram}<figcaption><p><strong>${t('上轨：直接策略。','Top lane: direct policy.')}</strong> ${t('从观测和目标生成动作；不必先模拟三个未来。','Choose a push from the observation and goal. No explicit comparison of future states is required.')}</p>
<p><strong>${t('下轨：模型预测控制。','Bottom lane: model-predictive control.')}</strong> ${t('目标是 8。在不动、轻推、重推的预测终点（3、7、11）中，7 最近，于是轻推。杯子实际只到 4：下一步须从 4 重算，而不是从 7 接着推。','The goal is 8. Of the predicted endpoints for wait, gentle push and hard push (3, 7, 11), 7 is closest. Execute the gentle push. The cup only reaches 4: replan from 4, not 7.')}</p>
<small>${t('教学示意，非实测轨迹。','Illustrative values, not experimental results.')}</small><button class="replay" type="button" hidden>${t('↻ 重播决策过程','↻ Replay decision')}</button></figcaption></figure></section>
<section><div class="kicker">01 &nbsp; / &nbsp; READING ROUTES</div><h2>${t('从一个问题进入','Choose a question')}</h2><div class="routes">
<a href="${guide}"><b>01 / ${t('入门','Start')}</b><h3>${t('预测和策略，差在哪里？','Prediction or policy?')}</h3><p>${t('时间线、家族树与四个代表算法。','A timeline, family tree and four algorithms on one table.')}</p></a>
<a href="${outlook}"><b>02 / ${t('判断','Outlook')}</b><h3>${t('哪项实验会改变结论？','What would change our minds?')}</h3><p>${t('四条趋势，每条都有证据和反证。','Four calls, each paired with evidence and a test.')}</p></a>
<a href="#library"><b>03 / ${t('查证','Trace')}</b><h3>${t('从论文走到代码与权重','From paper to implementation')}</h3><p>${t('按方法家族筛选，回到一手来源。','Filter by family and follow primary sources.')}</p></a></div></section>
<section><div class="kicker">02 &nbsp; / &nbsp; FIELD TRANSECT</div><h2>${t('沿着问题的变化读历史','Trace the changing question')}</h2>
<div class="eras">${[
  ['1991',t('行动前必须建模吗？','Must an agent model before acting?'),'Brooks · Dyna','dyna'],
  ['2016–19',t('从画面还是潜状态预测？','Plan in pixels or latent states?'),'Visual Foresight · PlaNet','planet'],
  ['2019–23',t('训练时想，还是决策时想？','Imagine during training or acting?'),'Dreamer · TD-MPC2','dreamer'],
  ['2022–25',t('怎样把指令变成动作？','How do words become motor commands?'),'RT-2 · OpenVLA · π0','openvla'],
  ['2025–26',t('怎样让视觉未来约束动作？','Can a visual future constrain action?'),'V-JEPA 2-AC · DreamZero','dreamzero'],
].map(([yr,q,n,id])=>`<a href="${root}/blob/main/CATALOG.md#${id}"><b>${yr}</b><strong>${q}</strong><small>${n}</small></a>`).join('')}</div><p>${t('各时期重叠；新路线不意味着旧方法失效。','Periods overlap; a new route does not invalidate an older one.')}</p></section>
<section id="library"><div class="kicker">03 &nbsp; / &nbsp; RESEARCH LIBRARY</div><h2>${t('论文标本架','Research library')}</h2><p>${works.length} ${t('个条目','records')} · ${count('github')} ${t('个代码入口¹','code links¹')} · ${count('hub')} ${t('张模型卡','model cards')}</p>
<div class="filters"><label>${t('搜索','Search')} <input id="query" type="search" placeholder="Dreamer, VLA, MPC…"></label>
<label>${t('家族','Family')} <select id="family"><option value="">${t('全部','All')}</option>${Object.entries(families).map(([f,n])=>`<option value="${f}">${f} · ${n[+en]}</option>`).join('')}</select></label>
<output id="count" aria-live="polite">${works.length} / ${works.length}</output></div>
<noscript>${t('筛选和动作示意需要 JavaScript；全部论文仍可浏览。','Filters and the action demo need JavaScript; the full catalog is visible below.')}</noscript>
<p hidden id="empty">${t('没有匹配。请清空搜索词或更换家族。','No matches. Clear the query or try another family.')}</p>
<div class="records">${works.map(card).join('\n')}</div></section>
<footer>¹ ${t('去重的代码链接，不代表全部实验可复现。','Distinct code URLs, not a count of reproducible experiments.')} · <a href="${root}/blob/main/EVIDENCE.md">${t('检索与收录口径','Search & inclusion rules')}</a> · <a href="#main">↑ ${t('返回顶部','Top')}</a></footer>
</div></main></body></html>\n`;
}
const check = process.argv.includes('--check');
const english = page(true);
for (const [path, contents] of [['CATALOG.md', catalog], ['index.html', english], ['en.html', english], ['zh.html', page(false)],
  ...[true,false].flatMap(en=>[
    [`assets/panorama.${en?'en':'zh-CN'}.svg`,panorama(works,en)],
    [`docs/deep-dives.${en?'en':'zh-CN'}.md`,deepGuide(works,families,en)],
  ])]) {
  if (check) assert(contents === readFileSync(path, 'utf8'), `Stale ${path}: run node scripts/build.mjs`);
  else writeFileSync(path, contents);
}
console.log(`${check ? 'Verified' : 'Built'} ${works.length} records, two locales and catalog.`);
