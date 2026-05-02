import * as React from 'react';
import {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRadio,
} from './TweaksPanel.jsx';

const { useState, useEffect } = React;

const NAV = [
  { id: "about",        label: "About",      sec: "01" },
  { id: "droplet",      label: "Droplet",    sec: "02" },
  { id: "experience",   label: "Background", sec: "03" },
  { id: "capabilities", label: "Stack",      sec: "04" },
  { id: "projects",     label: "Work",       sec: "05" },
];

const TIMELINE = [
  { period: "Now", current: true, role: "Founder & CEO", co: "Warp Laboratory Inc — Building Droplet",
    tags: ["Founder", "Edge AI", "On-device", "Hardware"],
    bullets: [
      "Building Droplet — a personal AI appliance that runs on-device. One auth boundary, one update channel, no required cloud accounts.",
      "Full-time founder. Working code, hardware v0 prototype operational, v1 in progress.",
    ] },
  { period: "2026", role: "Senior Technical Systems Engineer", co: "Clearcloud Internet Solutions",
    tags: ["Architecture", "Industrial / gov", "SOPs", "QA/QC", "Mentoring"],
    bullets: [
      "Led architecture and delivery for industrial, government, and critical-infra projects at enterprise scale.",
      "Stood up SOPs, workflows, and tech stacks that scale across crews.",
      "Mentored engineers and technicians; owned QA/QC and risk. Departed via workforce reduction (project-volume slowdown), not performance — see reference letter.",
    ] },
  { period: "2025", role: "Technical Systems Engineer", co: "Clearcloud Internet Solutions",
    tags: ["System design", "Low-V", "Networking", "Engineering docs"],
    bullets: [
      "System design and execution across complex security, low-V, and networked environments.",
      "Engineering documentation aligning design intent with field reality.",
      "Liaison between engineering, PMs, and field crews.",
    ] },
  { period: "2024", role: "Field Engineer", co: "Clearcloud Internet Solutions",
    tags: ["IT / CCTV", "Access control", "SCE", "Regulated", "As-builts"],
    bullets: [
      "Designed, installed, and commissioned IT, CCTV, and access control for Southern California Edison.",
      "Troubleshooting, optimization, QA/QC, as-builts in regulated environments.",
      "Trained clients and internal teams; standards adopted as baseline.",
    ] },
  { period: "2023", role: "Lead Technician", co: "Clearcloud Internet Solutions",
    tags: ["Software House", "Bosch", "Cisco", "Server rooms", "Field lead"],
    bullets: [
      "Led low-voltage deployments for SCE on Software House, Bosch, Cisco.",
      "Coordinated multi-site server-room and infrastructure installs.",
      "Field leadership, documentation, safety oversight.",
    ] },
  { period: "2023", role: "Low-Voltage Lead Technician", co: "TechOne Solutions (Contract)",
    tags: ["Server rooms", "Multi-site", "Site assessments", "Standards"],
    bullets: [
      "Server-room and enterprise low-voltage installs across multiple sites.",
      "Site assessments and tailored solutions to industry standards.",
    ] },
  { period: "2022", role: "Fiber Install Technician", co: "Frontier Internet (Contract)",
    tags: ["Fiber-optic", "OTDR", "Network testing", "Restoration"],
    bullets: [
      "Installed and maintained fiber-optic infrastructure across Orange County.",
      "Network testing, fault isolation, service restoration.",
    ] },
  { period: "2019", role: "PM & Sr. Installation Specialist", co: "Secured Volts NY",
    tags: ["CCTV", "International rollouts", "Team lead", "Airtable", "HubSpot"],
    bullets: [
      "CCTV and low-voltage projects for high-profile clients including international rollouts.",
      "Built and led technical teams; ran ops on Airtable and HubSpot.",
    ] },
];

