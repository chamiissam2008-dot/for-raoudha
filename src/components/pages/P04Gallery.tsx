"use client";
import {useEffect,useRef} from "react";
import Image from "next/image";
import {gsap} from "gsap";
import {IMG,C} from "@/lib/constants";
interface Props{onNext:()=>void}

const PHOTOS=[
  {src:IMG.rClose,   pos:{top:"2%",  left:"2%"  },w:"min(230px,30vw)",h:"min(280px,37vw)",rot:-3,  delay:0.0},
  {src:IMG.cWhite,   pos:{top:"0%",  left:"30%" },w:"min(190px,25vw)",h:"min(230px,30vw)",rot:2,   delay:0.1},
  {src:IMG.rRed,     pos:{top:"1%",  right:"2%" },w:"min(220px,29vw)",h:"min(270px,36vw)",rot:-2,  delay:0.2},
  {src:IMG.pinkCar,  pos:{bottom:"3%",left:"1%" },w:"min(260px,34vw)",h:"min(200px,26vw)",rot:2,   delay:0.3},
  {src:IMG.lRoom,    pos:{bottom:"2%",left:"30%"},w:"min(200px,26vw)",h:"min(240px,32vw)",rot:-1,  delay:0.4},
  {src:IMG.cGinger,  pos:{bottom:"4%",right:"2%"},w:"min(210px,28vw)",h:"min(250px,33vw)",rot:3,   delay:0.5},
];

export default function P04Gallery({onNext}:Props){
  const root=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const ctx=gsap.context(()=>{
      gsap.fromTo(".g4p",
        {opacity:0,scale:.8,rotate:(_i,el)=>parseFloat(el.dataset.rot||"0")*2},
        {opacity:1,scale:1,rotate:(_i,el)=>parseFloat(el.dataset.rot||"0"),
          duration:1.1,stagger:{amount:.7,from:"random"},delay:.2,ease:"power3.out"});
      gsap.fromTo(".g4-card",{opacity:0,scale:.88,y:20},{opacity:1,scale:1,y:0,duration:1,delay:.9,ease:"back.out(1.4)"});
    },root);
    return()=>ctx.revert();
  },[]);

  return(
    <div ref={root} className="page grain" style={{background:`radial-gradient(ellipse at center,${C.r1} 0%,${C.cr} 60%,${C.r1} 100%)`}}>
      {/* Photo grid */}
      {PHOTOS.map((p,i)=>(
        <div key={i} className="g4p absolute overflow-hidden opacity-0"
          data-rot={p.rot}
          style={{...p.pos,width:p.w,height:p.h,borderRadius:"1.2rem",
            boxShadow:"0 12px 40px rgba(26,10,15,.18)",
            transform:`rotate(${p.rot}deg)`}}>
          <Image src={p.src} alt="" fill className="object-cover" sizes={p.w} quality={75} loading="lazy"/>
          {/* Polaroid white border */}
          <div className="absolute inset-0 pointer-events-none" style={{boxShadow:"inset 0 0 0 6px rgba(255,255,255,.9)",borderRadius:"inherit"}}/>
        </div>
      ))}

      {/* Center card */}
      <div className="g4-card relative z-20 glass-white opacity-0 flex flex-col items-center text-center gap-4 p-8"
        style={{borderRadius:"2rem",maxWidth:280,boxShadow:"0 20px 60px rgba(184,74,98,.15)"}}>
        <span style={{fontSize:"1.5rem"}}>🌹</span>
        <p className="td italic" style={{fontSize:"clamp(1.1rem,2.2vw,1.55rem)",color:C.r7,lineHeight:1.4}}>
          A collection of moments that<br/>I will always treasure
        </p>
        <div className="dh w-full"/>
        <p className="tl" style={{color:C.r4}}>For Raoudha</p>
      </div>
    </div>
  );
}
