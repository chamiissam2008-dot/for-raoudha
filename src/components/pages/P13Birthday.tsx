"use client";
import {useEffect,useRef} from "react";
import Image from "next/image";
import {motion} from "framer-motion";
import {gsap} from "gsap";
import {IMG,C} from "@/lib/constants";
interface Props{onNext:()=>void}
const PETALS=Array.from({length:22},(_,i)=>({l:`${i*4.3+Math.sin(i*1.9)*3}%`,d:`${9+i*.55}s`,dl:`${-(i*.65)}s`,sz:10+Math.sin(i*2.3)*6,col:["#F08098","#FFBCD5","#D4638E","#FFF0F5","#B84A62",C.gold][i%6]}));
export default function P13Birthday({onNext}:Props){
  const root=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const ctx=gsap.context(()=>{
      const tl=gsap.timeline({delay:.3,defaults:{ease:"power3.out"}});
      tl.fromTo(".b13-bg",{scale:1.1},{scale:1,duration:2.2,ease:"power4.inOut"})
        .fromTo(".b13-eye",{opacity:0,y:-14},{opacity:1,y:0,duration:.8},"-=1.2")
        .fromTo(".b13-h1",{opacity:0,scale:.75,filter:"blur(20px)"},{opacity:1,scale:1,filter:"blur(0px)",duration:1.4,ease:"power4.out"},"-=.5")
        .fromTo(".b13-ch",{opacity:0,y:40,rotateX:-90},{opacity:1,y:0,rotateX:0,duration:.65,stagger:.045},"-=.7")
        .fromTo(".b13-badge",{opacity:0,scale:.85,y:18},{opacity:1,scale:1,y:0,duration:.9,ease:"back.out(1.5)"},"-=.25")
        .to(".b13-h1",{textShadow:`0 0 70px rgba(184,74,98,.9),0 0 130px rgba(201,169,110,.4)`,repeat:-1,yoyo:true,duration:2.8,ease:"power2.inOut"});
    },root);
    return()=>ctx.revert();
  },[]);
  return(
    <div ref={root} className="page grain vig">
      {/* Full bleed roses */}
      <div className="b13-bg absolute inset-0">
        <Image src={IMG.rHero} alt="Birthday roses" fill className="object-cover object-center" priority sizes="100vw" quality={90}/>
        <div className="absolute inset-0" style={{background:"linear-gradient(180deg,rgba(26,10,15,.5) 0%,rgba(184,74,98,.15) 40%,rgba(26,10,15,.65) 100%)"}}/>
      </div>
      {/* CSS petals */}
      <div className="petal-wrap">
        {PETALS.map((p,i)=>(
          <div key={i} className="petal-item" style={{left:p.l,"--d":p.d,"--dl":p.dl} as React.CSSProperties}>
            <svg width={p.sz} height={p.sz*1.55} viewBox="0 0 30 46"><path d="M15 1C15 1 27 10 27 23C27 36 21 44 15 45C9 44 3 36 3 23C3 10 15 1 15 1Z" fill={p.col} fillOpacity=".8"/></svg>
          </div>
        ))}
      </div>
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <p className="b13-eye tl opacity-0 mb-4" style={{color:"rgba(255,188,213,.9)",letterSpacing:".4em"}}>✦ &nbsp;HAPPY&nbsp; ✦</p>
        <h1 className="b13-h1 td opacity-0" style={{fontSize:"clamp(3.5rem,11vw,10rem)",color:"#FFF8F8",lineHeight:.88}}>
          Happy<br/><span style={{fontStyle:"italic",color:C.r2,fontSize:"72%"}}>19th Birthday</span>
        </h1>
        <div className="mt-5 flex flex-wrap justify-center" style={{perspective:"600px"}}>
          {"Raoudha Riham".split("").map((ch,i)=>(
            <span key={i} className="b13-ch td italic inline-block opacity-0"
              style={{fontSize:"clamp(1.5rem,4vw,3.2rem)",color:C.r2,width:ch===" "?".4em":"auto",letterSpacing:".04em",fontFamily:"var(--font-cor),Georgia,serif",fontWeight:300}}>
              {ch}
            </span>
          ))}
        </div>
        <motion.div className="b13-badge glass-dark mt-8 px-8 py-3 flex items-center gap-4 opacity-0" style={{borderRadius:"9999px"}}>
          <span>🌹</span>
          <p className="tl" style={{color:"rgba(255,188,213,.9)"}}>JUNE 30 · 2026</p>
          <span>🌹</span>
        </motion.div>
      </div>
    </div>
  );
}
