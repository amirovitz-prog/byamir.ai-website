import { useState } from "react";

const NAVY = "#0F1729";
const NAVY_CARD = "#1a2540";
const GOLD = "#C9A96E";
const CREAM = "#EDE8DC";
const BORDER = "rgba(201,169,110,0.22)";
const WHITEPAPER_URL = "/assets/whitepaper-liefde-of-angst.pdf";
const isValidEmail = e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

const DIMENSIONS = ["Strategie","Data","Mensen","Processen","Cultuur"];

const QUESTIONS = [
  { id:1, dim:"Strategie", text:"Heeft uw organisatie een duidelijke visie op de rol van AI in de komende 2–3 jaar?", options:["Nee, AI staat niet op de agenda","We spreken erover maar er is geen plan","Er is een globale richting maar geen concrete aanpak","Ja, we hebben een uitgewerkte AI-strategie"] },
  { id:2, dim:"Strategie", text:"Hoe worden technologiebeslissingen in uw organisatie genomen?", options:["Ad hoc, door de directie zonder structuur","Reactief, als problemen zich voordoen","Gepland, maar zonder duidelijke criteria","Proactief en datagedreven"] },
  { id:3, dim:"Data", text:"Hoe zou u de kwaliteit en beschikbaarheid van uw bedrijfsdata omschrijven?", options:["Data is versnipperd en moeilijk toegankelijk","Basisdata is beschikbaar maar niet gestructureerd","Data is grotendeels op orde maar niet centraal","Data is centraal, actueel en goed beheerd"] },
  { id:4, dim:"Data", text:"Gebruikt uw organisatie data actief voor besluitvorming?", options:["Zelden of nooit","Soms, op basis van rapporten","Regelmatig, maar niet systematisch","Altijd — we zijn een data-gedreven organisatie"] },
  { id:5, dim:"Mensen", text:"Hoe ervaart uw team nieuwe technologie en verandering?", options:["Er is veel weerstand en angst","Gemengde gevoelens — sommigen open, anderen sceptisch","Overwegend positief maar voorzichtig","Enthousiast en nieuwsgierig"] },
  { id:6, dim:"Mensen", text:"Is er iemand in uw organisatie die verantwoordelijk is voor digitalisering of AI?", options:["Nee, niemand","Informeel — iemand heeft interesse","Er is een rol maar geen duidelijk mandaat","Ja, een aangewezen persoon/team met mandaat"] },
  { id:7, dim:"Processen", text:"In welke mate zijn uw kernprocessen gedocumenteerd en gestandaardiseerd?", options:["Nauwelijks — veel loopt op kennis van mensen","Deels gedocumenteerd, inconsistent","Grotendeels vastgelegd maar ruimte voor verbetering","Volledig gedocumenteerd en regelmatig herzien"] },
  { id:8, dim:"Cultuur", text:"Hoe staat de directie/leidinggevenden tegenover AI-adoptie?", options:["Terughoudend of onbekend met AI","Geïnteresseerd maar passief","Actief onderzoekend","Sterk betrokken en bereid te investeren"] },
];

const LEVELS = [
  { label:"Verkenner", range:[0,25], color:"#c0533a" },
  { label:"Starter", range:[26,50], color:"#b8892a" },
  { label:"Ontwikkelaar", range:[51,75], color:GOLD },
  { label:"Voorloper", range:[76,100], color:"#7eb87e" },
];

