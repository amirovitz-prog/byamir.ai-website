import { useState } from "react";

const NAVY = "#0F1729";
const NAVY_CARD = "#1a2540";
const GOLD = "#C9A96E";
const CREAM = "#EDE8DC";
const BORDER = "rgba(201,169,110,0.22)";
const isValidEmail = e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

const DIMENSIONS = ["Capture & Positionering","Win Strategie","Team & Leiderschap","Content & Delivery","Evaluatie & Leren"];

const QUESTIONS = [
  { id:1, dim:"Capture & Positionering", text:"Hoe goed kent uw organisatie de klant vóórdat de aanbesteding formeel wordt uitgeschreven?", options:["We lezen de tender voor het eerst als hij binnenkomt","We hebben enige voorkennis maar geen gestructureerde aanpak","We investeren in klantkennis maar niet consistent voor elke tender","We positioneren ons actief bij de klant lang vóór de tender — en beïnvloeden het speelveld"] },
  { id:2, dim:"Win Strategie", text:"Heeft uw team een expliciete winstrategie per tender — niet alleen een plan van aanpak, maar een strategie om te winnen?", options:["Onze aanpak is primair procedureel — we beantwoorden de vragen","We denken na over wat de klant wil maar vertalen dat niet naar een winstrategie","We formuleren een strategie maar die stuurt het voorstel onvoldoende","Elke tender heeft een expliciete winstrategie die het hele document aanstuurt"] },
  { id:3, dim:"Capture & Positionering", text:"Weet u hoe uw positie is ten opzichte van de concurrentie vóór inschrijving?", options:["Nee, we weten zelden wie er medinschrijft","We hebben een vermoeden maar geen systematisch inzicht","We analyseren de concurrentie maar handelen er onvoldoende op","We hebben een helder beeld van onze concurrentiepositie en spelen daar actief op in"] },
  { id:4, dim:"Team & Leiderschap", text:"Hoe goed werken sales en bid support samen in het biedproces?", options:["Sales draagt de tender over aan bid support en haakt dan grotendeels af","Er is contact maar geen gestructureerde samenwerking","Er wordt samengewerkt maar de rolverdeling is niet helder","Sales en bid support werken als één team — gedeelde verantwoordelijkheid, heldere rollen"] },
  { id:5, dim:"Win Strategie", text:"Heeft uw voorstel duidelijke, onderscheidende win-thema's die consequent door het hele document worden doorgevoerd?", options:["We beschrijven wat we doen maar formuleren geen onderscheidende thema's","We hebben een introductie met thema's maar die verdwijnen in de rest","Win-thema's zijn aanwezig maar niet consistent doorgevoerd","Klantspecifieke win-thema's die het hele voorstel aaneenstringen van cover tot bijlage"] },
  { id:6, dim:"Content & Delivery", text:"Hoe gestructureerd is uw content planning en -productie binnen de bids?", options:["We schrijven het voorstel in de laatste fase — structureel onder tijdsdruk","Er is een indeling maar planning en coördinatie zijn zwak","We plannen content wel maar halen interne deadlines niet altijd","Strak content plan met eigenaarschap per sectie, gestructureerde reviews en tijdige delivery"] },
  { id:7, dim:"Win Strategie", text:"In welke mate spreekt uw voorstel de taal van de klant en adresseert het zijn specifieke uitdagingen?", options:["Ons voorstel is grotendeels generiek — beperkte klantspecifieke aanpassing","We passen het voorstel aan maar het blijft product- en dienstgericht","We adresseren klantbehoeften maar de klant herkent zijn situatie er onvoldoende in","De klant leest zijn eigen uitdagingen terug in ons voorstel — op elk niveau"] },
  { id:8, dim:"Evaluatie & Leren", text:"Hoe goed is uw organisatie voorbereid op de onderhandelingsfase na inschrijving?", options:["We reageren op wat de klant vraagt — zonder duidelijke strategie","We hebben posities maar geen uitgewerkte onderhandelingsaanpak","We onderhandelen wel strategisch maar niet consistent of gestructureerd","We treden de onderhandeling in met een heldere strategie, fallbacks en mandaatstructuur"] },
  { id:9, dim:"Evaluatie & Leren", text:"Evalueert uw organisatie structureel gewonnen én verloren tenders?", options:["We gaan direct door naar de volgende tender — nauwelijks reflectie","We evalueren informeel maar trekken geen systematische conclusies","We evalueren wel maar de inzichten bereiken het team niet consequent","Elke tender wordt geëvalueerd — we leren van verlies én van winst, structureel"] },
  { id:10, dim:"Team & Leiderschap", text:"Is er in uw organisatie voldoende commercieel en inhoudelijk leiderschap om complexe tenders te winnen?", options:["Niemand neemt echt eigenaarschap over het biedproces als geheel","Er is een bidmanager maar het strategisch leiderschap ontbreekt","Er is leiderschap maar mandaat en senioriteit zijn onvoldoende","Sterk bid leadership met strategisch mandaat, diep klantinzicht en aansturing van het team"] },
];

