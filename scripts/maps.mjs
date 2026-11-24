import assert from 'node:assert/strict';
import {layouts} from '../data/method-families.mjs';
import {cases} from '../data/deep-dives.mjs';
import {treePlate,timePlate} from './plates.mjs';
import {schematic} from './schematics.mjs';

const headings = {
  contract: ['输入与输出', 'Interface'],
  learn: ['学习或构建', 'Training or construction'],
  run: ['执行时发生什么', 'At execution time'],
  evidence: ['证据与对照', 'Evidence and comparison'],
  probe: ['精读练习与失败测试', 'Code-reading exercise and failure test'],
};
const short = {legged:'Legged Gym',cosmos:'Cosmos',touch:'Feeling of Success',brooks:'Brooks', 'survey-vla':'VLA survey','survey-wm':'World models survey',oxe:'OXE / RT-X',foresight:'Visual Foresight',vjepa2:'V-JEPA 2 / 2-AC',spatialumi:'Spatial-UMI-Dream'};

export function panorama(works,en) {
  const byId=new Map(works.map(r=>[r.id,r]));
  const rows=[
    ['M',en?'Plan':'想象与规划','#a1f4c6',['dyna','planet','dreamerv3',null]],
    ['F',en?'Predict':'未来预测','#8ddde7',[null,'foresight',null,'vjepa2']],
    ['P',en?'Act':'动作策略','#ffc682',['brooks',null,'rt2','pi0']],
    ['J',en?'Couple':'世界—动作','#faaab4',[null,null,null,'dreamzero']],
    ['E',en?'Evaluate':'数据与评测','#ccd3ff',[null,'habitat','oxe','simpler']],
    ['S',en?'Compare':'综述视角','#e3cf8b',[null,null,null,'survey-wm']],
  ];
  const labels={foresight:'Visual Foresight',vjepa2:'V-JEPA 2-AC',brooks:'Brooks',oxe:'OXE','survey-wm':'WM survey'};
  const x=i=>153+i*119;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 630 281" role="img" aria-labelledby="pan-title">
<title id="pan-title">${en?'Selected milestones in six reading families, grouped by era':'六个家族的分期代表作'}</title><rect width="630" height="281" rx="14" fill="#173c40"/>
<g font-family="system-ui,sans-serif"><text x="18" y="27" fill="#a1f4c6" font-size="13" letter-spacing="2">FIELD MAP　/　1991—2026</text>
${['1991','2016–19','2021–23','2024–26'].map((s,i)=>`<text x="${x(i)}" y="55" fill="#c6ddd0" font-size="14">${s}</text>`).join('')}
${rows.map(([f,label,color,ids],j)=>{
    const y=81+j*31;
    return `<text x="18" y="${y+4}" font-size="15" fill="${color}">${f} · ${label}</text><path d="M143 ${y}H615" stroke="#50716d"/>${ids.map((id,i)=>id?`<g><rect x="${x(i)-3}" y="${y-11}" rx="4" width="112" height="22" fill="#22494a"/><circle cx="${x(i)+1}" cy="${y}" r="3" fill="${color}"/><text x="${x(i)+9}" y="${y+4}" font-size="13" fill="#fffae9">${labels[id]||byId.get(id).name}</text></g>`:'').join('')}`;
  }).join('')}
<text x="18" y="269" font-size="13" fill="#bdd0c5">${en?'Selected examples, not ancestry. Empty cells do not imply inactivity.':'仅示代表，不表示继承关系；留白不代表该时期没有研究。'}</text></g></svg>\n`;
}

export function validateMap(works, families) {
  const assignments = [];
  assert.deepEqual(Object.keys(layouts),Object.keys(families));
  for (const [family,layout] of Object.entries(layouts)) {
    for (const [,,ids] of layout.branches) for (const id of ids.split(' ')) {
      assert.equal(works.find(r=>r.id===id)?.family,family,`Wrong family or unknown method: ${id}`);
      assignments.push(id);
    }
    assert(works.some(r=>r.id===layout.focus && r.family===family));
    const c = cases[layout.focus];
    for (const key of Object.keys(headings)) assert(c[key]?.length===2 && c[key].every(Boolean));
    for (const [,url] of c.code) assert(/\/blob\/[0-9a-f]{40}\//.test(url),url);
  }
  assert.deepEqual(assignments.sort(),works.map(r=>r.id).sort(),'Every work must have exactly one tree leaf');
}

export function deepGuide(works,families,en) {
  const l=+en, t=(zh,eng)=>en?eng:zh;
  const title=t('从论文到实现：六个精读案例','From papers to implementations: six case studies');
  let md=`# ${title}\n\n[${t('English','简体中文')}](deep-dives.${t('en','zh-CN')}.md) · [${t('交互架构图','Architecture explorer')}](https://hyfine.github.io/embodied-world-models-atlas/${t('zh.html','')}#architectures)\n\n${t('图示是代表路径，不是每个家族的统一算法。五项实现/评测案例附固定提交的源码，第六项是综述阅读示例。以下为代码与论文解读，未训练模型或复现成绩。','Each diagram is a representative path, not a universal family algorithm. Five implementation or evaluation cases link to fixed source revisions; the sixth demonstrates a survey lens. These are paper and code readings, not reproduced scores.')}\n\n`;
  for (const [family,layout] of Object.entries(layouts)) {
    const r=works.find(r=>r.id===layout.focus), c=cases[r.id];
    md+=`<a id="case-${r.id}"></a>\n\n## ${family} · ${r.name}\n\n${families[family][l]} · [${r.source}](<${r.paper}>)\n\n`;
    md+='```mermaid\nflowchart LR\n  '+layout.flow.map((p,i)=>`n${i}["${p[l]}"]`).join(' --> ')+'\n```\n\n'+layout.note[l]+'\n\n';
    for(const [key,label] of Object.entries(headings)) md+=`**${label[l]}.** ${c[key][l]}\n\n`;
    if(c.code.length)md+=`${t('固定源码','Pinned source')}: ${c.code.map(([a,b])=>`[${a}](${b})`).join(' · ')}\n\n`;
  }
  return md.trimEnd()+'\n';
}

