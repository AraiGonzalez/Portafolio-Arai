// Añade la clase .visible cuando los elementos entran en viewport.
// Usa IntersectionObserver con fallback para navegadores antiguos.

document.addEventListener('DOMContentLoaded', () => {
  const selectors = [
    '.portfolio-item',
    '.about-details',
    '.projects-title',
    '.maintitle',
    '.title-new'
  ];

  // asignar índice a portfolio items para efecto en cascada
  document.querySelectorAll('.portfolio-item').forEach((el, i) => {
    el.dataset.obsIndex = i;
  });

  const elements = Array.from(new Set(selectors.flatMap(s => Array.from(document.querySelectorAll(s)))));

  if (!elements.length) return;

  // Fallback: si IntersectionObserver no está disponible, mostrar todo
  if (typeof IntersectionObserver === 'undefined') {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      // stagger para .portfolio-item
      if (el.classList.contains('portfolio-item')) {
        const index = parseInt(el.dataset.obsIndex || 0, 10);
        setTimeout(() => {
          el.classList.add('visible');
        }, Math.min(400, index * 120));
      } else {
        el.classList.add('visible');
      }

      obs.unobserve(el);
    });
  }, { threshold: 0.12 });

  elements.forEach(el => io.observe(el));
});