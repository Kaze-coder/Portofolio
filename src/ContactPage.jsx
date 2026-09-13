import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, MapPin, ChevronRight, User, Globe, Clock, Activity, Sparkles } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import bgVideo from "./assets/Contact.mp4";

// NOTE: email & whatsapp below are PLACEHOLDERS — swap with real values before launch.
const ROMAN = ["I", "II", "III"];

const ITEMS = [
  {
    id: "email",
    label: "EMAIL",
    verb: "WRITE",
    arcana: "THE MAGICIAN",
    handle: "fabiansyahputra648@gmail.com", // PLACEHOLDER
    href: "mailto:fabiansyahputra648@gmail.com",
    icon: Mail,
    details: [
      { label: "USER", value: "Fabiansyah Putra", icon: User },
      { label: "TYPE", value: "Personal", icon: Mail },
      { label: "STAT", value: "Active", icon: Activity },
    ],
  },
  {
    id: "whatsapp",
    label: "WHATSAPP",
    verb: "CALL",
    arcana: "THE LOVERS",
    handle: "+62 812-3456-7890", // PLACEHOLDER
    href: "https://wa.me/6281234567890",
    icon: SiWhatsapp,
    details: [
      { label: "USER", value: "Fabiansyah Putra", icon: User },
      { label: "LOC", value: "Bogor, Indonesia", icon: MapPin },
      { label: "STAT", value: "Online", icon: Sparkles },
    ],
  },
  {
    id: "location",
    label: "LOCATION",
    verb: "FIND",
    arcana: "THE WORLD",
    handle: "Bogor, Indonesia",
    href: "https://maps.google.com/?q=Bogor,Indonesia",
    icon: MapPin,
    details: [
      { label: "CITY", value: "Bogor", icon: MapPin },
      { label: "REGION", value: "West Java", icon: Globe },
      { label: "TZ", value: "WIB (UTC+7)", icon: Clock },
    ],
  },
];

const Moon = ({ id, size, color }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" style={{ color, display: "block" }}>
    <mask id={id}>
      <rect width="40" height="40" fill="#ffffff" />
      <circle cx="27" cy="13" r="12" fill="#000000" />
    </mask>
    <circle cx="20" cy="20" r="15" fill="currentColor" mask={`url(#${id})`} />
  </svg>
);

