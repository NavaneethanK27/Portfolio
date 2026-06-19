document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     Theme Toggle Logic
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  
  // Set starting theme based on previous selection or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  /* ==========================================================================
     Mobile Drawer Menu
     ========================================================================== */
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMobileMenu() {
    navbar.classList.toggle('menu-open');
    mobileDrawer.classList.toggle('open');
    // Toggle body overflow to prevent background scrolling when menu is open
    document.body.style.overflow = mobileDrawer.classList.contains('open') ? 'hidden' : '';
  }

  mobileToggle.addEventListener('click', toggleMobileMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Close menu when a link is clicked
      if (mobileDrawer.classList.contains('open')) {
        toggleMobileMenu();
      }
    });
  });

  /* ==========================================================================
     Dynamic Typing Animation
     ========================================================================== */
  const typedTextSpan = document.getElementById('typed-text');
  const roles = [
    'Computer Science Student',
    'Full Stack Developer',
    'AI & Web Enthusiast'
  ];
  
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      // Subtracting characters
      typedTextSpan.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Speed up deleting
    } else {
      // Adding characters
      typedTextSpan.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 120; // Default typing speed
    }

    // Checking boundaries
    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at full word
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      // Pause before starting new word
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  // Initiate typing animation
  if (typedTextSpan) {
    setTimeout(type, 1000);
  }

  /* ==========================================================================
     Scroll Reveal & Active Navigation Links
     ========================================================================== */
  const sections = document.querySelectorAll('section[id], header');
  const navLinks = document.querySelectorAll('.nav-link');
  const revealElements = document.querySelectorAll('.scroll-reveal');

  // Entrance Reveals
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // Reveal once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // Active navigation highlight on scroll
  const activeLinkObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: '-70px 0px -50% 0px'
  });

  sections.forEach(sec => activeLinkObserver.observe(sec));



});

