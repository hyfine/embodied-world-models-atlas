import {layouts} from '../data/method-families.mjs';

const colors={M:'#77e5bd',F:'#7bd5ed',P:'#ffbf78',J:'#fd9cab',E:'#bac0ff',S:'#e8d386'};
const familyName={M:['想象与规划','Planning'],F:['未来预测','Prediction'],P:['动作策略','Policy'],J:['世界—动作','World-action'],E:['环境与评测','Evaluation'],S:['综述视角','Survey lenses']};
const short={legged:'Legged Gym',cosmos:'Cosmos',touch:'Feeling of Success',brooks:'Brooks', 'survey-vla':'VLA survey','survey-wm':'WM survey',oxe:'OXE / RT-X',foresight:'Visual Foresight',vjepa2:'V-JEPA 2-AC',r2r:'Room-to-Room',spatialumi:'Spatial-UMI-Dream'};
const xml=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const name=r=>xml(short[r.id]||r.name);
const chronological=(a,b)=>a.year-b.year||a.id.localeCompare(b.id,'en');
const dated=(year,f)=>`data-born="${year}" data-f="${f}"`;
const oldest=rs=>Math.min(...rs.map(r=>+r.year));
const anchor=(r,body,transform='')=>`<a class="specimen" href="#${r.id}" data-node="${r.id}" data-y="${r.year}" data-f="${r.family}" transform="${transform}" aria-label="${r.year} · ${xml(r.name)}"><title>${r.year} · ${xml(r.name)}</title>${body}</a>`;
const label=(x,y,txt,size=13,align='start',fill='#d5e2d9')=>`<text x="${x}" y="${y}" text-anchor="${align}" fill="${fill}" font-size="${size}">${txt}</text>`;
const stroke=(d,color,width,attrs='')=>`<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" ${attrs}/>`;
function svg(id,height,body,title) {
  return `<svg xmlns="http://www.w3.org/2000/svg" class="atlas-plate" data-plate="${id}" width="1120" height="${height}" viewBox="0 0 1120 ${height}" role="group" aria-label="${title}" font-family="system-ui,sans-serif">
<defs><radialGradient id="fog-${id}"><stop stop-color="#284e48"/><stop offset="1" stop-color="#102927"/></radialGradient><pattern id="dots-${id}" width="19" height="19" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".8" fill="#bbd9c1" opacity=".19"/></pattern></defs>
<rect width="1120" height="${height}" rx="12" fill="url(#fog-${id})"/><rect width="1120" height="${height}" rx="12" fill="url(#dots-${id})"/>
${body}</svg>`;
}

export function treePlate(works,en) {
  const l=+en, byId=new Map(works.map(r=>[r.id,r]));
  let branches='', leaves='', headers='';
  // Allocate space by leaf count on each side, so names never compete for a row.
  for(const [sign,fs] of [[-1,['F','J']],[1,['M','P']]]) {
    const count=works.filter(r=>fs.includes(r.family)).length;
    const step=(452-40-21)/(count-1);
    let y=40;
    for(const [i,f] of fs.entries()) {
      const rs=works.filter(r=>r.family===f), ink=colors[f];
      const fy=y+(rs.length-1)*step/2, fyRoot=fy*.68+150;
      const coord=dist=>560+sign*dist, xpos=coord(153);
      const path=`M560 ${fyRoot} C${coord(46)} ${fyRoot+5} ${coord(87)} ${fy+29} ${xpos} ${fy+7}`;
      branches+=stroke(path,ink,7-i*.8,`${dated(oldest(rs),f)} class="wood" pathLength="1"`);
      headers+=`<g ${dated(oldest(rs),f)}>${label(xpos,fy-3,`${f} / ${familyName[f][l]}`,15,sign<0?'end':'start',ink)}</g>`;
      for(const branch of layouts[f].branches) {
        const items=branch[2].split(' ').map(id=>byId.get(id)).sort(chronological);
        const mid=y+(items.length-1)*step/2+7, bx=coord(244);
        branches+=stroke(`M${xpos} ${fy+7} Q${coord(186)} ${fy+18} ${bx} ${mid}`,ink,3.2,`${dated(oldest(items),f)} class="wood" pathLength="1"`);
        for (const [k,r] of items.entries()) {
          const dx=310+Math.sin(Math.PI*y/510)*43+(k%2)*14;
          const px=coord(dx), py=y, bend=py+(mid-py)*.27+8;
          branches+=stroke(`M${bx} ${mid} Q${coord(dx-37)} ${bend} ${px} ${py}`,ink,1.45,`${dated(r.year,f)} class="wood" pathLength="1"`);
          const leaf=`<g transform="scale(${sign} 1)"><path d="M0 0Q8 -12 19 -7Q15 3 0 0Z" fill="${ink}"/><path d="M2 -1L15 -6" stroke="#264c43" stroke-width="1"/></g>`;
          leaves+=anchor(r,`<rect class="hit" fill="transparent" x="${sign<0?-165:-4}" y="-13" width="169" height="18" rx="4"/>${leaf}${label(sign*24,3,name(r),12.6,sign<0?'end':'start','#f2f4db')}`,`translate(${px} ${py})`);
          y+=step;
        }
      }
      y+=21;
    }
  }
  let roots='';
  for(let i=-4;i<=4;i++) roots+=stroke(`M560 465 Q${560+i*6} 488 ${560+i*28} ${490+Math.abs(i)%3*4}`,'#bca780',1.8+2/(Math.abs(i)+1));
  const trunk='<path d="M532 488Q560 439 551 363Q544 305 555 239Q563 193 554 166Q579 204 566 267Q559 331 572 389Q578 454 592 487Q563 475 532 488Z" fill="#bcb187"/>';
  const rings=[145,245,340,438].map(r=>`<circle cx="560" cy="448" r="${r}" fill="none" stroke="#adcbb0" stroke-opacity=".08" stroke-dasharray="2 8"/>`).join('');
  const supports=['E','S'].map((f,i)=>{
    const y=546+i*40,rs=works.filter(r=>r.family===f).sort(chronological);
    return `<g data-layer="${f}"><rect x="14" y="${y-17}" width="1092" height="34" rx="5" fill="#17332e" stroke="#587369"/>${label(27,y+4,f==='E'?(en?'E · Research infrastructure':'E · 研究基础设施'):(en?'S · Survey perspectives':'S · 综述视角'),13,'start',colors[f])}${rs.map((r,j)=>anchor(r,`<rect class="hit" x="-6" y="-12" width="131" height="25" rx="3" fill="transparent"/><circle r="3" fill="${colors[f]}"/>${label(9,4,name(r),12)}`,`translate(${236+j*143} ${y})`)).join('')}</g>`;
  }).join('');
  return svg('canopy',613,`${rings}${roots}${trunk}${branches}${headers}${leaves}${label(560,512,en?'PERCEPTION   /   ACTION':'感知　/　行动',12,'middle','#d5c299')}${supports}`,en?'Four decision routes with separate infrastructure and survey layers':'四条决策路线与独立的资源、综述支撑层');
}

