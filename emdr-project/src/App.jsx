import { useState } from "react";

const fonts = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Jost:wght@300;400;500&display=swap');
`;

const styles = `
  :root {
    --ink: #FAF7F4;
    --ink2: #F3EDE6;
    --gold: #B8826A;
    --gold-light: #C9967E;
    --text: #3D2D26;
    --muted: #8A7060;
    --border: rgba(184,130,106,0.22);
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: var(--ink); color: var(--text); font-family: 'Jost', sans-serif; }

  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 50;
    padding: 24px 60px;
    display: flex; justify-content: space-between; align-items: center;
    background: rgba(250,247,244,0.97);
    border-bottom: 1px solid var(--border);
  }
  .nav-logo { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 400; color: var(--gold); letter-spacing: 0.03em; line-height: 1.2; text-decoration: none; display: block; }
  .nav-logo span { display: block; font-size: 11px; letter-spacing: 0.12em; opacity: 0.7; margin-top: 2px; font-family: 'Jost', sans-serif; font-weight: 300; color: var(--text); }
  .nav-links { display: flex; gap: 36px; }
  .nav-links a { font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text); opacity: 0.6; text-decoration: none; transition: opacity 0.2s; }
  .nav-links a:hover { opacity: 1; }
  .nav-cta { background: none; border: 1px solid var(--gold); color: var(--gold); padding: 10px 24px; font-family: 'Jost', sans-serif; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; text-decoration: none; display: inline-block; }
  .nav-cta:hover { background: var(--gold); color: white; }

  .hero { min-height: 100vh; display: flex; align-items: center; padding: 120px 60px 80px; position: relative; overflow: hidden; }
  .hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 70% 50%, rgba(184,130,106,0.07) 0%, transparent 60%); }
  .hero-content { max-width: 680px; position: relative; z-index: 1; }
  .hero-eyebrow { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 28px; display: flex; align-items: center; gap: 14px; }
  .hero-eyebrow::before { content: ''; display: block; width: 40px; height: 1px; background: var(--gold); }
  h1 { font-family: 'Playfair Display', serif; font-size: 76px; font-weight: 400; line-height: 1.05; color: var(--text); margin-bottom: 28px; }
  h1 em { font-style: italic; color: var(--gold); }
  .hero-sub { font-size: 17px; line-height: 1.75; color: var(--muted); font-weight: 300; max-width: 500px; margin-bottom: 52px; }
  .hero-actions { display: flex; gap: 20px; flex-wrap: wrap; align-items: center; }
  .btn-gold { background: var(--gold); color: white; padding: 18px 40px; border: none; font-family: 'Jost', sans-serif; font-size: 13px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: all 0.25s; text-decoration: none; display: inline-block; }
  .btn-gold:hover { background: var(--gold-light); transform: translateY(-2px); }
  .btn-outline { background: none; border: 1px solid var(--border); color: var(--text); padding: 18px 40px; font-family: 'Jost', sans-serif; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; text-decoration: none; display: inline-block; }
  .btn-outline:hover { border-color: var(--gold); color: var(--gold); }
  .hero-right { position: absolute; right: 60px; top: 50%; transform: translateY(-50%); opacity: 0.1; }

  section { padding: 100px 60px; max-width: 1100px; margin: 0 auto; }
  .section-label { font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--gold); margin-bottom: 20px; display: flex; align-items: center; gap: 12px; }
  .section-label::before { content: ''; width: 28px; height: 1px; background: var(--gold); }
  h2 { font-family: 'Playfair Display', serif; font-size: 52px; font-weight: 400; line-height: 1.1; color: var(--text); margin-bottom: 24px; }
  h2 em { font-style: italic; color: var(--gold); }

  .emdr-grid { display: flex; flex-direction: column; gap: 60px; margin-top: 60px; }
  .emdr-text { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
  .emdr-text p { font-size: 16px; line-height: 1.85; color: var(--muted); font-weight: 300; margin-bottom: 16px; }
  .emdr-text p:last-child { margin-bottom: 0; }
  .emdr-text p strong { color: var(--text); font-weight: 500; }
  .emdr-phases { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; }
  .phase { padding: 28px 24px; border: 1px solid var(--border); background: rgba(184,130,106,0.03); transition: background 0.2s; }
  .phase:hover { background: rgba(184,130,106,0.08); }
  .phase-num { font-family: 'Playfair Display', serif; font-size: 24px; color: var(--gold); opacity: 0.5; font-weight: 400; margin-bottom: 12px; }
  .phase-title { font-size: 12px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text); margin-bottom: 8px; }
  .phase-desc { font-size: 12px; color: var(--muted); line-height: 1.6; font-weight: 300; }

  .right-for-me { background: var(--ink2); padding: 100px 0; }
  .right-for-me > div { max-width: 1100px; margin: 0 auto; padding: 0 60px; }
  .conditions-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; margin-top: 60px; }
  .condition-card { background: rgba(184,130,106,0.04); border: 1px solid var(--border); padding: 36px 32px; transition: all 0.25s; }
  .condition-card:hover { background: rgba(184,130,106,0.09); border-color: rgba(184,130,106,0.4); }
  .condition-icon { font-size: 28px; margin-bottom: 16px; display: block; }
  .condition-name { font-family: 'Playfair Display', serif; font-size: 20px; color: var(--text); margin-bottom: 10px; }
  .condition-desc { font-size: 13px; color: var(--muted); line-height: 1.65; font-weight: 300; }

  .about-grid { display: grid; grid-template-columns: 1fr 1.6fr; gap: 72px; align-items: start; }
  .about-left { display: flex; flex-direction: column; }
  .about-placeholder { width: 100%; aspect-ratio: 3/4; background: var(--ink2); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 12px; margin-bottom: 32px; }
  .about-placeholder-text { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); }
  .credentials { display: flex; flex-direction: column; gap: 14px; }
  .credential { display: flex; align-items: center; gap: 14px; font-size: 13px; color: var(--muted); }
  .credential::before { content: ''; width: 4px; height: 4px; border-radius: 50%; background: var(--gold); flex-shrink: 0; }
  .credential strong { color: var(--text); font-weight: 500; }
  .about-content p { font-size: 16px; line-height: 1.85; color: var(--muted); font-weight: 300; margin-bottom: 20px; }
  .about-content p:last-child { margin-bottom: 0; }
  .about-content p strong { color: var(--text); font-weight: 500; }

  .faq-list { margin-top: 60px; display: flex; flex-direction: column; }
  .faq-item { border-bottom: 1px solid var(--border); }
  .faq-item:first-child { border-top: 1px solid var(--border); }
  .faq-q { width: 100%; background: none; border: none; padding: 28px 0; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-family: 'Playfair Display', serif; font-size: 20px; color: var(--text); text-align: left; transition: color 0.2s; }
  .faq-q:hover { color: var(--gold); }
  .faq-icon { width: 28px; height: 28px; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 16px; color: var(--gold); flex-shrink: 0; transition: transform 0.3s; }
  .faq-icon.open { transform: rotate(45deg); }
  .faq-a { padding: 0 0 28px; font-size: 15px; color: var(--muted); line-height: 1.8; font-weight: 300; max-width: 700px; }

  .contact-section { background: var(--ink2); padding: 100px 0; }
  .contact-section > div { max-width: 1100px; margin: 0 auto; padding: 0 60px; }
  .contact-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 80px; margin-top: 60px; align-items: start; }
  .contact-info p { font-size: 15px; color: var(--muted); line-height: 1.8; font-weight: 300; margin-bottom: 28px; }
  .contact-detail { display: flex; flex-direction: column; gap: 16px; }
  .contact-detail-item { display: flex; flex-direction: column; gap: 4px; }
  .contact-detail-label { font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); }
  .contact-detail-value { font-size: 14px; color: var(--text); }
  .form { display: flex; flex-direction: column; gap: 20px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .form-field { display: flex; flex-direction: column; gap: 8px; }
  .form-label { font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--muted); }
  .form-input, .form-textarea, .form-select { background: rgba(255,255,255,0.8); border: 1px solid var(--border); color: var(--text); padding: 16px 20px; font-family: 'Jost', sans-serif; font-size: 14px; outline: none; transition: border-color 0.2s; width: 100%; }
  .form-input::placeholder, .form-textarea::placeholder { color: rgba(138,112,96,0.5); }
  .form-input:focus, .form-textarea:focus, .form-select:focus { border-color: var(--gold); }
  .form-select { appearance: none; cursor: pointer; }
  .form-textarea { resize: vertical; min-height: 120px; }
  ._honeypot-field { opacity: 0; position: absolute; top: 0; left: 0; height: 0; width: 0; z-index: -1; }
  .form-submit { background: var(--gold); color: white; padding: 18px 40px; border: none; font-family: 'Jost', sans-serif; font-size: 13px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: all 0.25s; align-self: flex-start; }
  .form-submit:hover { background: var(--gold-light); }
  .form-success { padding: 24px; border: 1px solid var(--gold); color: var(--gold); font-size: 15px; line-height: 1.6; font-weight: 300; }

  footer { padding: 48px 60px; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }
  .footer-logo { font-family: 'Playfair Display', serif; font-size: 16px; color: var(--gold); line-height: 1.3; text-decoration: none; display: block; }
  .footer-logo span { display: block; font-size: 12px; opacity: 0.65; margin-top: 3px; font-family: 'Jost', sans-serif; font-weight: 300; color: var(--muted); }
  .footer-note { font-size: 12px; color: var(--muted); max-width: 400px; line-height: 1.6; }
  .crisis-bar { background: var(--ink2); border-top: 1px solid var(--border); padding: 16px 60px; text-align: center; font-size: 13px; color: var(--muted); }
  .crisis-bar strong { color: var(--text); }

  @media (max-width: 768px) {
    nav { padding: 20px 24px; }
    .nav-links { display: none; }
    .hero { padding: 100px 24px 60px; }
    h1 { font-size: 44px; }
    .hero-right { display: none; }
    section { padding: 70px 24px; }
    .emdr-text { grid-template-columns: 1fr; }
    .emdr-phases { grid-template-columns: 1fr 1fr; }
    .about-grid { grid-template-columns: 1fr; }
    .conditions-grid { grid-template-columns: 1fr; }
    .contact-grid { grid-template-columns: 1fr; }
    .form-row { grid-template-columns: 1fr; }
    footer { padding: 40px 24px; flex-direction: column; align-items: flex-start; }
    .right-for-me > div, .contact-section > div { padding: 0 24px; }
    .crisis-bar { padding: 16px 24px; }
  }
