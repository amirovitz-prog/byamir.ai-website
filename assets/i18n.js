/* ============================================================
   by AMIR — i18n
   NL is the source of truth (lives in the HTML, fully editable).
   EN strings live here. Toggle persists in localStorage.
   Add a data-i18n="section.key" to any element + an EN entry below.
   ============================================================ */
(function () {
  const KEY = 'byamir_lang';

  const EN = {
    nav: {
      services: `Services`,
      method: `Approach`,
      about: `About`,
      contact: `Contact`,
      cta: `Book a conversation`,
    },
    hero: {
      eyebrow: `AI-driven commercial leadership`,
      title1: `Growth, led by people.`,
      title2: `Amplified by AI.`,
      lead: `20+ years of commercial leadership, deployed as a growth lever for ambitious organisations in the Netherlands. AI as the instrument — human judgment as the foundation.`,
      cta1: `Book a free conversation`,
      cta2: `Explore the services`,
    },
    stats: {
      s1: `of NL companies pilot AI`,
      s2: `achieve measurable value`,
      s3: `revenue portfolio led`,
      s4: `deal conversion improved`,
    },
    gap: {
      eyebrow: `The opportunity`,
      title: `High AI awareness. Low AI implementation. That's the gap.`,
      lead: `Dutch organisations are testing AI in force — yet few organisations turn it into measurable commercial value. Not because the technology fails, but because the bridge to practice is missing.`,
      f1: `of Dutch companies are piloting AI.<span class="src">CBS, 2025</span>`,
      f2: `achieve measurable business value.<span class="src">McKinsey, 2024</span>`,
      f3: `higher success rate with an experienced external partner.<span class="src">McKinsey, 2024</span>`,
      f4: `expected annual market growth for AI consulting in NL.<span class="src">Gartner, 2025</span>`,
    },
    isnot: {
      eyebrow: `Positioning`,
      title: `Not a tech vendor. A commercial leader who deploys AI.`,
      negTitle: `What by AMIR is not`,
      n1: `A tech vendor or software reseller`,
      n2: `A generic AI consultant without commercial proof`,
      n3: `AI as a goal in itself, without business impact`,
      n4: `A large firm with high overhead`,
      posTitle: `What by AMIR is`,
      p1: `A senior commercial leader who uses AI as a growth driver`,
      p2: `20+ years of proven results in international environments`,
      p3: `AI as the instrument — human judgment as the foundation`,
      p4: `Measurable impact: revenue, conversion, pipeline, adoption`,
    },
    pillars: {
      eyebrow: `Services`,
      title: `Three pillars. One goal: measurable growth.`,
      lead: `Each pillar starts with a low-threshold assessment (★) — sharp insight within a few weeks that grows into a focused engagement.`,
      p1t: `AI Consultancy`,
      p1d: `From AI strategy and readiness to sales acceleration and adoption. AI that actually lands in your commercial operation.`,
      p2t: `Bids & Tenders`,
      p2d: `Win more tenders. From strategy and win themes to fully writing, reviewing and learning from bids.`,
      p3t: `Growth Leadership`,
      p3d: `Senior commercial leadership at VP level — sales strategy, team effectiveness and interim leadership, with AI embedded.`,
      entry: `★ Entry point`,
      cta: `View all services`,
    },
    method: {
      eyebrow: `Approach`,
      title: `From assessment to engagement`,
      lead: `A proven entry model: start small and concrete, then build further on results.`,
      s1t: `Introduction`,
      s1d: `A no-obligation conversation about your situation, ambition and bottlenecks. Always free.`,
      s2t: `Assessment`,
      s2d: `Sharp insight within a few weeks — gap analysis, quick wins and a concrete action plan.`,
      s3t: `Live debrief`,
      s3d: `We discuss the findings together. Clear, honest and immediately actionable.`,
      s4t: `Engagement`,
      s4d: `Where it adds value: a focused follow-up engagement, project or retainer.`,
    },
    about: {
      eyebrow: `About Amir`,
      title: `20+ years of commercial leadership, scaled internationally.`,
      lead: `As VP Global Sales at Sodexo and in senior roles at Facilicom and ISS, Amir drove commercial growth at international scale. by AMIR brings that experience to ambitious organisations in the Netherlands — independent, results-driven and with AI as a lever.`,
      st1: `years of international sales leadership`,
      st2: `average improvement in deal conversion`,
      cta: `Read the full story`,
    },
    quote: {
      text: `The greatest threat of AI is the fear of AI. The greatest opportunity is the love of AI.`,
      missionH: `Why we exist`,
      visionH: `Where we're heading`,
    },
    values: {
      v1t: `Knowledge`, v1d: `Expertise over theory. Practice that has proven itself.`,
      v2t: `Reliability`, v2d: `Doing what we say. Results that are measurable.`,
      v3t: `Integrity`, v3d: `Honest about the role of AI — and about what works.`,
      v4t: `Creativity`, v4d: `Bespoke, never templated. Every organisation is different.`,
    },
    cta: {
      eyebrow: `Get started`,
      title: `Ready to bridge the gap?`,
      lead: `The first conversation is always free and without obligation. Let's find where your biggest growth opportunity lies.`,
      btn: `Book a free conversation`,
    },
    footer: {
      about: `Senior commercial leadership that deploys AI as a growth lever for ambitious organisations in the Netherlands.`,
      nav: `Navigation`,
      contact: `Contact`,
      loc: `Nieuw-Beijerland, Netherlands`,
      rights: `All rights reserved.`,
    },

    /* ---- Services page ---- */
    services: {
      heroEyebrow: `Services`,
      heroTitle: `Three pillars, one operating model.`,
      heroLead: `Diagnose first, then act. Every pillar opens with a fixed-price assessment that converts into a focused engagement — project, retainer or interim leadership.`,
      pricing: `Rates on request — every engagement is tailored. The first conversation is always free.`,
      p1name: `AI Consultancy`,
      p1desc: `Turning AI from pilot into commercial value — strategy, readiness, acceleration and adoption.`,
      p2name: `Bids & Tenders`,
      p2desc: `Winning more, better tenders — strategy, writing, coaching and structured learning.`,
      p3name: `Growth Leadership`,
      p3desc: `Senior commercial firepower on demand — sales strategy, team effectiveness and interim leadership.`,
      entry: `★ Entry point`,
      retainer: `Retainer`, project: `Project`, fixed: `Fixed price`, daily: `Day rate`,
      modelTitle: `How an engagement works`,
      ctaTitle: `Not sure where to start?`,
      ctaLead: `Most clients begin with an assessment. In a free first conversation we'll find the right entry point for your situation.`,
    },

    /* ---- About page ---- */
    aboutp: {
      heroEyebrow: `About Amir`,
      heroTitle: `By Amir. By AI.`,
      heroLead: `A senior commercial leader with 20+ years of international experience — now bringing that firepower to ambitious organisations in the Netherlands as an independent partner.`,
      introTitle: `Why I started by AMIR`,
      intro1: `In my role at Sodexo I saw daily how wide the gap is between AI hype and real implementation in commercial organisations. Pilots succeed. Implementation fails. Leaders don't know how to build the bridge.`,
      intro2: `AI doesn't have a technology problem — it has a human leadership problem. Whoever understands that, and knows commercial practice, holds a unique and valuable position. After 20+ years in employment, I want to decide for myself where, how and for whom I make impact.`,
      careerTitle: `Career`,
      eduTitle: `Education`,
      strengthsTitle: `What I bring`,
      missionTitle: `Mission`,
      missionText: `by AMIR helps organisations grow by strengthening (strategic) leadership and integrating AI intelligently into their commercial operations — not as a technology project, but as a strategic growth lever.`,
      visionTitle: `Vision`,
      visionText: `To grow into a small, agile firm that helps organisations grow — powered by AI, led by people. A brand known for measurable growth results, not theories.`,
      ctaTitle: `Let's talk`,
      ctaLead: `Curious whether by AMIR is the right partner for your growth question? The first conversation is free.`,
      r1: `VP Global Sales & BD, Sodexo Energy & Mining`,
      r2: `Global Head of Sales Operations, Sodexo`,
      r3: `Director Sales & BD Benelux, Sodexo`,
      r4: `Commercial Manager, Facilicom Solutions`,
      r5: `Senior Account & Bid Manager, ISS`,
      edu1: `BA Leisure Management — Stenden University, 1996–2003`,
      edu2: `Hilton Elevator Graduate Programme — Hilton International, 2003–2004`,
      training: `Continuing education`,
      trainingText: `Strategic Selling · Consultative Sales · CRM & Pipeline · Intercultural Management`,
      st1: `20+ years of proven commercial leadership at VP/C-suite level`,
      st2: `A broad approach: AI Consultancy, Bids & Tenders and Sales Leadership`,
      st3: `Hands-on experience with large CRM & AI implementations in complex environments`,
      st4: `A strong international senior network to mobilise the right expertise fast`,
      st5: `Intercultural experience: EMEA, Americas & APAC`,
      st6: `Transparency about AI use as a distinctive part of the brand`,
      s1: `deal conversion improved`,
      s2: `CRM adoption increased`,
    },

    /* ---- Contact page ---- */
    contactp: {
      heroEyebrow: `Contact`,
      heroTitle: `Let's start with a conversation.`,
      heroLead: `The first conversation is always free and without obligation. Tell me about your situation and we'll explore where the biggest growth opportunity lies.`,
      formName: `Name`,
      formEmail: `Email`,
      formCompany: `Company`,
      formMessage: `Your question or situation`,
      formSend: `Send message`,
      phName: `Your name`,
      phEmail: `you@company.com`,
      phCompany: `Company name`,
      phMessage: `Tell me briefly what's on your mind…`,
      directTitle: `Direct`,
      availTitle: `Availability`,
      availText: `Remote across the Netherlands and on-site with clients. EMEA on request.`,
      sent: `Thanks — your message has been sent. I'll be in touch soon.`,
    },

    /* ---- Service descriptions (names stay identical in both languages) ---- */
    svc: {
      s11: `AI Readiness report · gap analysis · 90-day action plan · live debrief · investment case.`,
      s12: `AI pipeline management, lead scoring, forecast accuracy, sales coaching playbook + ROI dashboard.`,
      s13: `AI tools audit, bespoke playbook, team workshops (fear → love), 30/60/90-day adoption tracking.`,
      s14: `AI strategy & governance, vendor selection, board reporting. Minimum 3 months.`,
      s15: `Two monthly strategic sessions, on-demand input, board AI agenda preparation.`,
      s21: `Bid effectiveness report · win/loss analysis · improvement plan · AI opportunities · live debrief.`,
      s22: `Go/no-go analysis, client strategy, win themes, bid strategy document, compliance matrix.`,
      s23: `Fully written proposal, executive summary, win themes, submission guided.`,
      s24: `Section-by-section review feedback, persuasion coaching, final quality check, debrief.`,
      s25: `Post-bid report, win/loss diagnosis, competitor analysis, concrete improvement points.`,
      s31: `Sales ROI report · funnel analysis · team effectiveness diagnostics · client portfolio · quick wins.`,
      s32: `Full sales plan, market analysis, ICP definition, GTM strategy, KPI framework, board presentation.`,
      s33: `Baseline per team member, personalised coaching plan, pipeline training, 30/60/90-day measurement.`,
      s34: `Sales playbook, pitch & proposition training, objection handling, CRM discipline, adoption tracking.`,
      s35: `Full VP-level leadership coverage: team, pipeline, board. AI integration embedded.`,
    },
    model: {
      fixedD: `The assessments — sharp insight within a few weeks, at a price agreed up front.`,
      projectD: `Focused delivery engagements with a clear beginning, end and result.`,
      retainerD: `Ongoing value — strategic advisory or full commercial leadership coverage.`,
    },
  };

  function get(path) {
    return path.split('.').reduce((o, k) => (o == null ? o : o[k]), EN);
  }

  function applyLang(lang) {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      if (el.__nl == null) el.__nl = el.innerHTML;
      if (lang === 'en') {
        const v = get(el.getAttribute('data-i18n'));
        if (v != null) el.innerHTML = v;
      } else {
        el.innerHTML = el.__nl;
      }
    });
    document.querySelectorAll('[data-i18n-ph]').forEach((el) => {
      if (el.__nlph == null) el.__nlph = el.getAttribute('placeholder') || '';
      if (lang === 'en') {
        const v = get(el.getAttribute('data-i18n-ph'));
        if (v != null) el.setAttribute('placeholder', v);
      } else {
        el.setAttribute('placeholder', el.__nlph);
      }
    });
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-lang]').forEach((b) =>
      b.classList.toggle('active', b.getAttribute('data-lang') === lang)
    );
  }

  /* Language is driven by the URL: /en/... → English, everything else → Dutch.
     This makes each language a real, shareable link. */
  function isENPath() {
    return /(^|\/)en(\/|$)/.test(location.pathname);
  }
  function equivalentPath(target) {
    let p = location.pathname.replace(/(^|\/)en(\/|$)/, function (m, pre, post) {
      return pre + (post === '/' ? '/' : '');
    });
    if (p === '') p = '/';
    if (target === 'en') p = (p === '/' ? '/en/' : '/en' + p);
    return p;
  }

  function init() {
    applyLang(isENPath() ? 'en' : 'nl');
    document.querySelectorAll('[data-lang]').forEach((b) => {
      b.addEventListener('click', (e) => {
        e.preventDefault();
        const target = b.getAttribute('data-lang');
        const current = isENPath() ? 'en' : 'nl';
        if (target === current) return;
        window.location.href = equivalentPath(target) + location.hash;
      });
    });
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);

  window.I18N = { apply: applyLang, dict: EN };
})();
