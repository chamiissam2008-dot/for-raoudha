"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { LETTER, IMG, C } from "@/lib/constants";

interface Props { onNext: () => void }

// ── Each paragraph reveals when scrolled into view ───────────────────────────
function Para({ text, index }: { text: string; index: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.1, rootMargin: "-20px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isGreeting = index === 0;
  const isHappy    = index === 2;
  const isClosing  = index >= LETTER.length - 2;
  const delayMs    = Math.min(index * 30, 300);

  return (
    <p
      ref={ref}
      style={{
        fontFamily: "var(--font-cor), Georgia, serif",
        fontSize: isHappy ? "clamp(1.2rem,1.8vw,1.5rem)" : "clamp(.98rem,1.2vw,1.15rem)",
        fontWeight: 300,
        fontStyle: isHappy || isGreeting ? "italic" : "normal",
        lineHeight: 2.0,
        letterSpacing: ".024em",
        color: isHappy ? C.r5 : isGreeting ? C.r6 : "#1A0A0F",
        textAlign: isGreeting || isClosing ? "center" : "left",
        marginTop: isHappy || isGreeting ? ".6rem" : undefined,
        marginBottom: isHappy ? ".6rem" : undefined,
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(22px)",
        filter: vis ? "blur(0px)" : "blur(4px)",
        transition: `opacity .9s ease ${delayMs}ms, transform .9s cubic-bezier(.22,1,.36,1) ${delayMs}ms, filter .9s ease ${delayMs}ms`,
      }}
    >
      {text}
    </p>
  );
}

// ── Petals (CSS only) ────────────────────────────────────────────────────────
const PETALS = [
  { l: "5%",  d: "13s", dl: "-2s",  sz: 14, col: "#F08098" },
  { l: "15%", d: "10s", dl: "-7s",  sz: 10, col: "#FFBCD5" },
  { l: "28%", d: "15s", dl: "-4s",  sz: 12, col: "#D4638E" },
  { l: "72%", d: "12s", dl: "-9s",  sz: 11, col: "#F08098" },
  { l: "85%", d: "11s", dl: "-1s",  sz: 13, col: "#FFBCD5" },
  { l: "93%", d: "14s", dl: "-6s",  sz: 10, col: "#D4638E" },
];

export default function P11Letter({ onNext }: Props) {
  const root    = useRef<HTMLDivElement>(null);
  const scrollEl= useRef<HTMLDivElement>(null);
  const [prog, setProg] = useState(0);

  // Reading progress
  useEffect(() => {
    const el = scrollEl.current;
    if (!el) return;
    const fn = () => {
      const t = el.scrollHeight - el.clientHeight;
      if (t > 0) setProg(el.scrollTop / t);
    };
    el.addEventListener("scroll", fn, { passive: true });
    return () => el.removeEventListener("scroll", fn);
  }, []);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: .2, defaults: { ease: "power3.out" } });
      tl.fromTo(".lt-bg",    { scale: 1.08, opacity: 0 }, { scale: 1, opacity: 1, duration: 2, ease: "power4.inOut" })
        .fromTo(".lt-card",  { opacity: 0, y: 60, filter: "blur(12px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.3 }, "-=1")
        .fromTo(".lt-hdr",   { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: .8 }, "-=.5")
        .fromTo(".lt-hint",  { opacity: 0 }, { opacity: .55, duration: .8 }, "-=.2")
        .fromTo(".lt-rose-l",{ opacity: 0, x: -40, rotate: -15 }, { opacity: 1, x: 0, rotate: -8, duration: 1.1 }, "-=.8")
        .fromTo(".lt-rose-r",{ opacity: 0, x: 40,  rotate: 15  }, { opacity: 1, x: 0, rotate: 8,  duration: 1.1 }, "-=.9");

      gsap.to(".lt-rose-l", { y: -14, rotate: -5, duration: 8, repeat: -1, yoyo: true, ease: "power1.inOut" });
      gsap.to(".lt-rose-r", { y: -10, rotate: 12, duration: 10, repeat: -1, yoyo: true, ease: "power1.inOut", delay: 2 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="page grain">

      {/* Full-screen rose background */}
      <div className="lt-bg absolute inset-0 opacity-0">
        <Image
          src={IMG.rosesFull}
          alt="Roses background"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          quality={88}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(26,10,15,.4) 0%,rgba(184,74,98,.15) 30%,rgba(255,240,245,.7) 70%,rgba(255,248,248,.88) 100%)" }} />
      </div>

      {/* CSS petals */}
      <div className="petal-wrap">
        {PETALS.map((p, i) => (
          <div key={i} className="petal-item" style={{ left: p.l, "--d": p.d, "--dl": p.dl } as React.CSSProperties}>
            <svg width={p.sz} height={p.sz * 1.55} viewBox="0 0 30 46">
              <path d="M15 1C15 1 27 10 27 23C27 36 21 44 15 45C9 44 3 36 3 23C3 10 15 1 15 1Z" fill={p.col} fillOpacity=".6" />
            </svg>
          </div>
        ))}
      </div>

      {/* Floating rose images — desktop decorative */}
      <div className="lt-rose-l absolute hide-mob pointer-events-none opacity-0"
        style={{ left: "-1%", top: "50%", transform: "translateY(-42%) rotate(-8deg)", width: 120, zIndex: 5 }}>
        <div className="relative overflow-hidden" style={{ width: 120, height: 155, borderRadius: "62% 38% 55% 45%/45% 55% 45% 55%", boxShadow: "0 15px 45px rgba(184,74,98,.25)" }}>
          <Image src={IMG.rClose} alt="" fill className="object-cover" sizes="120px" quality={75} loading="lazy" />
        </div>
      </div>
      <div className="lt-rose-r absolute hide-mob pointer-events-none opacity-0"
        style={{ right: "-1%", top: "50%", transform: "translateY(-50%) rotate(8deg)", width: 105, zIndex: 5 }}>
        <div className="relative overflow-hidden" style={{ width: 105, height: 135, borderRadius: "44% 56% 42% 58%/58% 44% 56% 42%", boxShadow: "0 15px 45px rgba(184,74,98,.25)" }}>
          <Image src={IMG.rWhite} alt="" fill className="object-cover" sizes="105px" quality={72} loading="lazy" />
        </div>
      </div>

      {/* Reading progress bar */}
      <div className="absolute top-0 left-0 right-0 z-40" style={{ height: 3, background: "rgba(240,128,152,.15)" }}>
        <div style={{ height: "100%", width: `${prog * 100}%`, background: `linear-gradient(to right,${C.r3},${C.r5})`, transition: "width .15s linear" }} />
      </div>

      {/* Main letter card */}
      <div className="lt-card absolute inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 opacity-0"
        style={{
          top: "5%", bottom: "10%",
          width: "min(620px,92vw)",
          display: "flex", flexDirection: "column",
          background: "rgba(255,252,253,.88)",
          backdropFilter: "blur(28px) saturate(1.5)",
          WebkitBackdropFilter: "blur(28px) saturate(1.5)",
          border: "1px solid rgba(240,128,152,.28)",
          borderRadius: "2rem",
          boxShadow: "0 30px 100px rgba(184,74,98,.2), 0 0 0 1px rgba(255,255,255,.5) inset",
          overflow: "hidden",
        }}>

        {/* Card header (sticky) */}
        <div className="lt-hdr flex flex-col items-center pt-7 pb-5 px-8 flex-shrink-0 opacity-0"
          style={{ borderBottom: "1px solid rgba(240,128,152,.18)", background: "rgba(255,252,253,.95)" }}>
          <p className="tl mb-4" style={{ color: C.r5, letterSpacing: ".3em" }}>The Unsaid Things</p>
          {/* Wax seal */}
          <div className="w-12 h-12 rounded-full grid place-items-center mb-3"
            style={{ background: `radial-gradient(135deg,${C.r3} 0%,${C.r6} 100%)`, boxShadow: `0 6px 24px rgba(184,74,98,.4)` }}>
            <span style={{ fontFamily: "var(--font-cor),serif", fontStyle: "italic", fontSize: "1.3rem", color: "#FFF8F8" }}>R</span>
          </div>
          <div className="dh w-full" />
          <p className="lt-hint tl mt-3 opacity-0"
            style={{ fontSize: ".52rem", color: C.r4, animation: "breathe 2.5s ease-in-out infinite" }}>
            Scroll to read ↓
          </p>
        </div>

        {/* Scrollable letter body */}
        <div ref={scrollEl} className="iscroll flex-1">
          <div className="flex flex-col px-8 md:px-10 py-7" style={{ gap: "1.4em" }}>

            {/* Inline rose image */}
            <div className="flex justify-center mb-2">
              <div className="relative overflow-hidden" style={{ width: 160, height: 100, borderRadius: "56% 44% 64% 36%/38% 62% 38% 62%" }}>
                <Image src={IMG.rPetals} alt="" fill className="object-cover" sizes="160px" quality={72} loading="lazy" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(255,252,253,.1),rgba(255,240,245,.4))" }} />
              </div>
            </div>

            {/* Letter paragraphs */}
            {LETTER.map((para, i) => (
              <Para key={i} text={para} index={i} />
            ))}

            {/* Inline rose image mid-letter */}
            <div className="flex justify-center my-4">
              <div className="relative overflow-hidden" style={{ width: 130, height: 165, borderRadius: "62% 38% 55% 45%/45% 55% 45% 55%", boxShadow: "0 12px 40px rgba(184,74,98,.2)" }}>
                <Image src={IMG.rBouquet} alt="" fill className="object-cover" sizes="130px" quality={70} loading="lazy" />
              </div>
            </div>

            {/* Signature */}
            <div
              className="flex flex-col items-end gap-2 mt-4 pt-6"
              style={{
                borderTop: "1px solid rgba(240,128,152,.2)",
                opacity: 0, transform: "translateY(20px)",
              }}
              ref={el => {
                if (!el) return;
                const obs = new IntersectionObserver(([e]) => {
                  if (e.isIntersecting) {
                    gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
                    obs.disconnect();
                  }
                }, { threshold: 0.4 });
                obs.observe(el);
              }}
            >
              <p style={{ fontFamily: "var(--font-cor),serif", fontStyle: "italic", fontSize: ".9rem", color: C.r4, letterSpacing: ".1em" }}>
                With sincere respect,
              </p>
              <p className="td italic" style={{ fontSize: "2.2rem", color: C.r5, letterSpacing: ".15em" }}>ISSAM</p>
            </div>

            {/* I'm sorry button */}
            <div className="flex justify-center mt-4 mb-2">
              <button onClick={onNext} className="btn btn-p" style={{ minWidth: 180 }}>
                <span>I&apos;m Sorry 🌹</span>
              </button>
            </div>

            <div style={{ height: "2rem" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
