"use client";
import {useEffect,useRef} from "react";
import Image from "next/image";
import {gsap} from "gsap";
import {IMG,C} from "@/lib/constants";
interface Props{onNext:()=>void}
const TRAITS=["Elegant","Unique","Precious","Inspiring"];
const WORDS=[
  {t:"Beautiful",x:"68%",y:"12%",dur:9},{t:"Rare",x:"78%",y:"38%",dur:11},
  {t:"Inspiring",x:"72%",y:"62%",dur:8},{t:"Timeless",x:"65%",y:"82%",dur:12},
];
export default function P05HerWorld({onNext}:Props){
  const root=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const ctx=gsap.context(()=>{
      const tl=gsap.timeline({delay:.2});
      tl.fromTo(".hw-img",{scale:1.1},{scale:1,duration:2.4,ease:"power3.out"})
        .fromTo(".hw-card",{opacity:0,x:-50,scale:.92},{opacity:1,x:0,scale:1,duration:1.2,ease:"power3.out"},"-=1.4")
        .fromTo(".hw-tr",{opacity:0,x:-20},{opacity:1,x:0,duration:.6,stagger:.1},"-=.5")
        .fromTo(".hw-w",{opacity:0,y:14,filter:"blur(5px)"},{opacity:1,y:0,filter:"blur(0px)",duration:.8,stagger:.12},"-=.4");
      WORDS.forEach((_,i)=>gsap.to(`.hw-w${i}`,{y:`random(-14,14)`,opacity:`random(.5,.85)`,duration:8+i,repeat:-1,yoyo:true,ease:"sine.inOut",delay:i*.5}));
    },root);
    return()=>ctx.revert();
  },[]);
  return(
    <div ref={root} className="page grain vig">
      {/* Full-bleed luxury room */}
      <div className="hw-img absolute inset-0">
        <Image src={IMG.lRoom} alt="Luxury pink room" fill className="object-cover" priority sizes="100vw" quality={90}/>
        <div className="absolute inset-0" style={{background:"linear-gradient(to right,rgba(26,10,15,.5) 0%,rgba(26,10,15,.1) 50%,rgba(26,10,15,.2) 100%)"}}/>
        <div className="absolute inset-0" style={{background:"rgba(184,74,98,.08)"}}/>
      </div>
      {/* Floating keywords right side */}
      {WORDS.map((w,i)=>(
        <span key={i} className={`hw-w hw-w${i} absolute pointer-events-none opacity-0`} style={{left:w.x,top:w.y}}>
          <span style={{fontFamily:"var(--font-cor),serif",fontSize:"1rem",fontStyle:"italic",color:"rgba(255,248,248,.7)",letterSpacing:".12em",textShadow:"0 2px 20px rgba(0,0,0,.4)"}}>
            {w.t}
          </span>
        </span>
      ))}
      {/* Left glass card */}
      <div className="hw-card absolute left-8 md:left-14 top-1/2 -translate-y-1/2 glass-white opacity-0"
        style={{borderRadius:"2rem",padding:"2rem 2rem",maxWidth:220,boxShadow:"0 20px 60px rgba(184,74,98,.2)"}}>
        <p className="td" style={{fontSize:"clamp(1.4rem,2.8vw,2rem)",color:C.r5,marginBottom:"1.2rem"}}>Her World</p>
        {TRAITS.map(t=>(
          <div key={t} className="hw-tr flex items-center gap-2 mb-3 opacity-0">
            <div style={{width:6,height:6,borderRadius:"50%",background:C.r4,flexShrink:0}}/>
            <p style={{fontFamily:"var(--font-int),sans-serif",fontSize:".8rem",color:C.r6,letterSpacing:".05em"}}>{t}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
