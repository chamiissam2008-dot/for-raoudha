// Minimal canvas particle engine — used only in Page 12 (18→19)

export interface PSpec {
  x:number; y:number;
  vx:number; vy:number;
  size:number; color:string;
  rot:number; rotV:number;
  life:number;                // 1→0
  tx:number; ty:number;      // target position
  attracted:boolean;
  locked:boolean;
}

export function makeParticle(
  x:number, y:number, tx:number, ty:number, color:string
): PSpec {
  const a = Math.random() * Math.PI * 2;
  const s = 3 + Math.random() * 8;
  return {
    x, y,
    vx: Math.cos(a) * s,
    vy: Math.sin(a) * s - 3,
    size: 3 + Math.random() * 7,
    color,
    rot: Math.random() * Math.PI * 2,
    rotV: (Math.random() - 0.5) * 0.1,
    life: 1,
    tx, ty,
    attracted: false,
    locked: false,
  };
}

export function updateParticle(p: PSpec, attrStr: number) {
  if (p.locked) return;
  if (p.attracted && attrStr > 0) {
    const dx = p.tx - p.x, dy = p.ty - p.y;
    const d  = Math.hypot(dx, dy);
    if (d < 1.5) { p.locked = true; p.x = p.tx; p.y = p.ty; return; }
    const f = Math.min(attrStr / d, 3.5);
    p.vx += dx * f * 0.04;
    p.vy += dy * f * 0.04;
    p.vx *= 0.80; p.vy *= 0.80;
  } else {
    p.vy += 0.12;
    p.vx *= 0.988; p.vy *= 0.988;
  }
  p.x += p.vx; p.y += p.vy;
  p.rot += p.rotV;
}

export function drawPetal(ctx: CanvasRenderingContext2D, p: PSpec) {
  if (p.life <= 0) return;
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rot);
  ctx.globalAlpha = p.life;
  ctx.fillStyle   = p.color;
  const h = p.size, w = p.size * 0.42;
  ctx.beginPath();
  ctx.moveTo(0, -h*.5);
  ctx.bezierCurveTo(w,-h*.25, w, h*.25, 0, h*.5);
  ctx.bezierCurveTo(-w,h*.25,-w,-h*.25, 0,-h*.5);
  ctx.fill();
  ctx.restore();
}

// Generate letter "9" target positions around (cx,cy) with radius r
export function nineTargets(
  cx:number, cy:number, r:number, n:number
): {x:number; y:number}[] {
  const pts: {x:number; y:number}[] = [];
  const circN  = Math.round(n * 0.65);
  const tailN  = n - circN;
  for (let i = 0; i < circN; i++) {
    const a = (Math.PI*2*i)/circN;
    pts.push({ x:cx+Math.cos(a)*r+(Math.random()-.5)*3, y:cy-r*.15+Math.sin(a)*r+(Math.random()-.5)*3 });
  }
  for (let i = 0; i < tailN; i++) {
    const t = i/(tailN-1);
    pts.push({ x:cx+r*.88+(Math.random()-.5)*2.5, y:cy-r*.15+r+t*r+(Math.random()-.5)*2 });
  }
  return pts;
}
