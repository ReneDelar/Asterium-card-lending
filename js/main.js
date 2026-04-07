/* =============================================
   ASTERIUM — main.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // HEADER: scroll effect + burger menu
  // ============================================
  const header = document.getElementById('header');
  const burger = document.getElementById('burger');
  const nav = document.getElementById('main-nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    nav.classList.toggle('open');
  });

  // Close nav when clicking a link
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      nav.classList.remove('open');
    });
  });

  // Close nav when clicking outside
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) {
      burger.classList.remove('open');
      nav.classList.remove('open');
    }
  });


  // ============================================
  // CAROUSEL — Card Showcase
  // ============================================
  const track = document.getElementById('card-track');
  const dots = document.querySelectorAll('#card-dots .carousel__dot');
  const prevBtn = document.getElementById('card-prev');
  const nextBtn = document.getElementById('card-next');

  if (track) {
    let current = 0;
    const slides = track.querySelectorAll('.carousel__slide');
    const total = slides.length;
    let startX = 0;
    let isDragging = false;
    let autoplayTimer;

    const goTo = (index) => {
      current = (index + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
    };

    prevBtn?.addEventListener('click', () => {
      goTo(current - 1);
      resetAutoplay();
    });

    nextBtn?.addEventListener('click', () => {
      goTo(current + 1);
      resetAutoplay();
    });

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        goTo(parseInt(dot.dataset.index));
        resetAutoplay();
      });
    });

    // Touch / drag support
    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        goTo(diff > 0 ? current + 1 : current - 1);
        resetAutoplay();
      }
      isDragging = false;
    });

    // Mouse drag
    track.addEventListener('mousedown', (e) => {
      startX = e.clientX;
      isDragging = true;
    });

    track.addEventListener('mouseup', (e) => {
      if (!isDragging) return;
      const diff = startX - e.clientX;
      if (Math.abs(diff) > 50) {
        goTo(diff > 0 ? current + 1 : current - 1);
        resetAutoplay();
      }
      isDragging = false;
    });

    track.addEventListener('mouseleave', () => {
      isDragging = false;
    });

    // Autoplay
    const startAutoplay = () => {
      autoplayTimer = setInterval(() => goTo(current + 1), 4500);
    };

    const resetAutoplay = () => {
      clearInterval(autoplayTimer);
      startAutoplay();
    };

    startAutoplay();
  }


  // ============================================
  // FAQ ACCORDION
  // ============================================
  const faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq__question');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      faqItems.forEach(i => i.classList.remove('open'));

      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });


  // ============================================
  // SMOOTH SCROLL for anchor links
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const headerHeight = header.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  // ============================================
  // SCROLL REVEAL — fade in sections
  // ============================================
  const revealTargets = document.querySelectorAll(
    '.stats__item, .features__list-item, .steps__item, .security__item, .faq__item'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
    revealObserver.observe(el);
  });

  // Add revealed state style dynamically
  const style = document.createElement('style');
  style.textContent = `.revealed { opacity: 1 !important; transform: none !important; }`;
  document.head.appendChild(style);


  // ============================================
  // CARD 3D TILT on hover
  // ============================================
  document.querySelectorAll('.card-3d').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 8}deg) translateY(-8px)`;
      card.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease';
    });
  });

});
