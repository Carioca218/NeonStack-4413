import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "wouter";
import { ArrowUpRight, Plus } from "lucide-react";
import { useLang } from "../lib/i18n";
import { FAQ, TESTIMONIALS } from "../data/content";
import { POSTS, formatDate } from "../data/posts";
import { Em, Reveal, SectionHead } from "./ui-bits";

export function Testimonials() {
  const { t } = useLang();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((x) => (x + 1) % TESTIMONIALS.length), 7000);
    return () => clearInterval(id);
  }, [paused]);

  const cur = TESTIMONIALS[i];

  return (
    <section id="proof" className="border-y border-line bg-surface/50 py-24 md:py-32">
      <div className="container-x">
        <SectionHead
          index="06"
          label={t({ pt: "Prova social", en: "Social proof" })}
          title={
            <>
              {t({ pt: "Quem usou,", en: "From people who" })} <Em>{t({ pt: "conta.", en: "used it." })}</Em>
            </>
          }
        />
        <div
          className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative min-h-[22rem]" aria-live="polite">
            <span className="font-display absolute -left-1 -top-10 text-[9rem] leading-none text-lime-text opacity-40 select-none">“</span>
            <AnimatePresence mode="wait">
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45 }}
                className="relative pt-10"
              >
                <blockquote className="font-display text-[clamp(1.8rem,3.6vw,3.1rem)] leading-[1.1]">
                  {t(cur.quote)}
                </blockquote>
                <figcaption className="mt-8 flex flex-wrap items-center gap-4">
                  <span className="btn-lime rounded-full px-3.5 py-1.5 text-xs font-semibold">{t(cur.result)}</span>
                  <span className="text-sm">
                    <strong className="font-medium">{cur.name}</strong>
                    <span className="text-muted-foreground"> · {cur.company}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <ul className="divide-y divide-line self-start border-y border-line">
            {TESTIMONIALS.map((x, k) => (
              <li key={x.name}>
                <button
                  onClick={() => setI(k)}
                  aria-current={k === i}
                  className={`group flex w-full items-center justify-between gap-4 py-4 text-left transition-colors ${
                    k === i ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`h-px transition-all ${k === i ? "w-8 bg-lime" : "w-3 bg-current"}`} />
                    <span className="text-sm font-medium">{x.name}</span>
                  </span>
                  <span className="label-mono">{x.company}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function BlogPreview() {
  const { t, lang } = useLang();
  return (
    <section id="blog" className="py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            index="07"
            label="Blog"
            title={
              <>
                {t({ pt: "Pensamentos sobre", en: "Thoughts on" })} <Em>{t({ pt: "design e conversão.", en: "design & conversion." })}</Em>
              </>
            }
            className="!mb-12"
          />
          <Link href="/blog" className="mb-12 inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium hover:bg-foreground hover:text-background">
            {t({ pt: "Todos os artigos", en: "All articles" })} <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
          {POSTS.map((p, k) => (
            <Reveal key={p.slug} delay={k * 0.07} className="bg-background">
              <Link href={`/blog/${p.slug}`} className="group flex h-full min-h-[22rem] flex-col p-7 transition-colors hover:bg-surface">
                <div className="flex items-center justify-between">
                  <span className="btn-lime rounded-full px-3 py-1 text-[11px] font-semibold">{t(p.tag)}</span>
                  <span className="label-mono">{formatDate(p.date, lang)}</span>
                </div>
                <h3 className="font-display mt-auto text-[1.9rem] leading-[1.05] transition-transform group-hover:translate-x-1">
                  {t(p.title)}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t(p.excerpt)}</p>
                <div className="label-mono mt-6 flex items-center gap-2 text-foreground">
                  {p.read} min <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="border-t border-line bg-surface/50 py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <SectionHead
          index="08"
          label="FAQ"
          title={
            <>
              {t({ pt: "Perguntas antes do", en: "Questions before the" })} <Em>briefing.</Em>
            </>
          }
          className="!mb-0 lg:sticky lg:top-28 lg:self-start"
        />
        <div className="border-t border-line">
          {FAQ.map((f, k) => {
            const on = open === k;
            return (
              <div key={k} className="border-b border-line">
                <button
                  onClick={() => setOpen(on ? null : k)}
                  aria-expanded={on}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="text-lg font-medium">{t(f.q)}</span>
                  <Plus className={`size-5 shrink-0 transition-transform ${on ? "rotate-45 text-lime-text" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 leading-relaxed text-muted-foreground">{t(f.a)}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