const LEVELS = [
  { label:"Kwetsbaar", range:[0,25], color:"#c0533a" },
  { label:"Ontwikkelend", range:[26,50], color:"#b8892a" },
  { label:"Competitief", range:[51,75], color:GOLD },
  { label:"Winnaar", range:[76,100], color:"#7eb87e" },
];

const SERVICES = [
  { name:"Bid Win Rate Assessment", tag:"VASTE PRIJS", desc:"Volledige diagnose van uw biedproces: capture-aanpak, winstrategie, teamdynamiek en leerprogramma. Met concrete quick wins.", dim:"Capture & Positionering" },
  { name:"Win Strategy Development", tag:"PROJECT", desc:"Klantanalyse, concurrentiepositie, win-thema's en strategische propositie per tender of tendercategorie.", dim:"Win Strategie" },
  { name:"Bid Team Coaching & Samenwerking", tag:"PROJECT", desc:"Roldefiniëring, sales-bid integratie, bid leadership en teambegeleiding door het biedproces heen.", dim:"Team & Leiderschap" },
  { name:"Bid Writing & Content Coaching", tag:"PROJECT", desc:"Content planning, schrijfcoaching, reviewstructuur en propositieverbetering voor hogere scorende voorstellen.", dim:"Content & Delivery" },
  { name:"Post-bid Review Programma", tag:"PROJECT", desc:"Gestructureerde evaluatie van gewonnen en verloren tenders, leerlijnen en implementatie van verbeteringen.", dim:"Evaluatie & Leren" },
];

const ADVICE_FALLBACK = [
  "Uw biedproces mist structurele fundamenten. De kans dat u tenders wint die u had moeten winnen is laag — structureel. De eerste stap is inzicht: weten waar het biedproces faalt, welke kansen onbenut blijven en wat de hoogste-impact interventie is.",
  "U heeft een basis maar mist de scherpte die winnende tenders onderscheidt. Strategie, samenwerking en leerproces lopen niet synchroon. De organisatie heeft het potentieel — het gaat nu om het verbinden van de losse onderdelen tot een winnende bidmachine.",
  "Uw biedorganisatie functioneert redelijk maar laat structureel punten liggen. Gerichte interventies op de zwakste dimensies kunnen uw winratio significant verbeteren — per tender en op jaarbasis.",
  "U bevindt zich in de commerciële voorhoede van biedorganisaties. De uitdaging is consistentie en schaalbaarheid: de kwaliteit van uw beste tenders reproduceerbaar maken voor elke inschrijving.",
];

const RadarChart = ({ scores }) => {
  const cx=120, cy=115, r=85, n=DIMENSIONS.length;
  const angle = i => (Math.PI*2*i/n) - Math.PI/2;
  const pt = (i,pct) => { const a=angle(i),d=r*(pct/100); return [cx+d*Math.cos(a), cy+d*Math.sin(a)]; };
  const grid = [25,50,75,100].map(p => DIMENSIONS.map((_,i)=>pt(i,p)).map((p,j)=>(j===0?`M${p[0]},${p[1]}`:`L${p[0]},${p[1]}`)).join(" ")+" Z");
  const dataPath = DIMENSIONS.map((_,i)=>pt(i,scores[i]??0)).map((p,j)=>(j===0?`M${p[0]},${p[1]}`:`L${p[0]},${p[1]}`)).join(" ")+" Z";
  const labels = DIMENSIONS.map((d,i)=>{ const [x,y]=pt(i,118); return {x,y,d}; });
  return (
    <svg viewBox="0 0 240 235" width="220" height="215">
      {grid.map((d,i)=><path key={i} d={d} fill="none" stroke={BORDER} strokeWidth="0.8"/>)}
      {DIMENSIONS.map((_,i)=>{ const [x,y]=pt(i,100); return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={BORDER} strokeWidth="0.8"/>; })}
      <path d={dataPath} fill={`${GOLD}28`} stroke={GOLD} strokeWidth="1.5"/>
      {labels.map((l,i)=><text key={i} x={l.x} y={l.y} textAnchor="middle" dominantBaseline="middle" fontSize="8.5" fill={CREAM} fontFamily="Georgia,serif" opacity="0.8">{l.d}</text>)}
    </svg>
  );
};

