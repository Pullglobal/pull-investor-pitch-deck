import { useEffect, useRef, useState } from "react";

const YELLOW = "#F5C842";
const BLACK = "#0A0A0A";
const OFFWHITE = "#E8E4DC";
const GRAY = "#2A2A2A";

const slides = [
  { id: "cover", label: "Cover" },
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Solution" },
  { id: "product", label: "Product" },
  { id: "market", label: "Market" },
  { id: "model", label: "Business Model" },
  { id: "adoption", label: "Go-To-Market" },
  { id: "competition", label: "Edge" },
  { id: "team", label: "Team" },
  { id: "financials", label: "Financials" },
  { id: "ask", label: "The Ask" },
];

function WarpGrid({ color = "#F5C842", opacity = 0.15, animated = false }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = color;
      ctx.lineWidth = 0.8;
      ctx.globalAlpha = 1;
      const cols = 18;
      const rows = 18;
      const t = tRef.current;

      const getPoint = (i, j) => {
        const bx = (i / cols) * W;
        const by = (j / rows) * H;
        const dx = bx - W / 2;
        const dy = by - H / 2;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = Math.sqrt((W / 2) * (W / 2) + (H / 2) * (H / 2));
        const pull = Math.pow(1 - dist / maxDist, 2.2) * (animated ? 0.18 : 0.15);
        const angle = Math.atan2(dy, dx) + (animated ? t * 0.003 : 0);
        return {
          x: bx - Math.cos(angle) * dist * pull,
          y: by - Math.sin(angle) * dist * pull,
        };
      };

      for (let i = 0; i <= cols; i++) {
        ctx.beginPath();
        for (let j = 0; j <= rows; j++) {
          const p = getPoint(i, j);
          j === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
      for (let j = 0; j <= rows; j++) {
        ctx.beginPath();
        for (let i = 0; i <= cols; i++) {
          const p = getPoint(i, j);
          i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      if (animated) {
        tRef.current += 1;
        frameRef.current = requestAnimationFrame(draw);
      }
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      draw();
    };

    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [color, animated]);

  return (
    <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity, pointerEvents: "none" }} />
  );
}

function Tag({ children }) {
  return (
    <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: YELLOW, fontFamily: "'Space Mono', monospace", opacity: 0.9 }}>
      {children}
    </span>
  );
}

function SlideTitle({ children }) {
  return (
    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(34px, 5vw, 60px)", color: OFFWHITE, lineHeight: 0.95, letterSpacing: "0.01em", marginBottom: 8 }}>
      {children}
    </div>
  );
}

function Rule() {
  return <div style={{ width: 48, height: 2, background: YELLOW, margin: "14px 0" }} />;
}

function CoverSlide() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: BLACK, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <WarpGrid color={YELLOW} opacity={0.2} animated={true} />
      <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(80px, 16vw, 160px)", color: YELLOW, letterSpacing: "0.25em", lineHeight: 1, textShadow: `0 0 80px ${YELLOW}44` }}>
          PULL
        </div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(10px, 1.4vw, 14px)", color: OFFWHITE, letterSpacing: "0.35em", textTransform: "uppercase", marginTop: 16, opacity: 0.7 }}>
          Putting Music on the Map
        </div>
        <div style={{ width: 1, height: 48, background: `linear-gradient(to bottom, ${YELLOW}, transparent)`, margin: "40px auto 0" }} />
      </div>
    </div>
  );
}

