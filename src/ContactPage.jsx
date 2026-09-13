import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, MessageCircle, MapPin, User, Globe, Clock, Activity, Sparkles } from "lucide-react";
import bgVideo from "./assets/Contact.mp4";

const ITEMS = [
  {
    id: "email", label: "EMAIL", handle: "fabiansyahputra648@gmail.com",
    href: "mailto:fabiansyahputra648@gmail.com",
    icon: <Mail size={22} color="#8df6ff" />,
    color: "#8df6ff",
    details: [
      { label: "USER", value: "Fabiansyah Putra", icon: <User size={24} /> },
      { label: "TYPE", value: "Personal", icon: <Mail size={24} /> },
      { label: "STAT", value: "Active", icon: <Activity size={24} /> },
    ],
  },
  {
    id: "whatsapp", label: "WHATSAPP", handle: "+62 812-3456-7890",
    href: "https://wa.me/6281234567890",
    icon: <MessageCircle size={22} color="#25D366" />,
    color: "#25D366",
    details: [
      { label: "USER", value: "Fabiansyah Putra", icon: <User size={24} /> },
      { label: "LOC", value: "Bogor, Indonesia", icon: <MapPin size={24} /> },
      { label: "STAT", value: "Online", icon: <Sparkles size={24} /> },
    ],
  },
  {
    id: "location", label: "LOCATION", handle: "Bogor, Indonesia",
    href: "https://maps.google.com/?q=Bogor,Indonesia",
    icon: <MapPin size={22} color="#ff5a75" />,
    color: "#ff5a75",
    details: [
      { label: "CITY", value: "Bogor", icon: <MapPin size={24} /> },
      { label: "REGION", value: "West Java", icon: <Globe size={24} /> },
      { label: "TZ", value: "WIB (UTC+7)", icon: <Clock size={24} /> },
    ],
  },
];

const ROLES = [
  { text: "REACH", color: "#8df6ff" },
  { text: "CHAT", color: "#25D366" },
  { text: "FIND", color: "#ff5a75" },
];

