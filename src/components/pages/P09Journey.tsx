"use client";
import {useEffect,useRef} from "react";
import Image from "next/image";
import {gsap} from "gsap";
import {IMG,C} from "@/lib/constants";
interface Props{onNext:()=>void}
const STOPS=[
  {label:"First\nConversation",date:"13.06.2022",src:IMG.rClose,   side:"bottom"},
  {label:"A Special\nConnection",  date:"20.06.2022",src:IMG.cWhite,  side:"top"   },
  {label:"Memories\nBuilt",        date:"14.08.2022",src:IMG.rGarden, side:"bottom"},
  {label:"Countless\nMoments",     date:"still\ncounting",src:IMG.peony,    side:"top"   },
];
export default function P09Journey({onNext}:Props){
  const root=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const ctx=gsap.context(()=>{
      const tl=gsap.timeline({delay:.3,defaults:{ease:"power3.out"}});
      tl.fromTo(".j9h",{opacity:0,y:-18},{opacity:1,y:0,duration:.9})
        .fromTo(".j9-line",{scaleX:0},{scaleX:1,duration:1.4,ease:"power2.inOut"},"-=.3")
        .fromTo(".j9-stop",{opacity:0,scale:.7},{opacity:1,scale:1,duration:.7,stagger:.2,ease:"back.out(1.6)"},"-=.8")
        .fromTo(".j9-label",{opacity:0,y:(_i,el)=>el.dataset.side==="bottom"?16:-16},{opacity:1,y:0,duration:.6,stagger:.2},"-=.8");
    },root);
    return()=>ctx.revert();
  },[]);
  return(
    <div ref={root} className="page grain" style={{background:`linear-gradient(160deg,${C.cr} 0%,${C.r50} 50%,${C.cr} 100%)`}}>
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{background:`radial-gradient(ellipse at 50% 30%,rgba(240,128,152,.12) 0%,transparent 60%)`}}/>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-8 px-6">
        {/* Header */}
        <div className="j9h flex flex-col items-center gap-2 opacity-0">
          <p className="tl" style={{color:C.r5,letterSpacing:".3em"}}>Our Journey</p>
          <div className="dh w-16"/>
        </div>
        {/* Timeline */}
        <div className="relative w-full max-w-3xl" style={{height:"min(320px,60vw)"}}>
          {/* Horizontal line */}
          <div className="j9-line absolute left-0 right-0" style={{top:"50%",height:2,background:`linear-gradient(to right,transparent,${C.r3},${C.r3},transparent)`,transformOrigin:"left",scaleX:0}}/>
          {/* Stops */}
          {STOPS.map((s,i)=>{
            const pct=10+i*(80/3);
            return(
              <div key={i} className="absolute" style={{left:`${pct}%`,top:"50%",transform:"translate(-50%,-50%)"}}>
                {/* Circle photo */}
                <div className="j9-stop relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden opacity-0"
                  style={{border:`2px solid ${C.r3}`,boxShadow:`0 4px 20px rgba(184,74,98,.3)`}}>
                  <Image src={s.src} alt="" fill className="object-cover" sizes="64px" quality={70} loading="lazy"/>
                </div>
                {/* Label */}
                <div className={`j9-label absolute opacity-0 flex flex-col items-center gap-1`}
                  data-side={s.side}
                  style={{width:120,left:"50%",transform:"translateX(-50%)",
                    [s.side==="bottom"?"top":"bottom"]:s.side==="bottom"?"calc(100% + 12px)":"calc(100% + 12px)"}}>
                  <p style={{fontFamily:"var(--font-cor),serif",fontSize:"clamp(.65rem,1.1vw,.82rem)",color:C.r6,textAlign:"center",whiteSpace:"pre-line",lineHeight:1.35}}>{s.label}</p>
                  <p className="tl" style={{color:C.r4,fontSize:".52rem",whiteSpace:"pre-line",textAlign:"center"}}>{s.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
