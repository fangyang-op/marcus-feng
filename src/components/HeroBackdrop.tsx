"use client";

import { useEffect, useRef } from "react";

/**
 * Hero 背景:等距「智能電路」— 全幅等距網格,光點訊號在節點間跳動、抵達即點亮節點。
 * 隱喻 = 系統(網格/走線)× 智能(訊號傳遞/思考)× 規模化(整片鋪滿)。
 *
 * 手刻 Canvas 2D(零依賴、低調):
 * - 淡→深漸層(上方淡、下方深),刻意不搶眼,讓標題為主角。
 * - 支援 prefers-reduced-motion(只畫一張靜態網格);分頁切到背景時暫停(省電)。
 * - DPR 縮放、自動 resize;先同步畫一幀避免無 rAF 環境留白。
 */
type Node = { gx: number; gy: number; x: number; y: number; e: number };
type Sig = { from: number; to: number; p: number; spd: number };
type Iso = { cx: number; cy: number; TW: number; TH: number };

export function HeroBackdrop() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx0 = canvas.getContext("2d");
    if (!ctx0) return;
    const cv = canvas;
    const ctx = ctx0;

    const TAU = Math.PI * 2;
    const clamp = (x: number) => Math.max(0, Math.min(1, x));
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    let w = 1, h = 1;
    let o: Iso = { cx: 0, cy: 0, TW: 1, TH: 1 };
    let nodes: Node[] = [];
    let edges: Array<[number, number]> = [];
    let adj: number[][] = [];
    let signals: Sig[] = [];

    const fade = (y: number) => 0.1 + 0.55 * clamp(y / h);

    function build() {
      const TW = Math.max(28, Math.min(w, h) / 9);
      o = { cx: w / 2, cy: h / 2, TW, TH: TW / 2 };
      const iso = (gx: number, gy: number) => ({ x: o.cx + (gx - gy) * o.TW, y: o.cy + (gx + gy) * o.TH });
      const RR = Math.ceil((w / (2 * o.TW) + h / (2 * o.TH)) / 2) + 2;
      nodes = [];
      const byKey: Record<string, number> = {};
      for (let gx = -RR; gx <= RR; gx++)
        for (let gy = -RR; gy <= RR; gy++) {
          const p = iso(gx, gy);
          if (p.x < -o.TW || p.x > w + o.TW || p.y < -o.TH || p.y > h + o.TH) continue;
          byKey[gx + "," + gy] = nodes.length;
          nodes.push({ gx, gy, x: p.x, y: p.y, e: 0 });
        }
      edges = [];
      nodes.forEach((n) => {
        ([[1, 0], [0, 1]] as const).forEach(([dx, dy]) => {
          const j = byKey[(n.gx + dx) + "," + (n.gy + dy)];
          if (j != null) edges.push([byKey[n.gx + "," + n.gy], j]);
        });
      });
      adj = nodes.map(() => []);
      edges.forEach(([a, b]) => { adj[a].push(b); adj[b].push(a); });
      signals = Array.from({ length: Math.max(10, (nodes.length / 7) | 0) }, () => {
        const f = (Math.random() * nodes.length) | 0;
        const nb = adj[f];
        return nb && nb.length ? { from: f, to: nb[(Math.random() * nb.length) | 0], p: Math.random(), spd: 0.012 + Math.random() * 0.018 } : null;
      }).filter(Boolean) as Sig[];
    }

    function size() {
      const r = cv.getBoundingClientRect();
      w = Math.max(1, r.width); h = Math.max(1, r.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }
    size();

    function render() {
      ctx.clearRect(0, 0, w, h);
      // 走線
      ctx.lineWidth = 1;
      for (const [i, j] of edges) {
        const a = nodes[i], b = nodes[j];
        const av = Math.max(a.e, b.e), fa = fade((a.y + b.y) / 2);
        ctx.strokeStyle = `rgba(90,150,255,${(0.05 + 0.4 * av) * fa})`;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
      // 訊號(節點間跳動)
      ctx.globalCompositeOperation = "lighter";
      for (const sig of signals) {
        const a = nodes[sig.from], b = nodes[sig.to];
        if (!reduce) {
          sig.p += sig.spd;
          if (sig.p >= 1) {
            b.e = 1;
            const nb = adj[sig.to].filter((n) => n !== sig.from);
            sig.from = sig.to;
            const pool = nb.length ? nb : adj[sig.to];
            sig.to = pool[(Math.random() * pool.length) | 0];
            sig.p = 0;
            continue;
          }
        }
        const x = a.x + (b.x - a.x) * sig.p, y = a.y + (b.y - a.y) * sig.p, fa = fade(y);
        ctx.fillStyle = `rgba(170,215,255,${0.85 * fa})`;
        ctx.beginPath(); ctx.arc(x, y, 2, 0, TAU); ctx.fill();
      }
      if (!reduce) for (const n of nodes) n.e *= 0.93;
      // 節點
      for (const n of nodes) {
        const fa = fade(n.y), r = 1.4 + n.e * 3;
        if (n.e > 0.12) {
          const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r + 9);
          g.addColorStop(0, `rgba(150,200,255,${n.e * 0.45 * fa})`); g.addColorStop(1, "rgba(150,200,255,0)");
          ctx.fillStyle = g; ctx.fillRect(n.x - r - 9, n.y - r - 9, (r + 9) * 2, (r + 9) * 2);
        }
        ctx.fillStyle = `rgba(160,205,255,${(0.18 + 0.6 * n.e) * fa})`;
        ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, TAU); ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    }

    let raf = 0;
    const tick = () => { raf = requestAnimationFrame(tick); render(); };
    render(); // 同步首幀
    if (!reduce) raf = requestAnimationFrame(tick);

    const ro = new ResizeObserver(() => { size(); render(); });
    ro.observe(cv);
    const onVis = () => {
      if (reduce) return;
      if (document.hidden) { if (raf) { cancelAnimationFrame(raf); raf = 0; } }
      else if (!raf) raf = requestAnimationFrame(tick);
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