function ProblemSlide() {
  const problems = [
    {
      num: "01",
      headline: "Discovery is passive",
      body: "Algorithmic consumption has made music discovery a mindless cafeteria line as opposed to a hunt in the great unknown. There is no real effort and so there is no true reward. Songs and artists blur together with no connection to place or time.",
    },
    {
      num: "02",
      headline: "Artists can't reach fans IRL",
      body: "Despite social media making every artist's potential reach global, engaging fans across cities in real physical space is nearly impossible, especially for indie artists without label infrastructure or tour budgets.",
    },
    {
      num: "03",
      headline: "Business partnerships are out of reach",
      body: "Artists have cultural pull but lack the IRL metrics to prove it to potential partners, businesses, and sponsors.",
    },
  ];

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: BLACK, display: "flex", flexDirection: "column", justifyContent: "center", padding: "36px 56px", overflow: "hidden", boxSizing: "border-box" }}>
      <WarpGrid color={OFFWHITE} opacity={0.05} />
      <div style={{ position: "relative", zIndex: 2, display: "flex", gap: 48, alignItems: "center" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Tag>The Problem</Tag>
          <SlideTitle>Three things<br />that are broken.</SlideTitle>
          <Rule />
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {problems.map((p) => (
              <div key={p.num} style={{ display: "flex", gap: 22, alignItems: "flex-start" }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: YELLOW, opacity: 0.6, paddingTop: 3, minWidth: 22 }}>{p.num}</div>
                <div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 19, color: OFFWHITE, letterSpacing: "0.05em", marginBottom: 5 }}>{p.headline}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: OFFWHITE, opacity: 0.55, lineHeight: 1.6, maxWidth: 400 }}>{p.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        </div>
      </div>
  );
}

function SolutionSlide() {
  const solutions = [
    {
      headline: "Rediscover music by moving through the world",
      body: "Users unlock music by physically entering a drop zone. The friction is the feature - mild resistance creates memory, attachment, and real value.",
    },
    {
      headline: "Artists plant flags everywhere at once",
      body: "Drop nodes in any city, gather fans in the same moment, and transform a rollout into a one-of-one global event.",
    },
    {
      headline: "Pull becomes proof",
      body: "Artists show businesses exactly where their fans are and broker promo deals that convert listeners into customers.",
    },
  ];

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: YELLOW, display: "flex", flexDirection: "column", justifyContent: "center", padding: "36px 56px", overflow: "hidden", boxSizing: "border-box" }}>
      <WarpGrid color={BLACK} opacity={0.1} />
      <div style={{ position: "relative", zIndex: 2, display: "flex", gap: 48, alignItems: "center" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Tag><span style={{ color: BLACK, opacity: 0.5 }}>The Solution</span></Tag>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(34px, 5vw, 60px)", color: BLACK, lineHeight: 0.95, marginBottom: 8 }}>
            Music anchored<br />to place.
          </div>
          <div style={{ width: 48, height: 2, background: BLACK, opacity: 0.3, margin: "14px 0" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {solutions.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: BLACK, opacity: 0.4, marginTop: 8, flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: BLACK, letterSpacing: "0.04em", marginBottom: 4 }}>{s.headline}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: BLACK, opacity: 0.6, lineHeight: 1.6, maxWidth: 400 }}>{s.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ width: 180, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 8px 40px #00000033", border: "1px solid #00000022" }}>
            <img src="/src/assets/screenshot.png" alt="" style={{ width: 170, height: 320, objectFit: "cover", display: "block" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductSlide() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: BLACK, display: "flex", flexDirection: "column", justifyContent: "center", padding: "36px 56px", overflow: "hidden", boxSizing: "border-box" }}>
      <WarpGrid color={YELLOW} opacity={0.08} />
      <div style={{ position: "relative", zIndex: 2, display: "flex", gap: 44, alignItems: "flex-start", paddingTop: 8 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Tag>The Product</Tag>
          <SlideTitle>A living map<br />of music.</SlideTitle>
          <Rule />
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: OFFWHITE, opacity: 0.6, lineHeight: 1.65, maxWidth: 360, marginBottom: 20 }}>
            Artists place geo-tagged audio nodes - drops - on a map. Anyone who enters the radius unlocks the track. Every drop is a moment, a place, and a signal.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {["Tap the map to drop a node", "Set radius, duration, and price", "Enter the zone to unlock", "Data flows back to the artist"].map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: YELLOW, minWidth: 20 }}>0{i + 1}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: OFFWHITE, opacity: 0.7 }}>{step}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ width: 150, flexShrink: 0 }}>
          <div style={{ width: 140, height: 268, background: GRAY, borderRadius: 26, border: `1px solid ${YELLOW}33`, position: "relative", overflow: "hidden", boxShadow: `0 0 60px ${YELLOW}22` }}>
            <div style={{ position: "absolute", inset: 0, background: "#111", overflow: "hidden" }}>
              <WarpGrid color={YELLOW} opacity={0.15} />
            </div>
            {[
              { top: "35%", left: "50%", active: true },
              { top: "55%", left: "30%", active: false },
              { top: "65%", left: "65%", active: false },
            ].map((n, i) => (
              <div key={i} style={{ position: "absolute", top: n.top, left: n.left, transform: "translate(-50%,-50%)" }}>
                {n.active && (
                  <div style={{ position: "absolute", width: 44, height: 44, borderRadius: "50%", border: `1px solid ${YELLOW}`, top: "50%", left: "50%", transform: "translate(-50%,-50%)", animation: "pulse 2s infinite", opacity: 0.4 }} />
                )}
                <div style={{ width: 9, height: 9, borderRadius: "50%", background: n.active ? YELLOW : OFFWHITE, opacity: n.active ? 1 : 0.4, boxShadow: n.active ? `0 0 10px ${YELLOW}` : "none" }} />
              </div>
            ))}
            <div style={{ position: "absolute", bottom: 12, left: 0, right: 0, textAlign: "center", fontFamily: "'Space Mono', monospace", fontSize: 8, color: YELLOW, letterSpacing: "0.12em" }}>
              LIVE DROP NEAR YOU
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes pulse { 0%,100%{transform:translate(-50%,-50%) scale(1);opacity:0.4} 50%{transform:translate(-50%,-50%) scale(1.8);opacity:0} }`}</style>
    </div>
  );
}

function MarketSlide() {
  const stats = [
    { num: "38M", label: "songs uploaded to Spotify in 2025" },
    { num: "130M+", label: "Americans paying for music streaming" },
    { num: "500K+", label: "artists served by Even.biz across 185 countries" },
  ];

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: BLACK, display: "flex", flexDirection: "column", justifyContent: "center", padding: "36px 56px", overflow: "hidden", boxSizing: "border-box" }}>
      <WarpGrid color={OFFWHITE} opacity={0.04} />
      <div style={{ position: "relative", zIndex: 2 }}>
        <Tag>Market Size</Tag>
        <SlideTitle>A crowded<br />market with<br />no map.</SlideTitle>
        <Rule />
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {stats.map((s, i) => (
            <div key={i} style={{ flex: "1 1 130px", background: GRAY, borderRadius: 8, padding: "16px 18px", border: `1px solid #ffffff0a` }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: YELLOW, lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: OFFWHITE, opacity: 0.5, marginTop: 6, lineHeight: 1.5 }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 18, fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: OFFWHITE, opacity: 0.45, maxWidth: 560, lineHeight: 1.65 }}>
          Artists are actively looking for alternatives and add-ons to streaming platforms that don't pay and algorithms that don't care. Pull gives them something neither has: a place.
        </div>
      </div>
    </div>
  );
}

