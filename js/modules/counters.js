/**
 * Counters Module: Animação de contadores numéricos com IntersectionObserver
 */
export function initCounters() {
  const counterElements = document.querySelectorAll('[data-counter-target]');
  if (!counterElements.length) return;

  const observerOptions = {
    threshold: 0.35,
    rootMargin: '0px 0px -50px 0px'
  };

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-counter-target'), 10);
    const prefix = el.getAttribute('data-counter-prefix') || '';
    const suffix = el.getAttribute('data-counter-suffix') || '';
    const duration = 1800; // 1.8 segundos
    const frameRate = 60;
    const totalFrames = Math.round((duration / 1000) * frameRate);
    let frame = 0;

    // Easing quadrático out para desaceleração natural e sofisticada
    function easeOutQuad(t) {
      return t * (2 - t);
    }

    const timer = setInterval(() => {
      frame++;
      const progress = easeOutQuad(frame / totalFrames);
      const currentVal = Math.round(target * progress);

      el.textContent = `${prefix}${currentVal}${suffix}`;

      if (frame >= totalFrames) {
        el.textContent = `${prefix}${target}${suffix}`;
        clearInterval(timer);
      }
    }, 1000 / frameRate);
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counterElements.forEach(el => observer.observe(el));
}
