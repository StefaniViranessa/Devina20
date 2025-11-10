const candlesWrap = document.getElementById('candles');
const countInput = document.getElementById('count');
const setBtn = document.getElementById('set');
const addBtn = document.getElementById('add');
const removeBtn = document.getElementById('remove');

const glowBtn = document.getElementById('glowToggle');
const playMusicBtn = document.getElementById('playMusic');
const birthdaySong = document.getElementById('birthdaySong');
const cake = document.getElementById('cake');
const wrap = document.querySelector('.wrap');

// --- Elemen Modal  ---
const overlay = document.getElementById('overlay');
const wishModal = document.getElementById('wishModal');
const closeModalBtn = document.getElementById('closeModalBtn'); // ID tombol baru

const MAX = 20;
const MIN = 0;

let litCandlesCount = 0;

// --- Fungsi untuk membuat confetti ---
function createConfetti() {
  const confettiContainer = document.createElement('div');
  confettiContainer.className = 'confetti-container';
  document.body.appendChild(confettiContainer);

  const colors = ['#ff69b4', '#00f2ea', '#ffd3a0', '#fff'];
  const shapes = ['round', 'square'];

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.classList.add(shapes[Math.floor(Math.random() * shapes.length)]);

    const startX = Math.random() * window.innerWidth - (window.innerWidth / 2) + 'px';
    const startY = Math.random() * -50 + 'px';
    const endX = Math.random() * 2000 - 1000 + 'px';
    const endY = window.innerHeight + 100 + 'px';

    confetti.style.setProperty('--x-start', startX);
    confetti.style.setProperty('--y-start', startY);
    confetti.style.setProperty('--x-end', endX);
    confetti.style.setProperty('--y-end', endY);
    confetti.style.setProperty('--confetti-color', colors[Math.floor(Math.random() * colors.length)]);
    confetti.style.animationDelay = Math.random() * 2 + 's';
    confetti.style.width = Math.random() * 8 + 6 + 'px';
    confetti.style.height = Math.random() * 8 + 6 + 'px';

    confettiContainer.appendChild(confetti);

    confetti.addEventListener('animationend', () => {
      confetti.remove();
      if (!confettiContainer.children.length) {
        confettiContainer.remove();
      }
    });
  }
}

// --- Fungsi Modal (VERSI SIMPEL) ---
function showModal() {
  overlay.classList.remove('hidden');
  wishModal.classList.remove('hidden');
}

function closeModal() {
  overlay.classList.add('hidden');
  wishModal.classList.add('hidden');
}

// Event listeners untuk modal (VERSI SIMPEL)
closeModalBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
// Tidak ada lagi listener 'sendWishBtn'


// --- Fungsi Lilin (UPDATED) ---
function makeCandle(index) {
  const el = document.createElement('div');
  el.className = 'candle';
  el.setAttribute('tabindex', '0');

  const wick = document.createElement('div');
  wick.className = 'wick';
  el.appendChild(wick);

  const flame = document.createElement('div');
  flame.className = 'flame';
  el.appendChild(flame);

  let lit = true;

  function update() {
    flame.style.display = lit ? '' : 'none';

    if (!lit) {
      litCandlesCount--;
    }

    if (litCandlesCount === 0 && !lit) {
      createConfetti();
      setTimeout(showModal, 1000); 
    }
  }

  el.addEventListener('click', () => {
    if (!lit) return;
    lit = false;
    update();
  });
  el.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && lit) {
      e.preventDefault();
      if (!lit) return;
      lit = false;
      update();
    }
  });

  if (Math.random() > 0.6) flame.classList.add('small');
  return el;
}

// --- Fungsi Render Lilin (UPDATED) ---
function renderCandles(n) {
  candlesWrap.innerHTML = '';
  n = Math.max(MIN, Math.min(MAX, Math.floor(n)));
  const scale = n > 12 ? Math.max(0.6, 1 - (n - 12) * 0.03) : 1;
  candlesWrap.style.transform = `translateX(-50%) scale(${scale})`;

  litCandlesCount = n;

  for (let i = 0; i < n; i++) {
    candlesWrap.appendChild(makeCandle(i));
  }
  countInput.value = n;
}

setBtn.addEventListener('click', () => renderCandles(Number(countInput.value || 0)));
addBtn.addEventListener('click', () => renderCandles(Number(countInput.value || 0) + 1));
removeBtn.addEventListener('click', () => renderCandles(Number(countInput.value || 0) - 1));

renderCandles(Number(countInput.value));


// --- Fungsionalitas Lain (Tetap) ---
let isGlowing = false;
glowBtn.addEventListener('click', () => {
  isGlowing = !isGlowing;
  wrap.classList.toggle('glowing', isGlowing);
  glowBtn.textContent = isGlowing ? '✨ Glow On ✨' : '✨ Toggle Glow';
});

let isPlaying = false;
playMusicBtn.addEventListener('click', () => {
  isPlaying = !isPlaying;
  if (isPlaying) {
    birthdaySong.play().catch(e => console.error("Error playing audio:", e));
    playMusicBtn.textContent = '🎵 Pause';
    createConfetti();
  } else {
    birthdaySong.pause();
    playMusicBtn.textContent = '🎵 Play Song';
  }
});

cake.addEventListener('click', () => {
  if (!cake.classList.contains('jiggle')) {
    cake.classList.add('jiggle');
    setTimeout(() => {
      cake.classList.remove('jiggle');
    }, 500);
  }
});