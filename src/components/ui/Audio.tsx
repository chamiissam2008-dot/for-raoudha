"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Audio() {
  const [on,setOn]=useState(false), [rdy,setRdy]=useState(false), [show,setShow]=useState(false);
  const a = useRef<HTMLAudioElement|null>(null);

  useEffect(() => {
    const el = new window.Audio("/audio/ambient.mp3");
    el.loop=true; el.volume=.18; el.preload="metadata";
    el.addEventListener("canplaythrough",()=>setRdy(true));
    a.current=el;
    const t=setTimeout(()=>setShow(true),2200);
    return ()=>{ clearTimeout(t); el.pause(); };
  },[]);

  const toggle=()=>{
    const el=a.current; if(!el) return;
    on ? (el.pause(),setOn(false)) : el.play().then(()=>setOn(true)).catch(()=>{});
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button onClick={toggle} disabled={!rdy}
          className="fixed bottom-7 left-7 z-50"
          style={{ width:44,height:44,borderRadius:"50%",border:"1px solid rgba(240,128,152,.3)",
            background:"rgba(255,248,248,.6)",backdropFilter:"blur(16px)",
            display:"grid",placeItems:"center",cursor:"pointer",color:"#B84A62",
            transition:"all .4s" }}
          initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
          exit={{ opacity:0 }} title={on?"Mute":"Enable ambient sound"}>
          {on ? (
            <div className="flex items-end gap-[2px]" style={{ height:14 }}>
              {[3,6,4,7,4].map((h,i) => (
                <motion.span key={i} style={{ width:2,background:"#B84A62",borderRadius:9999,display:"block" }}
                  animate={{ height:[h,h*1.9,h,h*2.2,h] }}
                  transition={{ duration:.9,delay:i*.1,repeat:Infinity,ease:"easeInOut" }}/>
              ))}
            </div>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
            </svg>
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
