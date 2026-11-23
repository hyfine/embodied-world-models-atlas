import assert from 'node:assert/strict';
import {layouts} from '../data/method-families.mjs';
import {cases} from '../data/deep-dives.mjs';

const headings = {
  contract: ['输入与输出', 'Interface'],
  learn: ['学习或构建', 'Training or construction'],
  run: ['执行时发生什么', 'At execution time'],
  evidence: ['证据与对照', 'Evidence and comparison'],
  probe: ['精读练习与失败测试', 'Code-reading exercise and failure test'],
};
const short = {legged:'Legged Gym',cosmos:'Cosmos',touch:'Feeling of Success',brooks:'Brooks', 'survey-vla':'VLA survey','survey-wm':'World models survey',oxe:'OXE / RT-X',foresight:'Visual Foresight',vjepa2:'V-JEPA 2 / 2-AC',spatialumi:'Spatial-UMI-Dream'};
const order = (a,b) => a.year-b.year || a.id.localeCompare(b.id,'en');

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
  const cw=153, x=i=>65+cw*i, width=x(years.length)+14;
  const title=id=>esc(short[id]||byId.get(id).name);
  const attrs=r=>`data-node="${r.id}" data-y="${r.year}" data-f="${r.family}"`;
  function node(r,left,top) {
    return `<a class="map-node" href="#${r.id}" ${attrs(r)} transform="translate(${left} ${top})"><title>${r.year} · ${esc(r.name)}</title><rect x="-8" y="-13" width="146" height="21" rx="5"/><circle r="4"/><text x="9" y="4">${title(r.id)}</text></a>`;
  }
  function plot(lanes) {
    const yr=year=>works.filter(r=>+r.year===year).sort(order);
    let rows='', height=0;
    if (!lanes) {
      const max=Math.max(...years.map(y=>yr(y).length));
      height=75+max*29;
      rows=`<path class="axis" d="M${x(0)} 36H${x(years.length-1)}"/>`+years.map((y,i)=>{
        const col=yr(y);
        return `<g><path class="axis" d="M${x(i)} 36v${15+col.length*29}"/>${col.map((r,j)=>node(r,x(i),65+j*29)).join('')}</g>`;
      }).join('');
    } else {
      let y0=48;
      for(const f of fs) {
        const inLane=works.filter(r=>r.family===f);
        const n=Math.max(...years.map(y=>inLane.filter(r=>+r.year===y).length));
        const h=35+n*24;
        const inds=years.map((y,i)=>inLane.some(r=>+r.year===y)?i:-1).filter(i=>i>=0);
        rows+=`<g data-lane="${f}"><rect class="lane-bed" x="5" y="${y0-12}" width="${width-12}" height="${h-2}"/><text class="lane-id" x="20" y="${y0+10}">${f}</text><line class="rail" data-rail="${f}" x1="${x(inds[0])}" x2="${x(inds.at(-1))}" y1="${y0}" y2="${y0}"/>`;
        years.forEach((y,i)=>{
          rows+=inLane.filter(r=>+r.year===y).sort(order).map((r,j)=>node(r,x(i),y0+19+j*24)).join('');
        });
        rows+='</g>'; y0+=h;
      }
      height=y0;
    }
    const id=lanes?'swimlanes':'trajectory';
    return `<div class="map-panel" id="${id}"><div class="plot-scroll" tabindex="0" aria-label="${t('横向滚动时间轴','Horizontally scrollable time axis')}"><svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="group" aria-label="${lanes?t('类别泳道图','Family swimlanes'):t('方法时间轨迹','Method timeline')}">
${years.map((y,i)=>`<g class="tick" data-tick="${y}" data-x="${x(i)}"><text x="${x(i)}" y="21">${y}</text><circle cx="${x(i)}" cy="36" r="3"/></g>`).join('')}
${rows}</svg></div></div>`;
  }
  const tree=fs.map(f=>`<details class="tree-family" data-lane="${f}" ${f==='M'?'open':''}><summary>${f} · ${families[f][l]}</summary>${layouts[f].branches.map(branch=>`<div class="twig"><strong>${esc(branch[l])}</strong><div>${branch[2].split(' ').map(id=>byId.get(id)).sort(order).map(r=>`<a class="leaf" href="#${r.id}" ${attrs(r)}>${r.year} · ${title(r.id)}</a>`).join('')}</div></div>`).join('')}</details>`).join('');
  const tabs=[['trajectory',t('方法时间轨迹','Method timeline')],['swimlanes',t('类别泳道','Family swimlanes')],['family-tree',t('家族树','Family tree')]];
  const book=`${docs}deep-dives.${en?'en':'zh-CN'}.md`;
  return `<section id="maps"><div class="kicker">RESEARCH MAP &nbsp; / &nbsp; 1991—2026</div><h2>${t('回放方法的演进','Replay the development of methods')}</h2>
<p>${t('三个视图使用同一批记录。横轴按有收录成果的年份等距排列，不代表实际时间间隔。分支表示方法归类，不是已证实的技术继承。','Three views of the same records. Release years with entries are evenly spaced, not proportional to elapsed time. Branches indicate reading families, not proven descent.')}</p>
<div class="map-tabs">${tabs.map(([id,text])=>`<a href="#${id}" data-view="${id}">${text}</a>`).join('')}</div>
<div class="map-controls" hidden><button type="button" id="play-years" data-play="${t('▶ 回放','▶ Play years')}" data-pause="${t('Ⅱ 暂停','Ⅱ Pause')}">${t('▶ 回放','▶ Play years')}</button>
<label>${t('截至','Through')} <input id="map-year" type="range" min="0" max="${years.length-1}" value="${years.length-1}" data-years="${years.join(',')}" aria-valuetext="${years.at(-1)}"></label>
<output id="map-count" aria-live="off">${years.at(-1)} · ${works.length}/${works.length}</output>
<label>${t('家族','Family')} <select id="map-family"><option value="">${t('全部','All')}</option>${fs.map(f=>`<option value="${f}">${f} · ${families[f][l]}</option>`).join('')}</select></label></div>
<div class="family-key">${fs.map(f=>`<span data-f="${f}">${f} · ${families[f][l]}</span>`).join('')}</div>
<aside class="map-inspector" aria-live="polite"><span>${t('点选一个节点查看其方法、局限和一手来源。','Select a node to inspect its mechanism, limitation and primary sources.')}</span></aside>
${plot(false)}${plot(true)}<div class="map-panel" id="family-tree"><div class="tree-root">${t('感知 → 选择 → 行动 → 再观测','Sense → choose → act → observe')}</div>${tree}</div>
</section><section id="architectures"><div class="kicker">ARCHITECTURE PLATES &nbsp; / &nbsp; M F P J E S</div><h2>${t('从家族架构走到实现','From family architecture to implementation')}</h2><p>${t('展开每一类，沿组件读数据流。每张图取一条代表路径；E 与 S 分别是评测和综述流程，不是两种控制器。','Open a family and follow the data through its components. Each plate shows one representative path; E and S are evaluation and survey workflows, not controllers.')}</p>
${fs.map(f=>{
    const a=layouts[f],r=byId.get(a.focus);
    return `<details class="arch" data-f="${f}" id="arch-${f}" ${f==='M'?'open':''}><summary>${f} · ${families[f][l]} <small> / ${title(r.id)}</small></summary><ol class="flow">${a.flow.map((p,i)=>`<li style="--step:${i}"><b>0${i+1}</b>${esc(p[l])}</li>`).join('')}</ol><p>${esc(a.note[l])}</p><a href="${book}#case-${r.id}">${t('精读','Deep dive')}: ${esc(r.name)} →</a> · <a href="${esc(r.paper)}">${t('论文','Paper')} ↗</a></details>`;
  }).join('')}</section>`;
}