export function timePlate(works,en,lanes) {
  const fs=Object.keys(layouts), years=[...new Set(works.map(r=>+r.year))].sort((a,b)=>a-b);
  const x=y=>228+years.indexOf(+y)*84;
  const yearLine=height=>years.map(y=>`<g data-tick="${y}" data-x="${x(y)}">${stroke(`M${x(y)} 42V${height-19}`,'#39594e',.8)}${label(x(y),28,y,13,'middle')}</g>`).join('');
  let body='', row=0;
  for (const f of fs) {
    const ink=colors[f], family=works.filter(r=>r.family===f);
    if (lanes) {
      const y=79+row++*65;
      body+=`<g data-lane="${f}">${label(22,y+5,`${f} · ${familyName[f][+en]}`,16,'start',ink)}${stroke(`M222 ${y}H1082`,'#44605a',1)}`;
      let previous;
      for(const year of years) {
        const rs=family.filter(r=>+r.year===year).sort(chronological);
        if (!rs.length) continue;
        const px=x(year), half=6+rs.length*3;
        if(previous) {
          const [ax,ah]=previous, mid=(ax+px)/2;
          body+=`<path ${dated(year,f)} class="river" fill="${ink}" fill-opacity=".35" d="M${ax} ${y-ah} C${mid} ${y-ah} ${mid} ${y-half} ${px} ${y-half} V${y+half} C${mid} ${y+half} ${mid} ${y+ah} ${ax} ${y+ah}Z"/>`;
        }
        previous=[px,half];
        body+=`<g ${dated(year,f)}>${label(px,y+29,`${rs.length}`,11,'middle',ink)}</g>`;
      }
      for(const year of years) {
        const rs=family.filter(r=>+r.year===year).sort(chronological);
        rs.forEach((r,i)=>{
          const off=(i-(rs.length-1)/2)*14;
          body+=anchor(r,`<circle class="hit" r="10"/><circle r="5.3" fill="${ink}" stroke="#142f2c" stroke-width="1.3"/>`,`translate(${x(year)+off} ${y})`);
        });
      }
      body+='</g>';
    } else {
      for(const b of layouts[f].branches) {
        const rs=b[2].split(' ').map(id=>works.find(r=>r.id===id)).sort(chronological);
        const y=61+row++*31;
        body+=`<g ${dated(oldest(rs),f)}>${label(14,y+4,`${f} · ${xml(b[+en])}`,12.8,'start',ink)}</g>`;
        let prev;
        for(const r of rs) {
          const same=rs.filter(s=>s.year===r.year);
          const px=x(r.year)+(same.indexOf(r)-(same.length-1)/2)*18;
          const py=y+(years.indexOf(+r.year)%3-1)*4;
          if(prev) {
            const [ax,ay]=prev, mid=(ax+px)/2;
            body+=stroke(`M${ax} ${ay} C${mid} ${ay} ${mid} ${py} ${px} ${py}`,ink,2.6,`${dated(r.year,f)} class="wood" pathLength="1"`);
          }
          prev=[px,py];
          body+=anchor(r,`<circle class="hit" r="10"/><circle r="5.5" stroke="${ink}" stroke-width="2.6" fill="#173632"/>`,`translate(${px} ${py})`);
        }
      }
    }
  }
  const height=lanes?445:57+row*31;
  return svg(lanes?'rivers':'routes',height,yearLine(height)+body,lanes?(en?'Family publication swimlanes':'家族成果泳道'):(en?'Chronological methodology routes':'方法路线时间轨迹'));
}
