"use client";
import {useEffect,useRef} from "react";
import Image from "next/image";
import {gsap} from "gsap";
import {IMG,C} from "@/lib/constants";
interface Props{onNext:()=>void}
export default function P07Movies({onNext}:Props){
  const root=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const ctx=gsap.context(()=>{
      const tl=gsap.timeline({delay:.2});
      tl.fromTo(".m7-bg",{scale:1.08,opacity:0},{scale:1,opacity:1,duration:2,ease:"power3.out"})
        .fromTo(".m7-box",{opacity:0,y:30,filter:"blur(8px)"},{opacity:1,y:0,filter:"blur(0px)",duration:1,ease:"power3.out"},"-=1")
        .fromTo(".m7-t > *",{opacity:0,x:-24},{opacity:1,x:0,duration:.75,stagger:.14},"-=.6");
    },root);
    return()=>ctx.revert();
  },[]);
  return(
    <div ref={root} className="page film grain vig">
      <div className="m7-bg absolute inset-0 opacity-0">
        <Image src={IMG.cinema} alt="Cinema" fill className="object-cover" priority sizes="100vw" quality={88}/>
        <div className="absolute inset-0" style={{background:"linear-gradient(to right,rgba(10,3,8,.85) 0%,rgba(10,3,8,.45) 50%,rgba(10,3,8,.2) 100%)"}}/>
        <div className="absolute inset-0" style={{background:"linear-gradient(to top,rgba(10,3,8,.7) 0%,transparent 50%)"}}/>
        <div className="absolute inset-0 scan"/>
      </div>
      {/* Projector light */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{zIndex:3,opacity:.06}}>
        <defs><radialGradient id="bm2" cx="50%" cy="0%" r="70%"><stop offset="0%" stopColor="#FFF8F8" stopOpacity=".9"/><stop offset="100%" stopColor="#FFF8F8" stopOpacity="0"/></radialGradient></defs>
        <ellipse cx="50%" cy="0" rx="30%" ry="70%" fill="url(#bm2)"/>
      </svg>
      {/* Left content */}
      <div className="m7-box absolute left-8 md:left-14 top-1/2 -translate-y-1/2 opacity-0" style={{maxWidth:340}}>
        <div className="m7-t flex flex-col gap-5">
          <p className="tl opacity-0" style={{color:"rgba(255,188,213,.85)"}}>Chapter 07</p>
          <h2 className="td opacity-0" style={{fontSize:"clamp(2.5rem,5.5vw,4.5rem)",color:"#FFF8F8",lineHeight:.95,textShadow:"0 4px 40px rgba(240,128,152,.3)"}}>
            Movie<br/>Soul
          </h2>
          <p className="tb opacity-0" style={{fontSize:".9rem",color:"rgba(255,225,236,.8)",lineHeight:1.85,maxWidth:280}}>
            Every film,<br/>every scene,<br/>tells a story...<br/><em>just like yours.</em>
          </p>
          <div className="opacity-0">
            <button onClick={onNext} className="btn" style={{background:"rgba(184,74,98,.7)",color:"#fff",border:"1px solid rgba(240,128,152,.4)",backdropFilter:"blur(12px)"}}>
              <span>Discover →</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
