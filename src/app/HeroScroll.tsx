import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { Calendar, CreditCard, MessageSquare, ClipboardList, DollarSign } from "lucide-react";
import { SHOW_FREE_MESSAGING } from "./flags";

const FLOATING_ICONS = [
  { Icon: Calendar,      label: "Attendance",      className: "hs-float-1" },
  { Icon: CreditCard,    label: "Billing",         className: "hs-float-2" },
  { Icon: MessageSquare, label: "Parent Comms",    className: "hs-float-3" },
  { Icon: ClipboardList, label: "Homework",        className: "hs-float-4" },
  { Icon: DollarSign,    label: "Payroll",         className: "hs-float-5" },
];

export default function HeroScroll() {
  const heroAreaRef   = useRef<HTMLDivElement>(null);
  const phoneWrapRef  = useRef<HTMLDivElement>(null);
  const heroLeftRef   = useRef<HTMLDivElement>(null);
  const mascotRef     = useRef<HTMLImageElement>(null);
  const phoneImgRef   = useRef<HTMLImageElement>(null);
  const brandBgRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heroArea    = heroAreaRef.current;
    const phoneWrapper = phoneWrapRef.current;
    const heroLeft    = heroLeftRef.current;
    const mascot      = mascotRef.current;
    const phoneImg    = phoneImgRef.current;
    const brandBg     = brandBgRef.current;
    if (!heroArea || !phoneWrapper || !heroLeft || !mascot || !phoneImg || !brandBg) return;

    const SCREEN_1 = "/assets/hero mockup/first-screen.webp";
    const SCREEN_2 = "/assets/hero mockup/second-screen.webp";

    const isMobile = () => window.innerWidth <= 768;

    const D = {
      phoneStartX: 0,
      phoneEndX: 140,
      phoneEndRot: 5,
      phoneEndY: -15,
      brandStartX: 0,
      brandEndX: -320,
      revealAt: 0.8,
    };

    const M = {
      phoneStartY: 0,
      phoneEndY: -30,
      phoneEndRot: 5,
      brandStartX: 0,
      brandEndX: 0,
      revealAt: 0.7,
    };

    let cur = { x: 0, rot: 0, y: 0, bx: 0, bo: 0.07 };
    let tgt = { x: 0, rot: 0, y: 0, bx: 0, bo: 0.07 };
    let rafId: number | null = null;
    let lastProgress = -1;
    let screenSwapped = false;
    let lastScrollY = -1;
    let inited = false;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const easeInCubic  = (t: number) => t * t * t;

    function initState() {
      if (isMobile()) {
        cur = { x: 0, rot: 0, y: M.phoneStartY, bx: 0, bo: 0.07 };
        tgt = { ...cur };
        phoneWrapper!.style.transform = `translateX(0px) translateY(${M.phoneStartY}px) rotate(0deg)`;
      } else {
        D.phoneStartX = 0;
        cur = { x: 0, rot: 0, y: 0, bx: 0, bo: 0.07 };
        tgt = { ...cur };
        phoneWrapper!.style.transform = `translateX(0px) translateY(0px) rotate(0deg)`;
      }
      brandBg!.style.opacity = "0.07";
      lastProgress = -1;
    }

    function onScroll() {
      const rect     = heroArea!.getBoundingClientRect();
      const total    = heroArea!.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / total));

      if (Math.abs(progress - lastProgress) < 0.0005) return;
      lastProgress = progress;

      const eased = easeOutCubic(progress);
      const brandProgress = Math.min(1, progress / 0.6);
      const brandEased    = easeInCubic(brandProgress);
      const revealAt = isMobile() ? M.revealAt : D.revealAt;

      if (isMobile()) {
        tgt.x   = 0;
        tgt.y   = lerp(M.phoneStartY, M.phoneEndY, eased);
        tgt.rot = lerp(0, M.phoneEndRot, eased);
        tgt.bx  = 0;
        tgt.bo  = lerp(0.07, 0, brandEased);
      } else {
        tgt.x = lerp(D.phoneStartX, D.phoneEndX, eased);
        tgt.y = lerp(0, D.phoneEndY, eased);
        if (progress < D.revealAt) {
          const p1 = progress / D.revealAt;
          tgt.rot = lerp(0, D.phoneEndRot, easeOutCubic(p1));
        } else {
          const p2 = (progress - D.revealAt) / (1 - D.revealAt);
          tgt.rot = lerp(D.phoneEndRot, -5, easeOutCubic(p2));
        }
        tgt.bx = lerp(D.brandStartX, D.brandEndX, brandEased);
        tgt.bo = lerp(0.07, 0, brandEased);
      }

      if (progress > revealAt) {
        mascot!.classList.add("hs-visible");
      } else {
        mascot!.classList.remove("hs-visible");
      }

      if (progress > revealAt && !screenSwapped) {
        screenSwapped = true;
        phoneImg!.style.opacity = "0";
        setTimeout(() => { phoneImg!.src = SCREEN_2; phoneImg!.style.opacity = "1"; }, 500);
      } else if (progress <= revealAt - 0.15 && screenSwapped) {
        screenSwapped = false;
        phoneImg!.style.opacity = "0";
        setTimeout(() => { phoneImg!.src = SCREEN_1; phoneImg!.style.opacity = "1"; }, 500);
      }

      if (!rafId) rafId = requestAnimationFrame(animate);
    }

    function animate() {
      rafId = null;
      const s = 0.11;
      cur.x   = lerp(cur.x,  tgt.x,  s);
      cur.rot = lerp(cur.rot, tgt.rot, s);
      cur.y   = lerp(cur.y,  tgt.y,  s);
      cur.bx  = lerp(cur.bx, tgt.bx, s);
      cur.bo  = lerp(cur.bo, tgt.bo, s);

      phoneWrapper!.style.transform =
        `translateX(${cur.x}px) translateY(${cur.y}px) rotate(${cur.rot}deg)`;
      brandBg!.style.transform = `translate(calc(-50% + ${cur.bx}px), -50%)`;
      brandBg!.style.opacity   = String(cur.bo);

      const settled =
        Math.abs(cur.x   - tgt.x)  < 0.05 &&
        Math.abs(cur.rot - tgt.rot) < 0.01 &&
        Math.abs(cur.y   - tgt.y)  < 0.05 &&
        Math.abs(cur.bx  - tgt.bx) < 0.05 &&
        Math.abs(cur.bo  - tgt.bo) < 0.001;

      if (!settled) rafId = requestAnimationFrame(animate);
    }

    let tickRaf: number;
    function tick() {
      if (!inited) {
        initState();
        onScroll();
        inited = true;
      }
      if (window.scrollY !== lastScrollY) {
        lastScrollY = window.scrollY;
        lastProgress = -1;
        onScroll();
      }
      tickRaf = requestAnimationFrame(tick);
    }

    function onResize() { initState(); lastProgress = -1; onScroll(); }

    window.addEventListener("resize", onResize);
    tickRaf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(tickRaf);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <style>{`
        .hs-scroll-area {
          height: 110vh;
          position: relative;
          background: #ffffff;
        }
        .hs-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding-top: 160px;
        }
        .hs-brand-bg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: clamp(120px, 18vw, 220px);
          font-weight: 200;
          letter-spacing: -3px;
          white-space: nowrap;
          color: #09244B;
          opacity: 0.07;
          pointer-events: none;
          user-select: none;
          will-change: transform, opacity;
          font-family: 'Inter', sans-serif;
        }
        .hs-brand-bg span { color: #0FB8F1; }
        .hs-inner {
          width: 100%;
          max-width: 1200px;
          padding: 0 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
        }
        .hs-left {
          flex: 0 0 50%;
          width: auto;
          overflow: visible;
          display: flex;
          flex-direction: column;
          gap: 16px;
          opacity: 1;
          transform: translateX(0);
          pointer-events: auto;
          white-space: normal;
          font-family: 'Inter', sans-serif;
        }
        .hs-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(9,36,75,0.07);
          border: 1px solid rgba(9,36,75,0.12);
          padding: 6px 14px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 600;
          color: #09244B;
          width: fit-content;
        }
        .hs-badge-dot { width: 7px; height: 7px; background: #0FB8F1; border-radius: 50%; }
        .hs-headline {
          font-size: clamp(34px, 3.6vw, 54px);
          font-weight: 900;
          line-height: 1.1;
          color: #09244B;
          letter-spacing: -1.5px;
        }
        .hs-headline span { color: #0FB8F1; }
        .hs-desc {
          font-size: 16px;
          line-height: 1.7;
          color: #09244B;
          opacity: 0.65;
          max-width: 420px;
        }
        .hs-ctas { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
        .hs-btn-primary {
          background: #09244B; color: #fff; border: none;
          padding: 14px 28px; border-radius: 10px;
          font-size: 15px; font-weight: 700; cursor: pointer;
          display: flex; align-items: center; gap: 8px;
          transition: background 0.2s, transform 0.15s;
          text-decoration: none;
          font-family: 'Inter', sans-serif;
        }
        .hs-btn-primary:hover { background: #0FB8F1; transform: translateY(-1px); }
        .hs-btn-ghost {
          background: transparent; color: #09244B;
          border: 2px solid rgba(9,36,75,0.2);
          padding: 13px 24px; border-radius: 10px;
          font-size: 15px; font-weight: 600; cursor: pointer;
          transition: border-color 0.2s;
          text-decoration: none;
          font-family: 'Inter', sans-serif;
        }
        .hs-btn-ghost:hover { border-color: #09244B; }
        .hs-trust {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; color: #09244B; opacity: 0.5;
        }
        .hs-trust-dot { width: 4px; height: 4px; background: currentColor; border-radius: 50%; }
        .hs-right {
          flex: 0 0 50%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .hs-phone-wrapper { position: relative; will-change: transform; }
        .hs-phone-img {
          width: 280px;
          height: auto;
          display: block;
          filter: drop-shadow(0 32px 64px rgba(9,36,75,0.22));
          transition: opacity 0.5s ease;
        }
        .hs-mascot {
          position: absolute;
          bottom: -10px;
          left: -80px;
          width: 190px;
          opacity: 0;
          transform: translateY(16px) scale(0.85);
          transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.4,0.64,1);
          z-index: 10;
          filter: drop-shadow(0 10px 24px rgba(0,0,0,0.16));
          pointer-events: none;
        }
        .hs-mascot.hs-visible { opacity: 1; transform: translateY(0) scale(1); }
        .hs-blob {
          position: absolute; border-radius: 50%;
          filter: blur(80px); opacity: 0.18;
          pointer-events: none; z-index: 0;
        }
        .hs-blob-1 { width: 400px; height: 400px; background: radial-gradient(circle, #a8d8f0, transparent); top: -80px; right: -80px; }
        .hs-blob-2 { width: 300px; height: 300px; background: radial-gradient(circle, #A9E6FA, transparent); bottom: -60px; left: 60px; }

        .hs-float-icon {
          position: absolute;
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          border: 1px solid rgba(9,36,75,0.08);
          box-shadow: 0 14px 30px rgba(9,36,75,0.16), 0 2px 6px rgba(9,36,75,0.06);
          z-index: 0;
          pointer-events: none;
          animation: hs-float 5s ease-in-out infinite;
        }
        .hs-float-icon svg { width: 24px; height: 24px; color: #09244B; }
        .hs-float-icon.hs-float-accent { background: #0FB8F1; border-color: #0FB8F1; }
        .hs-float-icon.hs-float-accent svg { color: #ffffff; }
        .hs-float-1 { top: 2%;   left: -30px;  animation-duration: 5.4s; animation-delay: 0s; }
        .hs-float-2 { top: 20%;  right: -32px; animation-duration: 4.6s; animation-delay: 0.6s; }
        .hs-float-3 { top: 47%;  left: -40px;  animation-duration: 5.8s; animation-delay: 1.1s; }
        .hs-float-4 { bottom: 16%; right: -26px; animation-duration: 5s;   animation-delay: 0.3s; }
        .hs-float-5 { bottom: 0%;  left: -18px;  animation-duration: 4.8s; animation-delay: 0.9s; }

        @keyframes hs-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50%      { transform: translateY(-12px) rotate(4deg); }
        }

        @media (max-width: 1100px) {
          /* Remove scroll-driven animation on tablet & mobile — show content statically */
          .hs-scroll-area { height: auto; }
          .hs-sticky {
            position: relative;
            height: auto;
            padding: 100px 40px 72px;
            align-items: center;
          }
          /* Force left panel visible — JS reveal never fires without scroll travel */
          .hs-left {
            flex: 0 0 50% !important;
            width: auto !important;
            overflow: visible !important;
            opacity: 1 !important;
            transform: none !important;
            pointer-events: auto !important;
            white-space: normal !important;
          }
          .hs-mascot { opacity: 1 !important; transform: none !important; }
          .hs-phone-wrapper { transform: none !important; }
        }
        @media (max-width: 768px) {
          .hs-sticky { padding: 130px 24px 56px; align-items: flex-start; }
          .hs-inner {
            flex-direction: column;
            padding: 0;
            gap: 32px;
            align-items: center;
            justify-content: flex-start;
          }
          .hs-right { order: 1; flex: none; width: 100%; justify-content: center; }
          .hs-left  { order: 2; flex: none !important; width: 100% !important; text-align: center; align-items: center; }
          .hs-phone-img { width: 200px; }
          .hs-headline { font-size: 28px; letter-spacing: -1px; }
          .hs-desc { font-size: 14px; max-width: 100%; }
          .hs-btn-primary { font-size: 14px; padding: 12px 22px; }
          .hs-btn-ghost   { font-size: 14px; padding: 11px 18px; }
          .hs-ctas { justify-content: center; }
          .hs-trust { flex-wrap: wrap; justify-content: center; font-size: 11px; }
          .hs-brand-bg { font-size: clamp(48px, 14vw, 80px); letter-spacing: -2px; }
          .hs-mascot { bottom: -10px; left: -30px; width: 110px; }
          .hs-float-icon { width: 40px; height: 40px; border-radius: 12px; }
          .hs-float-icon svg { width: 18px; height: 18px; }
          .hs-float-3, .hs-float-5 { display: none; }
          .hs-float-1 { top: 0%; left: -12px; }
          .hs-float-2 { top: 16%; right: -14px; }
          .hs-float-4 { bottom: 10%; right: -10px; }
        }
      `}</style>

      <div className="hs-scroll-area" ref={heroAreaRef}>
        <div className="hs-sticky">
          <div className="hs-blob hs-blob-1" />
          <div className="hs-blob hs-blob-2" />

          <div className="hs-brand-bg" ref={brandBgRef}>
            Ed<span>Buddies</span>.ai
          </div>

          <div className="hs-inner">
            <div className="hs-left" ref={heroLeftRef}>
              {SHOW_FREE_MESSAGING && (
                <div className="hs-badge">
                  <span className="hs-badge-dot" />
                  100% Free — No Hidden Charges
                </div>
              )}
              <h1 className="hs-headline">
                Simplify Tuition<br />
                Centre Management<br />
                <span>With us!</span>
              </h1>
              <p className="hs-desc">
                The all-in-one management platform built for tuition centres
                and freelance tutors in Malaysia & Singapore. Attendance, billing,
                invoices, parent communication — all in one app.
              </p>
              <div className="hs-ctas">
                <a href="https://tally.so/r/3y1vE0" target="_blank" rel="noopener noreferrer" className="hs-btn-primary">
                  Enquire Now
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <Link to="/features" className="hs-btn-ghost">See How It Works</Link>
              </div>
              <div className="hs-trust">
                <span>Available on iOS & Android</span>
                <span className="hs-trust-dot" />
                <span>Malaysia & Singapore</span>
              </div>
            </div>

            <div className="hs-right">
              <div className="hs-phone-wrapper" ref={phoneWrapRef}>
                {FLOATING_ICONS.map(({ Icon, label, className }, i) => (
                  <div
                    key={label}
                    className={`hs-float-icon ${className}${i % 2 === 1 ? " hs-float-accent" : ""}`}
                    aria-hidden="true"
                  >
                    <Icon strokeWidth={2} />
                  </div>
                ))}
                <img
                  ref={phoneImgRef}
                  className="hs-phone-img"
                  src="/assets/hero mockup/first-screen.webp"
                  alt="EdBuddies App"
                />
                <img
                  ref={mascotRef}
                  className="hs-mascot"
                  src="/assets/hero mockup/mascot.webp"
                  alt="EdBuddies Mascot"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
