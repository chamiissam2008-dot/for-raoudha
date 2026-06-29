"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { IMG, C } from "@/lib/constants";

interface Props { onNext: () => void }

// ── SVG ink draw signature ────────────────────────────────────────────────────
function Signature() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const paths = svg.querySelectorAll<SVGPathElement>("path.sk");
    paths.forEach(p => {
      const l = p.getTotalLength();
      p.style.strokeDasharray  = `${l}`;
      p.style.strokeDashoffset = `${l}`;
    });
    const tl = gsap.timeline({ delay: 1 });
    tl.to("path.sk", { strokeDashoffset: 0, duration: .65, stagger: .1, ease: "power2.inOut" })
      .fromTo(".sk-dot", { scale: 0, opacity: 0, transformOrigin: "center" },
               { scale: 1, opacity: 1, duration: .4, stagger: .12, ease: "back.out(2.5)" });
    return () => tl.kill();
  }, []);

  return (
    <svg ref={ref} viewBox="0 0 340 100" fill="none"
      style={{ width: "min(320px,80vw)", height: "auto", overflow: "visible" }}
      aria-label="ISSAM signature">
      {/* I */}
      <path className="sk" d="M20 22L20 76"   stroke={C.r5} strokeWidth="2.5" strokeLinecap="round" />
      <path className="sk" d="M14 22L26 22"   stroke={C.r5} strokeWidth="2"   strokeLinecap="round" />
      <path className="sk" d="M14 76L26 76"   stroke={C.r5} strokeWidth="2"   strokeLinecap="round" />
      {/* S */}
      <path className="sk" d="M56 30C48 22,36 24,36 34C36 44,54 46,54 56C54 66,40 68,32 60"
        stroke={C.r5} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* S */}
      <path className="sk" d="M96 30C88 22,76 24,76 34C76 44,94 46,94 56C94 66,80 68,72 60"
        stroke={C.r5} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* A */}
      <path className="sk" d="M116 76L133 24L150 76" stroke={C.r5} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path className="sk" d="M122 56L144 56"         stroke={C.r5} strokeWidth="2"   strokeLinecap="round" />
      {/* M */}
      <path className="sk" d="M166 76L166 24L185 58L204 24L204 76"
        stroke={C.r5} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Flourish underline */}
      <path className="sk" d="M16 90C75 102,155 102,206 90"
        stroke={C.r3} strokeWidth="1.2" strokeLinecap="round" fill="none" />
      {/* Decorative dots */}
      <circle className="sk-dot" cx="220" cy="90" r="4"   fill={C.r5}  style={{ opacity: 0 }} />
      <circle className="sk-dot" cx="230" cy="87" r="2.5" fill={C.gold} style={{ opacity: 0 }} />
      <circle className="sk-dot" cx="237" cy="91" r="1.8" fill={C.r3}  style={{ opacity: 0 }} />
    </svg>
  );
}

// ── Bloom overlay on memory kept ─────────────────────────────────────────────
function BloomOverlay() {
  return (
    <motion.div
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center"
      style={{ background: C.cr }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: .8 }}
    >
      <motion.div
        className="flex flex-col items-center gap-6 text-center px-8"
        initial={{ opacity: 0, scale: .88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: .4, duration: 1.1, ease: [.22, 1, .36, 1] }}
      >
        <motion.span
          style={{ fontSize: "3.5rem" }}
          animate={{ scale: [1, 1.28, 1], rotate: [-8, 8, -8, 0] }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          🌹
        </motion.span>
        <p className="td italic" style={{ fontSize: "clamp(2rem,4vw,3rem)", color: C.r5 }}>
          Always remembered.
        </p>
        <div className="dh" style={{ width: 120 }} />
        <p className="tl" style={{ color: C.r4, letterSpacing: ".25em" }}>
          Happy 19th Birthday, Raoudha ✦
        </p>
        <p className="ts" style={{ color: C.r3, fontSize: "1rem", marginTop: ".2rem" }}>
          — With love, ISSAM —
        </p>
      </motion.div>
    </motion.div>
  );
}

