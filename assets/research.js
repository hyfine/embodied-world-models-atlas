const rows = [...document.querySelectorAll('[data-row]')];
if (rows.length) {
  const input = document.querySelector('#find-row');
  const family = document.querySelector('#row-family');
  const level = document.querySelector('#row-level');
  const filter = () => {
    const q = input.value.trim().toLowerCase();
    let n = 0;
    for (const row of rows) {
      row.hidden = (family.value && row.dataset.family !== family.value)
        || (level.value && row.dataset.level !== level.value)
        || !`${row.id} ${row.textContent}`.toLowerCase().includes(q);
      if (!row.hidden) n++;
    }
    document.querySelector('#row-count').textContent = `${n} / ${rows.length}`;
  };
  input.addEventListener('input', filter);
  family.addEventListener('change', filter);
  level.addEventListener('change', filter);
  const reveal = () => {
    const row = document.getElementById(location.hash.slice(1));
    if (row?.matches('[data-row]')) {
      if (row.hidden) {input.value = family.value = level.value = ''; filter();}
      row.open = true;
      row.scrollIntoView();
    }
  };
  window.addEventListener('hashchange', reveal);
  reveal();
}
for (const plate of document.querySelectorAll('.schematic')) {
  const edges = [...plate.querySelectorAll('[data-edge]')];
  const nodes = [...plate.querySelectorAll('[data-module]')];
  const controls = plate.querySelector('.step-controls');
  let current = -1;
  function highlight(i) {
    current = i;
    const active = edges[i]?.dataset;
    for (const [idx, edge] of edges.entries()) edge.classList.toggle('current', idx === i);
    for (const node of nodes) node.classList.toggle('current', Boolean(active && [active.from,active.to].includes(node.dataset.module)));
    controls.querySelector('output').textContent = active ? `${i + 1}/${edges.length} · ${active.caption}` : '';
  }
  controls.querySelector('[data-step]').addEventListener('click', () => highlight((current + 1) % edges.length));
  controls.querySelector('[data-reset]').addEventListener('click', () => highlight(-1));
  controls.hidden = false;
}
const picker=document.querySelector('.studio-pick');
if (picker) {
  const select=picker.querySelector('select');
  const showSystem=()=>{for(const card of document.querySelectorAll('.studio-card'))card.hidden=card.dataset.system!==select.value;};
  select.addEventListener('change',showSystem);
  showSystem();picker.hidden=false;
}

const explorer=document.querySelector('#crosswalk');
if(explorer) {
  const choice=explorer.querySelector('#survey-choice'), pair=explorer.querySelector('#only-pair');
  const questions=[...explorer.querySelectorAll('[data-rev]')], profiles=[...explorer.querySelectorAll('[data-work]')];
  const filters=[...explorer.querySelectorAll('[data-filter]')];
  const clear=()=>filters.forEach(f=>{f.value='';});
  function refresh(){
    const question=questions.find(q=>q.dataset.rev===choice.value);
    for(const q of questions)q.hidden=q!==question;
    for(const cell of explorer.querySelectorAll('[data-col]'))cell.classList.toggle('coord-focus',cell.dataset.col===question.dataset.axis);
    const ids=question.dataset.pair.split(' ');
    let n=0;
    for(const row of profiles){
      const include=(!pair.checked||ids.includes(row.dataset.work))&&filters.every(f=>!f.value||row.dataset[f.dataset.filter].split(' ').includes(f.value));
      row.hidden=!include;
      if(include)n++;
    }
    explorer.querySelector('#coord-count').textContent=`${n} / ${profiles.length}`;
    explorer.querySelector('#empty-profiles').hidden=n>0;
  }
  choice.addEventListener('change',()=>{clear();pair.checked=true;refresh();});
  pair.addEventListener('change',refresh);
  for(const f of filters)f.addEventListener('change',refresh);
  explorer.querySelector('#all-profiles').addEventListener('click',()=>{clear();pair.checked=false;refresh();});
  refresh();
  for(const group of explorer.querySelectorAll('[data-lens-controls]'))group.hidden=false;
}