function ModelSlide() {
  const tiers = [
    {
      price: "$22",
      name: "The Original 1000",
      desc: "Base price for the first 1,000 users during the scene-building stage. Locked in forever.",
      tag: "Founder tier",
    },
    {
      price: "$55",
      name: "Standard Drop",
      desc: "Extended radius, longer duration, multi-track support, full feature set.",
      tag: "Core tier",
    },
    {
      price: "$500",
      name: "Forever Node",
      desc: "Permanent placement on the Pull map. A legacy marker. A monument.",
      tag: "Premium tier",
      highlight: true,
    },
  ];

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: BLACK, display: "flex", flexDirection: "column", justifyContent: "center", padding: "36px 56px", overflow: "hidden", boxSizing: "border-box" }}>
      <WarpGrid color={YELLOW} opacity={0.06} />
      <div style={{ position: "relative", zIndex: 2 }}>
        <Tag>Business Model</Tag>
        <SlideTitle>Artists pay<br />to drop.</SlideTitle>
        <Rule />
        <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          {tiers.map((t) => (
            <div key={t.name} style={{
              display: "flex", alignItems: "center", gap: 20,
              background: t.highlight ? `${YELLOW}11` : GRAY,
              border: t.highlight ? `1px solid ${YELLOW}55` : "1px solid #ffffff08",
              borderRadius: 8,
              padding: "15px 20px",
            }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, color: t.highlight ? YELLOW : OFFWHITE, minWidth: 68 }}>{t.price}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 15, color: OFFWHITE, letterSpacing: "0.08em" }}>{t.name}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: OFFWHITE, opacity: 0.45, marginTop: 3, lineHeight: 1.5 }}>{t.desc}</div>
              </div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: t.highlight ? YELLOW : OFFWHITE, opacity: t.highlight ? 0.9 : 0.3, letterSpacing: "0.1em", textAlign: "right", minWidth: 76 }}>{t.tag}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 18, fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: OFFWHITE, opacity: 0.35, lineHeight: 1.6 }}>
          Pricing scales by radius, duration, and drop count. Future additions: analytics dashboard, business partnership tools, and label tier pricing.
        </div>
      </div>
    </div>
  );
}