export function mapSections({works,families,en,esc,docs}) {
  const l=+en, t=(zh,eng)=>en?eng:zh;
  const years=[...new Set(works.map(r=>+r.year))].sort((a,b)=>a-b);
  const fs=Object.keys(families), byId=new Map(works.map(r=>[r.id,r]));
  const title=id=>esc(short[id]||byId.get(id).name);
  const tabs=[['family-tree',t('方法路线图','Decision routes')],['trajectory',t('方法轨迹','Method trajectories')],['swimlanes',t('主入口泳道','Primary-route lanes')]];
  const panel=(id,content,description)=>`<figure class="map-panel" id="${id}"><div class="viewport">${content}</div><figcaption>${description}</figcaption></figure>`;
  const book=`${docs}deep-dives.${en?'en':'zh-CN'}.md`;
  return `<section id="maps"><div class="plate-head"><div class="kicker">INTERACTIVE FIELD PLATES &nbsp; / &nbsp; 1991—2026</div>
<div class="map-tabs">${tabs.map(([id,text],i)=>`<a href="#${id}" data-view="${id}"><small>0${i+1}</small> ${text}</a>`).join('')}</div></div>
${panel('family-tree',treePlate(works,en),t('树冠是四种读决策系统的入口；底部两层是研究基础设施和综述，不是控制算法。一项工作在图上只定位一次；点选可见交叉角色。枝条不表示技术继承。','The canopy has four entry points for decision systems. The two bands below hold infrastructure and surveys, not controllers. Each work has one address; select it for overlapping roles. Branches do not establish descent.'))}
${panel('trajectory',timePlate(works,en,false),t('每一行是一条方法路线，一站是一篇研究。横轴只显示有条目的年份，间距不代表真实时长；同年并列不代表先后。','One route per methodology, one stop per work. Only years with records are shown; spacing is not elapsed time and same-year stops are peers.'))}
${panel('swimlanes',timePlate(works,en,true),t('每条河是一类研究。圆点是论文，数字是该年收录数，河宽随收录数变化。两端之间的带状线是视觉插值，不表示未收录年份的活动量，更不是能力评分。','One river per family. Dots are works; numbers and width encode the indexed count in a release year. Ribbons interpolate between observations, not activity in missing years or capability.'))}
<div class="map-controls" hidden><button type="button" id="play-years" data-play="${t('▶ 回放','▶ Play years')}" data-pause="${t('Ⅱ 暂停','Ⅱ Pause')}">${t('▶ 回放','▶ Play years')}</button>
<label>${t('截至','Through')} <input id="map-year" type="range" min="0" max="${years.length-1}" value="${years.length-1}" data-years="${years.join(',')}" aria-valuetext="${years.at(-1)}"></label>
<output id="map-count" aria-live="off">${years.at(-1)} · ${works.length}/${works.length}</output>
<label>${t('主入口','Primary route')} <select id="map-family"><option value="">${t('全部','All')}</option>${fs.map(f=>`<option value="${f}">${f} · ${families[f][l]}</option>`).join('')}</select></label>
<div class="lens"><button type="button" data-zoom="out" aria-label="${t('缩小','Zoom out')}">−</button><output id="scale">100%</output><button type="button" data-zoom="in" aria-label="${t('放大','Zoom in')}">+</button><button type="button" data-zoom="reset">${t('复位','Fit')}</button></div></div>
<div class="family-key">${fs.map(f=>`<span data-f="${f}">${f} · ${families[f][l]}</span>`).join('')}</div>
<p><a href="${en?'perspectives':'perspectives.zh'}.html">${t('同一工作可以有多种角色：切换九篇综述的视角 →','A work can have several roles: compare nine survey perspectives →')}</a></p>
<aside class="map-inspector" aria-live="polite"><span>${t('点选一个节点查看其方法、局限和一手来源。','Select a node to inspect its mechanism, limitation and primary sources.')}</span></aside>
</section><section id="architectures"><div class="kicker">ARCHITECTURE PLATES &nbsp; / &nbsp; M F P J E S</div><h2>${t('从家族架构走到实现','From family architecture to implementation')}</h2><p>${t('展开每一类，沿组件读数据流。每张图取一条代表路径；E 与 S 分别是评测和综述流程，不是两种控制器。','Open a family and follow the data through its components. Each plate shows one representative path; E and S are evaluation and survey workflows, not controllers.')}</p>
${fs.map(f=>{
    const a=layouts[f],r=byId.get(a.focus);
    const code=({M:'WM-1',F:'WM-2',S:'SURVEY'})[f]||f;
    return `<details class="arch" data-f="${f}" id="arch-${f}"><summary>${f} · ${families[f][l]} <small> / ${title(r.id)}</small></summary>${schematic({code,representative:r.name,feedback:a.note},en,'family')}<p>${esc(a.note[l])}</p><a href="${book}#case-${r.id}">${t('精读','Deep dive')}: ${esc(r.name)} →</a> · <a href="${esc(r.paper)}">${t('论文','Paper')} ↗</a></details>`;
  }).join('')}</section>`;
}
