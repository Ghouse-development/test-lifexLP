/* ==========================================================================
   LIFE X Landing Page -- Main JavaScript
   THE BASE Style Redesign
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     Hamburger Menu Toggle
     ------------------------------------------------------------------------ */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('is-active');
      nav.classList.toggle('is-open');
      document.body.style.overflow = nav.classList.contains('is-open') ? 'hidden' : '';
    });

    // Close menu when a nav link is clicked
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('is-active');
        nav.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });

    // Close menu when clicking on overlay area
    nav.addEventListener('click', (e) => {
      if (e.target === nav) {
        hamburger.classList.remove('is-active');
        nav.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ------------------------------------------------------------------------
     Smooth Scroll for anchor links
     ------------------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ------------------------------------------------------------------------
     Scroll: Header style change (transparent -> white)
     ------------------------------------------------------------------------ */
  const header = document.querySelector('.header');
  const hero = document.querySelector('.hero');
  const heroHeight = hero ? hero.offsetHeight : 600;

  function updateHeader() {
    if (window.scrollY > 80) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  /* ------------------------------------------------------------------------
     Scroll: Fixed bottom CTA banner visibility
     ------------------------------------------------------------------------ */
  const fixedCta = document.getElementById('fixedCta');
  const contactSection = document.getElementById('contact');

  function updateFixedCta() {
    if (!fixedCta) return;

    const scrollY = window.scrollY;
    const showAfter = heroHeight * 0.8;

    // Show after scrolling past hero, hide when contact section is in view
    if (contactSection) {
      const contactTop = contactSection.getBoundingClientRect().top + window.pageYOffset;
      const isNearContact = scrollY + window.innerHeight > contactTop;

      if (scrollY > showAfter && !isNearContact) {
        fixedCta.classList.add('is-visible');
      } else {
        fixedCta.classList.remove('is-visible');
      }
    } else {
      if (scrollY > showAfter) {
        fixedCta.classList.add('is-visible');
      } else {
        fixedCta.classList.remove('is-visible');
      }
    }
  }

  /* ------------------------------------------------------------------------
     Scroll: Fade-in animation using Intersection Observer
     ------------------------------------------------------------------------ */
  const fadeElements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  fadeElements.forEach(el => observer.observe(el));

  /* ------------------------------------------------------------------------
     Combined scroll handler (throttled with requestAnimationFrame)
     ------------------------------------------------------------------------ */
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateHeader();
        updateFixedCta();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Initial calls
  updateHeader();
  updateFixedCta();

});
