"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { IMG, C } from "@/lib/constants";
interface Props { onNext: () => void }

export default function P14Thanks({ onNext }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: .25, defaults: { ease: "power3.out" } });
      tl.fromTo(".t14-bg",  { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1, duration: 2.2, ease: "power4.inOut" })
        .fromTo(".t14-bal", { opacity: 0, y: 60, scale: .8 }, { opacity: 1, y: 0, scale: 1, duration: 1.3, ease: "back.out(1.3)" }, "-=1.2")
        .fromTo(".t14-box", { opacity: 0, y: 40, filter: "blur(10px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1 }, "-=.9")
        .fromTo(".t14-t > *", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .75, stagger: .16 }, "-=.6");

      gsap.to(".t14-bal", { y: -18, duration: 4, repeat: -1, yoyo: true, ease: "power2.inOut", delay: 2 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="page grain">
      {/* Full-bleed romantic background */}
      <div className="t14-bg absolute inset-0 opacity-0">
        <Image src={IMG.heart} alt="Romantic" fill className="object-cover object-center" sizes="100vw" quality={88} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(255,240,245,.6) 0%,rgba(255,224,236,.5) 40%,rgba(255,248,248,.8) 100%)" }} />
      </div>

      {/* Heart balloon */}
      <div className="t14-bal absolute right-8 md:right-16 top-1/2 -translate-y-1/2 opacity-0 hide-mob pointer-events-none"
        style={{ fontSize: "clamp(6rem,12vw,10rem)" }}>
        🎈
      </div>

      {/* Content card */}
      <div className="t14-box absolute left-8 md:left-16 top-1/2 -translate-y-1/2 opacity-0" style={{ maxWidth: 360 }}>
        <div className="t14-t flex flex-col gap-5">
          <p className="tl opacity-0" style={{ color: C.r5, letterSpacing: ".28em" }}>Chapter 14</p>

          <h2 className="td opacity-0" style={{ fontSize: "clamp(2rem,4.5vw,3.6rem)", color: C.r7, lineHeight: 1.1 }}>
            You are<br />
            <span style={{ fontStyle: "italic", color: C.r5 }}>truly one of<br />a kind.</span>
          </h2>

          <div className="dh opacity-0" style={{ width: 80 }} />

          <div className="flex flex-col gap-2 opacity-0">
            <p className="tb" style={{ fontSize: ".88rem", color: C.r6, lineHeight: 1.8 }}>Thank you for being you.</p>
            <p className="tb" style={{ fontSize: ".88rem", color: C.r6, lineHeight: 1.8 }}>Always here for you.</p>
          </div>

          <div className="opacity-0">
            <p className="ts" style={{ fontSize: "1.4rem", color: C.r5, letterSpacing: ".12em" }}>— ISSAM 🌹</p>
          </div>
        </div>
      </div>
    </div>
  );
}
