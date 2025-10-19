// smooth scroll & simple active nav (scrollspy)
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.nav-link');
  const sections = [...document.querySelectorAll('main section')];
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');

  // mobile nav toggle
  navToggle && navToggle.addEventListener('click', () => {
    navList.style.display = navList.style.display === 'flex' ? 'none' : 'flex';
    navList.style.flexDirection = 'column';
    navList.style.background = '#111827';
    navList.style.position = 'absolute';
    navList.style.right = '14px';
    navList.style.top = '56px';
    navList.style.padding = '10px';
    navList.style.borderRadius = '8px';
  });

  // close mobile menu after click
  links.forEach(l => l.addEventListener('click', () => {
    if (window.innerWidth <= 880) navList.style.display = 'none';
  }));

  // highlight active section in nav
  function onScroll() {
    const scrollPos = window.scrollY + 120; // offset for header
    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
      if (scrollPos >= top && scrollPos < bottom) {
        navLink && navLink.classList.add('active');
      } else {
        navLink && navLink.classList.remove('active');
      }
    });
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  // contact form basic handler (no backend)
  const contactForm = document.getElementById('contactForm');
  contactForm && contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.name.value.trim();
    alert(`Terima kasih, ${name}! Pesanmu sudah tercatat (demo).`);
    contactForm.reset();
  });

  // optional: check if profile image exists, else use placeholder
  const img = document.getElementById('profileImg');
  img && img.addEventListener('error', () => {
    img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150"><rect width="100%" height="100%" fill="%23ddd"/><text x="50%" y="50%" fill="%23666" font-size="14" dominant-baseline="middle" text-anchor="middle">Foto tidak ditemukan</text></svg>';
  });
});

// DARK MODE TOGGLE
const modeBtn = document.getElementById('modeToggle');

modeBtn && modeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  // Simpan preferensi
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
    modeBtn.textContent = '☀️';
  } else {
    localStorage.setItem('theme', 'light');
    modeBtn.textContent = '🌙';
  }
});

// Load mode saat halaman dibuka
window.addEventListener('load', () => {
  const mode = localStorage.getItem('theme');
  if (mode === 'dark') {
    document.body.classList.add('dark-mode');
    if (modeBtn) modeBtn.textContent = '☀️';
  }
});

// Animasi muncul saat scroll
const sections = document.querySelectorAll('.section');

const revealOnScroll = () => {
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      section.classList.add('show');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
