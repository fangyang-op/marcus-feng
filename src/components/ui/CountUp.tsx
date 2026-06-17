"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 數字滾動動畫(count-up)。進入視窗時從 0 數到目標值。
 * 會保留原字串的前後綴與千分位格式，例如:
 *   "+140%" → 動畫 0→140，前綴 "+" 後綴 "%"
 *   "3,300 萬+" → 0→3,300(含逗號)，後綴 " 萬+"
 * 解析不到數字時，直接原樣顯示(不動畫)。
 */
export function CountUp({
  value,
  duration = 1200,
  className = "",
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const match = value.match(/[\d,]+(?:\.\d+)?/);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(() => (match ? buildAt(value, match, 0) : value));
  const started = useRef(false);

  useEffect(() => {
    if (!match) return;
    const node = ref.current;
    if (!node) return;

    const target = parseFloat(match[0].replace(/,/g, ""));
    const hasComma = match[0].includes(",");
    const decimals = match[0].includes(".") ? match[0].split(".")[1].length : 0;

    const run = () => {
      if (started.current) return;
      started.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - t, 3);
        const current = target * eased;
        setDisplay(buildAt(value, match, current, hasComma, decimals));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(node);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

/** 以目前數值重組整個字串(保留前後綴與格式) */
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
