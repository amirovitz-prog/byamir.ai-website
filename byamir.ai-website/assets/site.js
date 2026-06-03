/* ============================================================
   by AMIR — site behaviours
   Header scroll state · mobile menu · reveal-on-scroll · contact form
   ============================================================ */
(function () {
  function init() {
    /* --- header scroll state --- */
    const header = document.getElementById('header');
    const onScroll = () => {
      if (!header) return;
      header.classList.toggle('scrolled', window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* --- mobile menu --- */
    const toggle = document.getElementById('navToggle');
    if (toggle) {
      toggle.addEventListener('click', () => document.body.classList.toggle('menu-open'));
    }
    document.querySelectorAll('#mobileMenu a').forEach((a) =>
      a.addEventListener('click', () => document.body.classList.remove('menu-open'))
    );

    /* --- reveal on scroll --- */
    const reveals = document.querySelectorAll('.reveal');
    document.documentElement.classList.add('js-anim');
    if ('IntersectionObserver' in window && reveals.length) {
      let ioWorked = false;
      const io = new IntersectionObserver(
        (entries) => {
          ioWorked = true;
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in');
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
      );
      reveals.forEach((r) => io.observe(r));
      /* Fallback: if the observer never fires (some embedded/headless contexts),
         reveal everything so content is never stuck invisible. */
      setTimeout(() => {
        if (!ioWorked) reveals.forEach((r) => r.classList.add('in'));
      }, 1500);
    } else {
      reveals.forEach((r) => r.classList.add('in'));
    }

    /* --- contact form: mailto fallback (works before a backend is connected) --- */
    const form = document.getElementById('contactForm');
    if (form) {
      const note = document.getElementById('formNote');
      const btn = form.querySelector('button[type="submit"]');
      const t = (en, nl) => (document.documentElement.lang === 'en' ? en : nl);

      form.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        if (typeof form.reportValidity === 'function' && !form.reportValidity()) return;

        const data = new FormData(form);
        const name = (data.get('name') || '').toString().trim();
        const email = (data.get('email') || '').toString().trim();
        const lang = document.documentElement.lang || 'nl';

        /* enrich the email that lands in the inbox */
        data.set('subject', (lang === 'en' ? 'Website enquiry — ' : 'Aanvraag via website — ') + (name || email));
        data.set('from_name', name || 'by AMIR website');

        const btnLabel = btn ? btn.textContent : '';
        if (btn) { btn.disabled = true; btn.textContent = t('Sending…', 'Versturen…'); }
        if (note) { note.classList.remove('show', 'error'); }

        try {
          const res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { Accept: 'application/json' },
            body: data,
          });
          const out = await res.json().catch(() => ({}));
          if (res.ok && out.success) {
            form.reset();
            if (note) {
              note.textContent = t(
                (window.I18N && window.I18N.dict.contactp.sent) ||
                  "Thanks — your message has been sent. I'll be in touch soon.",
                'Bedankt — je bericht is verzonden. Ik neem snel contact op.'
              );
              note.classList.add('show');
            }
          } else {
            throw new Error('web3forms');
          }
        } catch (err) {
          if (note) {
            note.textContent = t(
              'Something went wrong. Please email me directly at amir@byamir.ai.',
              'Er ging iets mis. Mail me gerust direct op amir@byamir.ai.'
            );
            note.classList.add('show', 'error');
          }
        } finally {
          if (btn) { btn.disabled = false; btn.textContent = btnLabel; }
        }
      });
    }
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
