"use client";

import { useEffect, useRef, useState } from "react";
import { Section, SectionHeading } from "./ui/Section";
import { decisionLogic as DL } from "@/data/decisionLogic";
import { useLocale } from "@/i18n";

/**
 * 決策邏輯:跨產業養成的六種思維。
 * 桌機 = 六邊形(進場描繪);手機 = 縱向主軸、捲到才依序點亮(沿用 Timeline 語彙)。
 * 配色收斂為品牌藍 + ink/slate,與全站一致。
 */

const PTS = [
  { x: 300, y: 70 },
  { x: 421, y: 140 },
  { x: 421, y: 280 },
  { x: 300, y: 350 },
  { x: 179, y: 280 },
  { x: 179, y: 140 },
];
const LABELS: { x: number; y: number; anchor: "middle" | "start" | "end" }[] = [
  { x: 300, y: 46, anchor: "middle" },
  { x: 441, y: 146, anchor: "start" },
  { x: 441, y: 286, anchor: "start" },
  { x: 300, y: 382, anchor: "middle" },
  { x: 159, y: 286, anchor: "end" },
  { x: 159, y: 146, anchor: "end" },
];
const CENTER = { x: 300, y: 210 };
const HEX_POINTS = PTS.map((p) => `${p.x},${p.y}`).join(" ");
// 雷達內圈(把六邊形往中心縮 k 倍),用來營造「滿格雷達」的層次。
const ring = (k: number) =>
  PTS.map((p) => `${(CENTER.x + k * (p.x - CENTER.x)).toFixed(1)},${(CENTER.y + k * (p.y - CENTER.y)).toFixed(1)}`).join(" ");
const GRID_RINGS = [0.42, 0.72];
// 進場每片扇形 / 標籤之間的間隔(秒),營造順時鐘依序灌滿。
const STEP = 0.24;
const PERIM = 840;

// 六邊形「上下文字標籤」的垂直 span 與水平內容範圍(viewBox 單位,量測得來)。
// 動態算 viewBox:讓「標籤頂↔標籤底」剛好等於右側卡片 box 高度(中/英、各視窗都對齊)。
const LABEL_SPAN = 353.5;
const LABEL_TOP = 31.8;
const CONTENT_CX = 307.3;
const CONTENT_W = 442;
const DEFAULT_VIEWBOX = "37.9 31.8 538.7 353.5";
function fitViewBox(hexW: number, boxH: number) {
  const w = Math.max((LABEL_SPAN * hexW) / boxH, CONTENT_W);
  return `${(CONTENT_CX - w / 2).toFixed(1)} ${LABEL_TOP} ${w.toFixed(1)} ${LABEL_SPAN}`;
}

function useInView<T extends Element>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

function useReduce() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(m.matches);
    const fn = () => setReduce(m.matches);
    m.addEventListener("change", fn);
    return () => m.removeEventListener("change", fn);
  }, []);
  return reduce;
}

