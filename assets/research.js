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
for (const plate of document.querySelectorAll('.runtime-plate')) {
  const steps = [...plate.querySelectorAll('li')];
  const controls = plate.querySelector('.step-controls');
  let current = -1;
  function highlight(i) {
    current = i;
    for (const [idx, step] of steps.entries()) step.classList.toggle('current', idx === current);
    controls.querySelector('output').textContent = current < 0 ? '' : `${i + 1}/${steps.length} · ${steps[i].lastChild.textContent}`;
  }
  controls.querySelector('[data-step]').addEventListener('click', () => highlight((current + 1) % steps.length));
  controls.querySelector('[data-reset]').addEventListener('click', () => highlight(-1));
  controls.hidden = false;
}
