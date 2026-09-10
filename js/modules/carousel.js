/**
 * Carousel Module: Suporte a swipe touch e navegação elegante em dispositivos móveis
 */
export function initCarousel() {
  const sliders = document.querySelectorAll('.mobile-carousel-container');

  sliders.forEach(slider => {
    const track = slider.querySelector('.mobile-carousel-track');
    const cards = slider.querySelectorAll('.carousel-card');
    const dotsContainer = slider.querySelector('.carousel-dots');
    
    if (!track || !cards.length || !dotsContainer) return;

    // Gerar dots
    dotsContainer.innerHTML = '';
    cards.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Slide ${idx + 1}`);
      dot.addEventListener('click', () => {
        cards[idx].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      });
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.carousel-dot');

    // Atualizar dot ativo com base na rolagem
    let scrollTimeout;
    track.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const trackCenter = track.getBoundingClientRect().left + track.offsetWidth / 2;
        let closestIdx = 0;
        let minDiff = Infinity;

        cards.forEach((card, i) => {
          const cardCenter = card.getBoundingClientRect().left + card.offsetWidth / 2;
          const diff = Math.abs(trackCenter - cardCenter);
          if (diff < minDiff) {
            minDiff = diff;
            closestIdx = i;
          }
        });

        dots.forEach((d, i) => {
          d.classList.toggle('active', i === closestIdx);
        });
      }, 60);
    }, { passive: true });
  });
}
