(() => {
  const map = document.querySelector('#maps');
  const slider = map.querySelector('#map-year');
  const years = slider.dataset.years.split(',').map(Number);
  const family = map.querySelector('#map-family');
  const play = map.querySelector('#play-years');
  const tabs = [...map.querySelectorAll('[data-view]')];
  const panels = [...map.querySelectorAll('.map-panel')];
  const nodes = [...map.querySelectorAll('[data-node]')];
  const inspector = map.querySelector('.map-inspector');
  const prompt = inspector.firstElementChild;
  let selected, timer;
  function showView(id) {
    for (const panel of panels) panel.hidden = panel.id !== id;
    for (const tab of tabs) tab.setAttribute('aria-current', tab.dataset.view === id ? 'true' : 'false');
  }
  function fromHash() {
    const target = location.hash.slice(1);
    if (panels.some(p => p.id === target)) showView(target);
  }
  function pause() {
    clearInterval(timer);
    timer = undefined;
    play.textContent = play.dataset.play;
  }
  function inspect(id) {
    selected = id;
    if (id) {
      const record = document.getElementById(id);
      inspector.replaceChildren(...['h3','p','.links'].map(s => record.querySelector(s).cloneNode(true)));
    } else inspector.replaceChildren(prompt);
    for (const node of nodes) node.classList.toggle('chosen',node.dataset.node === id);
  }
  function update(follow = false) {
    const cutoff = years[Number(slider.value)];
    const seen = new Set();
    for (const node of nodes) {
      const visible = Number(node.dataset.y) <= cutoff && (!family.value || node.dataset.f === family.value);
      node.toggleAttribute('hidden',!visible);
      if (visible) seen.add(node.dataset.node);
    }
    for (const twig of map.querySelectorAll('.twig,.tree-family')) {
      twig.hidden = !twig.querySelector('[data-node]:not([hidden])');
    }
    const swim = map.querySelector('#swimlanes');
    for (const lane of swim.querySelectorAll('[data-lane]')) {
      const shown = [...lane.querySelectorAll('[data-node]:not([hidden])')];
      lane.classList.toggle('inactive',!shown.length);
      const rail = lane.querySelector('.rail');
      rail.toggleAttribute('hidden',!shown.length);
      if (shown.length) {
        const end = shown.at(-1).dataset.y;
        rail.setAttribute('x2',swim.querySelector(`[data-tick="${end}"]`).dataset.x);
      }
    }
    for (const tick of map.querySelectorAll('[data-tick]')) tick.classList.toggle('future',Number(tick.dataset.tick)>cutoff);
    if (selected && !seen.has(selected)) inspect(undefined);
    slider.setAttribute('aria-valuetext',String(cutoff));
    map.querySelector('#map-count').textContent = `${cutoff} · ${seen.size}/${document.querySelectorAll('.record').length}`;
    if (follow) {
      const panel = panels.find(p=>!p.hidden);
      const scroller = panel.querySelector('.plot-scroll');
      if (scroller) {
        const x = Number(panel.querySelector(`[data-tick="${cutoff}"]`).dataset.x);
        scroller.scrollLeft = Math.max(0,x - scroller.clientWidth*.65);
      }
    }
  }
  for (const tab of tabs) tab.addEventListener('click',event=>{
    event.preventDefault();
    showView(tab.dataset.view);
    history.replaceState(null,'',tab.getAttribute('href'));
  });
  map.addEventListener('click',event=>{
    const node = event.target.closest('[data-node]');
    if (!node || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    pause();
    inspect(node.dataset.node);
  });
  slider.addEventListener('input',()=>{pause(); update(true);});
  family.addEventListener('change',()=>{pause(); update();});
  play.addEventListener('click',()=>{
    if (timer !== undefined) {pause(); return;}
    if (+slider.value === +slider.max) slider.value = slider.min;
    update(true);
    play.textContent = play.dataset.pause;
    timer = setInterval(()=>{
      slider.stepUp(); update(true);
      if (slider.value === slider.max) pause();
    }, 900);
  });
  document.addEventListener('visibilitychange',()=>{if (document.hidden) pause();});
  window.addEventListener('hashchange',fromHash);
  showView('swimlanes');
  fromHash();
  update();
  map.querySelector('.map-controls').hidden = false;
})();
