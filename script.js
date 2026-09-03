document.addEventListener('DOMContentLoaded', () => {
  const introScreen = document.getElementById('intro-screen');
  const readBtn = document.getElementById('read-btn');
  const letterWrapper = document.getElementById('letter-wrapper');
  const progressContainer = document.getElementById('progress-container');
  const progressBar = document.getElementById('progress-bar');

  // 1. Intro Screen Button Tap Transition
  readBtn.addEventListener('click', () => {
    // Provide optional haptic feedback on supporting mobile devices
    if (navigator.vibrate) {
      try {
        navigator.vibrate(20);
      } catch (e) {
        // Ignore if restricted by browser policy
      }
    }

    // Add press effect
    readBtn.style.transform = 'scale(0.94)';
    
    setTimeout(() => {
      // Fade out intro screen
      introScreen.classList.add('fade-out');
      
      // Reveal letter wrapper
      letterWrapper.classList.remove('hidden');
      progressContainer.classList.add('visible');

      // Allow DOM to update, then remove intro from layout after transition completes
      setTimeout(() => {
        introScreen.style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'instant' });
        
        // Trigger initial scroll reveal check
        triggerScrollReveal();
      }, 850);
    }, 150);
  });

  // 2. Scroll Progress Bar Update
  function updateScrollProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    if (scrollHeight > 0) {
      const scrollPercentage = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
      progressBar.style.width = `${scrollPercentage}%`;
    }
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  // 3. Intersection Observer for Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.scroll-reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.12
  });

  revealElements.forEach(el => revealObserver.observe(el));

  function triggerScrollReveal() {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.88) {
        el.classList.add('active');
      }
    });
    updateScrollProgress();
  }
});
