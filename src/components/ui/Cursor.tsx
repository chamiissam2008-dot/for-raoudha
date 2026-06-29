"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Cursor() {
  const dot  = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer:coarse)").matches) return; // skip touch

    const d = dot.current!, r = ring.current!;
    document.body.style.cursor = "none";

    const move = (e: MouseEvent) => {
      gsap.to(d, { x:e.clientX-4,  y:e.clientY-4,  duration:.08, ease:"none" });
      gsap.to(r, { x:e.clientX-18, y:e.clientY-18, duration:.5,  ease:"power2.out" });
    };
    const down  = () => { gsap.to([d,r], { scale:.7, duration:.15 }); };
    const up    = () => { gsap.to([d,r], { scale:1,  duration:.4, ease:"back.out(2)" }); };
    const enter = () => { gsap.to(d,{ scale:2.2,opacity:.5,duration:.3 }); gsap.to(r,{ scale:1.6,opacity:.3,borderColor:"#C9A96E",duration:.35 }); };
    const leave = () => { gsap.to(d,{ scale:1,opacity:1,duration:.3 }); gsap.to(r,{ scale:1,opacity:.55,borderColor:"rgba(184,74,98,.5)",duration:.35 }); };

    const attach = () =>
      document.querySelectorAll("button,a,[role=button]").forEach(el => {
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
    attach();
    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList:true, subtree:true });

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup",   up);
    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup",   up);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dot} style={{ position:"fixed",top:0,left:0,width:8,height:8,borderRadius:"50%",
        background:"#B84A62",zIndex:99999,pointerEvents:"none",mixBlendMode:"multiply",willChange:"transform" }}/>
      <div ref={ring} style={{ position:"fixed",top:0,left:0,width:36,height:36,borderRadius:"50%",
        border:"1px solid rgba(184,74,98,.5)",zIndex:99998,pointerEvents:"none",opacity:.55,willChange:"transform" }}/>
    </>
  );
}
