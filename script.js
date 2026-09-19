const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');
if (reducedMotion) revealItems.forEach((item) => item.classList.add('visible'));
else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
}

const lightbox = document.querySelector('.lightbox');
if (lightbox) {
  const image = lightbox.querySelector('img');
  document.querySelectorAll('[data-full]').forEach((button) => button.addEventListener('click', () => {
    image.src = button.dataset.full; image.alt = button.querySelector('img').alt; lightbox.showModal();
  }));
  lightbox.querySelector('.close').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.close(); });
}
document.querySelectorAll('#year').forEach((year) => { year.textContent = new Date().getFullYear(); });