export default function ContactPage() {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [sealed, setSealed] = useState(null);
  const lockRef = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    const v = document.querySelector("video");
    if (v) v.play().catch(() => {});
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const seal = useCallback((i) => {
    if (lockRef.current) return;
    lockRef.current = true;
    setSealed(i);
    setTimeout(() => {
      const href = ITEMS[i].href;
      if (href.startsWith("mailto:")) window.location.href = href;
      else window.open(href, "_blank", "noopener,noreferrer");
      lockRef.current = false;
    }, 520);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") { e.preventDefault(); setActive((i) => Math.max(0, i - 1)); }
      else if (e.key === "ArrowDown") { e.preventDefault(); setActive((i) => Math.min(ITEMS.length - 1, i + 1)); }
      else if (e.key === "Enter") seal(active);
      else if (e.key === "ArrowLeft" || e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, navigate, seal]);

  const item = ITEMS[active];

  return (
    <div id="menu-screen">
      <video src={bgVideo} preload="auto" autoPlay loop muted playsInline />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&display=swap');

        .cx-root {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(24px, 3vw, 56px);
          padding: 4vh 4vw;
          pointer-events: none;
        }

        /* ── Contract sheet ── */
        .cx-sheet-wrap {
          position: relative;
          width: min(58vw, 860px);
          pointer-events: all;
          opacity: 0;
          transform: translateY(34px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .cx-root.mounted .cx-sheet-wrap { opacity: 1; transform: translateY(0); }

        .cx-sheet-under {
          position: absolute;
          inset: 0;
          pointer-events: none;
          clip-path: polygon(28px 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%, 0 28px);
        }
        .cx-under-red { background: rgba(196,0,26,0.45); transform: translate(26px, 22px); }
        .cx-under-navy { background: #0b113d; transform: translate(13px, 11px); }

        .cx-sheet {
          position: relative;
          background: #d3fdff;
          color: #0b113d;
          padding: clamp(22px, 3vw, 36px) clamp(26px, 3.4vw, 44px) clamp(18px, 2.6vw, 30px);
          clip-path: polygon(28px 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%, 0 28px);
        }
        .cx-sheet-wrap.stamped .cx-sheet { animation: cx-shake 0.32s cubic-bezier(0.22,1,0.36,1); }
        @keyframes cx-shake {
          0%, 100% { transform: translate(0,0) rotate(0deg); }
          25% { transform: translate(-3px, 2px) rotate(-0.3deg); }
          55% { transform: translate(3px, -2px) rotate(0.3deg); }
          80% { transform: translate(-2px, 1px) rotate(-0.15deg); }
        }

        .cx-sheet-head { display: flex; align-items: center; gap: 10px; }
        .cx-head-tag {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 15px; letter-spacing: 4px; color: #0b113d; line-height: 1;
        }
        .cx-head-tag.dim { color: rgba(11,17,61,0.45); font-size: 13px; }
        .cx-head-line { flex: 1; height: 2px; background: rgba(11,17,61,0.18); margin: 0 6px; }

        .cx-title {
          font-family: 'Anton', sans-serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(50px, 5.8vw, 82px);
          line-height: 0.95;
          letter-spacing: 1px;
          margin: 12px 0 8px;
          display: flex;
          align-items: baseline;
          gap: 0.28em;
        }
        .cx-title-the {
          font-family: 'Bebas Neue', sans-serif;
          font-style: normal;
          font-size: 0.4em;
          letter-spacing: 8px;
          color: rgba(11,17,61,0.4);
        }
        .cx-title-main { color: #c4001a; text-shadow: 5px 5px 0 rgba(11,17,61,0.15); }

        .cx-quote {
          font-family: 'Montserrat', sans-serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(12.5px, 1.05vw, 14.5px);
          letter-spacing: 0.4px;
          color: rgba(11,17,61,0.66);
          max-width: 52ch;
          line-height: 1.65;
          margin-bottom: clamp(18px, 2.6vh, 30px);
        }

        .cx-star {
          position: absolute;
          top: 20px; right: 26px;
          width: 22px; height: 22px;
          background: #e8c100;
          clip-path: polygon(50% 0, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0 50%, 39% 39%);
        }

        /* ── Command rows ── */
        .cx-rows { display: flex; flex-direction: column; gap: 18px; }

        .cx-roww {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .cx-roww.mounted { opacity: 1; transform: translateY(0); }

        .cx-row {
          appearance: none;
          background: transparent;
          border: none;
          margin: 0; padding: 0;
          font: inherit;
          display: block;
          width: 100%;
          position: relative;
          cursor: pointer;
          text-align: left;
          color: #0b113d;
          transform: translateY(0);
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), background 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
        }
        .cx-row:focus-visible { outline: 2px dashed #c4001a; outline-offset: 4px; }
        .cx-row.active {
          background: #0b113d;
          color: #d3fdff;
          transform: translateX(12px) skewX(-6deg);
          box-shadow: 12px 10px 0 #c4001a;
        }
        .cx-row.active:focus-visible { outline-color: #e8c100; }

        .cx-row-inner {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 16px 10px 12px;
          transform: skewX(0deg);
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .cx-row.active .cx-row-inner { transform: skewX(6deg); }

        .cx-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 14px; letter-spacing: 2px; line-height: 1;
          border: 1.5px solid rgba(11,17,61,0.4);
          color: rgba(11,17,61,0.55);
          padding: 3px 8px 1px;
          flex-shrink: 0;
          transition: border-color 0.25s ease, background 0.25s ease, color 0.25s ease;
        }
        .cx-row.active .cx-num { border-color: #e8c100; background: #e8c100; color: #0b113d; }

        .cx-row-icon { display: flex; align-items: center; color: rgba(11,17,61,0.6); transition: color 0.25s ease; flex-shrink: 0; }
        .cx-row.active .cx-row-icon { color: #d3fdff; }

        .cx-row-text { flex: 1; display: flex; flex-direction: column; gap: 3px; min-width: 0; }
        .cx-row-label {
          font-family: 'Anton', sans-serif;
          font-style: italic;
          font-size: clamp(24px, 2.6vw, 36px);
          letter-spacing: 1px; line-height: 1;
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .cx-row.active .cx-row-label { transform: translateX(4px); }
        .cx-row-handle {
          font-family: 'Montserrat', sans-serif;
          font-size: 11.5px; font-weight: 500; letter-spacing: 1.2px;
          color: rgba(11,17,61,0.55);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          transition: color 0.25s ease;
        }
        .cx-row.active .cx-row-handle { color: rgba(211,253,255,0.65); }

        .cx-verb {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 16px; letter-spacing: 4px; line-height: 1;
          color: #c4001a;
          flex-shrink: 0;
          transition: color 0.25s ease;
        }
        .cx-row.active .cx-verb { color: #e8c100; }

        .cx-arrow {
          display: flex; align-items: center;
          color: rgba(11,17,61,0.3);
          flex-shrink: 0;
          transition: color 0.25s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .cx-row.active .cx-arrow { color: #d3fdff; transform: translateX(4px); }

        /* signature line under each command */
        .cx-row::after {
          content: "";
          position: absolute;
          left: 0; right: 0; bottom: -14px;
          height: 2px;
          background: rgba(11,17,61,0.18);
        }
        .cx-ink {
          position: absolute;
          left: 10px; right: 0; bottom: -13px;
          height: 3px;
          background: #c4001a;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .cx-row.active .cx-ink { transform: scaleX(1); }

        /* ── Signing area ── */
        .cx-sign {
          margin-top: 32px;
          padding: 18px 6px 6px;
          border-top: 2px solid rgba(11,17,61,0.25);
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 18px;
          background: repeating-linear-gradient(180deg, transparent 0 27px, rgba(11,17,61,0.08) 27px 29px);
        }
        .cx-sign-tag {
          display: block;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 13px; letter-spacing: 4px; line-height: 1;
          color: rgba(11,17,61,0.5);
          margin-bottom: 8px;
        }
        .cx-sign-name {
          display: inline-block;
          font-family: 'Montserrat', sans-serif;
          font-style: italic;
          font-weight: 600;
          font-size: clamp(18px, 1.7vw, 23px);
          color: #0b113d;
          border-bottom: 2px solid #c4001a;
          padding-bottom: 2px;
        }
        .cx-seal-slot {
          position: relative;
          width: 128px; height: 78px;
          border: 2px dashed rgba(196,0,26,0.45);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: border-color 0.25s ease;
        }
        .cx-seal-slot.filled { border-color: transparent; }
        .cx-seal-hint {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 12px; letter-spacing: 3px; line-height: 1.6;
          color: rgba(196,0,26,0.55);
          text-align: center;
        }
        .cx-stamp {
          position: absolute;
          inset: -7px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 3px;
          background: #c4001a;
          color: #d3fdff;
          transform: rotate(-7deg);
          clip-path: polygon(7px 0, calc(100% - 7px) 0, 100% 7px, 100% calc(100% - 7px), calc(100% - 7px) 100%, 7px 100%, 0 calc(100% - 7px), 0 7px);
          animation: cx-stamp-in 0.38s cubic-bezier(0.34,1.56,0.64,1) both;
          pointer-events: none;
        }
        .cx-stamp::before {
          content: "";
          position: absolute;
          inset: 4px;
          border: 1.5px solid rgba(211,253,255,0.7);
          pointer-events: none;
        }
        .cx-stamp-top { font-family: 'Bebas Neue', sans-serif; font-size: 12px; letter-spacing: 4px; line-height: 1; color: #e8c100; }
        .cx-stamp-main { font-family: 'Anton', sans-serif; font-style: italic; font-size: 26px; letter-spacing: 2px; line-height: 1; }
        @keyframes cx-stamp-in {
          0%   { opacity: 0; transform: rotate(-7deg) scale(1.8); }
          55%  { opacity: 1; transform: rotate(-7deg) scale(0.92); }
          100% { opacity: 1; transform: rotate(-7deg) scale(1); }
        }

        .cx-sheet-foot {
          display: flex; justify-content: space-between;
          margin-top: 14px;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px; font-weight: 600; letter-spacing: 2.5px;
          color: rgba(11,17,61,0.4);
        }

        /* ── Arcana status card ── */
        .cx-card-wrap {
          position: relative;
          width: min(290px, 22vw);
          flex-shrink: 0;
          pointer-events: none;
          opacity: 0;
          transform: translateX(56px);
          transition: opacity 0.4s ease 0.12s, transform 0.4s cubic-bezier(0.22,1,0.36,1) 0.12s;
        }
        .cx-root.mounted .cx-card-wrap { opacity: 1; transform: translateX(0); }

        .cx-card-frame {
          background: #e8c100;
          padding: 4px;
          clip-path: polygon(0 24px, 24px 0, calc(100% - 24px) 0, 100% 24px, 100% calc(100% - 24px), calc(100% - 24px) 100%, 24px 100%, 0 calc(100% - 24px));
        }
        .cx-card {
          position: relative;
          background: #0b113d;
          color: #d3fdff;
          padding: 22px 20px 0;
          overflow: hidden;
          clip-path: polygon(0 24px, 24px 0, calc(100% - 24px) 0, 100% 24px, 100% calc(100% - 24px), calc(100% - 24px) 100%, 24px 100%, 0 calc(100% - 24px));
          animation: cx-card-in 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        @keyframes cx-card-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .cx-card-head { display: flex; align-items: center; gap: 8px; }
        .cx-card-kicker { font-family: 'Bebas Neue', sans-serif; font-size: 13px; letter-spacing: 4px; line-height: 1; color: #e8c100; }
        .cx-card-rule { flex: 1; height: 1px; background: rgba(232,193,0,0.35); }

        .cx-arcana {
          font-family: 'Anton', sans-serif;
          font-style: italic;
          font-size: clamp(24px, 2vw, 30px);
          letter-spacing: 1px; line-height: 1;
          color: #d3fdff;
          margin: 12px 0 18px;
        }

        .cx-ghost {
          position: absolute;
          right: -10px; bottom: 54px;
          font-family: 'Anton', sans-serif;
          font-style: italic;
          font-size: clamp(120px, 10vw, 168px);
          line-height: 1;
          color: rgba(232,193,0,0.09);
          pointer-events: none;
          user-select: none;
        }

        .cx-card-id { display: flex; align-items: center; gap: 14px; }
        .cx-chip {
          width: 54px; height: 54px;
          flex-shrink: 0;
          background: #10185f;
          color: #d3fdff;
          clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
          display: flex; align-items: center; justify-content: center;
        }
        .cx-card-labelwrap { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
        .cx-card-label { font-family: 'Bebas Neue', sans-serif; font-size: 24px; letter-spacing: 4px; line-height: 1; }
        .cx-card-handle {
          font-family: 'Montserrat', sans-serif;
          font-size: 10.5px; letter-spacing: 1px;
          color: #8df6ff;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        .cx-card-list { list-style: none; margin: 20px 0 18px; display: flex; flex-direction: column; }
        .cx-card-list li {
          display: flex; align-items: center; gap: 9px;
          padding: 9px 2px;
          border-top: 1px solid rgba(141,246,255,0.14);
          color: #8df6ff;
        }
        .cx-det-label { font-family: 'Bebas Neue', sans-serif; font-size: 15px; letter-spacing: 3px; line-height: 1; }
        .cx-det-value {
          margin-left: auto;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 19px; letter-spacing: 1px; line-height: 1;
          color: #d3fdff;
          text-align: right;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          max-width: 60%;
        }

        .cx-card-cta {
          margin: 0 -20px;
          background: #c4001a;
          color: #d3fdff;
          text-align: center;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 15px; letter-spacing: 5px;
          padding: 11px 0 9px;
        }

        /* ── Footer hints (bottom-left) ── */
        .cx-footer {
          position: fixed;
          bottom: 20px; left: 26px;
          display: flex; flex-direction: column; align-items: flex-start; gap: 6px;
          font-family: 'Bebas Neue', sans-serif;
          z-index: 50;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.4s ease 0.5s;
        }
        .cx-footer.mounted { opacity: 1; }
        .cx-foot-row {
          display: flex; align-items: center; gap: 9px;
          font-size: 12px; letter-spacing: 3px;
          color: rgba(255,255,255,0.3);
        }
        .cx-key {
          border: 1px solid rgba(255,255,255,0.22);
          color: rgba(255,255,255,0.5);
          padding: 2px 7px;
          font-size: 10.5px; letter-spacing: 1px;
        }

        @media (max-width: 1024px) {
          .cx-root {
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            overflow-y: auto;
            pointer-events: all;
            padding: 5vh 5vw 14vh;
            gap: 30px;
          }
          .cx-sheet-wrap { width: min(92vw, 860px); }
          .cx-card-wrap { width: min(92vw, 520px); }
          .cx-ghost { font-size: 120px; }
        }
        @media (max-width: 560px) {
          .cx-verb, .cx-row-icon { display: none; }
          .cx-seal-slot { width: 108px; height: 68px; }
        }
      `}</style>

      <div className={`cx-root${mounted ? " mounted" : ""}`} role="navigation" aria-label="Contact channels">
        {/* ── The Contract sheet ── */}
        <div className={`cx-sheet-wrap${sealed !== null ? " stamped" : ""}`}>
          <div className="cx-sheet-under cx-under-red" aria-hidden="true" />
          <div className="cx-sheet-under cx-under-navy" aria-hidden="true" />
          <section className="cx-sheet">
            <div className="cx-star" aria-hidden="true" />
            <header className="cx-sheet-head">
              <Moon id="cx-cres-a" size={22} color="#e8c100" />
              <span className="cx-head-tag">VELVET ROOM</span>
              <span className="cx-head-line" aria-hidden="true" />
              <span className="cx-head-tag dim">CONTRACT NO. 0648</span>
            </header>

            <h1 className="cx-title">
              <span className="cx-title-the">THE</span>
              <span className="cx-title-main">CONTRACT</span>
            </h1>
            <p className="cx-quote">
              The time has come for a pact to be forged. Choose thy channel —
              and the bond shall be sealed.
            </p>

            <div className="cx-rows">
              {ITEMS.map((it, i) => (
                <div
                  key={it.id}
                  className={`cx-roww${mounted ? " mounted" : ""}`}
                  style={{ transitionDelay: mounted ? `${160 + i * 80}ms` : "0ms" }}
                >
                  <button
                    type="button"
                    className={`cx-row${active === i ? " active" : ""}`}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => (active === i ? seal(i) : setActive(i))}
                  >
                    <span className="cx-row-inner">
                      <span className="cx-num">0{i + 1}</span>
                      <span className="cx-row-icon"><it.icon size={24} /></span>
                      <span className="cx-row-text">
                        <span className="cx-row-label">{it.label}</span>
                        <span className="cx-row-handle">{it.handle}</span>
                      </span>
                      <span className="cx-verb">{it.verb}</span>
                      <span className="cx-arrow"><ChevronRight size={22} /></span>
                    </span>
                    <span className="cx-ink" aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>

            <div className="cx-sign">
              <div>
                <span className="cx-sign-tag">SIGNED,</span>
                <span className="cx-sign-name">Fabiansyah Putra</span>
              </div>
              <div className={`cx-seal-slot${sealed !== null ? " filled" : ""}`}>
                {sealed !== null ? (
                  <div className="cx-stamp" key={sealed}>
                    <span className="cx-stamp-top">CONTRACT</span>
                    <span className="cx-stamp-main">SEALED</span>
                  </div>
                ) : (
                  <span className="cx-seal-hint">PLACE<br />SEAL HERE</span>
                )}
              </div>
            </div>

            <footer className="cx-sheet-foot">
              <span>BOGOR — WEST JAVA</span>
              <span>WIB (UTC+7)</span>
            </footer>
          </section>
        </div>

        {/* ── Arcana status card ── */}
        <aside className="cx-card-wrap">
          <div className="cx-card-frame">
            <div className="cx-card" key={active}>
              <span className="cx-ghost" aria-hidden="true">{ROMAN[active]}</span>
              <header className="cx-card-head">
                <Moon id="cx-cres-b" size={16} color="#e8c100" />
                <span className="cx-card-kicker">ARCANA</span>
                <span className="cx-card-rule" aria-hidden="true" />
              </header>
              <h2 className="cx-arcana">{item.arcana}</h2>
              <div className="cx-card-id">
                <span className="cx-chip"><item.icon size={26} /></span>
                <span className="cx-card-labelwrap">
                  <span className="cx-card-label">{item.label}</span>
                  <span className="cx-card-handle">{item.handle}</span>
                </span>
              </div>
              <ul className="cx-card-list">
                {item.details.map((d) => (
                  <li key={d.label}>
                    <d.icon size={15} />
                    <span className="cx-det-label">{d.label}</span>
                    <span className="cx-det-value">{d.value}</span>
                  </li>
                ))}
              </ul>
              <div className="cx-card-cta">ENTER TO SEAL</div>
            </div>
          </div>
        </aside>
      </div>

      <div className={`cx-footer${mounted ? " mounted" : ""}`}>
        <div className="cx-foot-row"><span className="cx-key">↑↓</span><span>SELECT</span></div>
        <div className="cx-foot-row"><span className="cx-key">↵</span><span>SEAL &amp; OPEN</span></div>
        <div className="cx-foot-row"><span className="cx-key">ESC</span><span>BACK</span></div>
      </div>
    </div>
  );
}