/** 桌機:六邊形(品牌藍節點 + 深色中心)+ 六張說明卡 */
function HexDiagram() {
  const { t, locale } = useLocale();
  const reduce = useReduce();
  const [ref, inView] = useInView<HTMLDivElement>(0.25);
  const on = inView || reduce;
  const motion = !reduce;
  const centerLines = t(DL.center).split("\n");

  const hexColRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [viewBox, setViewBox] = useState(DEFAULT_VIEWBOX);
  const [hovered, setHovered] = useState<number | null>(null);
  useEffect(() => {
    const hexEl = hexColRef.current;
    const cardsEl = cardsRef.current;
    if (!hexEl || !cardsEl) return;
    const update = () => {
      const hexW = hexEl.getBoundingClientRect().width;
      const boxH = cardsEl.getBoundingClientRect().height;
      if (hexW > 0 && boxH > 0) setViewBox(fitViewBox(hexW, boxH));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(hexEl);
    ro.observe(cardsEl);
    // 字體載入後文字會重排 → 卡片高度變,重新量一次
    if (document.fonts?.ready) document.fonts.ready.then(update);
    return () => ro.disconnect();
  }, [locale]);

  return (
    <div ref={ref} className="grid grid-cols-12 items-center gap-8">
      <div ref={hexColRef} className="col-span-6">
        <svg viewBox={viewBox} className="font-sans w-full" role="img" aria-label="跨產業養成的六種決策邏輯六邊形">
          {/* 雷達格線(內圈) */}
          {GRID_RINGS.map((k) => (
            <polygon
              key={`ring-${k}`}
              points={ring(k)}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth={1}
              style={{ opacity: on ? 1 : 0, transition: motion ? "opacity .5s ease" : "none" }}
            />
          ))}
          {/* 六等份扇形:順時鐘一片片從中心推出,合成完整填滿 = 六邊形戰士的依序灌滿 */}
          {PTS.map((p, i) => {
            const next = PTS[(i + 1) % 6];
            const minX = Math.min(CENTER.x, p.x, next.x);
            const minY = Math.min(CENTER.y, p.y, next.y);
            const delay = (0.08 + STEP * i).toFixed(2);
            return (
              <polygon
                key={`wedge-${i}`}
                points={`${CENTER.x},${CENTER.y} ${p.x},${p.y} ${next.x},${next.y}`}
                fill="rgba(37,71,235,0.13)"
                style={{
                  opacity: on ? 1 : 0,
                  transformBox: "fill-box",
                  transformOrigin: `${(CENTER.x - minX).toFixed(1)}px ${(CENTER.y - minY).toFixed(1)}px`,
                  transform: on ? "scale(1)" : "scale(0)",
                  transition: motion
                    ? `transform .5s cubic-bezier(0.34,1.35,0.64,1) ${delay}s, opacity .25s ease ${delay}s`
                    : "none",
                }}
              />
            );
          })}
          {/* 分隔線:沿用原本的虛線輻條,隨扇形依序出現 */}
          {PTS.map((p, i) => (
            <line
              key={`sp-${i}`}
              x1={CENTER.x}
              y1={CENTER.y}
              x2={p.x}
              y2={p.y}
              stroke="#94a3b8"
              strokeWidth={1}
              strokeDasharray="3 5"
              style={{ opacity: on ? 1 : 0, transition: motion ? `opacity .4s ease ${(0.08 + i * STEP).toFixed(2)}s` : "none" }}
            />
          ))}
          {/* 外框:品牌藍實線,順時鐘描繪、與扇形同步 */}
          <polygon
            points={HEX_POINTS}
            fill="none"
            stroke="#2547eb"
            strokeWidth={1.5}
            strokeDasharray={PERIM}
            style={{ strokeDashoffset: on ? 0 : PERIM, transition: motion ? "stroke-dashoffset 1.5s ease .1s" : "none" }}
          />
          <circle cx={CENTER.x} cy={CENTER.y} r={46} fill="#0f172a" style={{ opacity: on ? 1 : 0, transition: motion ? "opacity .5s ease .35s" : "none" }} />
          <text
            x={CENTER.x}
            y={centerLines.length > 1 ? 206 : 215}
            textAnchor="middle"
            fill="#ffffff"
            fontSize={15}
            fontWeight={500}
            style={{ opacity: on ? 1 : 0, transition: motion ? "opacity .5s ease .45s" : "none" }}
          >
            {centerLines.map((ln, i) => (
              <tspan key={i} x={CENTER.x} dy={i === 0 ? 0 : 18}>
                {ln}
              </tspan>
            ))}
          </text>
          {PTS.map((p, i) => {
            const m = DL.modes[i];
            const lb = LABELS[i];
            return (
              <g
                key={`nd-${i}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <circle cx={p.x} cy={p.y} r={18} fill="transparent" />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={14}
                  fill="#2547eb"
                  style={{ opacity: hovered === i ? 0.12 : 0, transition: "opacity .18s ease" }}
                />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={hovered === i ? 9 : 6.5}
                  fill="#2547eb"
                  stroke="#ffffff"
                  strokeWidth={2}
                  style={{
                    opacity: on ? 1 : 0,
                    transformBox: "fill-box",
                    transformOrigin: "center",
                    transform: on ? "scale(1)" : "scale(0.2)",
                    transition: motion
                      ? `transform .4s ease ${(0.16 + i * STEP).toFixed(2)}s, opacity .4s ease ${(0.16 + i * STEP).toFixed(2)}s, r .18s ease`
                      : "r .18s ease",
                  }}
                />
                <text
                  x={lb.x}
                  y={lb.y}
                  textAnchor={lb.anchor}
                  fontSize={14.5}
                  fontWeight={700}
                  fill={hovered === i ? "#2547eb" : "#334155"}
                  style={{
                    opacity: on ? 1 : 0,
                    transition: motion ? `opacity .4s ease ${(i * STEP).toFixed(2)}s, fill .18s ease` : "fill .18s ease",
                  }}
                >
                  {t(m.name)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div ref={cardsRef} className="col-span-6 grid grid-cols-2 gap-4">
        {DL.modes.map((m, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="rounded-xl border bg-white p-4 shadow-sm"
            style={{
              opacity: on ? 1 : 0,
              transform: on ? "translateY(0)" : "translateY(12px)",
              borderColor: hovered === i ? "#2547eb" : "#e2e8f0",
              boxShadow: hovered === i ? "0 0 0 1px #2547eb" : undefined,
              transition: motion
                ? `opacity .5s ease ${0.2 + i * 0.07}s, transform .5s ease ${0.2 + i * 0.07}s, border-color .18s ease, box-shadow .18s ease`
                : "border-color .18s ease, box-shadow .18s ease",
            }}
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 shrink-0 rounded-full bg-brand-600" />
              <p className="text-sm font-bold text-ink">{t(m.name)}</p>
            </div>
            <p className="mt-1.5 text-xs font-medium text-brand-700">{t(m.company)}</p>
            <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">{t(m.detail)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SpineItem({ index, total }: { index: number; total: number }) {
  const { t } = useLocale();
  const reduce = useReduce();
  const [ref, inView] = useInView<HTMLLIElement>(0.5);
  const on = inView || reduce;
  const m = DL.modes[index];
  return (
    <li ref={ref} className="relative flex gap-5 pb-7 last:pb-0">
      <div className="flex flex-col items-center">
        <span
          className="mt-1 h-3.5 w-3.5 shrink-0 rounded-full border-2"
          style={{
            borderColor: on ? "#2547eb" : "#cbd5e1",
            backgroundColor: on ? "#2547eb" : "#ffffff",
            transform: `scale(${on ? 1 : 0.85})`,
            transition: reduce ? "none" : "background-color .4s ease, border-color .4s ease, transform .4s ease",
          }}
        />
        {index < total - 1 && <span className="mt-1 w-px flex-1 bg-slate-200" />}
      </div>
      <div
        className="flex-1 pb-1"
        style={{
          opacity: on ? 1 : 0,
          transform: on ? "translateY(0)" : "translateY(10px)",
          transition: reduce ? "none" : "opacity .5s ease, transform .5s ease",
        }}
      >
        <h3 className="text-base font-bold text-ink">{t(m.name)}</h3>
        <p className="mt-0.5 text-sm font-medium text-brand-700">{t(m.company)}</p>
        <p className="mt-1 text-sm leading-relaxed text-ink-soft">{t(m.detail)}</p>
      </div>
    </li>
  );
}

/** 手機:縱向主軸,捲到才依序點亮(順時鐘:工程師 → 創意人) */
function MobileSpine() {
  return (
    <ol className="space-y-0">
      {DL.modes.map((_, i) => (
        <SpineItem key={i} index={i} total={DL.modes.length} />
      ))}
    </ol>
  );
}

/** 決策邏輯區塊(放在「能力 ↔ 經歷」之間) */
export function DecisionLogic() {
  const { t } = useLocale();
  return (
    <Section id="decision-logic" className="py-16 sm:py-20">
      <SectionHeading eyebrow={DL.eyebrow} title={t(DL.title)} description={t(DL.lead)} />
      <div className="mt-16 hidden lg:block">
        <HexDiagram />
      </div>
      <div className="mt-12 lg:hidden">
        <MobileSpine />
      </div>
    </Section>
  );
}
