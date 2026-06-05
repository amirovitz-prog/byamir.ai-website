// Three hero directions for by AMIR — all dark charcoal + warm gold editorial,
// distinct compositions. Mounted inside design-canvas.jsx artboards.

const GOLD = '#C9A96E';
const GOLD_SOFT = '#D9BE8A';
const INK = '#161513';
const INK_2 = '#1E1C19';
const PAPER = '#F3EFE8';
const MUTE = '#9C958A';
const LINE = 'rgba(201,169,110,0.22)';

// ---- Shared bits --------------------------------------------------------

function Wordmark({ height = 52 }) {
  return (
    <img src="assets/logo/byAMIR-dark.png" alt="by AMIR" style={{ height, width: 'auto', display: 'block' }} />
  );
}

function Nav({ active = 'Home' }) {
  const items = ['Diensten', 'Over Amir', 'Aanpak', 'Contact'];
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '30px 64px', borderBottom: `1px solid ${LINE}` }}>
      <Wordmark />
      <div style={{ display: 'flex', alignItems: 'center', gap: 38 }}>
        {items.map((it) => (
          <span key={it} style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 14.5, letterSpacing: '0.01em', color: it === active ? PAPER : MUTE, fontWeight: it === active ? 600 : 400 }}>{it}</span>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
        <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 13, letterSpacing: '0.08em', color: MUTE }}>
          <span style={{ color: PAPER, fontWeight: 600 }}>NL</span> · EN
        </span>
        <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: INK, background: GOLD, padding: '11px 20px', borderRadius: 2, letterSpacing: '0.01em' }}>Plan een gesprek</span>
      </div>
    </div>
  );
}

function Eyebrow({ children, color = GOLD }) {
  return (
    <div style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 12.5, letterSpacing: '0.3em', textTransform: 'uppercase', color, fontWeight: 600, whiteSpace: 'nowrap' }}>{children}</div>
  );
}

// Portrait — real photo, warm duotone-friendly framing
function PortraitSlot({ style }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', ...style }}>
      <img src="assets/amir-portrait.png" alt="Amir Bercovitz" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 28%', filter: 'grayscale(0.15) contrast(1.02)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(22,21,19,0) 55%, rgba(22,21,19,0.55) 100%)' }} />
    </div>
  );
}