export default function ContactPage() {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [activeInfoBar, setActiveInfoBar] = useState(0);
  const [focus, setFocus] = useState("left");
  const navigate = useNavigate();

  useEffect(() => {
    const v = document.querySelector('video');
    if (v) v.play().catch(() => {});
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (focus === "left") {
        if (e.key === "ArrowUp") setActive(i => Math.max(0, i - 1));
        if (e.key === "ArrowDown") setActive(i => Math.min(ITEMS.length - 1, i + 1));
        if (e.key === "ArrowRight") { setFocus("right"); setActiveInfoBar(0); }
        if (e.key === "Enter") window.open(ITEMS[active].href, "_blank");
      } else {
        const detailCount = ITEMS[active].details.length;
        if (e.key === "ArrowUp") setActiveInfoBar(i => Math.max(0, i - 1));
        if (e.key === "ArrowDown") setActiveInfoBar(i => Math.min(detailCount - 1, i + 1));
        if (e.key === "ArrowLeft") setFocus("left");
        if (e.key === "Enter") window.open(ITEMS[active].href, "_blank");
      }
      if ((e.key === "ArrowLeft" && focus === "left") || e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, navigate, focus, activeInfoBar]);

  return (
    <div id="menu-screen">
      <video src={bgVideo} preload="auto" autoPlay loop muted playsInline />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:ital,wght@0,400;0,700;1,700&display=swap');

        .ct-root {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 6px;
          padding-left: 0;
        }

        /* ── Each bar ── */
        .ct-bar {
          position: relative;
          width: 45vw;
          height: 64px;
          transition: height 0.3s cubic-bezier(0.22,1,0.36,1), transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
          background: #111;
          cursor: pointer;
          pointer-events: all;
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: 0 6px 24px rgba(0,0,0,0.65);
          z-index: 1;
        }
        .ct-bar-outer.active .ct-bar {
          transform: translateX(6px) scale(1.02);
          box-shadow: 10px 8px 0 #d63232;
        }

        .ct-bar-outer {
          position: relative;
          flex-shrink: 0;
          opacity: 0;
          transform: translateX(-48px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .ct-bar-outer.active .ct-bar     { height: 90px; }
        .ct-bar-outer.active .ct-bar-red { height: 90px; }
        .ct-bar-outer.mounted { opacity: 1; transform: translateX(0); }
        .ct-bar-outer:nth-child(1) { transition-delay: 0ms; }
        .ct-bar-outer:nth-child(2) { transition-delay: 80ms; }
        .ct-bar-outer:nth-child(3) { transition-delay: 160ms; }

        .ct-bar-red {
          position: absolute;
          top: 0; left: 0;
          width: 45vw;
          height: 64px;
          background: #c4001a;
          clip-path: polygon(50% 0, 100% 0, 100% 100%, calc(50% - 10px) 100%);
          transform: translateY(-7px);
          opacity: 0;
          transition: opacity 0.2s ease;
          z-index: 0;
          pointer-events: none;
        }
        .ct-bar-outer.active .ct-bar-red { opacity: 1; }

        .ct-bar-fill {
          position: absolute;
          inset: 0;
          width: 100%;
          background: var(--p3-blue-light);
          clip-path: polygon(100% 0, 100% 0, calc(100% - 32px) 100%, calc(100% - 32px) 100%);
          transition: clip-path 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .ct-bar-outer.active .ct-bar-fill {
          clip-path: polygon(22% 0, 100% 0, calc(100% - 14px) 100%, calc(22% + 138px) 100%);
        }

        .ct-bar-shade {
          position: absolute;
          top: 0; bottom: 0;
          left: 73%;
          width: 6%;
          background: linear-gradient(90deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 100%);
          z-index: 1;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .ct-bar-outer.active .ct-bar-shade { opacity: 1; }

        .ct-bar::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 6px;
          background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%);
          z-index: 10;
          pointer-events: none;
        }

        .ct-bar-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px 0 20px;
        }

        .ct-role {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          font-family: 'Anton', sans-serif;
          font-size: 50px;
          letter-spacing: -2px;
          color: #ffffff;
          transform: rotate(-30deg);
          user-select: none;
          line-height: 1;
          padding: 0 16px 0 8px;
        }

        .ct-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
        }
        .ct-main-top {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .ct-icon {
          width: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: rgba(255,255,255,0.4);
          transition: color 0.2s ease;
          user-select: none;
        }
        .ct-bar-outer.active .ct-icon { color: rgba(255,255,255,0.9); }

        .ct-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 32px;
          letter-spacing: 6px;
          line-height: 1;
          color: rgba(255,255,255,0.85);
          transition: color 0.2s ease, transform 0.2s ease;
          user-select: none;
        }
        .ct-bar-outer.active .ct-label {
          color: var(--p3-text-on-light);
          transform: scale(1.1);
        }

        .ct-handle {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 13px;
          letter-spacing: 1px;
          color: rgba(255,255,255,0.35);
          user-select: none;
          transition: color 0.2s ease;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 260px;
        }
        .ct-bar-outer.active .ct-handle { color: rgba(0,0,0,0.5); }

        /* nav arrows */
        @keyframes ct-arrow-left {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50%       { transform: translateX(-5px); opacity: 0.4; }
        }
        @keyframes ct-arrow-right {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50%       { transform: translateX(5px); opacity: 0.4; }
        }
        .ct-nav-btn {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 12px;
          letter-spacing: 2px;
          color: #111;
          border: 1px solid rgba(0,0,0,0.35);
          padding: 1px 7px;
          line-height: 1.5;
          user-select: none;
        }
        .ct-nav-arrow {
          font-size: 12px;
          color: #c4001a;
          display: inline-block;
        }
        .ct-nav-arrow.left  { animation: ct-arrow-left  0.8s ease-in-out infinite; }
        .ct-nav-arrow.right { animation: ct-arrow-right 0.8s ease-in-out infinite; }

        /* right-side nav bar */
        @keyframes ct-right-nav-pop {
          0%   { opacity: 0; transform: scale(0.55) translateY(-10px); }
          65%  { opacity: 1; transform: scale(1.1) translateY(2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .ct-right-nav {
          position: fixed;
          top: 40px;
          right: 40px;
          display: flex;
          align-items: center;
          gap: 6px;
          pointer-events: none;
          z-index: 50;
          animation: ct-right-nav-pop 0.38s cubic-bezier(0.22,1,0.36,1) both;
        }
        .ct-right-nav .ct-nav-btn {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 100px;
          letter-spacing: 3px;
          line-height: 1;
          user-select: none;
          color: var(--p3-text-on-dark);
          -webkit-text-stroke: 2px var(--p3-bg-dark);
          paint-order: stroke fill;
          background: none;
          border: none;
          padding: 0 6px;
        }
        .ct-right-nav .ct-nav-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 3px;
          line-height: 1;
          user-select: none;
          color: #111;
          padding: 0 8px;
        }
        .ct-right-nav .ct-nav-arrow {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          color: #c4001a;
          display: inline-block;
          user-select: none;
        }
        .ct-right-nav .ct-nav-arrow.left  { animation: ct-arrow-left  0.8s ease-in-out infinite; }
        .ct-right-nav .ct-nav-arrow.right { animation: ct-arrow-right 0.8s ease-in-out infinite; }

        /* info bar */
        @keyframes ct-infobar-in {
          0%   { opacity: 0; transform: translateX(40px); }
          60%  { opacity: 1; transform: translateX(-4px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .ct-info-bar-wrap {
          position: fixed;
          right: 0;
          left: 55%;
          height: 60px;
          background: transparent;
          pointer-events: all;
          cursor: pointer;
          z-index: 50;
          padding: 0;
          animation: ct-infobar-in 0.35s cubic-bezier(0.22,1,0.36,1) both;
        }
        .ct-info-bar-wrap.selected {
          background: #111;
          padding: 1.5px;
          border-radius: 8px;
        }
        .ct-info-bar {
          position: relative;
          width: 100%;
          height: 100%;
          background: transparent;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .ct-info-bar-wrap.selected .ct-info-bar {
          background: var(--p3-blue-light);
          border-radius: 7px;
        }
        .ct-info-bar-wrap.selected .ct-info-bar::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: #c4001a;
          z-index: 1;
        }
        .ct-info-bar-text {
          flex: 1;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 32px;
          letter-spacing: 2px;
          color: #8df6ff;
          padding: 0 14px;
          user-select: none;
          transition: color 0.15s ease;
        }
        .ct-info-bar-wrap.selected .ct-info-bar-text {
          color: #000;
        }
        .ct-info-bar-count {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 34px;
          letter-spacing: 1px;
          color: #8df6ff;
          margin-right: 40px;
          flex-shrink: 0;
          user-select: none;
          white-space: nowrap;
          transition: color 0.15s ease;
        }
        .ct-info-bar-wrap.selected .ct-info-bar-count {
          color: #000;
        }
        .ct-info-icon {
          display: flex;
          align-items: center;
          margin-left: 14px;
          margin-right: 8px;
          color: #111;
        }

        /* footer hints */
        .ct-footer {
          position: fixed;
          bottom: 20px; right: 28px;
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 5px;
          font-family: 'Bebas Neue', sans-serif;
          z-index: 50;
          opacity: 0;
          transition: opacity 0.4s ease 0.6s;
        }
        .ct-footer.mounted { opacity: 1; }
        .ct-footer-row {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; letter-spacing: 2px;
          color: rgba(255,255,255,0.22);
        }
        .ct-footer-key {
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 3px;
          padding: 1px 6px; font-size: 11px;
        }
      `}</style>

      <div className="ct-root" role="navigation">
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`ct-bar-outer${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
            onClick={() => {
              if (active === i) window.open(item.href, "_blank");
              else setActive(i);
            }}
            onMouseEnter={() => setActive(i)}
          >
            <div className="ct-bar-red" />
            <div className="ct-bar">
              <div className="ct-bar-fill" style={active === i ? { background: item.color } : {}} />
              <div className="ct-bar-shade" />
              <div className="ct-bar-content">
                <div className="ct-role">{ROLES[i].text}</div>
                <div className="ct-main">
                  <div className="ct-main-top" style={{ paddingRight: '120px' }}>
                    <div className="ct-icon">{item.icon}</div>
                    <div className="ct-label">{item.label}</div>
                  </div>
                  <div className="ct-handle">{item.handle}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {mounted && (
        <div className="ct-right-nav" key={active}>
          <span className="ct-nav-arrow left">◄</span>
          <span className="ct-nav-btn">LB</span>
          <span className="ct-nav-label">{ITEMS[active].label}</span>
          <span className="ct-nav-btn">RB</span>
          <span className="ct-nav-arrow right">►</span>
        </div>
      )}

      {mounted && ITEMS[active].details.map((detail, i) => (
        <div
          className={`ct-info-bar-wrap${activeInfoBar === i ? " selected" : ""}`}
          key={`bar-${active}-${i}`}
          style={{ top: `${155 + i * 68}px`, animationDelay: `${i * 50}ms` }}
          onClick={() => setActiveInfoBar(i)}
          onMouseEnter={() => setActiveInfoBar(i)}
        >
          <div className="ct-info-bar">
            <span className="ct-info-icon" aria-hidden="true">{detail.icon}</span>
            <span className="ct-info-bar-text" style={{ flex: '0 0 80px' }}>{detail.label}</span>
            <span className="ct-info-bar-count" style={{
              flex: 1,
              textAlign: 'right',
              marginRight: '20px',
              fontSize: detail.value.length > 18 ? '26px' : '34px'
            }}>
              {detail.value}
            </span>
          </div>
        </div>
      ))}

      <div className={`ct-footer${mounted ? " mounted" : ""}`}>
        <div className="ct-footer-row"><span className="ct-footer-key">↑↓</span><span>SELECT</span></div>
        <div className="ct-footer-row"><span className="ct-footer-key">↵</span><span>OPEN</span></div>
        <div className="ct-footer-row"><span className="ct-footer-key">ESC</span><span>BACK</span></div>
      </div>
    </div>
  );
}
