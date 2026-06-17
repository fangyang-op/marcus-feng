"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 數字滾動動畫（count-up）。進入視窗時從 0 數到目標值。
 * 會保留原字串的前後綴與千分位格式，例如:
 *   "+140%" → 動畫 0→140，前綴 "+" 後綴 "%"
 *   "NT$4.5M" → 0→4.5，前綴 "NT$" 後綴 "M"
 * 解析不到數字時，直接原樣顯示（不動畫）。
 * 語系切換導致 value 改變時:若已動畫過則直接顯示新值（不重數）。
 */
const NUM = /[\d,]+(?:\.\d+)?/;

export function CountUp({
  value,
  duration = 1200,
  className = "",
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const valueRef = useRef(value);
  valueRef.current = value;
  const started = useRef(false);

  const [display, setDisplay] = useState(() => {
    const m = value.match(NUM);
    return m ? buildAt(value, m, 0) : value;
  });

  // 進入視窗時動畫一次（用 valueRef 取最新值,避免切語系後數到舊值）
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const animate = () => {
      if (started.current) return;
      started.current = true;
      const v = valueRef.current;
      const m = v.match(NUM);
      if (!m) {
        setDisplay(v);
        return;
      }
      const target = parseFloat(m[0].replace(/,/g, ""));
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        setDisplay(buildAt(v, m, target * eased));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          animate();
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [duration]);

  // value 改變（語系切換）:已數過直接顯示新值;還沒進視窗則顯示新值的 0 起點
  useEffect(() => {
    const m = value.match(NUM);
    if (started.current) setDisplay(value);
    else setDisplay(m ? buildAt(value, m, 0) : value);
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

/** 以目前數值重組整個字串（保留前後綴與格式） */
function buildAt(
  original: string,
  match: RegExpMatchArray,
  current: number,
  hasComma = match[0].includes(","),
  decimals = match[0].includes(".") ? match[0].split(".")[1].length : 0
) {
  const idx = match.index ?? 0;
  const before = original.slice(0, idx);
  const after = original.slice(idx + match[0].length);
  const num = decimals > 0 ? current.toFixed(decimals) : String(Math.round(current));
  const formatted = hasComma
    ? Number(num).toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : num;
  return `${before}${formatted}${after}`;
}
