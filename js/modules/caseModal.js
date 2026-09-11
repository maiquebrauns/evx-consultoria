import { casesData } from '../data/cases.js';

/**
 * Case Modal Module: Visualização profunda e imersiva de cases de sucesso
 */
export function initCaseModal() {
  const modal = document.getElementById('case-modal');
  const closeBtn = modal?.querySelector('.modal-close-btn');
  const modalContent = modal?.querySelector('.case-modal-body');

  if (!modal || !modalContent) return;

  function renderCaseDetails(caseItem) {
    modalContent.innerHTML = `
      <div class="case-modal-header">
        <span class="badge">${caseItem.badge}</span>
        <h2 class="case-modal-title">${caseItem.company}</h2>
        <p class="case-modal-headline">${caseItem.headline}</p>
      </div>
      
      <div class="case-modal-image-wrapper">
        <img src="${caseItem.image}" alt="${caseItem.company}" class="case-modal-image" loading="lazy" />
      </div>

      <div class="case-modal-metrics-grid">
        ${caseItem.metrics.map(m => `
          <div class="case-metric-box">
            <span class="case-metric-number">${m.value}</span>
            <span class="case-metric-label">${m.label}</span>
          </div>
        `).join('')}
      </div>

      <div class="case-modal-sections">
        <div class="case-modal-block">
          <h4 class="case-block-title">
            <span class="block-dot red"></span> O Desafio
          </h4>
          <p class="case-block-text">${caseItem.details.problem}</p>
        </div>

        <div class="case-modal-block">
          <h4 class="case-block-title">
            <span class="block-dot blue"></span> Nossa Estratégia e Execução
          </h4>
          <p class="case-block-text">${caseItem.details.solution}</p>
        </div>

        <div class="case-modal-block">
          <h4 class="case-block-title">
            <span class="block-dot green"></span> Impacto e Resultados Medidos
          </h4>
          <p class="case-block-text">${caseItem.details.result}</p>
        </div>
      </div>

      <div class="case-modal-footer">
        <button class="btn btn-primary trigger-lead-modal" data-subject="Case: ${caseItem.company}">
          Alcançar resultados semelhantes na minha empresa
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </button>
      </div>
    `;

    // Conectar botão interno do modal para agendamento
    const internalCta = modalContent.querySelector('.trigger-lead-modal');
    internalCta?.addEventListener('click', () => {
      modal.close();
      const leadModal = document.getElementById('lead-modal');
      leadModal?.showModal();
    });
  }

  // Event Delegation para abrir modal ao clicar em qualquer botão de case
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-case-id]');
    if (trigger) {
      e.preventDefault();
      const caseId = trigger.getAttribute('data-case-id');
      const caseItem = casesData.find(c => c.id === caseId);
      if (caseItem) {
        renderCaseDetails(caseItem);
        modal.showModal();
        const inner = modal.querySelector('.modal-dialog-inner');
        if (inner) inner.scrollTop = 0;
        document.body.style.overflow = 'hidden';
      }
    }
  });

  function closeModal() {
    modal.close();
    document.body.style.overflow = '';
  }

  closeBtn?.addEventListener('click', closeModal);

  // Fechar ao clicar no backdrop do dialog
  modal.addEventListener('click', (e) => {
    const rect = modal.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width
    );
    if (!isInDialog) {
      closeModal();
    }
  });

  modal.addEventListener('cancel', () => {
    document.body.style.overflow = '';
  });
}