const CAPS = [
  { tb: "TB-01", label: "Access Control",        sub: "Physical security",   items: ["Software House","Lenel","Gallagher","HID","Mercury","Genetec","Aiphone","Zenitel"] },
  { tb: "TB-02", label: "Video Management",      sub: "VMS",                 items: ["Bosch","Genetec","Milestone","Geutebrück","FLIR","Surveill"] },
  { tb: "TB-03", label: "Radar / UAS Detection", sub: "Perimeter",           items: ["Magos","Echodyne","Dedrone"] },
  { tb: "TB-04", label: "Servers & Networking",  sub: "Infra",               items: ["Cisco","Dell","Linux","Windows Server","Microsoft 365"] },
  { tb: "TB-05", label: "Cloud & Automation",    sub: "Ops",                 items: ["Azure","AWS","GCP","PowerShell","Python","Docker"] },
  { tb: "TB-06", label: "Sensor Aggregation",    sub: "OT / PLC",            items: ["Ladder Logic","Custom API","PLC"] },
];

const PROJECTS = [
  { id: "DWG-001", sector: "Utility · NERC", title: "Substation security modernization", client: "Southern California Edison",
    desc: "Integrated CCTV, access control, and network systems across multiple substations. Standardized installs, full QA/QC, and as-built documentation.",
    tags: ["Bosch","Software House","Cisco","NERC"] },
  { id: "DWG-002", sector: "Government", title: "UAS detection + radar perimeter", client: "Confidential — DoD-adjacent",
    desc: "Architecture and integration for radar, UAS detection, and counter-drone aggregation. Custom API into VMS for unified situational awareness.",
    tags: ["Magos","Echodyne","Custom API","CUI"] },
  { id: "DWG-003", sector: "Retail · Logistics", title: "International CCTV rollout", client: "Premium retail and logistics (via Secured Volts)",
    desc: "Multi-country CCTV and low-voltage deployments. Built and led technical teams; standardized PM workflow on Airtable and HubSpot.",
    tags: ["CCTV","Multi-site","PM"] },
  { id: "DWG-004", sector: "Utility · Fiber", title: "Fiber-optic plant expansion", client: "Frontier Internet",
    desc: "Install, splicing, and commissioning of fiber-optic infrastructure across Orange County. OTDR testing, fault isolation, restoration.",
    tags: ["Fiber","OTDR","SLA"] },
];

const CERTS = [
  { mark: "G",  name: "Gallagher" },
  { mark: "H",  name: "Hirsch" },
  { mark: "M",  name: "Magos" },
  { mark: "AX", name: "Axis" },
  { mark: "C",  name: "CUI · DoD" },
  { mark: "NC", name: "NERC Cyber" },
  { mark: "NP", name: "NERC Physical" },
];

