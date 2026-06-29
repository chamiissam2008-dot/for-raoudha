"use client";
import {useEffect,useRef,useState} from "react";
import {motion,AnimatePresence} from "framer-motion";
import {makeParticle,updateParticle,drawPetal,nineTargets,PSpec} from "@/lib/canvas";
import {C} from "@/lib/constants";
interface Props{onNext:()=>void}
type Ph="idle"|"show18"|"burst"|"reform"|"show19"|"done";
const COLS=[C.r3,C.r2,C.r4,"#FFF8F8",C.r5,C.gold,C.r1];
const N=280;

function useCanvas(cvRef:React.RefObject<HTMLCanvasElement>,phase:Ph,onDone:()=>void){
  useEffect(()=>{
    if(phase!=="burst")return;
    const cv=cvRef.current;if(!cv)return;
    const ctx=cv.getContext("2d")!;
    let W=cv.width=innerWidth,H=cv.height=innerHeight;
    const rs=()=>{W=cv.width=innerWidth;H=cv.height=innerHeight;};
    window.addEventListener("resize",rs);
    const cx=W/2,cy=H/2;
    const targets=nineTargets(cx+W*.065,cy,Math.min(W,H)*.085,N);
    const ps:PSpec[]=Array.from({length:N},(_,i)=>
      makeParticle(cx+W*.065+(Math.random()-.5)*50,cy+(Math.random()-.5)*50,
        targets[i].x,targets[i].y,COLS[Math.floor(Math.random()*COLS.length)]));
    let raf:number,attracted=false,aStr=0;
    const t1=setTimeout(()=>{attracted=true;ps.forEach(p=>p.attracted=true);},1800);
    const t2=setTimeout(()=>onDone(),3800);
    const tick=()=>{
      ctx.clearRect(0,0,W,H);
      if(attracted)aStr=Math.min(aStr+.04,3.2);
      let locked=0;
      for(const p of ps){updateParticle(p,aStr);if(p.locked)locked++;drawPetal(ctx,p);}
      if(locked>N*.65){
        const prog=(locked-N*.65)/(N*.35);
        const g=ctx.createRadialGradient(cx+W*.065,cy,0,cx+W*.065,cy,Math.min(W,H)*.15);
        g.addColorStop(0,`rgba(201,169,110,${prog*.3})`);
        g.addColorStop(1,"rgba(201,169,110,0)");
        ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
      }
      raf=requestAnimationFrame(tick);
    };
    raf=requestAnimationFrame(tick);
    return()=>{cancelAnimationFrame(raf);clearTimeout(t1);clearTimeout(t2);window.removeEventListener("resize",rs);};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[phase]);
}

export default function P12Age({onNext}:Props){
  const cvRef=useRef<HTMLCanvasElement>(null);
  const [ph,setPh]=useState<Ph>("idle");
  useEffect(()=>{
    const t0=setTimeout(()=>setPh("show18"),350);
    const t1=setTimeout(()=>setPh("burst"),1900);
    return()=>{clearTimeout(t0);clearTimeout(t1);};
  },[]);
  const handleDone=()=>{setPh("show19");setTimeout(()=>setPh("done"),1200);};
  useCanvas(cvRef,ph,handleDone);
  const STARS=Array.from({length:28},()=>({x:`${Math.random()*100}%`,y:`${Math.random()*100}%`,s:1.5+Math.random()*2.5,dur:3+Math.random()*5,del:Math.random()*5}));
  return(
    <div className="page grain" style={{background:`radial-gradient(ellipse at 50% 40%,${C.r1} 0%,${C.r50} 50%,${C.cr} 100%)`}}>
      {STARS.map((s,i)=>(
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{left:s.x,top:s.y,width:s.s,height:s.s,background:`radial-gradient(circle,${C.r4},${C.r2})`}}
          animate={{opacity:[0,.8,0],scale:[0,1,0]}}
          transition={{duration:s.dur,delay:s.del,repeat:Infinity,ease:"easeInOut"}}/>
      ))}
      {[500,370,240].map((sz,i)=>(
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{width:sz,height:sz,border:`1px solid rgba(184,74,98,${.12-i*.04})`,top:"50%",left:"50%",marginTop:-sz/2,marginLeft:-sz/2}}
          animate={{rotate:i%2===0?360:-360}}
          transition={{duration:24+i*8,repeat:Infinity,ease:"linear"}}/>
      ))}
      <canvas ref={cvRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{zIndex:10}}/>
      <div className="relative flex flex-col items-center text-center px-6" style={{zIndex:20}}>
        <p className="tl mb-9" style={{color:C.r7}}>A New Chapter Begins</p>
        <div style={{height:"clamp(130px,20vw,210px)",width:"clamp(200px,32vw,360px)",position:"relative"}}>
          <AnimatePresence mode="wait">
            {(ph==="show18"||ph==="burst")&&(
              <motion.div key="18" className="absolute inset-0 flex items-center justify-center gap-3"
                initial={{opacity:0,scale:.72}}
                animate={ph==="burst"?{opacity:0,scale:1.35,filter:"blur(28px)"}:{opacity:1,scale:1,filter:"blur(0px)"}}
                transition={{duration:ph==="burst"?.75:.9,ease:[.22,1,.36,1]}}>
                {["1","8"].map((ch,i)=>(
                  <span key={ch} className="td" style={{fontSize:"clamp(85px,14vw,155px)",color:i===1?C.r5:C.ink,lineHeight:1,letterSpacing:"-.03em",fontWeight:300}}>{ch}</span>
                ))}
              </motion.div>
            )}
            {(ph==="show19"||ph==="done")&&(
              <motion.div key="19" className="absolute inset-0 flex items-center justify-center gap-3"
                initial={{opacity:0,scale:1.4,filter:"blur(28px)"}}
                animate={{opacity:1,scale:1,filter:"blur(0px)"}}
                transition={{duration:1.3,ease:[.22,1,.36,1]}}>
                {["1","9"].map(ch=>(
                  <span key={ch} className="td sh-rose" style={{fontSize:"clamp(85px,14vw,155px)",lineHeight:1,fontWeight:300,letterSpacing:"-.03em"}}>{ch}</span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {ph==="done"&&(
            <motion.div className="flex flex-col items-center gap-4 mt-6"
              initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
              transition={{duration:1,ease:[.22,1,.36,1]}}>
              <div className="dh w-28"/>
              <p className="td italic" style={{fontSize:"clamp(1.4rem,3vw,2.3rem)",color:C.r6}}>A new chapter begins</p>
              <p className="tl" style={{color:C.r4,letterSpacing:".25em"}}>June 30 · 2026 · 19 Years of You</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
