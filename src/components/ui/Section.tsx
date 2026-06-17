import { ReactNode } from "react";

/** 區塊外層：統一左右留白、最大寬度與垂直節奏 */
export function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`scroll-mt-20 px-5 sm:px-8 ${className}`}>
      <div className="mx-auto w-full max-w-content">{children}</div>
    </section>
  );
}

/** 區塊標題：小標 + 大標 + 選用副標 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  className = "",
  invert = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  invert?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${className}`}>
      {eyebrow && (
        <p
          className={`mb-3 text-sm font-semibold uppercase tracking-wider ${
            invert ? "text-brand-300" : "text-brand-600"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-balance text-2xl font-bold tracking-tight sm:text-3xl ${
          invert ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed ${
            invert ? "text-slate-300" : "text-ink-muted"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