const HOBBIES = [
  {
    name: "Climbing",
    sub: "Sport · Trad · 5.11",
    detail: "Long pitches, small holds, big exposure. Joshua Tree and Tahquitz weekends.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 27 L9 17 L13 22 L18 12 L24 22 L29 14"/>
        <circle cx="24" cy="6" r="1.6"/>
        <path d="M24 7.6 L24 14"/>
        <path d="M22.5 10 L25.5 10" strokeWidth="1"/>
        <circle cx="9" cy="17" r="0.9" fill="currentColor"/>
        <circle cx="18" cy="12" r="0.9" fill="currentColor"/>
        <circle cx="29" cy="14" r="0.9" fill="currentColor"/>
        <path d="M3 29 L29 29" strokeWidth="0.8" strokeDasharray="1 2"/>
      </svg>
    ),
  },
  {
    name: "Surfing",
    sub: "Pacific · 6'2 shortboard",
    detail: "Pre-dawn paddles when the lineup is empty and the swell is honest.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 22 Q 8 15 14 22 T 26 22 T 31 22"/>
        <path d="M2 26 Q 8 19 14 26 T 26 26 T 31 26" opacity="0.55"/>
        <path d="M14 8 Q 22 9 24 16 Q 22 22 16 22 Q 12 22 11 18 Q 11 12 14 8 Z" stroke="currentColor" fill="none"/>
        <path d="M14 11 L 21 16" strokeWidth="0.8" opacity="0.8"/>
        <circle cx="6" cy="8" r="2.6" strokeWidth="1"/>
        <path d="M6 5.4 L6 3.5 M6 12.6 L6 14.5 M3.4 8 L1.5 8 M11.5 8 L8.6 8 M4 6 L2.7 4.7 M9.3 6 L10.6 4.7 M4 10 L2.7 11.3 M9.3 10 L10.6 11.3" strokeWidth="0.8"/>
      </svg>
    ),
  },
  {
    name: "Snowboarding",
    sub: "All-mountain · Mammoth",
    detail: "Hardpack groomers at 7 AM, sidecountry tree runs after lunch.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 25 L29 9" strokeWidth="2"/>
        <path d="M4 25.5 L7 24 M27 9.5 L30 8" strokeWidth="0.8"/>
        <ellipse cx="11" cy="20" rx="1.6" ry="1.1" fill="currentColor" stroke="none"/>
        <ellipse cx="21" cy="13" rx="1.6" ry="1.1" fill="currentColor" stroke="none"/>
        <path d="M2 28 L 9 30 M 13 28 L 18 30 M 22 28 L 28 30" strokeWidth="0.8" opacity="0.6"/>
        <path d="M5 6 L6 7 M9 5 L9 6.5 M14 7 L13 8" strokeWidth="0.8" opacity="0.6"/>
      </svg>
    ),
  },
  {
    name: "Lifting",
    sub: "Strength · 4× / wk",
    detail: "Compound lifts. The most reliable form of debugging is a heavy back squat.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="13" width="3" height="6" rx="0.6"/>
        <rect x="6" y="11" width="3" height="10" rx="0.6"/>
        <rect x="23" y="11" width="3" height="10" rx="0.6"/>
        <rect x="27" y="13" width="3" height="6" rx="0.6"/>
        <line x1="9" y1="16" x2="23" y2="16"/>
        <path d="M14 16 L 18 16" strokeWidth="2.2"/>
        <path d="M11 24 L 21 24" strokeWidth="0.8" strokeDasharray="1 2"/>
      </svg>
    ),
  },
  {
    name: "Motorcycles",
    sub: "Naked twins · Canyon roads",
    detail: "Saturday Angeles Crest runs. Maintenance is meditation. Throttle is therapy.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="7" cy="22" r="4.5"/>
        <circle cx="25" cy="22" r="4.5"/>
        <circle cx="7"  cy="22" r="1.2" fill="currentColor" stroke="none"/>
        <circle cx="25" cy="22" r="1.2" fill="currentColor" stroke="none"/>
        <path d="M11 22 L 21 22"/>
        <path d="M13 22 L 17 13 L 23 13"/>
        <path d="M23 13 L 25 11"/>
        <path d="M14 18 L 19 18 L 21 22" />
        <path d="M11 13 L 14.5 13" strokeWidth="0.8"/>
      </svg>
    ),
  },
  {
    name: "Building",
    sub: "Personal builds · Hardware",
    detail: "Soldering irons, 3D printer, oscilloscope. If it has firmware, I'll try to break it open.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="9" width="22" height="14" rx="1.4"/>
        <circle cx="10" cy="14" r="1"/>
        <circle cx="14" cy="14" r="1"/>
        <circle cx="22" cy="14" r="1"/>
        <path d="M9 18 L 23 18" strokeWidth="0.8"/>
        <path d="M9 20.5 L 17 20.5" strokeWidth="0.8"/>
        <path d="M2 14 L 5 14 M2 18 L 5 18 M27 14 L 30 14 M27 18 L 30 18" strokeWidth="0.8"/>
        <circle cx="22" cy="14" r="2.4" strokeWidth="0.8" opacity="0.6"/>
      </svg>
    ),
  },
];

/* ============================================================
   Schematic decoration: small ladder rung w/ contact + coil
   ============================================================ */