const SERVICES = [
  { name:"AI Quickscan & Strategie", tag:"VASTE PRIJS", desc:"Volledige AI-gereedheidsanalyse, strategische prioritering, quick wins en een concrete eerste stap.", dim:"Strategie" },
  { name:"AI Roadmap & Implementatie", tag:"PROJECT", desc:"Data-architectuur, procesautomatisering, toolselectie en gefaseerde implementatie op maat.", dim:"Data" },
  { name:"AI Team Training & Adoptie", tag:"PROJECT", desc:"Bewustwording, skill-building, changemanagement en adoptietracking per afdeling.", dim:"Mensen" },
  { name:"AI Proces­optimalisatie", tag:"PROJECT", desc:"Procesanalyse, automatiseringsopportunities, pilot-implementatie en ROI-meting.", dim:"Processen" },
  { name:"Interim AI-leiderschap", tag:"DAGTARIEF", desc:"Strategische AI-leadership op directieniveau: roadmap, board-communicatie en AI-integratie in commercieel beleid.", dim:"Cultuur" },
];

const ADVICE_FALLBACK = [
  "Uw organisatie staat aan het begin van de AI-reis. Dat is precies het moment waarop de juiste begeleiding het verschil maakt. AI hoeft geen bedreiging te zijn — het kan een krachtige dienaar worden van uw ambities. Begin klein, bewijs waarde in één proces, en bouw van daaruit verder.",
  "Uw organisatie heeft de eerste stappen gezet maar mist nog samenhang. De kans ligt in het verbinden van bestaande initiatieven met een heldere visie. AI als dienaar van uw strategie — niet als losstaand experiment.",
  "Uw organisatie is AI-klaar op meerdere dimensies. Wat nu telt is gerichte implementatie op hoge-impact gebieden. AI moet een bewuste keuze worden — ingezet als hefboom, aangestuurd door menselijk oordeel.",
  "U bevindt zich in de voorhoede. De uitdaging voor voorlopers: het verschil maken tussen AI die efficiëntie verhoogt én AI die nieuwe waarde creëert. Een strategische sparringpartner helpt u de volgende sprong te maken.",
];