function AdoptionSlide() {
  const moves = [
    {
      title: "Manhattan Music Crawl",
      body: "A live, location-based activation in Lower Manhattan. Multiple artists. Multiple nodes. One summer night.",
    },
    {
      title: "Artist-first press",
      body: "Music blogs with artist-heavy readership are the perfect channel for seeding a for-artists product with the right early adopters.",
    },
    {
      title: "Marquee early adopters",
      body: "Direct relationships with JMSN, Daniel Caesar, and Momo Boyd. Names that signal credibility and drive organic artist adoption.",
    },
    {
      title: "TikTok promotion",
      body: "Paid and organic. The founding team has built-in access to a large audience of artists and music fans - launch infrastructure that money can't buy.",
    },
  ];

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: BLACK, display: "flex", flexDirection: "column", justifyContent: "center", padding: "36px 56px", overflow: "hidden", boxSizing: "border-box" }}>
      <WarpGrid color={OFFWHITE} opacity={0.04} />
      <div style={{ position: "relative", zIndex: 2 }}>
        <Tag>Go-To-Market</Tag>
        <SlideTitle>Seed the scene.<br />Then let it pull.</SlideTitle>
        <Rule />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11 }}>
          {moves.map((m, i) => (
            <div key={i} style={{ background: GRAY, borderRadius: 8, padding: "14px 16px", border: "1px solid #ffffff08" }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: YELLOW, marginBottom: 6, letterSpacing: "0.1em" }}>0{i + 1}</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 15, color: OFFWHITE, letterSpacing: "0.04em", marginBottom: 5 }}>{m.title}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: OFFWHITE, opacity: 0.5, lineHeight: 1.55 }}>{m.body}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14, background: `${YELLOW}15`, border: `1px solid ${YELLOW}33`, borderRadius: 8, padding: "11px 18px", display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: YELLOW }}>500</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: OFFWHITE, opacity: 0.6, lineHeight: 1.5 }}>drops in 90 days - our year-one network density target.<br />Achievable. Provable. The foundation of everything.</div>
        </div>
      </div>
    </div>
  );
}