function HeroSchematic() {
  return (
    <div className="hero-schem" aria-hidden="true">
      <svg viewBox="0 0 240 96" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
        {/* power rails L1 / N */}
        <line x1="4" y1="8"  x2="236" y2="8"  stroke="#444b56" strokeWidth="1.2"/>
        <line x1="4" y1="88" x2="236" y2="88" stroke="#444b56" strokeWidth="1.2"/>
        <text x="6" y="6"  fontFamily="JetBrains Mono, ui-monospace" fontSize="6" fill="#757d8a">L1 · 24VDC+</text>
        <text x="6" y="96" fontFamily="JetBrains Mono, ui-monospace" fontSize="6" fill="#757d8a">N · 0V</text>

        {/* RUNG 1 — door contact + relay coil */}
        <g stroke="#0d1014">
          <line x1="22" y1="8"  x2="22"  y2="44"/>
          {/* normally-open contact */}
          <line x1="22" y1="44" x2="58"  y2="44"/>
          <line x1="58" y1="38" x2="58"  y2="50"/>
          <line x1="70" y1="38" x2="70"  y2="50"/>
          <line x1="70" y1="44" x2="100" y2="44"/>
          <text x="56" y="34" fontFamily="JetBrains Mono, ui-monospace" fontSize="6" fill="#757d8a">DR-01</text>
          {/* signal LED */}
          <circle cx="100" cy="44" r="4.5" fill="none" stroke="#d4a017" strokeWidth="1.2"/>
          <circle cx="100" cy="44" r="1.8" fill="#d4a017"/>
          <line x1="104.5" y1="44" x2="138" y2="44"/>
          {/* coil */}
          <circle cx="148" cy="44" r="8" fill="none" stroke="#0d1014"/>
          <text x="143.5" y="46" fontFamily="JetBrains Mono, ui-monospace" fontSize="6" fill="#0d1014">CR1</text>
          <line x1="156" y1="44" x2="218" y2="44"/>
          <line x1="218" y1="44" x2="218" y2="88"/>
        </g>

        {/* current flow dashes */}
        <line x1="22" y1="44" x2="58"  y2="44" stroke="#d4a017" strokeWidth="1.4" className="flow"/>
        <line x1="70" y1="44" x2="138" y2="44" stroke="#d4a017" strokeWidth="1.4" className="flow"/>
        <line x1="156" y1="44" x2="218" y2="44" stroke="#d4a017" strokeWidth="1.4" className="flow"/>

        {/* RUNG 2 — strike output */}
        <g stroke="#0d1014">
          <line x1="22"  y1="44" x2="22"  y2="72"/>
          <line x1="22"  y1="72" x2="68"  y2="72"/>
          {/* CR1 contact (NO) actuated by coil */}
          <line x1="68"  y1="66" x2="68"  y2="78"/>
          <line x1="80"  y1="66" x2="80"  y2="78"/>
          <line x1="68"  y1="72" x2="80"  y2="72" stroke="none"/>
          <text x="66" y="62" fontFamily="JetBrains Mono, ui-monospace" fontSize="6" fill="#757d8a">CR1</text>
          <line x1="80"  y1="72" x2="180" y2="72"/>
          {/* output device — strike */}
          <rect x="180" y="66" width="20" height="12" fill="none" stroke="#0d1014"/>
          <text x="183" y="76" fontFamily="JetBrains Mono, ui-monospace" fontSize="6" fill="#0d1014">STRK</text>
          <line x1="200" y1="72" x2="218" y2="72"/>
          <line x1="218" y1="72" x2="218" y2="88"/>
        </g>

        {/* connection dots */}
        <circle cx="22" cy="44" r="1.6" fill="#0d1014"/>
        <circle cx="218" cy="44" r="1.6" fill="#0d1014"/>
      </svg>
    </div>
  );
}

function HeroLeds() {
  return (
    <div className="hero-leds" aria-hidden="true">
      <span className="led"><span className="lamp on"/>PWR</span>
      <span className="led"><span className="lamp sig"/>COMM</span>
      <span className="led"><span className="lamp copr"/>I/O</span>
      <span className="led"><span className="lamp off"/>FAULT</span>
    </div>
  );
}

/* ============================================================ */

