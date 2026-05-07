// ---- Load Navbar & Footer Templates ----
async function loadTemplate(id, url) {
  try {
    const res = await fetch(url);
    const html = await res.text();
    const el = document.getElementById(id);
    if (el) el.outerHTML = html;
  } catch (e) {
    console.error('Failed to load template:', url, e);
  }
}

function initDynamicComponents() {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === currentPage) a.classList.add('active');
  });

  initDonateModal();
}

document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([
    loadTemplate('navbar-placeholder', 'templates/navbar.html'),
    loadTemplate('footer-placeholder', 'templates/footer.html')
  ]);
  initDynamicComponents();
});

// ---- Hero Image Slider ----
const slides = document.querySelectorAll('.slide');
const dots   = document.querySelectorAll('.dot');
let current  = 0;
let timer;

function goToSlide(n) {
  slides[current].classList.remove('active');
  if (dots[current]) dots[current].classList.remove('active');
  current = (n + slides.length) % slides.length;
  slides[current].classList.add('active');
  if (dots[current]) dots[current].classList.add('active');
}

function startSlider() {
  timer = setInterval(() => goToSlide(current + 1), 5000);
}

if (slides.length) {
  startSlider();
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      clearInterval(timer);
      goToSlide(i);
      startSlider();
    });
  });
}

// ---- Animate on scroll ----
const animEls = document.querySelectorAll('.animate-on-scroll');
if (animEls.length) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  animEls.forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 0.1 + 's';
    obs.observe(el);
  });
}

// ---- Gallery Filter ----
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    galleryItems.forEach(item => {
      const show = cat === 'all' || item.dataset.category === cat;
      item.style.opacity = show ? '1' : '0';
      item.style.display = show ? '' : 'none';
    });
  });
});

// ---- Lightbox ----
const lightbox    = document.querySelector('.lightbox');
const lbImg       = document.querySelector('.lightbox-img');
const lbCaption   = document.querySelector('.lightbox-caption');
const lbClose     = document.querySelector('.lightbox-close');

if (lightbox) {
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      lbImg.src = img.src;
      if (lbCaption) lbCaption.textContent = img.alt || '';
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
  function closeLB() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  lbClose && lbClose.addEventListener('click', closeLB);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLB(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLB(); });
}

// ---- Contact Form Validation ----
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  function validateField(input) {
    const group = input.closest('.form-group');
    const errorEl = group.querySelector('.form-error');
    let valid = true;

    if (input.hasAttribute('required') && !input.value.trim()) {
      if (errorEl) errorEl.textContent = 'This field is required.';
      valid = false;
    } else if (input.type === 'email' && input.value.trim()) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(input.value.trim())) {
        if (errorEl) errorEl.textContent = 'Please enter a valid email.';
        valid = false;
      }
    } else if (input.id === 'phone' && input.value.trim()) {
      const re = /^[\d\s\+\-\(\)]{7,15}$/;
      if (!re.test(input.value.trim())) {
        if (errorEl) errorEl.textContent = 'Please enter a valid phone number.';
        valid = false;
      }
    }

    group.classList.toggle('error', !valid);
    return valid;
  }

  // Live validation
  contactForm.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.closest('.form-group').classList.contains('error')) validateField(field);
    });
  });

  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    let allValid = true;
    contactForm.querySelectorAll('input[required], textarea[required], select[required]').forEach(field => {
      if (!validateField(field)) allValid = false;
    });
    if (allValid) {
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      emailjs.sendForm('service_sp9hqdf', 'template_0bqwuvb', contactForm)
        .then(() => {
          const successMsg = document.querySelector('.form-success');
          contactForm.style.display = 'none';
          if (successMsg) successMsg.style.display = 'block';
        })
        .catch(() => {
          const successMsg = document.querySelector('.form-success');
          successMsg.textContent = '❌ Failed to send. Please try again.';
          successMsg.style.display = 'block';
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message ✉️';
        });
    }
  });
}

// ---- Animated counter (stats) ----
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const tick = () => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current) + (el.dataset.suffix || '');
    if (current < target) requestAnimationFrame(tick);
  };
  tick();
}
const statNums = document.querySelectorAll('.stat-number[data-target]');
if (statNums.length) {
  const statsObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        statsObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(n => statsObs.observe(n));
}

