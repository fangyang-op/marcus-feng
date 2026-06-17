"use client";

import { useState } from "react";
import { Mail, Check } from "lucide-react";

/**
 * 點擊複製 Email 到剪貼簿(取代 mailto:，避免強制開啟郵件軟體)。
 * 複製成功後在上方浮出「已複製 ✓」tooltip,2 秒後淡出。Email 文字可見、可手動選取。
 */
export function CopyEmail({
  email,
  className = "",
}: {
  email: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const legacyCopy = () => {
    const ta = document.createElement("textarea");
    ta.value = email;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
    } catch {
      /* noop */
    }
    document.body.removeChild(ta);
  };

  const copy = () => {
    // 先給視覺回饋(不依賴剪貼簿 promise 是否解析，確保一定顯示)
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
    // 再嘗試複製(fire-and-forget，失敗則用後備)
    try {
      const p = navigator.clipboard?.writeText(email);
      if (p && typeof p.catch === "function") p.catch(legacyCopy);
      else legacyCopy();
    } catch {
      legacyCopy();
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`複製 Email ${email}`}
      className={`relative ${className}`}
    >
      {copied ? (
        <Check className="h-4 w-4 text-emerald-600" />
      ) : (
        <Mail className="h-4 w-4" />
      )}
      <span className="select-text">{email}</span>

      {/* 複製成功 tooltip */}
      <span
        aria-live="polite"
        className={`pointer-events-none absolute -top-9 right-0 inline-flex items-center gap-1 rounded-md bg-ink px-2.5 py-1 text-xs font-medium text-white shadow-lg transition-all duration-200 ${
          copied ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
        }`}
      >
        <Check className="h-3 w-3" /> 已複製
      </span>
    </button>
  );
}