const inp = { width:"100%", boxSizing:"border-box", padding:"13px 16px", fontSize:14, border:`1px solid ${BORDER}`, borderRadius:3, background:"rgba(255,255,255,0.04)", color:CREAM, outline:"none", fontFamily:"Georgia,serif" };

export default function App() {
  const [step, setStep] = useState("intro");
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const [form, setForm] = useState({ name:"", email:"", company:"" });
  const [aiAdvice, setAiAdvice] = useState("");
  const [loading, setLoading] = useState(false);

  const q = QUESTIONS[current];
  const totalQ = QUESTIONS.length;
  const progress = Math.round((current/totalQ)*100);
  const canSubmit = form.name.trim() && isValidEmail(form.email);

  const score = () => {
    const v = Object.values(answers);
    if (!v.length) return 0;
    return Math.round((v.reduce((a,b)=>a+b,0)/(v.length*3))*100);
  };

  const dimScores = () => DIMENSIONS.map(dim => {
    const qs=QUESTIONS.filter(q=>q.dim===dim), ans=qs.filter(q=>answers[q.id]!==undefined);
    if (!ans.length) return 0;
    return Math.round((ans.reduce((a,q)=>a+answers[q.id],0)/(ans.length*3))*100);
  });

  const levelIdx = () => { const s=score(); return Math.max(0,LEVELS.findIndex(l=>s>=l.range[0]&&s<=l.range[1])); };
  const level = () => LEVELS[levelIdx()];

  const recommendedServices = () => {
    const ds = dimScores();
    return SERVICES.filter(sv => { const i=DIMENSIONS.indexOf(sv.dim); return ds[i]<60; });
  };

  const generateAdvice = async (name, company) => {
    setLoading(true);
    const s=score(), lvl=level(), ds=dimScores();
    const dimSummary = DIMENSIONS.map((d,i)=>`${d}: ${ds[i]}%`).join(", ");
    const recs = SERVICES.filter(sv=>{ const i=DIMENSIONS.indexOf(sv.dim); return ds[i]<60; }).map(sv=>sv.name).join(", ");
    const prompt = `Je bent bid-strategieadviseur bij by AMIR, specialist in commercieel leiderschap en aanbestedingsstrategie met 20+ jaar ervaring. Schrijf een warm, direct en scherp gepersonaliseerd advies in het Nederlands voor ${name}${company?` van ${company}`:""}.

Score: ${s}/100 — Niveau: ${lvl.label}
Dimensies: ${dimSummary}
Meest relevante diensten: ${recs||"geen specifiek"}

Schrijf 3 korte alinea's. Benoem de sterkste en zwakste dimensie concreet. Geef praktisch, strategisch advies. Sluit af met een uitnodiging voor een gesprek met Amir. Spreek ${name} aan met 'u'. Geen wolligheid, geen AI-taal.`;
    let advice = ADVICE_FALLBACK[Math.min(levelIdx(), ADVICE_FALLBACK.length-1)];
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, messages:[{role:"user",content:prompt}] })
      });
      const data = await res.json();
      advice = data.content?.find(b=>b.type==="text")?.text || advice;
    } catch {}
    setAiAdvice(advice);
    setLoading(false);
    return advice;
  };

  const sendLead = async (advice) => {
    const ds = dimScores();
    const body = `Bid Win Rate Quickscan\n\nNaam: ${form.name}\nEmail: ${form.email}\nBedrijf: ${form.company||"—"}\n\nScore: ${score()}/100 — ${level().label}\n\nDimensies:\n${DIMENSIONS.map((d,i)=>`  ${d}: ${ds[i]}%`).join("\n")}\n\nAdvies:\n${advice}`;
    try {
      await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:50,
          system:"Noteer lead voor amir@byamir.ai. Reageer alleen met OK.",
          messages:[{role:"user",content:body}] })
      });
    } catch {}
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setStep("result");
    const advice = await generateAdvice(form.name, form.company);
    await sendLead(advice);
  };

  const answer = val => {
    const newA = {...answers,[q.id]:val};
    setAnswers(newA);
    if (current+1 < totalQ) setCurrent(current+1);
    else setStep("gate");
  };

  const s=score(), lvl=level(), ds=dimScores(), lvlIdx=levelIdx();

  const wrap = children => (
    <div style={{background:NAVY, minHeight:"100vh", padding:"2rem 1rem", fontFamily:"Georgia,serif", color:CREAM}}>
      <div style={{maxWidth:620, margin:"0 auto"}}>
        <div style={{marginBottom:"2.5rem"}}>
          <img src="https://www.byamir.ai/assets/logo/byAMIR-dark-trim.png" alt="by AMIR" style={{height:44,width:"auto",display:"block"}} onError={e=>{e.target.style.display="none";}}/>
        </div>
        {children}
      </div>
      <style>{`::placeholder{color:rgba(237,232,220,0.3);}*{box-sizing:border-box;}@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes fadein{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );

  if (step==="intro") return wrap(
    <div style={{animation:"fadein 0.5s ease"}}>
      <p style={{fontSize:10,color:GOLD,textTransform:"uppercase",letterSpacing:"0.18em",margin:"0 0 1.25rem"}}>Bid Win Rate Quickscan</p>
      <h1 style={{fontFamily:"Georgia,serif",fontSize:34,fontWeight:400,margin:"0 0 1.25rem",lineHeight:1.25,color:CREAM}}>Waarom verliest u aanbestedingen<br/>die u had moeten winnen?</h1>
      <p style={{fontSize:15,color:"rgba(237,232,220,0.65)",lineHeight:1.85,margin:"0 0 2.5rem",maxWidth:480}}>10 vragen over capture planning, winstrategie, teamsamenwerking en uw leerproces. Direct een persoonlijk rapport met concrete aanbevelingen.</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,margin:"0 0 2.5rem"}}>
        {[["10 vragen","Van capture tot evaluatie"],["± 3 minuten","Snel en to the point"],["Persoonlijk advies","Op maat gegenereerd"],["Dienstaanbeveling","Gericht op uw situatie"]].map(([t,s])=>(
          <div key={t} style={{border:`1px solid ${BORDER}`,borderRadius:3,padding:"16px",background:NAVY_CARD}}>
            <p style={{fontSize:13,color:GOLD,margin:"0 0 4px"}}>{t}</p>
            <p style={{fontSize:12,color:"rgba(237,232,220,0.45)",margin:0}}>{s}</p>
          </div>
        ))}
      </div>
      <button onClick={()=>setStep("quiz")} style={{background:GOLD,color:NAVY,border:"none",borderRadius:3,padding:"15px 36px",fontSize:15,cursor:"pointer",fontFamily:"Georgia,serif",letterSpacing:"0.02em"}}>Start de quickscan →</button>
    </div>
  );

  if (step==="quiz") return wrap(
    <div style={{animation:"fadein 0.3s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:"0.6rem"}}>
        <span style={{fontSize:10,color:"rgba(237,232,220,0.4)",letterSpacing:"0.08em"}}>VRAAG {current+1} VAN {totalQ}</span>
        <span style={{fontSize:10,color:GOLD,letterSpacing:"0.12em",textTransform:"uppercase"}}>{q.dim}</span>
      </div>
      <div style={{height:2,background:`rgba(201,169,110,0.15)`,borderRadius:1,margin:"0 0 2rem"}}>
        <div style={{height:2,width:`${progress}%`,background:GOLD,borderRadius:1,transition:"width 0.4s ease"}}/>
      </div>
      <h2 style={{fontSize:20,fontWeight:400,margin:"0 0 1.75rem",lineHeight:1.6,color:CREAM}}>{q.text}</h2>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {q.options.map((opt,i)=>(
          <button key={i} onClick={()=>answer(i)}
            style={{textAlign:"left",background:NAVY_CARD,border:`1px solid ${BORDER}`,borderRadius:3,padding:"15px 18px",fontSize:14,color:CREAM,cursor:"pointer",lineHeight:1.65,fontFamily:"Georgia,serif",transition:"border-color 0.2s,background 0.2s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=GOLD;e.currentTarget.style.background="rgba(201,169,110,0.1)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=BORDER;e.currentTarget.style.background=NAVY_CARD;}}>
            <span style={{color:GOLD,marginRight:10,fontSize:11,letterSpacing:"0.06em"}}>{["A","B","C","D"][i]}</span>{opt}
          </button>
        ))}
      </div>
      {current>0 && <button onClick={()=>setCurrent(current-1)} style={{marginTop:"1.5rem",background:"none",border:"none",color:"rgba(237,232,220,0.35)",fontSize:13,cursor:"pointer",fontFamily:"Georgia,serif"}}>← Vorige vraag</button>}
    </div>
  );

  if (step==="gate") return wrap(
    <div style={{animation:"fadein 0.5s ease"}}>
      <div style={{textAlign:"center",marginBottom:"2.5rem"}}>
        <div style={{width:52,height:52,border:`1px solid ${GOLD}`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 1.5rem"}}>
          <span style={{color:GOLD,fontSize:20}}>✓</span>
        </div>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:26,fontWeight:400,margin:"0 0 1rem",color:CREAM}}>Scan afgerond</h2>
        <p style={{fontSize:15,color:"rgba(237,232,220,0.6)",lineHeight:1.8,maxWidth:420,margin:"0 auto"}}>Ontvang uw persoonlijk Bid Win Rate rapport — met score, dimensieanalyse, concreet advies én een gerichte dienstaanbeveling.</p>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:11}}>
        <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Uw naam *" style={inp}/>
        <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="E-mailadres *" type="email" style={{...inp,borderColor:form.email&&!isValidEmail(form.email)?"#c0533a":BORDER}}/>
        {form.email&&!isValidEmail(form.email)&&<p style={{fontSize:11,color:"#c0533a",margin:"-6px 0 0",paddingLeft:2}}>Vul een geldig e-mailadres in</p>}
        <input value={form.company} onChange={e=>setForm({...form,company:e.target.value})} placeholder="Bedrijfsnaam (optioneel)" style={inp}/>
        <button onClick={handleSubmit} disabled={!canSubmit}
          style={{background:canSubmit?GOLD:"rgba(201,169,110,0.15)",color:canSubmit?NAVY:"rgba(237,232,220,0.25)",border:"none",borderRadius:3,padding:"15px",fontSize:15,cursor:canSubmit?"pointer":"not-allowed",fontFamily:"Georgia,serif",marginTop:4,transition:"all 0.2s"}}>
          Ontvang mijn rapport →
        </button>
      </div>
      <p style={{fontSize:11,color:"rgba(237,232,220,0.25)",textAlign:"center",marginTop:"1rem"}}>Uw gegevens worden niet gedeeld met derden.</p>
    </div>
  );

  return wrap(
    <div style={{animation:"fadein 0.5s ease"}}>
      <p style={{fontSize:10,color:GOLD,textTransform:"uppercase",letterSpacing:"0.18em",margin:"0 0 0.5rem"}}>Uw Bid Win Rate Rapport</p>
      <h2 style={{fontFamily:"Georgia,serif",fontSize:24,fontWeight:400,margin:"0 0 2rem",color:CREAM}}>Goedendag, {form.name}</h2>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11,marginBottom:"1.5rem"}}>
        <div style={{border:`1px solid ${BORDER}`,borderRadius:3,padding:"1.5rem",textAlign:"center",background:NAVY_CARD}}>
          <p style={{fontSize:10,color:"rgba(237,232,220,0.45)",textTransform:"uppercase",letterSpacing:"0.12em",margin:"0 0 0.75rem"}}>Totaalscore</p>
          <p style={{fontFamily:"Georgia,serif",fontSize:52,fontWeight:300,color:lvl.color,margin:0,lineHeight:1}}>{s}</p>
          <p style={{fontSize:10,color:"rgba(237,232,220,0.35)",margin:"6px 0 0",letterSpacing:"0.06em"}}>VAN DE 100</p>
        </div>
        <div style={{border:`1px solid ${BORDER}`,borderRadius:3,padding:"1.5rem",textAlign:"center",background:NAVY_CARD,display:"flex",flexDirection:"column",justifyContent:"center"}}>
          <p style={{fontSize:10,color:"rgba(237,232,220,0.45)",textTransform:"uppercase",letterSpacing:"0.12em",margin:"0 0 0.75rem"}}>Niveau</p>
          <p style={{fontFamily:"Georgia,serif",fontSize:26,fontWeight:400,color:lvl.color,margin:"0 0 12px"}}>{lvl.label}</p>
          <div style={{display:"flex",justifyContent:"center",gap:7}}>
            {LEVELS.map((_,i)=><div key={i} style={{width:9,height:9,borderRadius:"50%",background:i<=lvlIdx?GOLD:`rgba(201,169,110,0.18)`}}/>)}
          </div>
        </div>
      </div>

      <div style={{border:`1px solid ${BORDER}`,borderRadius:3,padding:"1.5rem",marginBottom:"1.5rem",background:NAVY_CARD}}>
        <p style={{fontSize:10,color:"rgba(237,232,220,0.45)",textTransform:"uppercase",letterSpacing:"0.12em",margin:"0 0 1.25rem"}}>Score per dimensie</p>
        <div style={{display:"flex",justifyContent:"center",marginBottom:"1.25rem"}}><RadarChart scores={ds}/></div>
        {DIMENSIONS.map((dim,i)=>(
          <div key={dim} style={{marginBottom:11}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
              <span style={{fontSize:13,color:CREAM}}>{dim}</span>
              <span style={{fontSize:13,color:ds[i]<50?"#c0533a":GOLD}}>{ds[i]}%</span>
            </div>
            <div style={{height:3,background:`rgba(201,169,110,0.12)`,borderRadius:2}}>
              <div style={{height:3,width:`${ds[i]}%`,background:ds[i]<50?"#c0533a":GOLD,borderRadius:2,transition:"width 1s ease"}}/>
            </div>
          </div>
        ))}
      </div>

      <div style={{border:`1px solid ${BORDER}`,borderRadius:3,padding:"1.5rem",marginBottom:"1.5rem",background:NAVY_CARD}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:"1.25rem"}}>
          <div style={{width:38,height:38,borderRadius:"50%",border:`1px solid ${GOLD}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <span style={{color:GOLD,fontSize:13,fontFamily:"Georgia,serif"}}>A</span>
          </div>
          <div>
            <p style={{margin:0,fontSize:14,color:CREAM}}>Amir Bercovitz</p>
            <p style={{margin:0,fontSize:10,color:"rgba(237,232,220,0.4)",letterSpacing:"0.08em"}}>BID STRATEGIEADVISEUR · BY AMIR</p>
          </div>
        </div>
        {loading ? (
          <div style={{display:"flex",alignItems:"center",gap:10,color:"rgba(237,232,220,0.45)",fontSize:14}}>
            <span style={{display:"inline-block",width:15,height:15,border:`1.5px solid ${GOLD}`,borderTopColor:"transparent",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/>
            Uw persoonlijk advies wordt samengesteld...
          </div>
        ) : (
          <p style={{fontSize:14,color:"rgba(237,232,220,0.82)",lineHeight:1.85,margin:0,whiteSpace:"pre-line"}}>{aiAdvice}</p>
        )}
      </div>

      {recommendedServices().length > 0 && (
        <div style={{border:`1px solid rgba(201,169,110,0.35)`,borderRadius:3,padding:"1.5rem",marginBottom:"1.5rem",background:"rgba(201,169,110,0.05)"}}>
          <p style={{fontSize:10,color:GOLD,textTransform:"uppercase",letterSpacing:"0.15em",margin:"0 0 1rem"}}>Aanbevolen op basis van uw scan</p>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {recommendedServices().map(sv=>(
              <div key={sv.name} style={{borderLeft:`2px solid ${GOLD}`,paddingLeft:14}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
                  <p style={{fontSize:14,fontWeight:400,color:CREAM,margin:0}}>{sv.name}</p>
                  <span style={{fontSize:9,color:GOLD,letterSpacing:"0.1em",textTransform:"uppercase",marginLeft:12,flexShrink:0}}>{sv.tag}</span>
                </div>
                <p style={{fontSize:12,color:"rgba(237,232,220,0.5)",margin:0,lineHeight:1.6}}>{sv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{textAlign:"center",padding:"2rem 1.5rem",border:`1px solid ${BORDER}`,borderRadius:3,background:NAVY_CARD}}>
        <p style={{fontFamily:"Georgia,serif",fontSize:20,fontWeight:400,margin:"0 0 0.75rem",color:CREAM,lineHeight:1.4}}>Wat kost u elke verloren tender<br/>die u had moeten winnen?</p>
        <p style={{fontSize:13,color:"rgba(237,232,220,0.5)",margin:"0 0 1.5rem",lineHeight:1.75}}>Plan een vrijblijvend gesprek van 30 minuten met Amir.<br/>Het eerste gesprek is altijd kosteloos.</p>
        <button onClick={()=>window.open("https://www.byamir.ai/contact","_blank")}
          style={{background:GOLD,color:NAVY,border:"none",borderRadius:3,padding:"15px 32px",fontSize:14,cursor:"pointer",fontFamily:"Georgia,serif",letterSpacing:"0.02em"}}>
          Plan een gesprek in →
        </button>
      </div>
    </div>
  );
}
