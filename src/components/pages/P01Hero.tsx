"use client";
import {useEffect,useRef} from "react";
import Image from "next/image";
import {gsap} from "gsap";
import {IMG,C} from "@/lib/constants";
interface Props{onNext:()=>void}
export default function P01Hero({onNext}:Props){
  const root=useRef<HTMLDivElement>(null),btn=useRef<HTMLButtonElement>(null);
  useEffect(()=>{
    const ctx=gsap.context(()=>{
      const tl=gsap.timeline({defaults:{ease:"power3.out"},delay:.2});
      tl.fromTo(".h-img",{scale:1.1},{scale:1,duration:2.2,ease:"power4.inOut"})
        .fromTo(".h-ov",{opacity:0},{opacity:1,duration:1},"-=1.5")
        .fromTo(".h-name span",{clipPath:"inset(0 100% 0 0)",opacity:0},{clipPath:"inset(0 0% 0 0)",opacity:1,duration:1,stagger:.07,ease:"power4.inOut"},"-=.8")
        .fromTo(".h-sub",{opacity:0,y:12},{opacity:1,y:0,duration:.8},"-=.3")
        .fromTo(".h-btn",{opacity:0,scale:.85,y:20},{opacity:1,scale:1,y:0,duration:.9,ease:"back.out(1.4)"},"-=.3");
    },root);
    // Parallax
    const mv=(e:MouseEvent)=>{
      const xp=(e.clientX/innerWidth-.5)*2,yp=(e.clientY/innerHeight-.5)*2;
      gsap.to(".h-img-inner",{x:xp*-16,y:yp*-9,duration:1.4,ease:"power2.out"});
    };
    window.addEventListener("mousemove",mv);
    // Magnetic
    const b=btn.current!;
    const bm=(e:MouseEvent)=>{const r=b.getBoundingClientRect();gsap.to(b,{x:(e.clientX-r.left-r.width/2)*.25,y:(e.clientY-r.top-r.height/2)*.25,duration:.4,ease:"power2.out"});};
    const bl=()=>gsap.to(b,{x:0,y:0,duration:.7,ease:"elastic.out(1,.4)"});
    b.addEventListener("mousemove",bm);b.addEventListener("mouseleave",bl);
    return()=>{ctx.revert();window.removeEventListener("mousemove",mv);b.removeEventListener("mousemove",bm);b.removeEventListener("mouseleave",bl);};
  },[]);
  return(
    <div ref={root} className="page grain">
      {/* Full bleed background */}
      <div className="h-img absolute inset-0">
        <div className="h-img-inner absolute inset-[-6%]">
          <Image src={IMG.rHero} alt="Pink roses" fill className="object-cover" priority sizes="110vw" quality={92}/>
        </div>
      </div>
      {/* Overlays */}
      <div className="h-ov absolute inset-0 opacity-0" style={{background:"linear-gradient(160deg,rgba(26,10,15,.15) 0%,rgba(184,74,98,.12) 35%,rgba(26,10,15,.55) 100%)"}}/>
      <div className="absolute inset-0" style={{background:"radial-gradient(ellipse at 50% 80%,rgba(26,10,15,.5) 0%,transparent 65%)"}}/>
      {/* Content */}
      <div className="relative z-10 flex flex-col items-start justify-end h-full px-10 md:px-16 pb-32 select-none">
        <div className="h-name td" style={{fontSize:"clamp(3.5rem,10vw,9rem)",lineHeight:.88,color:"#FFF8F8",textShadow:"0 4px 60px rgba(255,188,213,.3)"}}>
          {"RAOUDHA".split("").map((ch,i)=>(
            <span key={i} className="inline-block opacity-0" style={{clipPath:"inset(0 100% 0 0)"}}>{ch}</span>
          ))}
          <br/>
          <span className="h-name" style={{fontSize:"60%",letterSpacing:".25em",fontStyle:"normal",fontWeight:300}}>
            {"RIHAM".split("").map((ch,i)=>(
              <span key={i} className="inline-block opacity-0" style={{clipPath:"inset(0 100% 0 0)"}}>{ch}</span>
            ))}
          </span>
        </div>
        <p className="h-sub tl mt-4 mb-8 opacity-0" style={{color:"rgba(255,255,255,.8)",letterSpacing:".22em"}}>A special journey made just for you</p>
        <button ref={btn} onClick={onNext} className="h-btn btn btn-w opacity-0">
          <span>Begin</span>
        </button>
      </div>
    </div>
  );
}
