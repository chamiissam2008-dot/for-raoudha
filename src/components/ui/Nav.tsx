"use client";
import { motion, AnimatePresence } from "framer-motion";

interface Props{cur:number;total:number;onNext:()=>void;onPrev:()=>void;busy:boolean;light?:boolean;}

export default function Nav({cur,total,onNext,onPrev,busy,light=false}:Props){
  const col=light?"rgba(255,255,255,.85)":"rgba(184,74,98,.85)";
  const borderCol=light?"rgba(255,255,255,.4)":"rgba(240,128,152,.4)";

  return(
    <>
      {/* Top-left page number */}
      <motion.div className="fixed top-7 left-7 z-50 pointer-events-none"
        initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1,duration:.8}}>
        <span style={{fontFamily:"var(--font-int),system-ui,sans-serif",fontSize:".65rem",fontWeight:400,
          letterSpacing:".25em",color:col,textShadow:"0 1px 8px rgba(0,0,0,.3)"}}>
          {String(cur+1).padStart(2,"0")}
        </span>
      </motion.div>

      {/* Top-right hamburger */}
      <motion.div className="fixed top-6 right-7 z-50 flex flex-col gap-[5px] pointer-events-none"
        initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.2}}>
        {[0,1,2].map(i=>(
          <div key={i} style={{width:i===1?18:24,height:1.5,background:col,borderRadius:9999,boxShadow:"0 1px 6px rgba(0,0,0,.3)"}}/>
        ))}
      </motion.div>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center pb-7 gap-4 pointer-events-none">
        {/* Dots */}
        <motion.div className="flex items-center gap-[5px]"
          initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.5}}>
          {Array.from({length:total},(_,i)=>(
            <motion.div key={i} className="rounded-full"
              animate={{width:i===cur?16:Math.abs(i-cur)<=1?4:3,height:4,
                backgroundColor:i===cur?"#B84A62":Math.abs(i-cur)<=1?"#F08098":"#FFBCD5"}}
              transition={{duration:.4,ease:[.22,1,.36,1]}}/>
          ))}
        </motion.div>

        {/* Buttons */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <AnimatePresence>
            {cur>0&&(
              <motion.button key="p" onClick={onPrev} disabled={busy}
                className="btn" style={{borderColor:borderCol,color:col,background:"rgba(255,255,255,.15)",backdropFilter:"blur(16px)"}}
                initial={{opacity:0,x:-12}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-12}}>
                <span>← Back</span>
              </motion.button>
            )}
          </AnimatePresence>
          {cur<total-1&&(
            <motion.button onClick={onNext} disabled={busy} className="btn btn-p"
              whileHover={{scale:1.04}} whileTap={{scale:.97}}>
              <span>Continue →</span>
            </motion.button>
          )}
        </div>
      </div>
    </>
  );
}