`;

const BOOKING_URL = "https://baysidewellnessandcounseling.janeapp.com/#/staff_member/1/treatment/1";

const PHASES = [
  { num: "01", title: "History & Planning", desc: "We explore your history and identify targets for processing." },
  { num: "02", title: "Preparation", desc: "You learn stabilization techniques and what to expect from EMDR." },
  { num: "03", title: "Assessment", desc: "We identify specific memories, beliefs, and body sensations to target." },
  { num: "04", title: "Desensitization", desc: "Using bilateral stimulation, the memory is processed and its charge reduced." },
  { num: "05", title: "Installation", desc: "A positive belief is strengthened to replace the old, limiting one." },
  { num: "06", title: "Body Scan", desc: "We check for residual tension and close each session safely." },
  { num: "07", title: "Reevaluation", desc: "We review progress and adjust our approach as you grow." },
  { num: "08", title: "Integration", desc: "Processing is complete; new insights and relief become part of daily life." },
];

const CONDITIONS = [
  { icon: "🌀", name: "Trauma & PTSD", desc: "Single-incident trauma, complex PTSD, childhood wounds, and the effects of prolonged stress or abuse." },
  { icon: "⚡", name: "Anxiety", desc: "Panic attacks, persistent worry, phobias, and the nervous system dysregulation that keeps you stuck in fear." },
  { icon: "🌧️", name: "Depression", desc: "Low mood, loss of motivation, and the dark weight that disconnects you from yourself and others." },
  { icon: "🕊️", name: "Grief & Loss", desc: "Complicated grief, loss of a loved one, or the quiet grief of a life that did not go as planned." },
  { icon: "🌱", name: "Life Transitions", desc: "Major changes — career shifts, relationship endings, identity questions — that leave you feeling unmoored." },
  { icon: "💭", name: "Negative Beliefs", desc: "Deep-seated beliefs like 'I am not enough' that drive patterns you cannot seem to break." },
];

const FAQS = [
  {
    q: "What does an EMDR session actually feel like?",
    a: "Most people describe EMDR as surprisingly gentle for how much ground it covers. You will engage in simple eye movements or tapping while briefly holding a difficult memory in mind — your brain does the heavy lifting. Many clients feel lighter after sessions, sometimes noticeably so, even if the process felt subtle in the moment."
  },
  {
    q: "How is EMDR different from regular talk therapy?",
    a: "Talk therapy works primarily through insight and narrative. EMDR works more directly with how the nervous system stores memory. You do not need to describe traumatic events in detail — the process is less verbal and more experiential, which many people find easier and more effective for trauma work."
  },
  {
    q: "How many sessions will I need?",
    a: "Most clients meet weekly for 8-16 sessions, though this varies depending on what we are working on. For more complex or layered trauma, it can be beneficial to meet twice a week to maintain momentum and deepen the work. We will have a clearer picture of what makes sense for you after our first few sessions together."
  },
  {
    q: "Is EMDR covered by insurance?",
    a: "Because my practice is telehealth-only and private pay, I do not bill insurance directly. I can provide a superbill — a detailed receipt — that you can submit to your insurance for potential out-of-network reimbursement. Many clients recoup a portion of the cost this way."
  },
  {
    q: "Do I have to talk about my trauma in detail?",
    a: "No — and this is one of the things people appreciate most about EMDR. You hold a general awareness of a memory while we do the processing work. You are not required to narrate or relive events in detail. The method works even when language falls short."
  },
  {
    q: "Can we do EMDR over telehealth?",
    a: "Yes. I work exclusively via telehealth and EMDR translates very well online. I use a specialized tool for bilateral stimulation that works through your screen. All you need is a private, comfortable space and a reliable internet connection."
  },
];

export default function App() {
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", concern: "", message: "", _honeypot: "" });
  const [submitted, setSubmitted] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  useState(() => {
    const script = document.createElement('script');
    script.src = 'https://js.hcaptcha.com/1/api.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    window.onCaptchaSuccess = (token) => setCaptchaToken(token);
    window.onCaptchaExpired = () => setCaptchaToken(null);
  });

  const handleSubmit = async () => {
    if (!formData.name || !formData.email) return;
    if (formData._honeypot) return; // Bot caught
    if (!captchaToken) { alert('Please complete the captcha first.'); return; }
    try {
      const res = await fetch("https://formspree.io/f/mlgwzaoq", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...formData, 'h-captcha-response': captchaToken }),
      });
      if (res.ok) setSubmitted(true);
    } catch (e) {
      setSubmitted(true);
    }
  };

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <style>{fonts + styles}</style>

      <nav>
        <a href="https://www.baysidewellnessandcounseling.com" target="_blank" rel="noopener noreferrer" className="nav-logo">
          Bayside Wellness &amp; Counseling
          <span>Marcus Ghiasi, LMFT</span>
        </a>
        <div className="nav-links">
          <a href="#emdr" onClick={(e) => { e.preventDefault(); scrollTo("emdr"); }}>What is EMDR</a>
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo("about"); }}>About</a>
          <a href="#faq" onClick={(e) => { e.preventDefault(); scrollTo("faq"); }}>FAQ</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>Contact</a>
        </div>
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="nav-cta">Book a consult</a>
      </nav>

      <div className="hero">
        <div className="hero-content">
          <div className="hero-eyebrow">EMDR Therapy · Oakland, CA · Telehealth</div>
          <h1>Heal what<br />words <em>alone</em><br />cannot reach.</h1>
          <p className="hero-sub">
            EMDR therapy for trauma, anxiety, depression, grief, and life transitions.
            Telehealth sessions available throughout California.
          </p>
          <div className="hero-actions">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-gold">Schedule a free consultation</a>
            <a href="#emdr" className="btn-outline" onClick={(e) => { e.preventDefault(); scrollTo("emdr"); }}>Learn about EMDR</a>
          </div>
        </div>
        <div className="hero-right">
          <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
            {[40,80,120,160,200,240,280,320,360].map((r) => (
              <circle key={r} cx="200" cy="200" r={r} stroke="#B8826A" strokeWidth="0.8" fill="none" opacity="0.3" />
            ))}
            <line x1="200" y1="0" x2="200" y2="400" stroke="#B8826A" strokeWidth="0.5" opacity="0.2" />
            <line x1="0" y1="200" x2="400" y2="200" stroke="#B8826A" strokeWidth="0.5" opacity="0.2" />
          </svg>
        </div>
      </div>

      <section id="emdr">
        <div className="section-label">What is EMDR</div>
        <h2>A therapy that works<br /><em>below the surface.</em></h2>
        <div className="emdr-grid">
          <div className="emdr-text">
            <p>
              <strong>EMDR (Eye Movement Desensitization and Reprocessing)</strong> is an evidence-based therapy recognized by the WHO, APA, and VA as a gold-standard treatment for trauma. It works through bilateral stimulation — guided eye movements or tapping — to help your brain reprocess stuck memories and release their emotional charge.
            </p>
            <p>
              When something traumatic happens, the brain can store the memory in a fragmented, dysregulated way. EMDR helps <strong>complete the natural processing cycle</strong> it could not finish at the time — so the past loses its grip on your present life. No detailed retelling required.
            </p>
          </div>
          <div className="emdr-phases">
            {PHASES.map((p) => (
              <div className="phase" key={p.num}>
                <div className="phase-num">{p.num}</div>
                <div className="phase-title">{p.title}</div>
                <div className="phase-desc">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="right-for-me">
        <div>
          <div className="section-label">Is EMDR right for me</div>
          <h2>You do not have to keep<br /><em>carrying this.</em></h2>
          <p style={{ fontSize: "16px", color: "var(--muted)", lineHeight: "1.8", fontWeight: "300", maxWidth: "600px", marginTop: "16px" }}>
            EMDR has a strong track record with a wide range of concerns. If any of these feel familiar, we should talk.
          </p>
          <div className="conditions-grid">
            {CONDITIONS.map((c) => (
              <div className="condition-card" key={c.name}>
                <span className="condition-icon">{c.icon}</span>
                <div className="condition-name">{c.name}</div>
                <p className="condition-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section id="about">
        <div className="section-label">About</div>
        <div className="about-grid">
          <div className="about-left">
            <div className="about-placeholder">
              <span style={{ fontSize: "48px" }}>👨🏽</span>
              <span className="about-placeholder-text">Photo coming soon</span>
            </div>
            <div className="credentials">
              <div className="credential"><strong>Licensed LMFT</strong> — California</div>
              <div className="credential"><strong>EMDR Trained</strong> — EMDRIA-approved</div>
              <div className="credential"><strong>10+ Years</strong> clinical experience</div>
              <div className="credential"><strong>Telehealth</strong> — California-wide</div>
              <div className="credential"><strong>Free 15-min</strong> consultation</div>
            </div>
          </div>
          <div className="about-content">
            <h2>Marcus<br /><em>Ghiasi,</em> LMFT</h2>
            <p>
              I am a licensed Marriage and Family Therapist based in Oakland, California, with over <strong>10 years of experience</strong> working with adults navigating trauma, anxiety, depression, grief, and the weight of lives that have been harder than they should have been.
            </p>
            <p>
              I specialize in <strong>EMDR therapy</strong> because I have seen it create change that talk therapy alone could not reach. There is something profound about watching a person's relationship to their own past shift — not through willpower or insight alone, but through the brain's own healing capacity.
            </p>
            <p>
              My practice is fully virtual. I work with clients across California, and I bring the same care and attentiveness to a telehealth session that I would to an in-person one. If you are ready to do real work, I am ready to meet you there.
            </p>
          </div>
        </div>
      </section>

      <section id="faq" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="section-label">FAQ</div>
        <h2>Common<br /><em>questions.</em></h2>
        <div className="faq-list">
          {FAQS.map((faq, i) => (
            <div className="faq-item" key={i}>
              <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {faq.q}
                <span className={openFaq === i ? "faq-icon open" : "faq-icon"}>+</span>
              </button>
              {openFaq === i && <div className="faq-a">{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>

      <div className="contact-section" id="contact">
        <div>
          <div className="section-label">Get in touch</div>
          <h2>Ready to<br /><em>begin?</em></h2>
          <div className="contact-grid">
            <div className="contact-info">
              <p>
                The first step is a free 15-minute consultation — a chance to ask questions, share what you are going through, and see if we are a good fit. There is no obligation and no pressure.
              </p>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ marginBottom: "32px" }}>
                Book directly online
              </a>
              <div className="contact-detail" style={{ marginTop: "32px" }}>
                <div className="contact-detail-item">
                  <span className="contact-detail-label">Location</span>
                  <span className="contact-detail-value">Telehealth — California-wide</span>
                </div>
                <div className="contact-detail-item">
                  <span className="contact-detail-label">Session Rate</span>
                  <span className="contact-detail-value">Contact for current rates</span>
                </div>
                <div className="contact-detail-item">
                  <span className="contact-detail-label">Insurance</span>
                  <span className="contact-detail-value">Private pay · Superbill provided</span>
                </div>
                <div className="contact-detail-item">
                  <span className="contact-detail-label">Free Consultation</span>
                  <span className="contact-detail-value">15 minutes · No obligation</span>
                </div>
              </div>
            </div>
            <div>
              {submitted ? (
                <div className="form-success">
                  Thank you, {formData.name}. I will be in touch within one business day to schedule your consultation. I look forward to connecting.
                </div>
              ) : (
                <div className="form">
                  <div className="form-row">
                    <div className="form-field">
                      <label className="form-label">Your name</label>
                      <input className="form-input" placeholder="First Last" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div className="form-field">
                      <label className="form-label">Email</label>
                      <input className="form-input" type="email" placeholder="you@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-field">
                      <label className="form-label">Phone (optional)</label>
                      <input className="form-input" placeholder="(510) 000-0000" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                    </div>
                    <div className="form-field">
                      <label className="form-label">Primary concern</label>
                      <select className="form-select form-input" value={formData.concern} onChange={(e) => setFormData({ ...formData, concern: e.target.value })}>
                        <option value="">Select one</option>
                        <option value="Trauma and PTSD">Trauma and PTSD</option>
                        <option value="Anxiety">Anxiety</option>
                        <option value="Depression">Depression</option>
                        <option value="Grief and Loss">Grief and Loss</option>
                        <option value="Life Transitions">Life Transitions</option>
                        <option value="Something else">Something else</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-field">
                    <label className="form-label">Anything you would like me to know</label>
                    <textarea className="form-textarea" placeholder="Share as much or as little as you would like..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                  </div>
                  <div style={{ position: "relative" }}>
                    <input className="_honeypot-field" type="text" name="_honeypot" value={formData._honeypot} onChange={(e) => setFormData({ ...formData, _honeypot: e.target.value })} tabIndex="-1" autoComplete="off" />
                  </div>
                  <div className="h-captcha" data-sitekey="4feca060-ae00-4ba2-ad54-7e82c9988e46" data-callback="onCaptchaSuccess" data-expired-callback="onCaptchaExpired" style={{ marginBottom: "12px" }}></div>
                  <div>
                    <button className="form-submit" onClick={handleSubmit}>Send message</button>
                    <p style={{ fontSize: "12px", color: "var(--muted)", marginTop: "12px" }}>I typically respond within one business day.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <footer>
        <a href="https://www.baysidewellnessandcounseling.com" target="_blank" rel="noopener noreferrer" className="footer-logo">
          Bayside Wellness &amp; Counseling
          <span>Marcus Ghiasi, LMFT</span>
        </a>
        <p className="footer-note">A Bayside Wellness &amp; Counseling practice. Licensed Marriage &amp; Family Therapist in California. This website is for informational purposes only and does not constitute a therapeutic relationship.</p>
        <p style={{ fontSize: "12px", color: "var(--muted)" }}>emdrtherapybayarea.com</p>
      </footer>
      <div className="crisis-bar">
        <strong>In crisis?</strong> Call or text <strong>988</strong> (Suicide &amp; Crisis Lifeline) — free, confidential, 24/7.
      </div>
    </>
  );
}