function Topnav({ active }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onS = () => setScrolled(window.scrollY > 6);
    onS();
    window.addEventListener("scroll", onS, { passive: true });
    return () => window.removeEventListener("scroll", onS);
  }, []);
  return (
    <header className={`topnav ${scrolled ? "scrolled" : ""}`}>
      <div className="topnav-inner">
        <a href="#top" className="brand">
          <span className="mark">SC</span>
          <span><b>Stefan Cruceru</b></span>
          <span className="role">/ Founder · Warp Laboratory</span>
        </a>
        <nav className="topnav-links">
          {NAV.map(n => (
            <a key={n.id} href={`#${n.id}`} className={active === n.id ? "active" : ""}>{n.label}</a>
          ))}
          <a href="#contact" className="cta">Contact</a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero">
      <HeroSchematic/>
      <div style={{display:"flex", flexWrap:"wrap", alignItems:"center", gap:"10px", marginBottom:"6px"}}>
        <span className="hero-status">
          <span className="dot"/>FOUNDER · Q2 2026
        </span>
        <HeroLeds/>
      </div>

      <div className="nameplate" data-anim>
        <div className="np-tag"><span>NAMEPLATE</span><span className="np-id">SC-CEO-26</span></div>
        <div className="hero-name">
          <span className="hn-line">Stefan</span>
          <span className="hn-line">Cruceru</span>
        </div>
        <div className="np-rule"/>
        <div className="np-role">Founder &amp; CEO &nbsp;·&nbsp; <a href="https://warp-lab.ai" target="_blank" rel="noopener noreferrer" style={{color:'inherit'}}><b>Warp Laboratory Inc</b></a></div>
      </div>

      <div className="hero-badges">
        <span className="hero-badge cleared">DoD · CUI cleared</span>
        <span className="hero-badge cert">NERC CIP aware</span>
        <span className="hero-badge fips">FIPS-140 familiar</span>
        <span className="hero-badge">UL-listed installs</span>
      </div>
      <h1 data-anim>
        Founder &amp; CEO at <span className="signal">Warp Laboratory Inc.</span><br/>
        <span className="muted">Building Droplet.</span>
      </h1>
      <p data-anim>
        Droplet — on-prem AI that runs your IT. One appliance, one chat, no cloud.
        A local AI agent manages files, network, cameras, smart devices, and access
        control behind a single auth boundary. Internal data never leaves the building.
      </p>
      <div className="hero-actions" data-anim>
        <a href="#droplet" className="btn primary">Droplet <span className="arrow">→</span></a>
        <a href="#experience" className="btn">Background</a>
        <a href="#contact" className="btn">Get in touch</a>
      </div>
      <div className="hero-meta" data-anim>
        <div className="item"><span className="k">Stage</span><span className="v">Working code · HW v0 op.</span></div>
        <div className="item"><span className="k">Based</span><span className="v">Costa Mesa, CA</span></div>
        <div className="item"><span className="k">Background</span><span className="v">6+ yrs field eng.</span></div>
      </div>
      <div className="voltage-strip" data-anim>
        <div className="v"><span className="lvl">24VDC</span><span className="nm">Access · Intrusion</span><span className="bar"/></div>
        <div className="v"><span className="lvl">12 / 24V</span><span className="nm">CCTV · IP cam</span><span className="bar"/></div>
        <div className="v"><span className="lvl">PoE+ / ++</span><span className="nm">Network endpoints</span><span className="bar"/></div>
        <div className="v"><span className="lvl">120 / 240V</span><span className="nm">PSU · Rack feed</span><span className="bar"/></div>
        <div className="v"><span className="lvl">4-20 mA</span><span className="nm">PLC · Sensors</span><span className="bar"/></div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="about">
      <div className="eyebrow">
        <span className="id">§01</span>
        <span className="label">About</span>
        <span className="rule"/>
      </div>
      <dl className="founder-facts" data-anim aria-label="Fact sheet">
        <div><dt>Role</dt><dd>Founder &amp; CEO, Warp Laboratory Inc</dd></div>
        <div><dt>Company site</dt><dd><a href="https://warp-lab.ai" target="_blank" rel="noopener noreferrer" className="hero-inline">warp-lab.ai ↗</a></dd></div>
        <div><dt>Working on</dt><dd><a href="#droplet" className="hero-inline">Droplet</a> — on-prem AI that runs your IT</dd></div>
        <div><dt>Stage</dt><dd>Working code · Hardware v0 operational</dd></div>
        <div><dt>Background</dt><dd>6+ yrs field engineering · OT / IT</dd></div>
        <div><dt>Based</dt><dd>Costa Mesa, California</dd></div>
      </dl>
      <div className="hobbies-block" data-anim>
        <div className="hobbies-eye">
          <span className="hobbies-lab">Off-hours · Field Notes</span>
          <span className="hobbies-rule"/>
        </div>
        <div className="hobbies-grid">
          {HOBBIES.map((h, i) => (
            <div className="hobby-card" key={i}>
              <div className="hobby-illus">{h.icon}</div>
              <div className="hobby-meta">
                <div className="hobby-name">{h.name}</div>
                <div className="hobby-sub">{h.sub}</div>
              </div>
              <div className="hobby-detail">{h.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Droplet() {
  return (
    <section id="droplet" className="droplet-sec">
      <div className="eyebrow">
        <span className="id">§02</span>
        <span className="label">Droplet</span>
        <span className="rule"/>
      </div>

      <h2 className="sec-h2" data-anim>
        On-prem AI that <span className="signal">runs your IT.</span>
      </h2>

      <p className="sec-lede" data-anim>
        A unified AI agent on a local NPU manages files, network, cameras, smart
        devices, and access control — one chat, tied to existing identity. One
        appliance replaces the SMB stack (Dropbox, Microsoft 365 storage, Copilot,
        the router, the Wi-Fi) and the IT labor that wires it all up. Internal data
        never leaves the building.
      </p>

      <p className="sec-lede" data-anim>
        Three-tier safety: reads auto · writes (PoE, SSID, camera) confirmed ·
        destructive ops (reboot, factory reset, sever management) blocked by design.
      </p>

      <div className="status-strip" data-anim>
        <div className="ss"><span className="ss-dot live"/><span className="ss-k">Control plane</span><span className="ss-v">Working</span></div>
        <div className="ss"><span className="ss-dot live"/><span className="ss-k">Identity / auth</span><span className="ss-v">Working</span></div>
        <div className="ss"><span className="ss-dot live"/><span className="ss-k">On-device AI</span><span className="ss-v">Working</span></div>
        <div className="ss"><span className="ss-dot live"/><span className="ss-k">Network isolation</span><span className="ss-v">Working</span></div>
        <div className="ss"><span className="ss-dot live"/><span className="ss-k">Hardware v0 (prototype)</span><span className="ss-v">Operational</span></div>
        <div className="ss"><span className="ss-dot warn"/><span className="ss-k">Hardware v1 (production)</span><span className="ss-v">In progress</span></div>
        <div className="ss"><span className="ss-dot warn"/><span className="ss-k">Mobile + remote</span><span className="ss-v">In progress</span></div>
      </div>
    </section>
  );
}

function XpRow({ row, idx, openIdx, setOpenIdx }) {
  const isOpen = openIdx === idx;
  return (
    <div className={`xp-row ${isOpen ? "open" : ""}`} onClick={() => setOpenIdx(isOpen ? -1 : idx)}>
      <div className="xp-period">
        {row.current && <span className="now">● </span>}{row.period}
      </div>
      <div className="xp-main">
        <div className="xp-role">{row.role}</div>
        <div className="xp-co">{row.co}</div>
        {row.tags && (
          <div className="xp-tags">
            {row.tags.map((t, i) => <span key={i}>{t}</span>)}
          </div>
        )}
      </div>
      <div className="xp-toggle">
        <span className="xp-toggle-label">{isOpen ? "Hide details" : "Read more"}</span>
        <span className="xp-toggle-chevron">›</span>
      </div>
      <div className="xp-detail">
        <div>
          <ul>{row.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
        </div>
      </div>
    </div>
  );
}

function Experience() {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section id="experience">
      <div className="eyebrow">
        <span className="id">§03</span>
        <span className="label">Background</span>
        <span className="rule"/>
      </div>
      <div className="xp">
        {TIMELINE.map((row, i) => (
          <XpRow key={i} row={row} idx={i} openIdx={openIdx} setOpenIdx={setOpenIdx}/>
        ))}
      </div>
      <div className="reference-card" data-anim>
        <div className="reference-eyebrow">
          <span className="reference-tag">Reference · §05.R</span>
        </div>
        <blockquote className="reference-quote">
          "What set Stefan apart was his ability to think beyond individual components and focus on how systems actually perform in real-world conditions. He understood configuration discipline, system dependencies, and the operational impact of design decisions."
        </blockquote>
        <div className="reference-attr">
          <div className="reference-name">
            <b>Michael Gonzalez</b>
            <span>Chief Technology Officer · Clear Cloud Solutions</span>
          </div>
          <a href="reference-michael-gonzalez.pdf" target="_blank" rel="noopener" className="reference-link">
            View full letter <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section id="capabilities">
      <div className="eyebrow">
        <span className="id">§04</span>
        <span className="label">Stack</span>
        <span className="rule"/>
      </div>
      <div className="caps">
        {CAPS.map((c, i) => (
          <div className="caps-row" key={i} data-anim>
            <div className="caps-tb">{c.tb}</div>
            <div className="caps-label"><b>{c.label}</b><small>{c.sub}</small></div>
            <div className="caps-pills">{c.items.map((it, j) => <span key={j}>{it}</span>)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects">
      <div className="eyebrow">
        <span className="id">§05</span>
        <span className="label">Selected Work</span>
        <span className="rule"/>
      </div>
      <div className="work">
        {PROJECTS.map((p, i) => (
          <article className="work-card" key={i} data-anim>
            <div className="meta">
              <span className="dwg">{p.id}</span>
              <span>{p.sector}</span>
            </div>
            <h3>{p.title}</h3>
            <div className="client">{p.client}</div>
            <p>{p.desc}</p>
            <div className="tags">{p.tags.map((t, j) => <span key={j}>{t}</span>)}</div>
          </article>
        ))}
      </div>
      <div className="creds" style={{marginTop: 24}}>
        {CERTS.map((c, i) => (
          <span className="cred" key={i}>
            <span className="seal">{c.mark}</span>{c.name}
          </span>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(-1);
  const items = [
    { lab: "Email",    val: "Stefan17x@gmail.com",    href: "mailto:Stefan17x@gmail.com",                 copy: "Stefan17x@gmail.com" },
    { lab: "Phone",    val: "609 · 712 · 0920",       href: "tel:6097120920",                              copy: "6097120920" },
    { lab: "LinkedIn", val: "/in/stefan-cruceru",     href: "https://www.linkedin.com/in/stefan-cruceru",  external: true },
    { lab: "Based",    val: "Costa Mesa, California", href: null },
  ];
  return (
    <section id="contact" className="contact">
      <div className="eyebrow">
        <span className="id">§06</span>
        <span className="label">Contact</span>
        <span className="rule"/>
      </div>
      <h2 data-anim>Want to back the personal AI cloud?</h2>
      <p className="sub" data-anim>
        Open to investor conversations, design partners, advisors, and operators with
        networks in consumer hardware, privacy-brand portfolios, smart-home installer
        channels, or the edge-AI thesis. Also happy to talk shop with anyone who has
        to keep things running at 2 AM.
      </p>
      <div className="contact-list">
        {items.map((c, i) => {
          const cls = `cc ${copied === i ? "copied" : ""}`;
          const action = c.copy ? (copied === i ? "Copied" : "Copy") : c.external ? "Open ↗" : "";
          const inner = (
            <>
              <span className="lab">{c.lab}</span>
              <span className="val">{c.val}</span>
              <span className="act">{action}</span>
            </>
          );
          if (!c.href) {
            return <div key={i} className={cls}>{inner}</div>;
          }
          return (
            <a
              key={i}
              href={c.href}
              className={cls}
              {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              onClick={(e) => {
                if (c.copy && navigator.clipboard) {
                  e.preventDefault();
                  navigator.clipboard.writeText(c.copy);
                  setCopied(i);
                  setTimeout(() => setCopied(-1), 1400);
                }
              }}
            >
              {inner}
            </a>
          );
        })}
      </div>
      <div className="foot">
        <span>© 2026 Stefan Cruceru</span>
        <span>Costa Mesa · CA</span>
      </div>
    </section>
  );
}

/* ============================================================ */

function useScrollSpy() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const ids = NAV.map(n => n.id);
    const obs = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] });
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return active;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-anim]");
    els.forEach(el => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh && r.bottom > 0) el.classList.add("in");
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.05 });
    els.forEach(el => io.observe(el));
    const t = setTimeout(() => {
      document.querySelectorAll("[data-anim]:not(.in)").forEach(el => el.classList.add("in"));
    }, 600);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "signal": "amber",
  "mode": "light"
}/*EDITMODE-END*/;

const SIGNALS = {
  amber:  { c: "#d4a017", deep: "#a37700" },
  copper: { c: "#b87333", deep: "#8a5526" },
  green:  { c: "#1a9d6c", deep: "#147652" },
  blue:   { c: "#3b82f6", deep: "#2456c8" },
};

function App() {
  const active = useScrollSpy();
  useReveal();

  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    const r = document.documentElement;
    const sig = SIGNALS[tweaks.signal] || SIGNALS.amber;
    r.style.setProperty("--signal", sig.c);
    r.style.setProperty("--signal-deep", sig.deep);
    if (tweaks.mode === "dark") {
      r.style.setProperty("--bg",     "#0a0c10");
      r.style.setProperty("--bg-2",   "#13161c");
      r.style.setProperty("--paper",  "#10131a");
      r.style.setProperty("--ink",    "#f1f3f6");
      r.style.setProperty("--ink-2",  "#aab2bf");
      r.style.setProperty("--ink-3",  "#7a8290");
      r.style.setProperty("--ink-4",  "#5a6271");
      r.style.setProperty("--rule",   "#1f242c");
      r.style.setProperty("--rule-2", "#1a1e25");
    } else {
      r.style.setProperty("--bg",     "#fafafb");
      r.style.setProperty("--bg-2",   "#f1f2f4");
      r.style.setProperty("--paper",  "#ffffff");
      r.style.setProperty("--ink",    "#0d1014");
      r.style.setProperty("--ink-2",  "#444b56");
      r.style.setProperty("--ink-3",  "#757d8a");
      r.style.setProperty("--ink-4",  "#a4abb6");
      r.style.setProperty("--rule",   "#e2e5ea");
      r.style.setProperty("--rule-2", "#ebedf1");
    }
  }, [tweaks]);

  return (
    <>
      <Topnav active={active}/>
      <main className="wrap">
        <Hero/>
        <About/>
        <Droplet/>
        <Experience/>
        <Capabilities/>
        <Projects/>
        <Contact/>
      </main>
      {TweaksPanel && (
        <TweaksPanel title="Tweaks">
          <TweakSection title="Signal color">
            <TweakRadio
              label="Accent"
              value={tweaks.signal}
              onChange={v => setTweak("signal", v)}
              options={[
                { value: "amber",  label: "Amber" },
                { value: "copper", label: "Copper" },
                { value: "green",  label: "Green" },
                { value: "blue",   label: "Blue" },
              ]}
            />
          </TweakSection>
          <TweakSection title="Mode">
            <TweakRadio
              label="Mode"
              value={tweaks.mode}
              onChange={v => setTweak("mode", v)}
              options={[
                { value: "light", label: "Light" },
                { value: "dark",  label: "Dark" },
              ]}
            />
          </TweakSection>
        </TweaksPanel>
      )}
    </>
  );
}

export default App;
