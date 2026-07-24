document.addEventListener('DOMContentLoaded', () => {
  console.log('Be Humble & Grow Portal loaded successfully.');

  // Intersection Observer for micro-animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.bento-card, .category-card, .story-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
  });

  // Inject fade-in class style dynamically
  const style = document.createElement('style');
  style.innerHTML = `
    .fade-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

  // Mobile menu button interaction
  const menuBtn = document.querySelector('[data-icon="menu"]');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      alert('Navigation menu: Home, Opportunities, Application Tracking, Verification, Recruiter Portal.');
    });
  }
});