// =========================================================================
// DIRECTION A — Editorial Statement
// Big centered Cormorant headline, generous air, hairline rules, stat band.
// =========================================================================
function HeroA() {
  return (
    <div style={{ width: '100%', height: '100%', background: INK, color: PAPER, display: 'flex', flexDirection: 'column' }}>
      <Nav />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 80px' }}>
        <Eyebrow>By Amir. By AI.</Eyebrow>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: 64, lineHeight: 1.12, letterSpacing: '-0.01em', margin: '26px 0 0', flexShrink: 0 }}>
          <span style={{ display: 'block', whiteSpace: 'nowrap' }}>Groei, aangedreven door AI.</span>
          <span style={{ display: 'block', whiteSpace: 'nowrap', fontStyle: 'italic', color: GOLD_SOFT }}>Geleid door mensen.</span>
        </h1>
        <p style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 18, lineHeight: 1.6, color: MUTE, maxWidth: 580, margin: '26px 0 0', fontWeight: 400, flexShrink: 0 }}>
          20+ jaar commercieel leiderschap, ingezet als groeihefboom voor de Nederlandse mid-market. AI als instrument — menselijk oordeel als fundament.
        </p>
        <div style={{ display: 'flex', gap: 16, marginTop: 42, alignItems: 'center' }}>
          <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 15.5, fontWeight: 600, color: INK, background: GOLD, padding: '15px 30px', borderRadius: 2 }}>Plan een vrijblijvend gesprek</span>
          <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 15.5, fontWeight: 500, color: PAPER, padding: '15px 14px', borderBottom: `1px solid ${GOLD}` }}>Bekijk de diensten →</span>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: `1px solid ${LINE}` }}>
        {[['87%', 'NL-bedrijven test AI'], ['<30%', 'behaalt echte waarde'], ['€2,4B', 'omzet onder leiding'], ['+50%', 'dealconversie verbeterd']].map(([n, l], i) => (
          <div key={i} style={{ padding: '26px 36px', borderLeft: i ? `1px solid ${LINE}` : 'none', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 38, color: GOLD_SOFT, lineHeight: 1 }}>{n}</div>
            <div style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 12.5, letterSpacing: '0.04em', color: MUTE, marginTop: 8 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// =========================================================================
// DIRECTION B — The Split
// Asymmetric: text left on charcoal, full-bleed portrait right, gold rule.
// =========================================================================
function HeroB() {
  return (
    <div style={{ width: '100%', height: '100%', background: INK, color: PAPER, display: 'flex', flexDirection: 'column' }}>
      <Nav />
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.15fr 0.85fr' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px', borderRight: `1px solid ${LINE}` }}>
          <Eyebrow>AI-gedreven commercieel leiderschap</Eyebrow>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: 70, lineHeight: 1.05, letterSpacing: '-0.01em', margin: '26px 0 0' }}>
            De kloof tussen<br /><span style={{ fontStyle: 'italic', color: GOLD_SOFT }}>AI-pilot</span> en<br />resultaat.
          </h1>
          <p style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 18, lineHeight: 1.6, color: MUTE, maxWidth: 460, margin: '30px 0 0' }}>
            87% van de Nederlandse bedrijven test AI. Minder dan 30% behaalt echte waarde. by AMIR overbrugt dat gat — met 20+ jaar commercieel leiderschap.
          </p>
          <div style={{ display: 'flex', gap: 16, marginTop: 38, alignItems: 'center' }}>
            <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 15.5, fontWeight: 600, color: INK, background: GOLD, padding: '15px 30px', borderRadius: 2 }}>Plan een gesprek</span>
            <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 15.5, fontWeight: 500, color: PAPER, padding: '15px 4px', borderBottom: `1px solid ${GOLD}` }}>Over Amir →</span>
          </div>
          <div style={{ display: 'flex', gap: 44, marginTop: 56 }}>
            {[['AI Consultancy', '01'], ['Bids & Tenders', '02'], ['Growth Leadership', '03']].map(([t, n]) => (
              <div key={n}>
                <div style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 11, letterSpacing: '0.2em', color: GOLD }}>{n}</div>
                <div style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 14, color: PAPER, marginTop: 6, fontWeight: 500 }}>{t}</div>
              </div>
            ))}
          </div>
        </div>
        <PortraitSlot style={{ height: '100%' }} />
      </div>
    </div>
  );
}

// =========================================================================
// DIRECTION C — Manifesto / Quote-led
// Lead with the philosophy. Brave, typographic, minimal.
// =========================================================================
function HeroC() {
  return (
    <div style={{ width: '100%', height: '100%', background: INK_2, color: PAPER, display: 'flex', flexDirection: 'column' }}>
      <Nav />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 110px', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 110, top: 70, fontFamily: "'Cormorant Garamond', serif", fontSize: 140, color: GOLD, opacity: 0.5, lineHeight: 0.6 }}>“</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: 54, lineHeight: 1.22, letterSpacing: '-0.005em', margin: 0, flexShrink: 0 }}>
          <span style={{ display: 'block', whiteSpace: 'nowrap' }}>De grootste bedreiging van AI</span>
          <span style={{ display: 'block', whiteSpace: 'nowrap' }}>is de <span style={{ color: MUTE }}>angst</span> voor AI.</span>
          <span style={{ display: 'block', whiteSpace: 'nowrap' }}>De grootste kans is de <span style={{ fontStyle: 'italic', color: GOLD_SOFT }}>liefde</span> voor AI.</span>
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 44, flexShrink: 0 }}>
          <span style={{ width: 56, height: 1, background: GOLD }} />
          <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 14, letterSpacing: '0.28em', textTransform: 'uppercase', color: GOLD, fontWeight: 600, whiteSpace: 'nowrap' }}>By Amir. By AI.</span>
        </div>
        <p style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 18, lineHeight: 1.6, color: MUTE, maxWidth: 560, margin: '38px 0 0', flexShrink: 0 }}>
          Senior commercieel leiderschap dat AI inzet als groeihefboom — voor de Nederlandse mid-market. Geen tech-project. Een groeistrategie.
        </p>
        <div style={{ display: 'flex', gap: 16, marginTop: 36, alignItems: 'center' }}>
          <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 15.5, fontWeight: 600, color: INK, background: GOLD, padding: '15px 30px', borderRadius: 2 }}>Plan een vrijblijvend gesprek</span>
          <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 15.5, fontWeight: 500, color: PAPER, padding: '15px 4px', borderBottom: `1px solid ${GOLD}` }}>Bekijk de diensten →</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HeroA, HeroB, HeroC });
