/**
 * Main Entry Point: Evx Consultoria
 */
import { initHeader } from './modules/header.js';
import { initCounters } from './modules/counters.js';
import { initCaseModal } from './modules/caseModal.js';
import { initLeadModal } from './modules/leadModal.js';
import { initCarousel } from './modules/carousel.js';
import { initAnimations } from './modules/animations.js';

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initCounters();
  initCaseModal();
  initLeadModal();
  initCarousel();
  initAnimations();

  // Atualizar ano corrente no footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
