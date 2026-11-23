const cards = [...document.querySelectorAll('.record')];
const search = document.querySelector('#query');
const family = document.querySelector('#family');
function filter() {
  const text = search.value.trim().toLowerCase();
  let visible = 0;
  for (const card of cards) {
    const matches = (!family.value || card.dataset.family === family.value)
      && `${card.textContent} ${card.dataset.extra}`.toLowerCase().includes(text);
    card.hidden = !matches;
    if (matches) visible++;
  }
  document.querySelector('#count').textContent = `${visible} / ${cards.length}`;
  document.querySelector('#empty').hidden = visible !== 0;
}
search.addEventListener('input', filter);
family.addEventListener('change', filter);
const buttons = [...document.querySelectorAll('#actions button')];
const prediction = document.querySelector('#prediction');
for (const button of buttons) {
  button.addEventListener('click', () => {
    const point = [3, 7, 11][Number(button.dataset.i)];
    document.querySelector('.cup').style.left = `${point / 12 * 100}%`;
    prediction.textContent = `${prediction.dataset.label}: ${point} / ${Math.abs(point - 8)}`;
    for (const b of buttons) b.setAttribute('aria-pressed', String(b === button));
  });
}

const diagram = document.querySelector('.decision-diagram');
const replay = diagram.querySelector('.replay');
const arrival = new IntersectionObserver(entries => {
  if (entries.some(entry => entry.isIntersecting)) {
    diagram.classList.remove('waiting');
    arrival.disconnect();
  }
});
diagram.classList.add('waiting');
arrival.observe(diagram);
replay.hidden = false;
replay.addEventListener('click', () => {
  diagram.classList.remove('waiting');
  for (const animation of diagram.getAnimations({subtree: true})) {
    animation.currentTime = 0;
    animation.play();
  }
});
