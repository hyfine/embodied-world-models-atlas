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
  const english=document.documentElement.lang==='en';
  const lens=map.querySelector('#scale');
  const clamp=(v,lo,hi)=>Math.max(lo,Math.min(hi,v));
  let zoom=1, cx=.5, cy=.5, drag;
  const current=()=>panels.find(p=>!p.hidden);
  function applyLens() {
    const svg=current().querySelector('svg');
    const w=Number(svg.getAttribute('width')), h=Number(svg.getAttribute('height'));
    const half=.5/zoom;
    cx=clamp(cx,half,1-half); cy=clamp(cy,half,1-half);
    svg.setAttribute('viewBox',`${(cx-half)*w} ${(cy-half)*h} ${w/zoom} ${h/zoom}`);
    lens.textContent=Math.round(zoom*100)+'%';
    svg.classList.toggle('magnified',zoom>1);
  }
  function magnify(value) {zoom=clamp(value,1,4); applyLens();}
  let selected, timer;
  function showView(id) {
    for (const panel of panels) panel.hidden = panel.id !== id;
    for (const tab of tabs) tab.setAttribute('aria-current', tab.dataset.view === id ? 'true' : 'false');
    magnify(1);
    if(selected) inspect(selected);
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
      const close=document.createElement('button');
      close.type='button'; close.textContent='×'; close.className='close-note';
      close.setAttribute('aria-label',english?'Close evidence':'关闭证据卡');
      close.addEventListener('click',()=>{inspect(undefined);});
      inspector.replaceChildren(close,...['.meta','h3','p','.links'].map(s => record.querySelector(s).cloneNode(true)));
      current().append(inspector);
    } else {
      inspector.replaceChildren(prompt);
      map.append(inspector);
    }
    inspector.classList.toggle('opened',Boolean(id));
    for (const node of nodes) node.classList.toggle('chosen',node.dataset.node === id);
  }
  function update() {
    const cutoff = years[Number(slider.value)];
    const seen = new Set();
    for (const node of nodes) {
      const visible = Number(node.dataset.y) <= cutoff && (!family.value || node.dataset.f === family.value);
      node.toggleAttribute('hidden',!visible);
      if (visible) seen.add(node.dataset.node);
    }
    for(const part of map.querySelectorAll('[data-born]')) part.toggleAttribute('hidden',Number(part.dataset.born)>cutoff || Boolean(family.value && part.dataset.f!==family.value));
    for(const lane of map.querySelectorAll('[data-lane]')) lane.classList.toggle('inactive',!lane.querySelector('[data-node]:not([hidden])'));
    for (const tick of map.querySelectorAll('[data-tick]')) tick.classList.toggle('future',Number(tick.dataset.tick)>cutoff);
    if (selected && !seen.has(selected)) inspect(undefined);
    slider.setAttribute('aria-valuetext',String(cutoff));
    map.querySelector('#map-count').textContent = `${cutoff} · ${seen.size}/${document.querySelectorAll('.record').length}`;
  }
  for(const btn of map.querySelectorAll('[data-zoom]')) btn.addEventListener('click',()=>{
    magnify(btn.dataset.zoom==='reset'?1:zoom*(btn.dataset.zoom==='in'?1.5:1/1.5));
  });
  for(const svg of map.querySelectorAll('.atlas-plate')) {
    svg.setAttribute('tabindex','0');
    svg.addEventListener('keydown',e=>{
      if(e.target!==svg)return;
      if(e.key==='+'||e.key==='=')magnify(zoom*1.5);
      else if(e.key==='-')magnify(zoom/1.5);
      else if(e.key==='Home')magnify(1);
      else if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){
        cx+=((e.key==='ArrowRight')-(e.key==='ArrowLeft'))*.12/zoom;
        cy+=((e.key==='ArrowDown')-(e.key==='ArrowUp'))*.12/zoom; applyLens();
      }else return;
      e.preventDefault();
    });
    svg.addEventListener('pointerdown',e=>{
      if(zoom===1||e.button!==0||e.target.closest('[data-node]'))return;
      drag={x:e.clientX,y:e.clientY,cx,cy};svg.setPointerCapture(e.pointerId);
    });
    svg.addEventListener('pointermove',e=>{
      if(!drag||!svg.hasPointerCapture(e.pointerId))return;
      const bounds=svg.getBoundingClientRect();
      cx=drag.cx-(e.clientX-drag.x)/bounds.width/zoom;
      cy=drag.cy-(e.clientY-drag.y)/bounds.height/zoom;
      applyLens();
    });
    svg.addEventListener('lostpointercapture',()=>{drag=undefined;});
  }
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&selected)inspect(undefined);});
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
    inspect(undefined);
    update(true);
    play.textContent = play.dataset.pause;
    timer = setInterval(()=>{
      slider.stepUp(); update(true);
      if (slider.value === slider.max) pause();
    }, 900);
  });
  document.addEventListener('visibilitychange',()=>{if (document.hidden) pause();});
  window.addEventListener('hashchange',fromHash);
  showView('family-tree');
  fromHash();
  update();
  map.querySelector('.map-controls').hidden = false;
})();
