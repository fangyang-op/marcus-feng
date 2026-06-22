"use client";

import { useEffect, useRef } from "react";

/**
 * Hero 背景:能量持續從四面八方匯聚到中央「營運核心」。
 * 隱喻 = 把分散的輸入(資料 / 流程 / 各管道)收斂、編排成一個有秩序的系統。
 *
 * 手刻 Canvas 2D(零依賴、手機順):
 * - 粒子以極座標朝中心移動,越近中心越亮;到中心後重生於外圈,形成持續灌注感。
 * - 中央有脈動核心 + 擴散同心圓(orchestration / 雷達意象,非齒輪硬碟那種老派符號)。
 * - 支援 prefers-reduced-motion(只畫一張靜態幀);離開視窗暫停(省電);DPR 縮放、自動 resize。
 */
export function HeroBackdrop() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    let w = 1, h = 1, cx = 0, cy = 0, R = 1, dpr = 1;
    const setSize = () => {
      const r = canvas.getBoundingClientRect();
      w = Math.max(1, r.width);
      h = Math.max(1, r.height);
      cx = w / 2;
      cy = h / 2;
      R = Math.hypot(w, h) / 2 + 40;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();

    type P = { ang: number; rad: number; spd: number; size: number };
    const make = (atEdge: boolean): P => ({
      ang: Math.random() * Math.PI * 2,
      rad: atEdge ? R * (0.55 + Math.random() * 0.5) : Math.random() * R,
      spd: 0.6 + Math.random() * 1.5,
      size: 0.6 + Math.random() * 1.5,
    });
    const COUNT = w < 640 ? 40 : 82;
    const ps: P[] = Array.from({ length: COUNT }, () => make(false));

    let t = 0;

    const drawCore = () => {
      const pulse = reduce ? 0 : Math.sin(t * 0.03);
      const coreR = 72 + pulse * 10;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
      g.addColorStop(0, "rgba(125,165,255,0.50)");
      g.addColorStop(0.45, "rgba(45,80,235,0.16)");
      g.addColorStop(1, "rgba(45,80,235,0)");
      ctx.fillStyle = g;
      ctx.fillRect(cx - coreR, cy - coreR, coreR * 2, coreR * 2);

      const ringMax = Math.min(w, h) * 0.42;
      for (let k = 0; k < 3; k++) {
        const ph = reduce ? (k + 1) / 4 : (t * 0.005 + k / 3) % 1;
        ctx.strokeStyle = `rgba(135,170,255,${0.15 * (1 - ph)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, ph * ringMax, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.fillStyle = "rgba(205,225,255,0.95)";
      ctx.beginPath();
      ctx.arc(cx, cy, 2.6, 0, Math.PI * 2);
      ctx.fill();
    };

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      drawCore();

      ctx.globalCompositeOperation = "lighter";
      for (const p of ps) {
        if (!reduce) {
          p.rad -= p.spd;
          p.ang += 0.0009;
          if (p.rad < 6) Object.assign(p, make(true));
        }
        const near = 1 - Math.min(1, p.rad / R);
        const a = 0.1 + near * 0.6;
        const x = cx + Math.cos(p.ang) * p.rad;
        const y = cy + Math.sin(p.ang) * p.rad;
        const tr = p.rad + 10 + near * 16;
        const x2 = cx + Math.cos(p.ang) * tr;
        const y2 = cy + Math.sin(p.ang) * tr;

        ctx.strokeStyle = `rgba(110,150,250,${a * 0.45})`;
        ctx.lineWidth = p.size;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        ctx.fillStyle = `rgba(175,205,255,${a})`;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    };

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      t += 1;
      render();
    };

    // 先同步畫一幀(立即有畫面、不閃白);非 reduce 再啟動 rAF 動畫迴圈
    render();
    if (!reduce) raf = requestAnimationFrame(tick);

    const ro = new ResizeObserver(() => {
      setSize();
      if (reduce) render();
    });
    ro.observe(canvas);

    // 只在「分頁切到背景」時暫停(省電),用可靠的 Page Visibility API,
    // 不用 IntersectionObserver(在部分無頭/嵌入環境會誤報而停掉動畫)。
    const onVis = () => {
      if (reduce) return;
      if (document.hidden) {
        if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      } else if (!raf) {
        raf = requestAnimationFrame(tick);
      }
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