const RadarChart = ({ scores }) => {
  const cx=120, cy=115, r=85, n=DIMENSIONS.length;
  const angle = i => (Math.PI*2*i/n) - Math.PI/2;
  const pt = (i,pct) => { const a=angle(i),d=r*(pct/100); return [cx+d*Math.cos(a), cy+d*Math.sin(a)]; };
  const grid = [25,50,75,100].map(p => DIMENSIONS.map((_,i)=>pt(i,p)).map((p,j)=>(j===0?`M${p[0]},${p[1]}`:`L${p[0]},${p[1]}`)).join(" ")+" Z");
  const dataPath = DIMENSIONS.map((_,i)=>pt(i,scores[i]??0)).map((p,j)=>(j===0?`M${p[0]},${p[1]}`:`L${p[0]},${p[1]}`)).join(" ")+" Z";
  const labels = DIMENSIONS.map((d,i)=>{ const [x,y]=pt(i,115); return {x,y,d}; });
  return (
    <svg viewBox="0 0 240 230" width="220" height="210">
      {grid.map((d,i)=><path key={i} d={d} fill="none" stroke={BORDER} strokeWidth="0.8"/>)}
      {DIMENSIONS.map((_,i)=>{ const [x,y]=pt(i,100); return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={BORDER} strokeWidth="0.8"/>; })}
      <path d={dataPath} fill={`${GOLD}28`} stroke={GOLD} strokeWidth="1.5"/>
      {labels.map((l,i)=><text key={i} x={l.x} y={l.y} textAnchor="middle" dominantBaseline="middle" fontSize="9" fill={CREAM} fontFamily="Georgia,serif" opacity="0.8">{l.d}</text>)}
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
    const prompt = `Je bent AI-strategieadviseur bij by AMIR. Schrijf een warm, direct en inspirerend gepersonaliseerd AI Readiness advies in het Nederlands voor ${name}${company?` van ${company}`:""}.

Score: ${s}/100 — Niveau: ${lvl.label}
Dimensies: ${dimSummary}
Meest relevante diensten: ${recs||"geen specifiek"}

Schrijf 3 korte alinea's. Gebruik de Meester & Dienaar filosofie: AI als dienaar van menselijke ambities. Benoem de sterkste en zwakste dimensie concreet. Sluit af met een uitnodiging voor een gesprek met Amir. Spreek ${name} aan met 'u'. Geen wolligheid.`;
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
    const body = `AI Readiness Assessment\n\nNaam: ${form.name}\nEmail: ${form.email}\nBedrijf: ${form.company||"—"}\n\nScore: ${score()}/100 — ${level().label}\n\nDimensies:\n${DIMENSIONS.map((d,i)=>`  ${d}: ${ds[i]}%`).join("\n")}\n\nAI Advies:\n${advice}`;
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
      <p style={{fontSize:10,color:GOLD,textTransform:"uppercase",letterSpacing:"0.18em",margin:"0 0 1.25rem"}}>AI Readiness Assessment</p>
      <h1 style={{fontFamily:"Georgia,serif",fontSize:36,fontWeight:400,margin:"0 0 1.25rem",lineHeight:1.25,color:CREAM}}>Is uw organisatie<br/>klaar voor AI?</h1>
      <p style={{fontSize:15,color:"rgba(237,232,220,0.65)",lineHeight:1.85,margin:"0 0 2.5rem",maxWidth:480}}>8 vragen over strategie, data, mensen, processen en cultuur. Direct een persoonlijk rapport — inclusief concreet advies en gratis whitepaper.</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,margin:"0 0 2.5rem"}}>
        {[["8 vragen","5 dimensies"],["± 3 minuten","Snel en to the point"],["Persoonlijk advies","AI-gegenereerd op maat"],["Gratis whitepaper","Liefde of Angst?"]].map(([t,s])=>(
          <div key={t} style={{border:`1px solid ${BORDER}`,borderRadius:3,padding:"16px",background:NAVY_CARD}}>
            <p style={{fontSize:13,color:GOLD,margin:"0 0 4px"}}>{t}</p>
            <p style={{fontSize:12,color:"rgba(237,232,220,0.45)",margin:0}}>{s}</p>
          </div>
        ))}
      </div>
      <button onClick={()=>setStep("quiz")} style={{background:GOLD,color:NAVY,border:"none",borderRadius:3,padding:"15px 36px",fontSize:15,cursor:"pointer",fontFamily:"Georgia,serif",letterSpacing:"0.02em"}}>Start de assessment →</button>
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
        <h2 style={{fontFamily:"Georgia,serif",fontSize:26,fontWeight:400,margin:"0 0 1rem",color:CREAM}}>Assessment afgerond</h2>
        <p style={{fontSize:15,color:"rgba(237,232,220,0.6)",lineHeight:1.8,maxWidth:420,margin:"0 auto"}}>Ontvang uw persoonlijk AI Readiness rapport met score, dimensieanalyse, concreet advies én de gratis whitepaper <em>Liefde of Angst?</em></p>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:11}}>
        <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Uw naam *" style={inp}/>
        <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="E-mailadres *" type="email" style={{...inp,borderColor:form.email&&!isValidEmail(form.email)?"#c0533a":BORDER}}/>
        {form.email&&!isValidEmail(form.email)&&<p style={{fontSize:11,color:"#c0533a",margin:"-6px 0 0",paddingLeft:2}}>Vul een geldig e-mailadres in</p>}
        <input value={form.company} onChange={e=>setForm({...form,company:e.target.value})} placeholder="Bedrijfsnaam (optioneel)" style={inp}/>
        <button onClick={handleSubmit} disabled={!canSubmit}
          style={{background:canSubmit?GOLD:"rgba(201,169,110,0.15)",color:canSubmit?NAVY:"rgba(237,232,220,0.25)",border:"none",borderRadius:3,padding:"15px",fontSize:15,cursor:canSubmit?"pointer":"not-allowed",fontFamily:"Georgia,serif",marginTop:4,transition:"all 0.2s"}}>
          Ontvang mijn rapport + gratis whitepaper →
        </button>
      </div>
      <p style={{fontSize:11,color:"rgba(237,232,220,0.25)",textAlign:"center",marginTop:"1rem"}}>Uw gegevens worden niet gedeeld met derden.</p>
    </div>
  );

  if (step==="result") return wrap(
    <div style={{animation:"fadein 0.5s ease"}}>
      <p style={{fontSize:10,color:GOLD,textTransform:"uppercase",letterSpacing:"0.18em",margin:"0 0 0.5rem"}}>Uw AI Readiness Rapport</p>
      <h2 style={{fontFamily:"Georgia,serif",fontSize:24,fontWeight:400,margin:"0 0 2rem",color:CREAM}}>Goedendag, {form.name}</h2>

      {/* Score + Level */}
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

      {/* Radar + Bars */}
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

      {/* AI Advies */}
      <div style={{border:`1px solid ${BORDER}`,borderRadius:3,padding:"1.5rem",marginBottom:"1.5rem",background:NAVY_CARD}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:"1.25rem"}}>
          <div style={{width:38,height:38,borderRadius:"50%",border:`1px solid ${GOLD}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <span style={{color:GOLD,fontSize:13,fontFamily:"Georgia,serif"}}>A</span>
          </div>
          <div>
            <p style={{margin:0,fontSize:14,color:CREAM}}>Amir Bercovitz</p>
            <p style={{margin:0,fontSize:10,color:"rgba(237,232,220,0.4)",letterSpacing:"0.08em"}}>AI STRATEGIEADVISEUR · BY AMIR</p>
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

      {/* Dienstaanbevelingen */}
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

      {/* Whitepaper */}
      <div style={{border:`1px solid rgba(201,169,110,0.35)`,borderRadius:3,padding:"1.5rem",marginBottom:"1.5rem",background:"rgba(201,169,110,0.05)"}}>
        <p style={{fontSize:10,color:GOLD,textTransform:"uppercase",letterSpacing:"0.15em",margin:"0 0 8px"}}>Gratis whitepaper</p>
        <p style={{fontFamily:"Georgia,serif",fontSize:17,fontStyle:"italic",color:CREAM,margin:"0 0 6px",fontWeight:400}}>Liefde of Angst? — De twee drijfveren achter AI-adoptie</p>
        <p style={{fontSize:12,color:"rgba(237,232,220,0.45)",margin:"0 0 16px"}}>Verstuurd naar {form.email}</p>
        <button onClick={()=>window.open(WHITEPAPER_URL,"_blank")}
          style={{background:"transparent",color:GOLD,border:`1px solid ${GOLD}`,borderRadius:3,padding:"10px 20px",fontSize:13,cursor:"pointer",fontFamily:"Georgia,serif",letterSpacing:"0.02em"}}>
          Download whitepaper →
        </button>
      </div>

      {/* CTA */}
      <div style={{textAlign:"center",padding:"2rem 1.5rem",border:`1px solid ${BORDER}`,borderRadius:3,background:NAVY_CARD}}>
        <p style={{fontFamily:"Georgia,serif",fontSize:20,fontWeight:400,margin:"0 0 0.75rem",color:CREAM,lineHeight:1.4}}>Wat betekent dit concreet<br/>voor uw organisatie?</p>
        <p style={{fontSize:13,color:"rgba(237,232,220,0.5)",margin:"0 0 1.5rem",lineHeight:1.75}}>Plan een vrijblijvend gesprek van 30 minuten met Amir.<br/>Het eerste gesprek is altijd kosteloos.</p>
        <button onClick={()=>window.open("https://www.byamir.ai/contact","_blank")}
          style={{background:GOLD,color:NAVY,border:"none",borderRadius:3,padding:"15px 32px",fontSize:14,cursor:"pointer",fontFamily:"Georgia,serif",letterSpacing:"0.02em"}}>
          Plan een gesprek in →
        </button>
      </div>
    </div>
  );
}
