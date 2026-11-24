import assert from 'node:assert/strict';
import {schematics} from '../data/system-schematics.mjs';

const safe=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const loc=(s,en)=>{const parts=s.split('|');return safe(parts.length===1?parts[0]:parts[+en]);};
const point=(col,row)=>[155+col*320,79+row*145];
const roles={in:['输入','INPUT'],op:['处理','MODULE'],out:['输出','OUTPUT']};
const kinds={data:['数据','Data'],feedback:['反馈','Feedback'],inner:['内部更新','Internal update']};
function wire(a,b,route) {
  const [x,y]=a,[u,v]=b,dx=Math.sign(u-x),dy=Math.sign(v-y);
  if(route==='top-right')return `M${x} ${y-37} V15 H932 V${v} H${u+124}`;
  if(route==='top'||route==='bottom'){
    const d=route==='top'?-1:1;
    return `M${x+14} ${y+d*37} V${d<0?15:287} H${u+14} V${v+d*39}`;
  }
  if(!dy)return `M${x+dx*124} ${y} H${u-dx*126}`;
  if(!dx){
    const offset=dy<0?16:-16;
    return `M${x+offset} ${y+dy*37} V${v-dy*39}`;
  }
  // Separate opposing diagonals in the gutter between the two module banks.
  const mid=(y+v)/2+(dx>0?7:-7),ax=x+dx*40,bx=u-dx*40;
  return `M${ax} ${y+dy*37} V${mid} H${bx} V${v-dy*39}`;
}

export function schematic(card,en,scope='runtime') {
  const graph=schematics[card.graphCode??card.code], l=+en, id=`${scope}-${card.code.toLowerCase()}`;
  assert(graph,`Missing architecture for ${card.code}`);
  const components=new Map(graph.nodes.map(([key,col,row])=>[key,point(col,row)]));
  assert(components.size===graph.nodes.length);
  const edgeData=graph.edges.map(([from,to,label,route,kind='data'],i)=>{
    assert(components.has(from)&&components.has(to)&&kinds[kind],`${id}: invalid edge ${from} -> ${to}`);
    const text=loc(label,en);
    return `<g class="signal ${kind}" data-edge="${i}" data-from="${from}" data-to="${to}" data-caption="${text}"><title>${text}</title><path d="${wire(components.get(from),components.get(to),route)}" marker-end="url(#${id}-${kind})"/></g>`;
  });
  const graphNodes=graph.nodes.map(([key,col,row,role,title,value])=>{
    const [x,y]=point(col,row);
    return `<g class="module ${role}" data-module="${key}" transform="translate(${x} ${y})"><rect x="-122" y="-35" width="244" height="70" rx="9"/>
<text class="module-role" x="-109" y="-18">${roles[role][l]}</text><text class="module-title" y="3">${loc(title,en)}</text><text class="module-port" y="22">${loc(value,en)}</text></g>`;
  });
  return `<figure class="schematic" aria-label="${safe(card.representative)}">
<div class="phase"><b>${en?'Before this run':'运行之前'}</b><span>${loc(graph.prep,en)}</span></div>
<div class="circuit-scroll" tabindex="0" aria-label="${en?'System diagram; scroll horizontally on small screens':'系统图；小屏可横向滑动'}"><svg class="circuit" viewBox="0 0 950 304" role="img" aria-labelledby="${id}-title ${id}-desc">
<title id="${id}-title">${safe(card.representative)} · ${en?'system data flow':'系统数据流'}</title><desc id="${id}-desc">${safe(card.feedback[l])}</desc>
<defs>${Object.keys(kinds).map(k=>`<marker id="${id}-${k}" viewBox="0 0 10 8" refX="8" refY="4" markerWidth="6" markerHeight="5" orient="auto"><path d="M0 0 L9 4 L0 8Z" fill="${{data:'#286f65',feedback:'#ac521f',inner:'#71518c'}[k]}"/></marker>`).join('')}</defs>${edgeData.join('')}${graphNodes.join('')}</svg></div>
<figcaption class="circuit-key">${Object.entries(kinds).filter(([k])=>graph.edges.some(e=>(e[4]||'data')===k)).map(([k,v])=>`<span class="key-${k}">${v[l]}</span>`).join('')}<small>${en?'Logical interfaces, not measured timings':'逻辑接口，非耗时测量'}</small></figcaption>
<div class="step-controls" hidden><button type="button" data-step>${en?'Trace signal':'追踪信号'} →</button><button type="button" data-reset>${en?'Reset':'重置'}</button><output aria-live="polite"></output></div></figure>`;
}
