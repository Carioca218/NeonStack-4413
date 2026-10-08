import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { useLang, type L } from "../lib/i18n";
import { PROJECTS, waLink, type Category, type Project } from "../data/site";
import { PrimaryButton, SectionHead, Em } from "./ui-bits";

const FILTERS: { id: Category | "all"; label: L }[] = [
  { id: "all", label: { pt: "Todos", en: "All" } },
  { id: "site", label: { pt: "Sites", en: "Websites" } },
  { id: "landing", label: { pt: "Landing pages", en: "Landing pages" } },
  { id: "app", label: { pt: "Apps e dashboards", en: "Apps & dashboards" } },
  { id: "brand", label: { pt: "Marca e arte", en: "Brand & art" } },
];

const CAT_LABEL: Record<Category, L> = {
  site: { pt: "Site", en: "Website" },
  landing: { pt: "Landing page", en: "Landing page" },
  app: { pt: "App / Dashboard", en: "App / Dashboard" },
  brand: { pt: "Marca e arte", en: "Brand & art" },
};

function Card({ p, onOpen, i }: { p: Project; onOpen: () => void; i: number }) {
  const { t } = useLang();
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -6% 0px" }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onClick={onOpen}
      className="group mb-8 block w-full break-inside-avoid text-left"
      aria-label={`${p.title} — ${t({ pt: "abrir case", en: "open case" })}`}
    >
      <div className="relative overflow-hidden rounded-2xl border border-line bg-surface">
        <img
          src={p.image}
          alt={`${p.title} — ${t(p.desc)}`}
          loading="lazy"
          decoding="async"
          className={`block w-full transition-transform duration-700 ease-out group-hover:scale-[1.04] ${
            p.art ? "" : "aspect-[16/10] object-cover object-top"
          }`}
        />
        <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/60 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-full bg-lime px-3.5 py-1.5 text-xs font-semibold text-[#0A0A09]">
            {t({ pt: "Ver case", en: "View case" })}
          </span>
          <span className="grid size-9 place-items-center rounded-full bg-white/90 text-black">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-medium leading-tight">{p.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{t(p.result)}</p>
        </div>
        <span className="label-mono mt-1 shrink-0">{t(CAT_LABEL[p.category])}</span>
      </div>
    </motion.button>
  );
}

function CaseModal({ p, onClose }: { p: Project; onClose: () => void }) {
  const { t } = useLang();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm md:items-center md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      {...{ role: "dialog" }}
      aria-modal="true"
      aria-label={p.title}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative grid max-h-[92dvh] w-full max-w-6xl overflow-y-auto rounded-t-3xl border border-line bg-background md:rounded-3xl lg:grid-cols-[1.35fr_1fr]"
      >
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full bg-background/90 text-foreground backdrop-blur hover:bg-foreground hover:text-background"
        >
          <X className="size-4" />
        </button>
        <div className="bg-surface p-4 md:p-6">
          <img
            src={p.image}
            alt={p.title}
            className="w-full rounded-xl border border-line object-cover"
          />
        </div>
        <div className="flex flex-col p-6 md:p-10">
          <span className="label-mono">{t(CAT_LABEL[p.category])}</span>
          <h3 className="font-display mt-3 text-4xl leading-none md:text-5xl">{p.title}</h3>
          <p className="mt-5 leading-relaxed text-muted-foreground">{t(p.desc)}</p>

          <div className="label-mono mt-8 mb-3">{t({ pt: "Destaques", en: "Highlights" })}</div>
          <ul className="space-y-2.5">
            {p.highlights.map((h, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-lime" />
                {t(h)}
              </li>
            ))}
          </ul>

          <div className="label-mono mt-8 mb-3">Stack</div>
          <div className="flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span key={s} className="rounded-full border border-line px-3 py-1 text-xs">
                {s}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap gap-3 pt-10">
            {p.url && (
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium hover:bg-foreground hover:text-background"
              >
                {t({ pt: "Abrir projeto ao vivo", en: "Open live project" })}
                <ArrowUpRight className="size-4" />
              </a>
            )}
            <PrimaryButton
              href={waLink(
                t({
                  pt: `Olá Breno! Vi o case "${p.title}" e quero algo nesse nível. Podemos conversar?`,
                  en: `Hi Breno! I saw the "${p.title}" case and want something at that level. Can we talk?`,
                }),
              )}
              external
            >
              {t({ pt: "Quero algo assim", en: "I want something like this" })}
            </PrimaryButton>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Work() {
  const { t } = useLang();
  const [filter, setFilter] = useState<Category | "all">("all");
  const [open, setOpen] = useState<Project | null>(null);
  const list = PROJECTS.filter((p) => filter === "all" || p.category === filter);

  return (
    <section id="work" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHead
          index="01"
          label={t({ pt: "Trabalho selecionado", en: "Selected work" })}
          title={
            <>
              {t({ pt: "Projetos reais,", en: "Real projects," })} <Em>{t({ pt: "cases", en: "real" })}</Em>{" "}
              {t({ pt: "que você pode abrir.", en: "cases you can open." })}
            </>
          }
          sub={t({
            pt: "Cada projeto tem captura real, objetivo, destaques e stack. Clique para ver o detalhe.",
            en: "Every project comes with a real screenshot, goals, highlights and stack. Click to see the detail.",
          })}
        />

        <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Filtros">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                filter === f.id
                  ? "border-transparent bg-foreground text-background"
                  : "border-line text-muted-foreground hover:text-foreground"
              }`}
            >
              {t(f.label)}
            </button>
          ))}
        </div>

        <motion.div layout className="columns-1 gap-8 md:columns-2 lg:columns-3">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <Card key={p.id} p={p} i={i} onOpen={() => setOpen(p)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>{open && <CaseModal p={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}