function CompetitionSlide() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: YELLOW, display: "flex", flexDirection: "column", justifyContent: "center", padding: "36px 56px", overflow: "hidden", boxSizing: "border-box" }}>
      <WarpGrid color={BLACK} opacity={0.08} />
      <div style={{ position: "relative", zIndex: 2 }}>
        <Tag><span style={{ color: BLACK, opacity: 0.5 }}>Competitive Edge</span></Tag>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(34px, 5vw, 58px)", color: BLACK, lineHeight: 0.95, marginBottom: 8 }}>
          No one is<br />doing this.
        </div>
        <div style={{ width: 48, height: 2, background: BLACK, opacity: 0.3, margin: "14px 0" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
          {[
            { co: "Spotify / Apple Music", note: "Passive consumption. No physical layer. No artist-to-place connection." },
            { co: "Bandsintown / Sofar Sounds", note: "Event discovery, not music discovery. No geo-audio drops. No listener-side exploration mechanic." },
            { co: "SoundCloud", note: "Upload and hope. No location layer. No IRL engagement." },
          ].map((c, i) => (
            <div key={i} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, color: BLACK, opacity: 0.7, minWidth: 170 }}>{c.co}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: BLACK, opacity: 0.55, lineHeight: 1.5 }}>{c.note}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 18, background: "#00000015", borderRadius: 8, padding: "14px 18px" }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, color: BLACK, letterSpacing: "0.04em", marginBottom: 5 }}>Our unfair advantages</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: BLACK, opacity: 0.6, lineHeight: 1.65 }}>
            A definitive head start in an unclaimed category. Social capital to plant a flag from day one. A well-connected founding team with decades of combined experience in music, marketing, and tech. Built-in distribution that no competitor can replicate.
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamSlide() {
  const members = [
    {
      name: "Isaiah",
      role: "Founder & CEO",
      bio: "Musician - developer - 250k+ followers across platforms - Amherst College - background in talent management, pop culture analysis, marketing, and social justice. The target user, the messenger to the masses, and the founding architect and vision of Pull.",
    },
    {
      name: "Amal",
      role: "Co-Founder",
      bio: "Musician - 60k+ followers across platforms - Amherst College - background in film production, commercial editing, computer science, graphic design, and marketing. A master of aesthetics, storytelling, and brand cohesion.",
    },
    {
      name: "Garai",
      role: "Co-Founder",
      bio: "UX Researcher - Events Curator - Celebrity Chef - background in artist discovery, multi-sensory experience curation, recorded music, and community organizing. An unparalleled eye for talent, translating experiences, and bridging worlds.",
    },
  ];

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: BLACK, display: "flex", flexDirection: "column", justifyContent: "center", padding: "36px 56px", overflow: "hidden", boxSizing: "border-box" }}>
      <WarpGrid color={YELLOW} opacity={0.07} />
      <div style={{ position: "relative", zIndex: 2 }}>
        <Tag>Team</Tag>
        <SlideTitle>Built by people<br />inside the music.</SlideTitle>
        <Rule />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {members.map((m) => (
            <div key={m.name} style={{ background: GRAY, borderRadius: 8, padding: "14px 18px", border: "1px solid #ffffff08" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 7 }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 19, color: OFFWHITE, letterSpacing: "0.05em" }}>{m.name}</div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: YELLOW, letterSpacing: "0.1em" }}>{m.role}</div>
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: OFFWHITE, opacity: 0.5, lineHeight: 1.6 }}>{m.bio}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FinancialsSlide() {
  const uses = [
    { label: "Product", pct: 40, amt: "$120K", desc: "Audio playback UI, auth, launch polish" },
    { label: "Artist Acquisition", pct: 35, amt: "$105K", desc: "Seeding drops, Manhattan crawl, outreach" },
    { label: "Marketing", pct: 15, amt: "$45K", desc: "TikTok content, press, community" },
    { label: "Ops / Legal", pct: 10, amt: "$30K", desc: "Entity, contracts, overhead" },
  ];

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: BLACK, display: "flex", flexDirection: "column", justifyContent: "center", padding: "36px 56px", overflow: "hidden", boxSizing: "border-box" }}>
      <WarpGrid color={YELLOW} opacity={0.06} />
      <div style={{ position: "relative", zIndex: 2 }}>
        <Tag>Financials</Tag>
        <SlideTitle>Use of funds.</SlideTitle>
        <Rule />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {uses.map((u) => (
            <div key={u.label} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 130, fontFamily: "'Space Mono', monospace", fontSize: 10, color: OFFWHITE, opacity: 0.5 }}>{u.label}</div>
              <div style={{ flex: 1, height: 5, background: "#ffffff0a", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: `${u.pct}%`, height: "100%", background: YELLOW, borderRadius: 3 }} />
              </div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 17, color: YELLOW, minWidth: 58, textAlign: "right" }}>{u.amt}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: OFFWHITE, opacity: 0.3, minWidth: 190 }}>{u.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 20, display: "flex", gap: 11, flexWrap: "wrap" }}>
          {[
            { label: "90-Day Target", value: "500 drops" },
            { label: "90-Day Gross", value: "$11K+" },
            { label: "Month 6", value: "$55 tier live" },
            { label: "Month 12", value: "2 anchor cities" },
          ].map((m) => (
            <div key={m.label} style={{ flex: "1 1 100px", background: GRAY, borderRadius: 8, padding: "12px 14px", border: "1px solid #ffffff08" }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: YELLOW, opacity: 0.7, marginBottom: 5 }}>{m.label}</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 19, color: OFFWHITE }}>{m.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AskSlide() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: BLACK, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: "48px 56px", boxSizing: "border-box" }}>
      <WarpGrid color={YELLOW} opacity={0.15} animated={true} />
      <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 580 }}>
        <Tag>The Ask</Tag>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 8vw, 80px)", color: OFFWHITE, lineHeight: 0.95, margin: "14px 0" }}>
          $300K
        </div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: YELLOW, letterSpacing: "0.2em", marginBottom: 20 }}>
          PRE-SEED - SAFE NOTE - $4M CAP
        </div>
        <div style={{ width: 48, height: 2, background: YELLOW, margin: "0 auto 24px" }} />
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: OFFWHITE, opacity: 0.6, lineHeight: 1.8 }}>
          Pull is not an invention, it's a discovery. The desire for this platform has been sitting in wait silently for far too long. We are asking you to play an indispensable role in making that powerful creative force tangible.
        </div>
        <div style={{ marginTop: 36, fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color: YELLOW, letterSpacing: "0.25em", textShadow: `0 0 40px ${YELLOW}44` }}>
          PULL
        </div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: OFFWHITE, opacity: 0.3, letterSpacing: "0.3em", marginTop: 8 }}>
          PUTTING MUSIC ON THE MAP
        </div>
      </div>
    </div>
  );
}

