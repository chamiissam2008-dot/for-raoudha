"use client";
import {useState,useCallback,useEffect} from "react";
import {AnimatePresence,motion} from "framer-motion";
import dynamic from "next/dynamic";
import Nav   from "@/components/ui/Nav";
import Audio from "@/components/ui/Audio";
import Cursor from "@/components/ui/Cursor";

const PAGES=[
  dynamic(()=>import("@/components/pages/P01Hero")),
  dynamic(()=>import("@/components/pages/P02Petals")),
  dynamic(()=>import("@/components/pages/P03Stats")),
  dynamic(()=>import("@/components/pages/P04Gallery")),
  dynamic(()=>import("@/components/pages/P05HerWorld")),
  dynamic(()=>import("@/components/pages/P06Cats")),
  dynamic(()=>import("@/components/pages/P07Movies")),
  dynamic(()=>import("@/components/pages/P08AoT")),
  dynamic(()=>import("@/components/pages/P09Journey")),
  dynamic(()=>import("@/components/pages/P10Garden")),
  dynamic(()=>import("@/components/pages/P11Letter")),
  dynamic(()=>import("@/components/pages/P12Age")),
  dynamic(()=>import("@/components/pages/P13Birthday")),
  dynamic(()=>import("@/components/pages/P14Thanks")),
  dynamic(()=>import("@/components/pages/P15End")),
];
const TOTAL=PAGES.length, DUR=.7;

// Light nav pages (dark background pages)
const LIGHT_NAV=[6,7,11,12];

function Curtain({show}:{show:boolean}){
  return(
    <AnimatePresence>
      {show&&(
        <motion.div key="c" className="fixed inset-0 z-[200] pointer-events-none"
          style={{background:"linear-gradient(135deg,#FFE1EC 0%,#FFBCD5 50%,#F08098 100%)"}}
          initial={{clipPath:"polygon(0 100%,100% 100%,100% 100%,0 100%)"}}
          animate={{clipPath:["polygon(0 100%,100% 100%,100% 100%,0 100%)","polygon(0 0,100% 0,100% 100%,0 100%)","polygon(0 0,100% 0,100% 0,0 0)"]}}
          transition={{duration:DUR*1.8,times:[0,.44,1],ease:[.22,1,.36,1]}}/>
      )}
    </AnimatePresence>
  );
}

const pv={
  enter:(d:number)=>({opacity:0,y:d>0?35:-35,scale:.975,filter:"blur(4px)"}),
  center:{opacity:1,y:0,scale:1,filter:"blur(0px)",transition:{duration:DUR,ease:[.22,1,.36,1]}},
  exit:(d:number)=>({opacity:0,y:d>0?-22:22,scale:.975,filter:"blur(3px)",transition:{duration:DUR*.6,ease:[.4,0,.2,1]}}),
};

export default function Home(){
  const [cur,setCur]=useState(0),[dir,setDir]=useState(1),[busy,setBusy]=useState(false),[curtain,setCurtain]=useState(false);
  const go=useCallback((nxt:number)=>{
    if(busy||nxt<0||nxt>=TOTAL)return;
    setBusy(true);setDir(nxt>cur?1:-1);setCurtain(true);
    setTimeout(()=>{setCur(nxt);setCurtain(false);setTimeout(()=>setBusy(false),DUR*1000);},DUR*680);
  },[busy,cur]);
  const next=useCallback(()=>go(cur+1),[go,cur]);
  const prev=useCallback(()=>go(cur-1),[go,cur]);
  useEffect(()=>{
    const fn=(e:KeyboardEvent)=>{if(e.key==="ArrowRight"||e.key==="ArrowDown")next();if(e.key==="ArrowLeft"||e.key==="ArrowUp")prev();};
    window.addEventListener("keydown",fn);return()=>window.removeEventListener("keydown",fn);
  },[next,prev]);
  const Page=PAGES[cur];
  return(
    <main className="fixed inset-0 overflow-hidden" style={{height:"100dvh"}}>
      <Cursor/>
      <AnimatePresence custom={dir} mode="wait">
        <motion.div key={cur} custom={dir} variants={pv} initial="enter" animate="center" exit="exit"
          className="absolute inset-0" style={{willChange:"transform,opacity,filter"}}>
          <Page onNext={next}/>
        </motion.div>
      </AnimatePresence>
      <Curtain show={curtain}/>
      <Nav cur={cur} total={TOTAL} onNext={next} onPrev={prev} busy={busy} light={LIGHT_NAV.includes(cur)}/>
      <Audio/>
      <motion.p className="fixed top-6 right-20 z-50 pointer-events-none"
        style={{fontFamily:"var(--font-cor),serif",fontStyle:"italic",fontSize:".68rem",letterSpacing:".2em",color:"rgba(184,74,98,.5)"}}
        initial={{opacity:0}} animate={{opacity:1}} transition={{delay:3}}>by ISSAM</motion.p>
    </main>
  );
}
