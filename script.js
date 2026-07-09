// ========================
// FIX: Zustand beim (bfcache-)Zurücknavigieren zurücksetzen
// ========================
window.addEventListener('pageshow', () => {
  Object.values(pages).forEach(p => p.classList.remove('visible'));
  document.body.classList.remove('no-scroll');
});

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
  project6: document.getElementById("p6page"),
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
document.querySelector(".project6").addEventListener("click", e => {
  e.preventDefault();
  openPage("project6");
});

// Back Buttons
document.querySelectorAll(".back-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    Object.values(pages).forEach(p => p.classList.remove("visible"));
    document.body.classList.remove("no-scroll");
  });
});

// ========================
// PROJECT 4: ALT/NEU TOGGLE
// ========================
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

// ========================
// BACK BUTTON: zentriert -> linke obere Ecke beim Scrollen
// ========================
function setupBackBtnScroll(scrollEl, btn) {
  if (!btn) return;
  scrollEl.addEventListener('scroll', () => {
    const scrollTop = scrollEl === window ? window.scrollY : scrollEl.scrollTop;
    if (scrollTop > 10) {
      btn.classList.add('scrolled');
    } else {
      btn.classList.remove('scrolled');
    }
  });
}

// Projektseiten (eigener Scroll-Container)
document.querySelectorAll('.project-page').forEach(page => {
  const btn = page.querySelector('.back-btn');
  setupBackBtnScroll(page, btn);
});

// ========================
// PROJECT 3: Video bei Klick einmal abspielen
// ========================
const slotVideo = document.getElementById('slotvideo');
const videoHint = document.querySelector('.video-hint');

if (slotVideo && videoHint) {
  videoHint.addEventListener('click', () => {
    slotVideo.currentTime = 0;
    slotVideo.play();
    videoHint.style.display = 'none'; // Hinweistext ausblenden
  });

  slotVideo.addEventListener('ended', () => {
    videoHint.style.display = 'block'; // Hinweistext wieder anzeigen, falls man's nochmal starten will
  });
}