// ── Memory button with ripple ─────────────────────────────────────────────────
function MemBtn({ onClick }: { onClick: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [rips, setRips] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r  = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRips(p => [...p, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
    setTimeout(() => setRips(p => p.filter(x => x.id !== id)), 700);
    gsap.to(ref.current, {
      scale: .93, duration: .12,
      onComplete: () => gsap.to(ref.current, { scale: 1, duration: .5, ease: "elastic.out(1,.4)" }),
    });
    onClick();
  };

  useEffect(() => {
    const b = ref.current;
    if (!b) return;
    const mm = (e: MouseEvent) => {
      const r = b.getBoundingClientRect();
      gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * .22, y: (e.clientY - r.top - r.height / 2) * .22, duration: .35, ease: "power2.out" });
    };
    const ml = () => gsap.to(b, { x: 0, y: 0, duration: .6, ease: "elastic.out(1,.4)" });
    b.addEventListener("mousemove", mm);
    b.addEventListener("mouseleave", ml);
    return () => { b.removeEventListener("mousemove", mm); b.removeEventListener("mouseleave", ml); };
  }, []);

  return (
    <button ref={ref} onClick={handleClick}
      className="btn btn-p relative overflow-hidden"
      style={{ paddingLeft: "2.8rem", paddingRight: "2.8rem", minWidth: 220 }}>
      <span className="relative z-10 flex items-center gap-2">
        <span>Keep this memory</span>
        <motion.span
          animate={{ rotate: [0, 14, -14, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
          🌹
        </motion.span>
      </span>
      {rips.map(rp => (
        <span key={rp.id} style={{
          position: "absolute", borderRadius: "50%",
          width: 80, height: 80, left: rp.x - 40, top: rp.y - 40,
          background: "rgba(255,255,255,.3)",
          animation: "ripple .65s ease-out forwards", pointerEvents: "none",
        }} />
      ))}
      <style>{`@keyframes ripple{from{transform:scale(0);opacity:1}to{transform:scale(5);opacity:0}}`}</style>
    </button>
  );
}

// ── Star dust ─────────────────────────────────────────────────────────────────
const STARS = Array.from({ length: 30 }, () => ({
  x: `${Math.random() * 100}%`,
  y: `${Math.random() * 100}%`,
  s: 1 + Math.random() * 2.5,
  dur: `${4 + Math.random() * 5}s`,
  del: `${Math.random() * 6}s`,
  col: [C.r3, C.r4, C.gold, "#FFF8F8", C.r2][Math.floor(Math.random() * 5)],
}));

// ── Page ─────────────────────────────────────────────────────────────────────
export default function P15End({ onNext }: Props) {
  const root  = useRef<HTMLDivElement>(null);
  const [kept, setKept] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: .3, defaults: { ease: "power3.out" } });
      tl.fromTo(".e15-bg",  { scale: 1.08, opacity: 0 }, { scale: 1, opacity: 1, duration: 2, ease: "power4.inOut" })
        .fromTo(".e15-ln",  { opacity: 0, y: 22, filter: "blur(6px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: .9, stagger: .22 }, "-=1")
        .fromTo(".e15-dv",  { scaleX: 0 }, { scaleX: 1, duration: .8, ease: "power2.inOut" }, "-=.3")
        .fromTo(".e15-sig", { opacity: 0 }, { opacity: 1, duration: .5 }, "-=.1")
        .fromTo(".e15-btn", { opacity: 0, y: 16, scale: .9 }, { opacity: 1, y: 0, scale: 1, duration: .9, ease: "back.out(1.5)" }, "-=.2");
    }, root);
    return () => ctx.revert();
  }, []);

  const LINES = [
    { t: "No matter what happens,",    sz: "clamp(1rem,2vw,1.7rem)",   col: C.r6,  italic: false },
    { t: "I'll always be grateful",    sz: "clamp(1.1rem,2.2vw,1.85rem)", col: C.ink, italic: false },
    { t: "for you.",                   sz: "clamp(1.1rem,2.2vw,1.85rem)", col: C.ink, italic: false },
    { t: "This is not the end.",       sz: "clamp(.9rem,1.7vw,1.4rem)",  col: C.r4,  italic: false },
    { t: "It is your beginning.",      sz: "clamp(1.3rem,2.8vw,2.3rem)", col: C.r5,  italic: true  },
  ];

  return (
    <div ref={root} className="page grain" style={{ background: `radial-gradient(ellipse at 50% 55%, ${C.r1} 0%, ${C.r50} 45%, ${C.cr} 100%)` }}>

      {/* Soft background image */}
      <div className="e15-bg absolute inset-0 opacity-0">
        <Image src={IMG.rPink2} alt="" fill className="object-cover object-center" sizes="100vw" quality={80} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(255,248,248,.75) 0%,rgba(255,240,245,.6) 50%,rgba(255,248,248,.88) 100%)" }} />
      </div>

      {/* CSS star dust */}
      {STARS.map((s, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none"
          style={{
            left: s.x, top: s.y, width: s.s, height: s.s,
            background: `radial-gradient(circle, ${s.col}, transparent)`,
            animation: `breathe ${s.dur} ease-in-out ${s.del} infinite`,
          }} />
      ))}

      {/* Bloom overlay */}
      <AnimatePresence>
        {kept && <BloomOverlay />}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-8 justify-center h-full gap-4">
        {LINES.map((l, i) => (
          <p key={i} className={`e15-ln opacity-0 td${l.italic ? " italic" : ""}`}
            style={{
              fontSize: l.sz, color: l.col, lineHeight: 1.2,
              marginTop: i === 3 ? ".6rem" : undefined,
            }}>
            {l.t}
          </p>
        ))}

        <div className="e15-dv dh w-20 opacity-0 my-2" style={{ transformOrigin: "center", scaleX: 0 }} />

        <div className="e15-sig flex flex-col items-center gap-3 opacity-0">
          <p className="tl" style={{ color: C.r4 }}>From</p>
          <Signature />
        </div>

        <div className="e15-btn opacity-0 mt-2">
          {!kept ? (
            <MemBtn onClick={() => setKept(true)} />
          ) : (
            <motion.p className="td italic" style={{ fontSize: "1.1rem", color: C.r5 }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .8 }}>
              ✦ Memory kept forever ✦
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
}