const SLIDE_COMPONENTS = {
  cover: CoverSlide,
  problem: ProblemSlide,
  solution: SolutionSlide,
  product: ProductSlide,
  market: MarketSlide,
  model: ModelSlide,
  adoption: AdoptionSlide,
  competition: CompetitionSlide,
  team: TeamSlide,
  financials: FinancialsSlide,
  ask: AskSlide,
};

export default function PullPitchDeck() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const goTo = (idx) => {
    if (idx === current || transitioning) return;
    setTransitioning(true);
    setTimeout(() => { setCurrent(idx); setTransitioning(false); }, 200);
  };

  const prev = () => goTo(Math.max(0, current - 1));
  const next = () => goTo(Math.min(slides.length - 1, current + 1));

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, transitioning]);

  const SlideComp = SLIDE_COMPONENTS[slides[current].id];

  return (
    <div style={{ width: "100%", height: "100vh", background: "#050505", display: "flex", flexDirection: "column" }}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />

      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: transitioning ? 0 : 1, transition: "opacity 0.2s ease" }}>
          <SlideComp />
        </div>
      </div>

      <div style={{ height: 52, background: "#0A0A0A", borderTop: "1px solid #1a1a1a", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {slides.map((s, i) => (
            <button key={s.id} onClick={() => goTo(i)} title={s.label} style={{ width: i === current ? 20 : 6, height: 6, borderRadius: 3, background: i === current ? YELLOW : "#333", border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s ease" }} />
          ))}
        </div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: OFFWHITE, opacity: 0.3, letterSpacing: "0.15em" }}>
          {slides[current].label.toUpperCase()} - {current + 1}/{slides.length}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {[{ label: "←", action: prev, disabled: current === 0 }, { label: "→", action: next, disabled: current === slides.length - 1 }].map((btn) => (
            <button key={btn.label} onClick={btn.action} disabled={btn.disabled} style={{ width: 32, height: 32, background: "none", border: `1px solid ${btn.disabled ? "#222" : "#333"}`, borderRadius: 6, color: btn.disabled ? "#333" : OFFWHITE, cursor: btn.disabled ? "default" : "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}