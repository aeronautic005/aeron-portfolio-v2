/**
 * Aeron Irasusta — Studio Portfolio Interactions
 * Framework: Vanilla JavaScript (Zero-dependency, high performance)
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Mobile Menu Drawer Toggle
  // --------------------------------------------------------------------------
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');

  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('is-open');
      menuToggle.classList.toggle('is-active', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen && window.innerWidth <= 980 ? 'hidden' : '';
    });

    // Close menu when clicking nav links
    const navLinks = sidebar.querySelectorAll('.nav-item, .sidebar-cta, .sidebar-email');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (sidebar.classList.contains('is-open')) {
          sidebar.classList.remove('is-open');
          menuToggle.classList.remove('is-active');
          menuToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 2. Active Section Spy (IntersectionObserver)
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');

  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href === `#${currentId}`) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));
  }

  // --------------------------------------------------------------------------
  // 3. Verified Credential Modal (AppBuilders PH Hackathon)
  // --------------------------------------------------------------------------
  const openCertModal = document.getElementById('openCertModal');
  const closeCertModal = document.getElementById('closeCertModal');
  const certModal = document.getElementById('certModal');

  function openModal() {
    if (!certModal) return;
    certModal.classList.add('is-open');
    certModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeCertModal) closeCertModal.focus();
  }

  function closeModal() {
    if (!certModal) return;
    certModal.classList.remove('is-open');
    certModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (openCertModal) openCertModal.focus();
  }

  if (openCertModal && certModal) {
    openCertModal.addEventListener('click', openModal);
  }

  if (closeCertModal) {
    closeCertModal.addEventListener('click', closeModal);
  }

  // Close modal when clicking outside card or pressing Escape
  if (certModal) {
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && certModal.classList.contains('is-open')) {
        closeModal();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 4. Contact Brief Form Submission Handler
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `Sending transmission...`;
      formStatus.textContent = '';

      // Simulate rapid asynchronous dispatch
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();
        formStatus.textContent = '✓ Transmission dispatched. Aeron will respond to your inquiry shortly.';
        
        setTimeout(() => {
          formStatus.textContent = '';
        }, 8000);
      }, 900);
    });
  }

  // --------------------------------------------------------------------------
  // 5. Hero Timecode Frame Ticker (Studio Aesthetic)
  // --------------------------------------------------------------------------
  const timecodeEl = document.querySelector('.hero-frame');
  if (timecodeEl) {
    const startTime = performance.now();
    function updateTimecode() {
      const elapsed = Math.floor((performance.now() - startTime) / 1000);
      const hours = String(Math.floor(elapsed / 3600)).padStart(2, '0');
      const minutes = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0');
      const seconds = String(elapsed % 60).padStart(2, '0');
      timecodeEl.textContent = `[ ${hours} : ${minutes} : ${seconds} ]`;
      requestAnimationFrame(updateTimecode);
    }
    requestAnimationFrame(updateTimecode);
  }
});
