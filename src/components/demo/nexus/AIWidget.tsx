"use client";

import { useState } from "react";
import {
  Sparkles,
  X,
  MessageSquarePlus,
  Send,
  Bot,
} from "lucide-react";
import {
  AI_THREADS,
  AI_QUICK_PROMPTS,
  AI_CANNED_REPLIES,
  type ChatMessage,
  type ChatThread,
} from "@/data/demo/nexus";

/**
 * 浮動 AI 助理 widget(右下角可開合)。
 * 展開後:標題列 + 多對話 thread 側欄 + Quick prompt chips + 對話泡泡 + 輸入框。
 * 送出後 append 一則罐頭回覆(輪流取用，不接 API、不用亂數)。
 */
export function AIWidget() {
  const [open, setOpen] = useState(false);
  const [threads, setThreads] = useState<ChatThread[]>(() =>
    AI_THREADS.map((t) => ({ ...t, messages: [...t.messages] })),
  );
  const [activeId, setActiveId] = useState(AI_THREADS[0].id);
  const [input, setInput] = useState("");
  // 罐頭回覆輪流取用的指標(非亂數，hydration 安全)
  const [replyIdx, setReplyIdx] = useState(0);

  const active = threads.find((t) => t.id === activeId) ?? threads[0];

  const appendToActive = (userText: string) => {
    const text = userText.trim();
    if (!text) return;
    const userMsg: ChatMessage = {
      id: `u-${active.messages.length}-${active.id}`,
      role: "user",
      text,
      time: "現在",
    };
    const aiMsg: ChatMessage = {
      id: `a-${active.messages.length}-${active.id}`,
      role: "ai",
      text: AI_CANNED_REPLIES[replyIdx % AI_CANNED_REPLIES.length],
      time: "現在",
    };
    setThreads((prev) =>
      prev.map((t) =>
        t.id === active.id
          ? { ...t, messages: [...t.messages, userMsg, aiMsg] }
          : t,
      ),
    );
    setReplyIdx((i) => i + 1);
    setInput("");
  };

  const newThread = () => {
    const id = `th-new-${threads.length}`;
    const fresh: ChatThread = {
      id,
      title: "新對話",
      updatedAt: "現在",
      messages: [
        {
          id: `g-${id}`,
          role: "ai",
          text: "您好！我是 Nexus AI 助手 ✨\n您可以直接輸入問題，或點選下方的快速模板。",
          time: "現在",
        },
      ],
    };
    setThreads((prev) => [fresh, ...prev]);
    setActiveId(id);
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="開啟 AI 助理"
        className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-nexus-pink to-nexus-purple text-white shadow-xl shadow-nexus-pink/30 transition-transform hover:scale-105"
      >
        <Sparkles className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-30 flex h-[560px] max-h-[80vh] w-[min(92vw,420px)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl ring-1 ring-black/5">
      {/* 標題列 */}
      <div className="flex flex-none items-center justify-between bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-3 text-white">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-nexus-pink to-nexus-purple">
            <Bot className="h-4 w-4" />
          </span>
          <div>
            <div className="text-sm font-bold leading-none">Nexus AI 助手</div>
            <div className="mt-0.5 text-[10px] text-slate-400">顧問智能問答</div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="關閉"
          className="rounded-md p-1 text-slate-300 hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Thread 側欄 */}
        <div className="flex w-28 flex-none flex-col border-r border-slate-100 bg-slate-50">
          <button
            type="button"
            onClick={newThread}
            className="m-2 flex items-center justify-center gap-1 rounded-lg border border-dashed border-slate-300 px-2 py-1.5 text-[11px] font-semibold text-ink-soft hover:border-nexus-pink hover:text-nexus-pink"
          >
            <MessageSquarePlus className="h-3.5 w-3.5" />
            新對話
          </button>
          <div className="scrollbar-thin flex-1 space-y-1 overflow-y-auto px-2 pb-2">
            {threads.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveId(t.id)}
                className={`w-full rounded-lg px-2 py-1.5 text-left text-[11px] font-medium leading-tight transition-colors ${
                  t.id === activeId
                    ? "bg-nexus-pink/10 text-nexus-pink"
                    : "text-ink-soft hover:bg-slate-100"
                }`}
              >
                <div className="line-clamp-2">{t.title}</div>
                <div className="mt-0.5 text-[9px] text-ink-muted">{t.updatedAt}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 對話區 */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* 訊息 */}
          <div className="scrollbar-thin flex-1 space-y-3 overflow-y-auto bg-gradient-to-b from-slate-50 to-white p-3">
            {active.messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3 py-2 text-[12.5px] leading-relaxed ${
                    m.role === "user"
                      ? "rounded-tr-sm bg-gradient-to-br from-nexus-pink to-rose-600 text-white shadow-sm shadow-nexus-pink/20"
                      : "rounded-tl-sm border border-slate-100 bg-white text-ink-soft shadow-sm"
                  }`}
                >
                  {m.text}
                  <span
                    className={`mt-1 block text-[9px] ${
                      m.role === "user" ? "text-white/70" : "text-ink-muted"
                    }`}
                  >
                    {m.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick prompt chips */}
          <div className="flex flex-wrap gap-1.5 border-t border-slate-100 px-3 py-2">
            {AI_QUICK_PROMPTS.map((q) => (
              <button
                key={q.id}
                type="button"
                onClick={() => appendToActive(q.text)}
                className="inline-flex items-center gap-1 rounded-full border border-nexus-pink/30 bg-nexus-pink/5 px-2.5 py-1 text-[11px] font-semibold text-nexus-pink hover:bg-nexus-pink/10"
              >
                <span>{q.icon}</span>
                {q.label}
              </button>
            ))}
          </div>

          {/* 輸入框 */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              appendToActive(input);
            }}
            className="flex items-center gap-2 border-t border-slate-100 p-2.5"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="輸入問題…"
              className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-ink outline-none focus:border-nexus-pink focus:bg-white focus:ring-2 focus:ring-nexus-pink/20"
            />
            <button
              type="submit"
              aria-label="送出"
              className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-nexus-pink text-white transition-colors hover:bg-nexus-purple disabled:opacity-40"
              disabled={!input.trim()}
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
