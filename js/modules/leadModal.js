/**
 * Lead Modal Module: Diagnóstico Estratégico e Captação de Alta Conversão
 */
export function initLeadModal() {
  const modal = document.getElementById('lead-modal');
  const closeBtn = modal?.querySelector('.modal-close-btn');
  const form = modal?.querySelector('#lead-form');
  const successState = modal?.querySelector('.lead-modal-success');
  const formState = modal?.querySelector('.lead-modal-form-wrapper');
  const challengeChips = modal?.querySelectorAll('.challenge-chip');
  const triggerButtons = document.querySelectorAll('.trigger-lead-modal');

  if (!modal) return;

  function openModal() {
    modal.showModal();
    const inner = modal.querySelector('.modal-dialog-inner');
    if (inner) inner.scrollTop = 0;
    document.body.style.overflow = 'hidden';
    if (formState && successState) {
      formState.style.display = 'block';
      successState.style.display = 'none';
    }
  }

  function closeModal() {
    modal.close();
    document.body.style.overflow = '';
  }

  triggerButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  closeBtn?.addEventListener('click', closeModal);

  // Fechar no backdrop
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

  // Seleção de tags de desafio
  challengeChips?.forEach(chip => {
    chip.addEventListener('click', () => {
      challengeChips.forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      const hiddenInput = document.getElementById('selected-challenge');
      if (hiddenInput) {
        hiddenInput.value = chip.getAttribute('data-value') || '';
      }
    });
  });

  // Envio do formulário com validação e feedback
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"/></svg>
        Processando diagnóstico...
      `;
    }

    const name = (document.getElementById('lead-name'))?.value || '';
    const email = (document.getElementById('lead-email'))?.value || '';
    const phone = (document.getElementById('lead-phone'))?.value || '';
    const company = (document.getElementById('lead-company'))?.value || '';
    const challenge = (document.getElementById('selected-challenge'))?.value || 'Estratégia Geral';

    // Montar mensagem formatada profissionalmente para o WhatsApp
    const messageText = `*Solicitação de Diagnóstico Estratégico - Evx Consultoria*

👤 *Nome:* ${name}
🏢 *Empresa:* ${company}
✉️ *E-mail:* ${email}
📱 *Telefone/WhatsApp:* ${phone}
🎯 *Desafio Principal:* ${challenge}

Olá, preenchi o formulário no site da Evx e gostaria de agendar nossa conversa diagnóstica!`;

    const whatsappUrl = `https://wa.me/5521973862487?text=${encodeURIComponent(messageText)}`;

    // Salvar backup do lead no servidor (leads.json)
    try {
      fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, company, challenge })
      }).catch(() => {});
    } catch (err) {}

    // Exibir feedback e abrir o WhatsApp diretamente
    setTimeout(() => {
      // Abre o WhatsApp diretamente na conversa com o número oficial
      window.open(whatsappUrl, '_blank');

      if (formState && successState) {
        formState.style.display = 'none';
        successState.style.display = 'block';

        const whatsappDirectLink = successState.querySelector('.lead-whatsapp-direct');
        if (whatsappDirectLink) {
          whatsappDirectLink.href = whatsappUrl;
          whatsappDirectLink.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.476-.15-.676.15-.2.3-.776.979-.951 1.179-.176.2-.351.226-.652.075-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.675-2.085-.175-.3-.019-.462.132-.612.135-.135.301-.351.452-.527.15-.175.2-.3.301-.5.1-.2.05-.376-.025-.526-.075-.15-.676-1.63-.927-2.233-.244-.588-.493-.508-.676-.517-.175-.01-.376-.01-.577-.01-.2 0-.527.075-.803.376s-1.054 1.03-1.054 2.511 1.079 2.912 1.23 3.113c.15.2 2.122 3.24 5.141 4.544.718.31 1.278.496 1.716.635.722.23 1.378.198 1.898.12.579-.088 1.78-.727 2.03-1.43.25-.703.25-1.305.175-1.43-.075-.125-.276-.201-.577-.351z"/></svg>
            Abrir Conversa no WhatsApp Novamente
          `;
        }
      }
      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          Solicitar Diagnóstico Estratégico
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        `;
      }
    }, 600);
  });
}
