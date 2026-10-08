import { motion, useInView, animate } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

export function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({
  index,
  label,
  title,
  sub,
  className = "",
}: {
  index: string;
  label: string;
  title: ReactNode;
  sub?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mb-12 md:mb-16 ${className}`}>
      <Reveal>
        <div className="label-mono mb-5 flex items-center gap-3">
          <span className="text-lime-text">{index}</span>
          <span className="h-px w-10 bg-line" />
          <span>{label}</span>
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-display max-w-4xl text-[clamp(2.4rem,6vw,5rem)] leading-[0.98]">{title}</h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}

/** Highlighted serif-italic word */
export function Em({ children }: { children: ReactNode }) {
  return <em className="text-lime-text italic">{children}</em>;
}

export function PrimaryButton({
  href,
  onClick,
  children,
  external,
  type = "button",
  disabled,
  className = "",
}: {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}) {
  const cls = `btn-lime group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-transform hover:scale-[1.03] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100 ${className}`;
  const inner = (
    <>
      {children}
      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </>
  );
  if (href)
    return (
      <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {inner}
      </a>
    );
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {inner}
    </button>
  );
}

export function GhostButton({
  href,
  children,
  external,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm font-medium transition-colors hover:bg-foreground hover:text-background ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

export function AnimatedNumber({
  value,
  format,
}: {
  value: number;
  format: (n: number) => string;
}) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);
  useEffect(() => {
    const controls = animate(prev.current, value, {
      duration: 0.6,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(v),
    });
    prev.current = value;
    return () => controls.stop();
  }, [value]);
  return <>{format(display)}</>;
}

/** Counts up once when scrolled into view. Server/initial render shows final value (no "0+"). */
export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(to);
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const c = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export const brl = (n: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(n);
