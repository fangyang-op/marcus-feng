"use client";

import { useState } from "react";
import { Bot, Send, X, Sparkles } from "lucide-react";
import { AI_SUGGESTED_QUESTIONS, AI_CANNED_REPLY } from "@/data/demo/matrix";

interface ChatMsg {
  role: "user" | "assistant";
  content: string;
}

/**
 * Matrix 浮動 AI 助理 — 右下角可開合聊天面板。
 * 純前端罐頭回覆(Markdown 風格，自繪渲染)，不接任何 API。
 */
export function AIWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: "assistant", content: AI_CANNED_REPLY.default },
  ]);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    const reply = AI_CANNED_REPLY[q] ?? AI_CANNED_REPLY.default;
    setMessages((prev) => [
      ...prev,
      { role: "user", content: q },
      { role: "assistant", content: reply },
    ]);
    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-3 flex h-[460px] w-[min(92vw,360px)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-2 bg-gradient-to-r from-matrix-rose to-matrix-orange px-4 py-3 text-white">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/20">
              <Bot className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold leading-tight">Matrix 助理</p>
              <p className="text-[11px] text-white/80">數據決策・示意回覆</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md p-1 hover:bg-white/20"
              aria-label="關閉"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="scrollbar-thin flex-1 space-y-3 overflow-y-auto bg-slate-50 p-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-[13px] leading-relaxed ${
                    m.role === "user"
                      ? "rounded-br-sm bg-matrix-rose text-white"
                      : "rounded-bl-sm border border-slate-200 bg-white text-ink-soft"
                  }`}
                >
                  {m.role === "assistant" ? <Markdownish text={m.content} /> : m.content}
                </div>
              </div>
            ))}

            {/* Suggested chips */}
            <div className="space-y-1.5 pt-1">
              <p className="flex items-center gap-1 text-[11px] font-medium text-ink-muted">
                <Sparkles className="h-3 w-3 text-matrix-rose" /> 建議問題
              </p>
              {AI_SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => send(q)}
                  className="block w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-left text-[12px] text-ink-soft transition-colors hover:border-matrix-rose hover:text-matrix-rose"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-slate-200 bg-white p-2.5"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="輸入問題…"
              className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[13px] text-ink outline-none focus:border-matrix-rose"
            />
            <button
              type="submit"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-matrix-rose text-white transition-colors hover:bg-matrix-orange"
              aria-label="送出"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* FAB */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-matrix-rose to-matrix-orange text-white shadow-lg shadow-matrix-rose/30 transition-transform hover:scale-105"
        aria-label="開啟 AI 助理"
      >
        {open ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </button>
    </div>
  );
}

/** 極簡 Markdown 渲染:支援 **粗體**、- 清單、> 引言、標題行 */
function Markdownish({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        if (line.trim() === "") return <div key={i} className="h-1" />;
        if (line.startsWith("> ")) {
          return (
            <p
              key={i}
              className="border-l-2 border-matrix-rose bg-rose-50 px-2 py-1 text-[12px] text-ink-soft"
            >
              {renderBold(line.slice(2))}
            </p>
          );
        }
        if (/^\d+\.\s/.test(line)) {
          return (
            <p key={i} className="pl-2 text-[12.5px]">
              {renderBold(line)}
            </p>
          );
        }
        if (line.startsWith("- ")) {
          return (
            <p key={i} className="flex gap-1.5 pl-1 text-[12.5px]">
              <span className="text-matrix-rose">•</span>
              <span>{renderBold(line.slice(2))}</span>
            </p>
          );
        }
        return (
          <p key={i} className="text-[12.5px]">
            {renderBold(line)}
          </p>
        );
      })}
    </div>
  );
}

function renderBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? (
      <strong key={i} className="font-bold text-ink">
        {p.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{p}</span>
    ),
  );
}
