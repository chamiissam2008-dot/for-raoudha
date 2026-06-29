"use client";
import {useEffect,useRef,useState} from "react";
import {gsap} from "gsap";
import {C} from "@/lib/constants";
interface Props{onNext:()=>void}
function Counter({target,label,icon,suffix=""}:{target:number;label:string;icon:string;suffix?:string}){
  const [val,setVal]=useState(0);
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{
      if(e.isIntersecting){
        let start=0;const dur=1800,step=16;
        const timer=setInterval(()=>{
          start+=step;const pct=Math.min(start/dur,1);
          const ease=1-Math.pow(1-pct,3);
          setVal(Math.round(ease*target));
          if(pct>=1)clearInterval(timer);
        },step);
      }
    },{threshold:.5});
    if(ref.current)obs.observe(ref.current);
    return()=>obs.disconnect();
  },[target]);
  return(
    <div ref={ref} className="stat-card" style={{minWidth:150}}>
      <span style={{fontSize:"1.6rem"}}>{icon}</span>
      <p className="td" style={{fontSize:"clamp(2rem,4vw,3rem)",color:C.r5,fontWeight:400,lineHeight:1}}>
        {val.toLocaleString()}{suffix}
      </p>
      <p className="tl" style={{color:C.r4}}>{label}</p>
    </div>
  );
}
export default function P03Stats({onNext}:Props){
  const root=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const ctx=gsap.context(()=>{
      const tl=gsap.timeline({delay:.3,defaults:{ease:"power3.out"}});
      tl.fromTo(".s3h",{opacity:0,y:-18},{opacity:1,y:0,duration:.9})
        .fromTo(".s3-div",{scaleX:0},{scaleX:1,duration:.7,ease:"power2.inOut"},"-=.4")
        .fromTo(".s3-card",{opacity:0,y:30,scale:.9},{opacity:1,y:0,scale:1,duration:.8,stagger:.15},"-=.3")
        .fromTo(".s3-sub",{opacity:0,y:14},{opacity:1,y:0,duration:.8},"-=.2");
    },root);
    return()=>ctx.revert();
  },[]);
  return(
    <div ref={root} className="page grain" style={{background:`linear-gradient(165deg,${C.cr} 0%,${C.r1} 100%)`}}>
      {/* Decorative circles */}
      <div className="absolute pointer-events-none" style={{width:500,height:500,borderRadius:"50%",border:`1px solid rgba(240,128,152,.15)`,top:"50%",left:"50%",marginTop:-250,marginLeft:-250}}/>
      <div className="absolute pointer-events-none" style={{width:350,height:350,borderRadius:"50%",border:`1px solid rgba(184,74,98,.1)`,top:"50%",left:"50%",marginTop:-175,marginLeft:-175}}/>
      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-12 px-8">
        <div className="flex flex-col items-center gap-4">
          <p className="s3h tl opacity-0" style={{color:C.r5,letterSpacing:".35em",fontSize:".75rem"}}>SINCE WE MET</p>
          <div
  className="s3-div dh w-24"
  style={{
    transformOrigin: "center",
    transform: "scaleX(0)",
  }}
/>
        <div className="flex flex-wrap justify-center gap-5">
          <div className="s3-card opacity-0"><Counter target={612} label="Days" icon="🤍" /></div>
          <div className="s3-card opacity-0"><Counter target={15000} label="Messages" icon="💬" suffix="+" /></div>
          <div className="s3-card opacity-0">
            <div className="stat-card" style={{minWidth:150}}>
              <span style={{fontSize:"1.6rem"}}>⭐</span>
              <p className="td" style={{fontSize:"clamp(2rem,4vw,3rem)",color:C.r5,fontWeight:400,lineHeight:1}}>∞</p>
              <p className="tl" style={{color:C.r4}}>Memories</p>
            </div>
          </div>
        </div>
        <p className="s3-sub td italic opacity-0" style={{fontSize:"clamp(1rem,2vw,1.5rem)",color:C.r6,textAlign:"center",maxWidth:400,lineHeight:1.6}}>
          And every single one of them<br/>means something.
        </p>
      </div>
    </div>
  );
}
