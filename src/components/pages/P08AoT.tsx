"use client";
import {useEffect,useRef} from "react";
import Image from "next/image";
import {gsap} from "gsap";
import {IMG,C} from "@/lib/constants";
interface Props{onNext:()=>void}
export default function P08AoT({onNext}:Props){
  const root=useRef<HTMLDivElement>(null);
  const svgRef=useRef<SVGSVGElement>(null);
  useEffect(()=>{
    const ctx=gsap.context(()=>{
      // SVG wing draw
      const paths=svgRef.current?.querySelectorAll<SVGPathElement>("path.wg");
      paths?.forEach(p=>{const l=p.getTotalLength();p.style.strokeDasharray=`${l}`;p.style.strokeDashoffset=`${l}`;});
      const tl=gsap.timeline({delay:.2,defaults:{ease:"power3.out"}});
      tl.fromTo(".a8-bg",{scale:1.1,opacity:0},{scale:1,opacity:1,duration:2,ease:"power4.inOut"})
        .fromTo(".a8-box",{opacity:0,y:40,filter:"blur(10px)"},{opacity:1,y:0,filter:"blur(0px)",duration:1.1},"-=.9")
        .to("path.wg",{strokeDashoffset:0,duration:.65,stagger:.1,ease:"power2.inOut"},"-=.5")
        .fromTo(".a8-q",{opacity:0,y:18},{opacity:1,y:0,duration:.85,stagger:.2},"-=.2")
        .fromTo(".a8-btn",{opacity:0,y:12},{opacity:1,y:0,duration:.7},"-=.2");
    },root);
    return()=>ctx.revert();
  },[]);
  return(
    <div ref={root} className="page grain vig">
      {/* Atmospheric sunset background */}
      <div className="a8-bg absolute inset-0 opacity-0">
        <Image src={IMG.sunset} alt="Dramatic sunset" fill className="object-cover object-center" priority sizes="100vw" quality={88}/>
        <div className="absolute inset-0" style={{background:"linear-gradient(to bottom,rgba(26,10,15,.15) 0%,rgba(184,74,98,.12) 40%,rgba(26,10,15,.65) 100%)"}}/>
        <div className="absolute inset-0" style={{background:"rgba(120,30,50,.15)"}}/>
      </div>
      {/* Content box */}
      <div className="a8-box absolute left-8 md:left-14 bottom-24 opacity-0" style={{maxWidth:420}}>
        {/* Original wings SVG */}
        <svg ref={svgRef} viewBox="0 0 320 80" fill="none" style={{width:"min(280px,70vw)",height:"auto",marginBottom:"1.2rem"}}>
          <path className="wg" d="M155 40 C128 25,88 12,25 30 C68 32,115 37,155 40Z" stroke="rgba(255,188,213,.85)" strokeWidth="1.3" strokeLinecap="round"/>
          <path className="wg" d="M155 40 C122 22,70 8,5 22 C55 30,110 36,155 40Z" stroke="rgba(240,128,152,.7)" strokeWidth=".9" strokeLinecap="round"/>
          <path className="wg" d="M155 40 C135 30,110 24,58 34 C98 36,130 38,155 40Z" stroke="rgba(255,188,213,.6)" strokeWidth="1.6" strokeLinecap="round"/>
          <path className="wg" d="M165 40 C192 25,232 12,295 30 C252 32,205 37,165 40Z" stroke="rgba(255,188,213,.85)" strokeWidth="1.3" strokeLinecap="round"/>
          <path className="wg" d="M165 40 C198 22,250 8,315 22 C265 30,210 36,165 40Z" stroke="rgba(240,128,152,.7)" strokeWidth=".9" strokeLinecap="round"/>
          <path className="wg" d="M165 40 C185 30,210 24,262 34 C222 36,190 38,165 40Z" stroke="rgba(255,188,213,.6)" strokeWidth="1.6" strokeLinecap="round"/>
          <circle cx="160" cy="40" r="5" fill="rgba(240,128,152,.9)"/>
        </svg>
        <p className="a8-q td opacity-0" style={{fontSize:"clamp(2rem,4.5vw,3.6rem)",color:"#FFF8F8",lineHeight:1.1,textShadow:"0 3px 30px rgba(0,0,0,.5)"}}>
          Freedom is<br/>beyond the walls.
        </p>
        <div className="a8-q mt-4 flex flex-col gap-1 opacity-0">
          <p style={{fontFamily:"var(--font-int),sans-serif",fontSize:".82rem",color:"rgba(255,188,213,.85)",letterSpacing:".08em"}}>Keep believing,</p>
          <p style={{fontFamily:"var(--font-int),sans-serif",fontSize:".82rem",color:"rgba(255,188,213,.85)",letterSpacing:".08em"}}>keep moving forward.</p>
        </div>
        <div className="a8-btn mt-8 opacity-0">
          <button onClick={onNext} className="btn" style={{background:"rgba(184,74,98,.65)",color:"#fff",border:"1px solid rgba(240,128,152,.4)",backdropFilter:"blur(12px)"}}>
            <span>Continue →</span>
          </button>
        </div>
      </div>
    </div>
  );
}
