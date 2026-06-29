"use client";
import {useEffect,useRef} from "react";
import Image from "next/image";
import {gsap} from "gsap";
import {IMG,C} from "@/lib/constants";
interface Props{onNext:()=>void}
export default function P06Cats({onNext}:Props){
  const root=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const ctx=gsap.context(()=>{
      const tl=gsap.timeline({delay:.2,defaults:{ease:"power3.out"}});
      tl.fromTo(".c6-bg",{scale:1.08},{scale:1,duration:2.2,ease:"power4.inOut"})
        .fromTo(".c6-box",{opacity:0,x:40,filter:"blur(8px)"},{opacity:1,x:0,filter:"blur(0px)",duration:1.1},"-=1.2")
        .fromTo(".c6-txt > *",{opacity:0,y:18},{opacity:1,y:0,duration:.75,stagger:.14},"-=.6");
    },root);
    return()=>ctx.revert();
  },[]);
  return(
    <div ref={root} className="page grain">
      {/* Full-bleed cat */}
      <div className="c6-bg absolute inset-0">
        <Image src={IMG.cClose} alt="Cat close up" fill className="object-cover object-center" priority sizes="100vw" quality={90}/>
        <div className="absolute inset-0" style={{background:"linear-gradient(to left,rgba(255,248,248,.0) 0%,rgba(255,248,248,.0) 40%,rgba(255,248,248,.6) 75%,rgba(255,248,248,.85) 100%)"}}/>
        <div className="absolute inset-0" style={{background:"linear-gradient(to bottom,transparent 50%,rgba(255,248,248,.7) 100%)"}}/>
      </div>
      {/* Right content */}
      <div className="c6-box absolute right-8 md:right-14 top-1/2 -translate-y-1/2 opacity-0" style={{maxWidth:320}}>
        <div className="c6-txt flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <p className="td" style={{fontSize:"clamp(2rem,4.5vw,3.5rem)",color:C.r5}}>Cat Lover</p>
            <span style={{fontSize:"1.8rem"}}>🐾</span>
          </div>
          <p className="tb opacity-0" style={{fontSize:"clamp(.85rem,1.3vw,1rem)",color:C.r7,lineHeight:1.9,maxWidth:280}}>
            Because every purr,<br/>every meow,<br/>and every little paw<br/>makes life better.
          </p>
          <div className="dh opacity-0" style={{width:80}}/>
          <div className="opacity-0">
            <button onClick={onNext} className="btn" style={{borderColor:`rgba(184,74,98,.5)`,color:C.r5}}>
              <span>See more →</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
