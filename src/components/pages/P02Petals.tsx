"use client";
import {useEffect,useRef} from "react";
import Image from "next/image";
import {gsap} from "gsap";
import {IMG,C} from "@/lib/constants";
interface Props{onNext:()=>void}
const PETALS=Array.from({length:18},(_,i)=>({l:`${5+i*5.2+Math.sin(i*1.8)*4}%`,d:`${10+i*.6}s`,dl:`${-(i*.8)}s`,sz:12+Math.sin(i*2)*7,col:["#F08098","#FFBCD5","#E8A0BF","#D4638E","#FFF0F5"][i%5]}));
export default function P02Petals({onNext}:Props){
  const root=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const ctx=gsap.context(()=>{
      gsap.fromTo(".q2",{opacity:0,y:32,filter:"blur(8px)"},{opacity:1,y:0,filter:"blur(0px)",duration:1.1,stagger:.28,delay:.3,ease:"power3.out"});
      gsap.fromTo(".q2-tag",{opacity:0},{opacity:1,duration:1,delay:1.6});
    },root);
    return()=>ctx.revert();
  },[]);
  return(
    <div ref={root} className="page grain">
      {/* Soft background image */}
      <div className="absolute inset-0">
        <Image src={IMG.rPetals} alt="" fill className="object-cover opacity-20" sizes="100vw" quality={70}/>
        <div className="absolute inset-0" style={{background:"linear-gradient(170deg,#FFF8F8 0%,rgba(255,224,236,.85) 50%,#FFF0F5 100%)"}}/>
      </div>
      {/* CSS petals */}
      <div className="petal-wrap">
        {PETALS.map((p,i)=>(
          <div key={i} className="petal-item" style={{left:p.l,"--d":p.d,"--dl":p.dl} as React.CSSProperties}>
            <svg width={p.sz} height={p.sz*1.6} viewBox="0 0 30 48"><path d="M15 1C15 1 28 11 28 24C28 37 21 45 15 46C9 45 2 37 2 24C2 11 15 1 15 1Z" fill={p.col} fillOpacity=".75"/></svg>
          </div>
        ))}
      </div>
      {/* Decorative blobs */}
      <div className="absolute pointer-events-none" style={{width:440,height:440,borderRadius:"60% 40% 55% 45%/45% 55% 45% 55%",background:"radial-gradient(ellipse,rgba(240,128,152,.14) 0%,transparent 70%)",top:"-20%",right:"-12%",animation:"floatY 14s ease-in-out infinite"}}/>
      <div className="absolute pointer-events-none" style={{width:320,height:320,borderRadius:"40% 60% 45% 55%/55% 45% 60% 40%",background:"radial-gradient(ellipse,rgba(184,74,98,.1) 0%,transparent 70%)",bottom:"-10%",left:"-8%",animation:"floatY 11s ease-in-out infinite reverse"}}/>
      {/* Content */}
      <div className="relative z-10 flex flex-col items-start justify-center h-full px-12 md:px-20">
        {["Some people","make the world","a more beautiful place","just by being in it."].map((line,i)=>(
          <p key={i} className="q2 td opacity-0"
            style={{fontSize:i===3?"clamp(1.7rem,3.8vw,3rem)":"clamp(2.4rem,5.5vw,4.6rem)",color:i===3?C.r5:C.ink,fontStyle:i===3?"italic":"normal",lineHeight:1.12,marginBottom:i===3?"0":".15rem"}}>
            {line}
          </p>
        ))}
        <div className="q2-tag flex items-center gap-4 mt-10 opacity-0">
          <div style={{fontSize:"1.4rem"}}>🤍</div>
          <div className="dh flex-1" style={{width:60}}/>
        </div>
      </div>
    </div>
  );
}
