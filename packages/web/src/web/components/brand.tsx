import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Seconds the page content should wait before animating in (while the loader is up). */
export const boot = { delay: typeof window !== "undefined" && !reduced() ? 2.05 : 0 };

/** Letter-by-letter wordmark: staggered entrance, lime glint sweep and a hover wave. */
export function AnimatedBrand({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={`brand inline-flex ${className}`} aria-label={text}>
      {[...text].map((ch, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <motion.span
            className="brand-letter"
            style={{ ["--i" as string]: i }}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: delay + i * 0.045, ease: EASE }}
          >
            {ch === " " ? " " : ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Oversized wordmark for the footer: letters rise on view, each reacts to hover. */
export function BigWordmark({ text, className = "" }: { text: string; className?: string }) {
  return (
    <motion.div
      className={`select-none whitespace-nowrap ${className}`}
      aria-label={text}
      initial="hide"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ staggerChildren: 0.05 }}
    >
      {[...text].map((ch, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="block"
            variants={{ hide: { y: "100%" }, show: { y: 0 } }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <span className="big-letter">{ch}</span>
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}

const PRELOAD = ["/images/work/barber.webp", "/images/work/fiber.webp", "/images/work/nexus.webp"];
const MIN_MS = 1700;

/** Full-screen intro. Waits for fonts + hero screenshots (max 4s), then lifts away. */
export function Loader() {
  const [show, setShow] = useState(boot.delay > 0);
  const [p, setP] = useState(0);

  useEffect(() => {
    if (!show) return;
    document.body.style.overflow = "hidden";
    let ready = false;
    let raf = 0;
    let closed = false;
    const start = performance.now();

    const assets = Promise.all([
      document.fonts?.ready,
      ...PRELOAD.map(
        (src) =>
          new Promise<void>((res) => {
            const img = new Image();
            img.onload = img.onerror = () => res();
            img.src = src;
          }),
      ),
    ]);
    Promise.race([assets, new Promise((r) => setTimeout(r, 4000))]).then(() => {
      ready = true;
    });

    const tick = (now: number) => {
      const target = Math.max(0, Math.min(1, (now - start) / MIN_MS));
      const eased = 1 - Math.pow(1 - target, 3);
      const value = ready ? eased : Math.min(eased, 0.9);
      setP(value);
      if (value >= 1 && !closed) {
        closed = true;
        setTimeout(() => {
          boot.delay = 0;
          setShow(false);
        }, 250);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, [show]);

  useEffect(() => {
    if (!show) document.body.style.overflow = "";
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-background px-6 py-8 md:px-12 md:py-10"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="label-mono flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="pulse-dot size-2 rounded-full bg-lime" /> Portfolio
            </span>
            <span>Rio de Janeiro — BR</span>
          </div>

          <div className="relative text-center">
            <div className="font-display text-[clamp(3.6rem,15vw,13rem)] leading-[0.92]">
              <AnimatedBrand text="NeonStack" delay={0.15} />
            </div>
            <motion.div
              className="label-mono mt-3 tracking-[0.5em]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              S T U D I O
            </motion.div>
          </div>

          <div>
            <div className="mb-3 flex items-end justify-between">
              <span className="label-mono">Loading</span>
              <span className="font-display text-5xl leading-none tabular-nums md:text-7xl">
                {String(Math.round(p * 100)).padStart(3, "0")}
                <span className="text-lime-text text-3xl md:text-4xl">%</span>
              </span>
            </div>
            <div className="h-px w-full bg-line">
              <div className="h-px origin-left bg-lime" style={{ transform: `scaleX(${p})` }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
