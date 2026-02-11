// ===================================
// Scroll Animation Observer
// ===================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all elements with fade-in class
document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(el => observer.observe(el));
});

// ===================================
// Smooth Scroll for Anchor Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===================================
// Contact Form Handling
// ===================================
// Form is now handled by Formspree - no custom JavaScript needed
// Formspree will handle submission and redirect to a thank you page


// ===================================
// Add stagger effect to grid items
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  const grids = document.querySelectorAll('.value-grid, .services-grid, .pricing-grid');

  grids.forEach(grid => {
    const items = grid.querySelectorAll('.fade-in');
    items.forEach((item, index) => {
      item.style.transitionDelay = `${index * 100}ms`;
    });
  });
});
