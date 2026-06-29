// ========================
// MENU ANIMATION
// ========================
const menuItems = document.querySelectorAll(".wave-menu a");
const SPEED = 0.000008;
const WAVE_AMP = 40;
const WAVES = 0.8;
const GAP = 160;
function animateMenu() {
  const time = Date.now() * SPEED;
  const W = window.innerWidth;
  const H = window.innerHeight;
  const centerY = H * 0.5;
  const totalWidth = W + 400;
  menuItems.forEach((item, i) => {
    const offset = (time * totalWidth - i * GAP);
    const x = ((offset % totalWidth) + totalWidth) % totalWidth - 200;
    const progress = x / W;
    const y = centerY + Math.sin(progress * Math.PI * 2 * WAVES) * WAVE_AMP;
    const dx = 0.01;
    const y1 = centerY + Math.sin((progress - dx) * Math.PI * 2 * WAVES) * WAVE_AMP;
    const y2 = centerY + Math.sin((progress + dx) * Math.PI * 2 * WAVES) * WAVE_AMP;
    const angle = Math.atan2(y2 - y1, dx * W * 2) * (180 / Math.PI);
    item.style.position = "fixed";
    item.style.left = x + "px";
    item.style.top = y + "px";
    item.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
  });
  requestAnimationFrame(animateMenu);
}
animateMenu();

// ========================
// BLOBS
// ========================
const blobs = document.querySelectorAll(".blob");
function animateBlobs() {
  const time = Date.now() * 0.00015;
  blobs.forEach((blob, i) => {
    const x = Math.sin(time + i * 2) * 120;
    const y = Math.cos(time * 1.3 + i * 3) * 120;
    blob.style.transform = `translate(${x}px, ${y}px)`;
    blob.style.opacity = 0.25 + (Math.sin(time * 2 + i) * 0.15 + 0.15);
  });
  requestAnimationFrame(animateBlobs);
}
animateBlobs();

// ========================
// PROJECT SYSTEM
// ========================
const pages = {
  project1: document.getElementById("p1page"),
  project2: document.getElementById("p2page"),
  project3: document.getElementById("p3page"),
  project4: document.getElementById("p4page"),
  project5: document.getElementById("p5page"),
};

function openPage(key) {
  Object.values(pages).forEach(p => p.classList.remove("visible"));
  pages[key].classList.add("visible");
  document.body.classList.add("no-scroll");
}

// Menu Clicks
document.querySelector(".project1").addEventListener("click", e => {
  e.preventDefault();
  openPage("project1");
});
document.querySelector(".project2").addEventListener("click", e => {
  e.preventDefault();
  openPage("project2");
});
document.querySelector(".project3").addEventListener("click", e => {
  e.preventDefault();
  openPage("project3");
});
document.querySelector(".project4").addEventListener("click", e => {
  e.preventDefault();
  openPage("project4");
});
document.querySelector(".project5").addEventListener("click", e => {
  e.preventDefault();
  openPage("project5");
});

// Back Buttons
document.querySelectorAll(".back-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    Object.values(pages).forEach(p => p.classList.remove("visible"));
    document.body.classList.remove("no-scroll");

    // Video stoppen & zurückspulen
    const vid = document.getElementById('showreelvideo');
    vid.pause();
    vid.currentTime = 0;
    document.getElementById('playPauseBtn').textContent = '▶';
    document.getElementById('progressFill').style.width = '0%';
    document.getElementById('vidTime').textContent = '0:00';
  });
});

// ========================
// VIDEO CONTROLS
// ========================
const vid = document.getElementById('showreelvideo');
const playPauseBtn = document.getElementById('playPauseBtn');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const vidTime = document.getElementById('vidTime');

// Play / Pause
playPauseBtn.addEventListener('click', () => {
  if (vid.paused) {
    vid.play();
    playPauseBtn.textContent = '⏸';
  } else {
    vid.pause();
    playPauseBtn.textContent = '▶';
  }
});

// Fortschrittsleiste aktualisieren
vid.addEventListener('timeupdate', () => {
  if (vid.duration) {
    const pct = (vid.currentTime / vid.duration) * 100;
    progressFill.style.width = pct + '%';
    const mins = Math.floor(vid.currentTime / 60);
    const secs = Math.floor(vid.currentTime % 60).toString().padStart(2, '0');
    vidTime.textContent = `${mins}:${secs}`;
  }
});

// Klick auf Leiste zum Vor-/Zurückspulen
progressBar.addEventListener('click', e => {
  const rect = progressBar.getBoundingClientRect();
  const pct = (e.clientX - rect.left) / rect.width;
  vid.currentTime = pct * vid.duration;
});

// Am Ende zurücksetzen
vid.addEventListener('ended', () => {
  playPauseBtn.textContent = '▶';
  progressFill.style.width = '0%';
  vid.currentTime = 0;
});


const btnAlt = document.getElementById('btn-alt');
const btnNeu = document.getElementById('btn-neu');
const imgAlt = document.getElementById('img-alt');
const imgNeu = document.getElementById('img-neu');
const subButtons = document.getElementById('sub-buttons');

const subImgs = {
  1: document.getElementById('img-sub1'),
  2: document.getElementById('img-sub2'),
  3: document.getElementById('img-sub3'),
  4: document.getElementById('img-sub4'),
};

const subBtns = {
  1: document.getElementById('btn-sub1'),
  2: document.getElementById('btn-sub2'),
  3: document.getElementById('btn-sub3'),
  4: document.getElementById('btn-sub4'),
};

function hideAllSubImages() {
  Object.values(subImgs).forEach(img => img.classList.remove('active'));
  Object.values(subBtns).forEach(btn => btn.classList.remove('selected'));
}

btnAlt.addEventListener('click', () => {
  btnAlt.classList.add('selected');
  btnNeu.classList.remove('selected');

  imgAlt.classList.add('active');
  imgNeu.classList.remove('active');

  subButtons.classList.remove('visible');
  hideAllSubImages();
});

btnNeu.addEventListener('click', () => {
  btnNeu.classList.add('selected');
  btnAlt.classList.remove('selected');

  imgNeu.classList.add('active');
  imgAlt.classList.remove('active');

  subButtons.classList.add('visible');
});

Object.entries(subBtns).forEach(([num, btn]) => {
  btn.addEventListener('click', () => {
    hideAllSubImages();
    imgNeu.classList.remove('active'); // Landingpage ausblenden
    subImgs[num].classList.add('active');
    btn.classList.add('selected');
  });
});