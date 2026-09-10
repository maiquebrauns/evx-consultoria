/**
 * Header Module: Scroll Glassmorphism, Menu Mobile e Navegação Suave
 */
export function initHeader() {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav-drawer');
  const mobileBackdrop = document.querySelector('.mobile-nav-backdrop');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  if (!header) return;

  // Glassmorphism discreto ao rolar
  function handleScroll() {
    if (window.scrollY > 24) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Menu Mobile Toggle
  function openMobileNav() {
    mobileNav?.classList.add('open');
    mobileBackdrop?.classList.add('open');
    menuToggle?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNav?.classList.remove('open');
    mobileBackdrop?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  menuToggle?.addEventListener('click', () => {
    const isOpen = mobileNav?.classList.contains('open');
    if (isOpen) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  const mobileCloseBtn = mobileNav?.querySelector('.modal-close-btn');
  const drawerCta = mobileNav?.querySelector('.trigger-lead-modal');

  mobileCloseBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    closeMobileNav();
  });

  drawerCta?.addEventListener('click', () => {
    closeMobileNav();
  });

  mobileBackdrop?.addEventListener('click', closeMobileNav);

  // Fechar ao pressionar ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav?.classList.contains('open')) {
      closeMobileNav();
    }
  });

  // Fechar ao clicar em qualquer link da navegação mobile
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileNav();
    });
  });

  // Highlight do link ativo conforme scroll
  const sections = document.querySelectorAll('section[id]');
  function highlightActiveLink() {
    const scrollY = window.scrollY + 120;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        matchingLink?.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightActiveLink, { passive: true });
}
