/* ═══════════════════════════════════════════
   ASTERIUM — main.js
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────
     HEADER: scroll + burger
  ───────────────────────────── */
  const header = document.getElementById('header');
  const burger = document.getElementById('burger');
  const nav    = document.getElementById('headerNav');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  burger.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    nav.classList.toggle('open', open);
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  });

  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    burger.classList.remove('open');
    nav.classList.remove('open');
  }));

  document.addEventListener('click', e => {
    if (!header.contains(e.target)) {
      burger.classList.remove('open');
      nav.classList.remove('open');
    }
  });


  /* ─────────────────────────────
     LANGUAGE SELECTOR
  ───────────────────────────── */
  const langBtn     = document.getElementById('langBtn');
  const langDrop    = document.getElementById('langDrop');
  const langCurrent = document.getElementById('langCurrent');

  langBtn.addEventListener('click', e => {
    e.stopPropagation();
    const open = langBtn.classList.toggle('open');
    langBtn.setAttribute('aria-expanded', open);
  });

  document.querySelectorAll('.lang__opt').forEach(opt => {
    opt.addEventListener('click', e => {
      e.stopPropagation();
      document.querySelectorAll('.lang__opt').forEach(o => o.classList.remove('lang__opt--active'));
      opt.classList.add('lang__opt--active');
      langCurrent.textContent = opt.dataset.lang;
      langBtn.classList.remove('open');
    });
  });

  document.addEventListener('click', e => {
    if (!langBtn.contains(e.target)) langBtn.classList.remove('open');
  });


  /* ─────────────────────────────
     FEATURE CAROUSEL (content swap)
  ───────────────────────────── */
  const featDots       = document.querySelectorAll('#featDots .feat__dot');
  const featPrev       = document.getElementById('featPrev');
  const featNext       = document.getElementById('featNext');
  const featCenterImg  = document.getElementById('featCenterImg');
  const featCenterLabel = document.getElementById('featCenterLabel');
  const featCenterSub  = document.getElementById('featCenterSub');
  const featLeftImg    = document.getElementById('featLeftImg');
  const featLeftLabel  = document.getElementById('featLeftLabel');
  const featLeftSub    = document.getElementById('featLeftSub');
  const featRightImg   = document.getElementById('featRightImg');
  const featRightLabel = document.getElementById('featRightLabel');
  const featRightSub   = document.getElementById('featRightSub');

  const featSlides = [
    {
      centerImg:   'https://www.figma.com/api/mcp/asset/eb3c43a5-1b55-4702-9dc0-ee89728ded25',
      centerLabel: 'Магазины, кафе, онлайн',
      centerSub:   'Как обычной картой — везде где принимают Visa, Mastercard и HUMO',
      leftImg:     'https://www.figma.com/api/mcp/asset/06922cf4-0533-46a5-afc3-da2415f094bd',
      leftLabel:   'Visa и Mastercard — по всему миру',
      leftSub:     'HUMO — для ежедневных трат в Узбекистане',
      rightImg:    'https://www.figma.com/api/mcp/asset/7d93bd77-8370-4b32-876f-85400b42fc62',
      rightLabel:  'Цифровая карта — за минуты',
      rightSub:    'Физическая — по желанию, доставка на адрес',
    },
    {
      centerImg:   'https://www.figma.com/api/mcp/asset/06922cf4-0533-46a5-afc3-da2415f094bd',
      centerLabel: 'Visa и Mastercard — по всему миру',
      centerSub:   'Платите в любой стране — конвертация происходит автоматически',
      leftImg:     'https://www.figma.com/api/mcp/asset/7d93bd77-8370-4b32-876f-85400b42fc62',
      leftLabel:   'Цифровая карта — за минуты',
      leftSub:     'Физическая — по желанию, доставка на адрес',
      rightImg:    'https://www.figma.com/api/mcp/asset/eb3c43a5-1b55-4702-9dc0-ee89728ded25',
      rightLabel:  'Магазины, кафе, онлайн',
      rightSub:    'Как обычной картой — везде где принимают Visa, Mastercard и HUMO',
    },
    {
      centerImg:   'https://www.figma.com/api/mcp/asset/7d93bd77-8370-4b32-876f-85400b42fc62',
      centerLabel: 'Цифровая карта — за минуты',
      centerSub:   'Физическая — по желанию, доставка на адрес',
      leftImg:     'https://www.figma.com/api/mcp/asset/eb3c43a5-1b55-4702-9dc0-ee89728ded25',
      leftLabel:   'Магазины, кафе, онлайн',
      leftSub:     'Как обычной картой — везде где принимают Visa, Mastercard и HUMO',
      rightImg:    'https://www.figma.com/api/mcp/asset/06922cf4-0533-46a5-afc3-da2415f094bd',
      rightLabel:  'Visa и Mastercard — по всему миру',
      rightSub:    'HUMO — для ежедневных трат в Узбекистане',
    },
  ];

  if (featPrev && featCenterImg) {
    let featCur = 0;
    const featTotal = featSlides.length;

    const featGoto = idx => {
      featCur = (idx + featTotal) % featTotal;

      // Fade out center image
      featCenterImg.style.opacity = '0';

      setTimeout(() => {
        const s = featSlides[featCur];

        // Update center panel
        featCenterImg.src   = s.centerImg;
        featCenterLabel.textContent = s.centerLabel;
        featCenterSub.textContent   = s.centerSub;

        // Update side panels
        featLeftImg.src   = s.leftImg;
        featLeftLabel.textContent = s.leftLabel;
        featLeftSub.textContent   = s.leftSub;
        featRightImg.src  = s.rightImg;
        featRightLabel.textContent = s.rightLabel;
        featRightSub.textContent   = s.rightSub;

        featCenterImg.style.opacity = '1';
      }, 300);

      // Update dots
      featDots.forEach((d, i) => d.classList.toggle('feat__dot--on', i === featCur));
    };

    featPrev.addEventListener('click', () => featGoto(featCur - 1));
    featNext.addEventListener('click', () => featGoto(featCur + 1));
    featDots.forEach((d, i) => d.addEventListener('click', () => featGoto(i)));

    // Touch swipe on feature panels
    const featSection = document.querySelector('.s-feat');
    if (featSection) {
      let fStartX = 0;
      featSection.addEventListener('touchstart', e => { fStartX = e.touches[0].clientX; }, { passive: true });
      featSection.addEventListener('touchend', e => {
        const dx = fStartX - e.changedTouches[0].clientX;
        if (Math.abs(dx) > 40) {
          if (dx > 0) featGoto(featCur + 1);
          else        featGoto(featCur - 1);
        }
      });
    }
  }


  /* ─────────────────────────────
     STEPS TABS
  ───────────────────────────── */
  const stepPills  = document.querySelectorAll('.step__pill');
  const stepTitles = document.getElementById('stepTitles');
  const stepNum    = document.getElementById('stepNum');

  const stepData = {
    0: { num: '01', title: 'Скачать приложение',    sub: 'Создайте учетную запись' },
    1: { num: '02', title: 'Пополните счёт',        sub: 'Переведите криптовалюту на кошелёк' },
    2: { num: '03', title: 'Закажите карту',        sub: 'Виртуальная — сразу, физическая — на адрес' },
    3: { num: '04', title: 'Оплачивайте',           sub: 'Везде где принимают Visa, Mastercard, HUMO' },
    4: { num: '05', title: 'Получайте награду',     sub: '30 000 сум велком-бонус за первый платёж' },
  };

  stepPills.forEach((pill, i) => {
    pill.addEventListener('click', () => {
      stepPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const d = stepData[i + 1];
      if (d && stepTitles) {
        stepTitles.innerHTML =
          `<p class="step__title">${d.title}</p>
           <p class="step__sub">${d.sub}</p>`;
      }
      if (stepNum) stepNum.textContent = d ? d.num : pill.querySelector('.step__pill-badge').textContent.trim();
    });
  });


  /* ─────────────────────────────
     CARD FAN CAROUSEL
  ───────────────────────────── */
  const cardPrev  = document.getElementById('cardPrev');
  const cardNext  = document.getElementById('cardNext');
  const cardsFan  = document.getElementById('cardsFan');
  const cardsName = document.getElementById('cardsName');
  const cardsTags = document.getElementById('cardsTags');

  if (cardsFan) {
    const cardSlides = [
      {
        name: 'HUMO Daily',
        tags: ['Для жизни в Узбекистане', 'Повседневные платежи', 'Локальные пополнения', 'Привычный формат'],
      },
      {
        name: 'Asterium Crypto',
        tags: ['Для криптоинвесторов', 'Глобальные платежи', 'Visa / Mastercard', 'Конвертация онлайн'],
      },
      {
        name: 'Visa Platinum',
        tags: ['Международные покупки', 'Премиум обслуживание', 'Кэшбэк 1%', 'Страхование в поездках'],
      },
    ];

    let cardCur = 0;
    const cards = cardsFan.querySelectorAll('.crd');
    const total = cardSlides.length;

    const updateCards = (dir = 0) => {
      const prev = (cardCur - 1 + total) % total;
      const next = (cardCur + 1) % total;

      // animate outgoing center
      if (dir !== 0) {
        const outgoing = cardsFan.querySelector('.crd--center');
        if (outgoing) {
          outgoing.style.transition = 'transform .35s ease, opacity .25s ease';
          outgoing.style.opacity = '0';
          outgoing.style.transform = dir > 0
            ? 'translate(-50%,-50%) translateX(-60px) scale(.85)'
            : 'translate(-50%,-50%) translateX(60px) scale(.85)';
        }
      }

      setTimeout(() => {
        // Reset all cards
        cards.forEach(c => {
          c.style.transition = '';
          c.style.opacity = '';
          c.style.transform = '';
        });

        // Re-assign classes based on cardCur
        const imgs = [
          'https://www.figma.com/api/mcp/asset/70faa126-7093-4785-a744-77e536390af9', // 0 — HUMO Daily
          'https://www.figma.com/api/mcp/asset/39cd5125-99e8-4800-aae9-693270e32fd2', // 1 — Asterium Crypto
          'https://www.figma.com/api/mcp/asset/bf1264f3-e264-4058-be96-da7c27304514', // 2 — Visa Platinum
        ];

        cards[0].className = 'crd crd--left';
        cards[0].src = imgs[prev];
        cards[1].className = 'crd crd--center';
        cards[1].src = imgs[cardCur];
        cards[2].className = 'crd crd--right';
        cards[2].src = imgs[next];

        // Update name + tags
        cardsName.textContent = cardSlides[cardCur].name;
        cardsTags.innerHTML = cardSlides[cardCur].tags
          .map((t, i) => `<span class="ctag${i === 0 ? ' ctag--filled' : ''}">${t}</span>`)
          .join('');
      }, dir !== 0 ? 180 : 0);
    };

    cardPrev.addEventListener('click', () => {
      cardCur = (cardCur - 1 + total) % total;
      updateCards(-1);
    });

    cardNext.addEventListener('click', () => {
      cardCur = (cardCur + 1) % total;
      updateCards(1);
    });

    // Touch swipe on fan
    let startX = 0;
    cardsFan.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    cardsFan.addEventListener('touchend', e => {
      const dx = startX - e.changedTouches[0].clientX;
      if (Math.abs(dx) > 40) {
        if (dx > 0) { cardCur = (cardCur + 1) % total; updateCards(1); }
        else        { cardCur = (cardCur - 1 + total) % total; updateCards(-1); }
      }
    });
  }


  /* ─────────────────────────────
     FAQ ACCORDION
  ───────────────────────────── */
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-q').addEventListener('click', () => {
      const isOpen = item.classList.contains('faq-item--open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('faq-item--open'));
      if (!isOpen) item.classList.add('faq-item--open');
    });
  });


  /* ─────────────────────────────
     SMOOTH SCROLL
  ───────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ─────────────────────────────
     SCROLL REVEAL
  ───────────────────────────── */
  const srTargets = document.querySelectorAll(
    '.bcard, .sec-card, .faq-item, .step__pill, .feat__panel'
  );

  srTargets.forEach((el, i) => {
    el.classList.add('sr-hidden');
    el.style.transitionDelay = `${(i % 5) * 0.08}s`;
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('sr-visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  srTargets.forEach(el => observer.observe(el));


  /* ─────────────────────────────
     CARD 3D TILT
  ───────────────────────────── */
  const centerCard = cardsFan ? cardsFan.querySelector('.crd--center') : null;
  if (centerCard) {
    cardsFan.addEventListener('mousemove', e => {
      const r = centerCard.getBoundingClientRect();
      const x = (e.clientX - r.left)  / r.width  - 0.5;
      const y = (e.clientY - r.top)   / r.height - 0.5;
      centerCard.style.transition = 'transform .08s ease';
      centerCard.style.transform  = `translate(-50%,-50%) perspective(700px) rotateY(${x*12}deg) rotateX(${-y*8}deg) scale(1.03)`;
    });

    cardsFan.addEventListener('mouseleave', () => {
      centerCard.style.transition = 'transform .4s cubic-bezier(.22,.68,0,1.2)';
      centerCard.style.transform  = 'translate(-50%,-50%)';
    });
  }

});
