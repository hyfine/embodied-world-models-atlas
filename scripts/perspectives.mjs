import assert from 'node:assert/strict';
import {axes, coordinates, facetsOf, surveyLenses} from '../data/survey-coordinates.mjs';

const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');

export function validatePerspectives(works,pdfs) {
  assert.deepEqual(Object.keys(coordinates).sort(),works.map(r=>r.id).sort(),'Every introductory record needs one coordinate profile');
  for(const w of works) {
    const f=facetsOf(w.id);
    assert(f.role.includes(w.family),`${w.id}: missing primary role`);
    for(const [axis,keys] of Object.entries(f)) {
      assert(keys.length===new Set(keys).size&&keys.every(k=>Object.hasOwn(axes[axis].values,k)),`${w.id}: invalid ${axis}`);
      assert(!keys.includes('na')||keys.length===1,`${w.id}: N/A cannot be combined`);
    }
  }
  const revs=pdfs.filter(p=>p.category==='SURVEY').map(p=>p.arxiv+p.version);
  assert.deepEqual(surveyLenses.map(s=>s.rev).sort(),revs.sort(),'Every local survey edition should have one lens');
  for(const s of surveyLenses)assert(Object.hasOwn(axes,s.axis)&&s.compare.length===2&&s.compare[0]!==s.compare[1]&&s.compare.every(id=>Object.hasOwn(coordinates,id)),s.author);
}

export function renderPerspectives(works,en) {
  const l=+en,t=(zh,eng)=>en?eng:zh;
  const runtime=en?'runtime.html':'runtime.zh.html',ledger=en?'evidence.html':'evidence.zh.html';
  const byId=new Map(works.map(r=>[r.id,r]));
  return `<div class="perspectives" id="crosswalk">
<p>${t('先选综述提出的问题，再对照两项研究。这里把作者的分类问题应用到本站例子，并非声称综述收录了这些例子或赞同这些标签。','Pick a question and compare two works. These are editorial applications of the authors’ questions, not claims that the surveys cited the examples or endorsed the tags.')}</p>
<div class="desk-filters" data-lens-controls hidden><label>${t('选阅读视角','Reading lens')} <select id="survey-choice">${surveyLenses.map((s,i)=>`<option value="${s.rev}">${i+1}. ${s.author} · ${s.question[l]}</option>`).join('')}</select></label></div>
${surveyLenses.map(s=>`<article class="contrast survey-question" data-rev="${s.rev}" data-axis="${s.axis}" data-pair="${s.compare.join(' ')}"><small>${s.author} · <a href="https://arxiv.org/abs/${s.rev}">arXiv:${s.rev}</a> · ${s.where}</small><h2>${s.question[l]}</h2><p>${s.take[l]}</p><p>${s.compare.map(id=>`<a href="${esc(byId.get(id).paper)}">${esc(byId.get(id).name)}</a>`).join(' ↔ ')} · <a href="${runtime}#${s.direction}">${t('工作簿方向与运行图','Workbook direction and diagram')} →</a>${s.author==='Zhong'?` · <a href="${ledger}#row-main-163">FAST</a>`:''}</p></article>`).join('')}
<h2>${t('同一条目，五个独立问题','One record, five independent questions')}</h2>
<div class="desk-filters" data-lens-controls hidden><label><input type="checkbox" id="only-pair" checked> ${t('仅看本视角的对照组','Only the selected pair')}</label>
<button type="button" id="all-profiles">${t('浏览全部 / 清空条件','Browse all / clear filters')}</button><output id="coord-count" aria-live="polite"></output></div>
<div class="coord-filters" data-lens-controls hidden>${Object.entries(axes).map(([key,a])=>`<label>${a.name[l]} <select data-filter="${key}"><option value="">${t('不限','Any')}</option>${Object.entries(a.values).map(([v,p])=>`<option value="${v}">${p[l]}</option>`).join('')}</select></label>`).join('')}</div>
<p>${t('不同列的筛选条件取交集；同一工作可有多个角色，但只占一行。“未细标”不代表没有；“无此动作输出”可能仍接受动作输入。实验场景不是证据等级。','Filters intersect across columns. A work can have multiple roles but occupies one row. “Not indexed” is not absence; a predictor may take actions without outputting any. Evidence settings are not capability grades.')}</p>
<p id="empty-profiles" hidden>${t('这批精选中没有同时满足这些条件的条目；不能据此断言这种组合不存在。','No curated profile matches this intersection. An empty cell does not establish that the combination is impossible.')}</p>
<div class="coord-scroll" tabindex="0"><table class="coord-table"><thead><tr><th>${t('工作 / 主入口','Work / primary route')}</th>${Object.entries(axes).map(([k,a])=>`<th data-col="${k}">${a.name[l]}</th>`).join('')}</tr></thead><tbody>
${works.map(w=>{const f=facetsOf(w.id);return `<tr data-work="${w.id}" ${Object.entries(f).map(([k,v])=>`data-${k}="${v.join(' ')}"`).join(' ')}><th scope="row"><a href="${esc(w.paper)}">${esc(w.name)}</a><small>${w.year} · ${w.family}</small></th>${Object.entries(f).map(([k,v])=>`<td data-col="${k}">${v.map(key=>axes[k].values[key][l]).join(' · ')}</td>`).join('')}</tr>`;}).join('')}
</tbody></table></div>
<details><summary>${t('怎么理解这些坐标？','How should I interpret these coordinates?')}</summary><p>${t('坐标只描述导读中那条执行或评测路径，不是对一个系统所有版本的普查。动作表示可能是模型接受的输入，也可能是策略给出的输出；跨度只看动作输出，不是世界模型向前想象多少步。OXE/RT-X 是复合条目：E 对应数据，P 对应模型，不把数据集当策略。','Profiles describe the illustrated execution or evaluation path, not every release. Control format may refer to an input to a predictor or an output of a policy; output span is not a planning horizon. OXE/RT-X is a compound record: E denotes the data and P the models; the dataset does not act.')}</p></details>
<p><a href="https://github.com/hyfine/embodied-world-models-atlas/blob/main/docs/taxonomy-review.md">${t('逐篇判据、冲突和原页定位','Survey audit, disagreements and physical-page references')} ↗</a></p></div>`;
}
