"use client";
import {useEffect,useRef} from "react";
import Image from "next/image";
import {gsap} from "gsap";
import {IMG,C} from "@/lib/constants";
interface Props{onNext:()=>void}
export default function P10Garden({onNext}:Props){
  const root=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const ctx=gsap.context(()=>{
      const tl=gsap.timeline({delay:.2,defaults:{ease:"power3.out"}});
      tl.fromTo(".g10-bg",{scale:1.1},{scale:1,duration:2.4,ease:"power4.inOut"})
        .fromTo(".g10-box",{opacity:0,y:40,filter:"blur(10px)"},{opacity:1,y:0,filter:"blur(0px)",duration:1.1},"-=1")
        .fromTo(".g10-t > *",{opacity:0,y:14},{opacity:1,y:0,duration:.75,stagger:.15},"-=.5");
    },root);
    return()=>ctx.revert();
  },[]);
  return(
    <div ref={root} className="page grain vig">
      <div className="g10-bg absolute inset-0">
        <Image src={IMG.pinkGdn} alt="Pink garden" fill className="object-cover object-center" priority sizes="100vw" quality={90}/>
        <div className="absolute inset-0" style={{background:"linear-gradient(to bottom,rgba(26,10,15,.2) 0%,rgba(184,74,98,.1) 40%,rgba(26,10,15,.55) 100%)"}}/>
      </div>
      {/* Content */}
      <div className="g10-box absolute left-8 md:left-14 top-1/2 -translate-y-1/2 opacity-0">
        <div className="g10-t flex flex-col gap-5 max-w-xs">
          <p className="tl opacity-0" style={{color:"rgba(255,188,213,.9)"}}>Chapter 10</p>
          <h2 className="td opacity-0" style={{fontSize:"clamp(2rem,5vw,4rem)",color:"#FFF8F8",lineHeight:1.05,textShadow:"0 4px 40px rgba(0,0,0,.4)"}}>
            A Garden<br/>of Feelings
          </h2>
          <p
  className="tb opacity-0"
  style={{
    fontSize: ".9rem",
    color: "rgba(255,225,236,.85)",
    lineHeight: 1.9,
    maxWidth: 260,
  }}
>
  Every flower carries a word I couldn&apos;t say out loud.
</p>
          <div className="opacity-0">
            <button onClick={onNext} className="btn btn-p">
              <span>Open the garden →</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
