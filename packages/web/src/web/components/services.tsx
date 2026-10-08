import { useRef, type MouseEvent } from "react";
import { ArrowUpRight, Check, Clock } from "lucide-react";
import { useLang } from "../lib/i18n";
import { SERVICES, type Service, type ServiceId } from "../data/content";
import { Em, Reveal, SectionHead, brl } from "./ui-bits";

function PlanCard({ s, i, onPick }: { s: Service; i: number; onPick: (id: ServiceId) => void }) {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const featured = s.id === "landing";

  const move = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <Reveal delay={(i % 3) * 0.07} y={22} className="h-full">
      <div
        ref={ref}
        onMouseMove={move}
        className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] border p-7 transition-all duration-300 hover:-translate-y-1.5 md:p-8 ${
          featured
            ? "border-transparent bg-lime text-[#0A0A09] shadow-[0_30px_80px_-30px_rgba(200,255,46,0.45)]"
            : "border-line bg-background hover:border-foreground/30"
        }`}
      >
        {/* cursor spotlight */}
        {!featured && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(360px circle at var(--mx, 50%) var(--my, 0%), color-mix(in oklab, var(--lime) 14%, transparent), transparent 70%)",
            }}
          />
        )}

        <div className="relative flex h-7 items-start justify-between gap-3">
          <span className={`label-mono ${featured ? "!text-[#0A0A09]/60" : ""}`}>{String(i + 1).padStart(2, "0")}</span>
          {s.tag && (
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                featured ? "bg-[#0A0A09] text-lime" : "btn-lime"
              }`}
            >
              {t(s.tag)}
            </span>
          )}
        </div>

        <h3 className="font-display relative mt-6 text-[2.6rem] leading-[0.95]">{t(s.name)}</h3>
        <p className={`relative mt-2 text-sm ${featured ? "text-[#0A0A09]/70" : "text-muted-foreground"}`}>{t(s.focus)}</p>

        <div className={`relative mt-8 border-t pt-6 ${featured ? "border-[#0A0A09]/15" : "border-line"}`}>
          <div className={`label-mono ${featured ? "!text-[#0A0A09]/60" : ""}`}>{t({ pt: "a partir de", en: "starting at" })}</div>
          <div className="mt-1 flex items-baseline gap-3">
            <span className="font-display text-[3.4rem] leading-none tabular-nums">{brl(s.min)}</span>
          </div>
          <div className={`mt-1.5 font-mono text-xs ${featured ? "text-[#0A0A09]/65" : "text-muted-foreground"}`}>
            {t({ pt: "até", en: "up to" })} {brl(s.max)}
          </div>
          <div
            className={`mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${
              featured ? "bg-[#0A0A09]/10" : "bg-secondary"
            }`}
          >
            <Clock className="size-3.5" />
            {s.days[0]}–{s.days[1]} {t({ pt: "dias", en: "days" })}
          </div>
        </div>

        <ul className="relative mt-7 grid gap-3 text-sm">
          {s.includes.map((inc, k) => (
            <li key={k} className="flex items-start gap-2.5">
              <span
                className={`mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full ${
                  featured ? "bg-[#0A0A09] text-lime" : "bg-lime text-[#0A0A09]"
                }`}
              >
                <Check className="size-3" strokeWidth={3} />
              </span>
              {t(inc)}
            </li>
          ))}
        </ul>

        <div className="relative mt-auto pt-8">
          <p className={`mb-4 text-xs ${featured ? "text-[#0A0A09]/65" : "text-muted-foreground"}`}>
            {t(s.deliver)}
          </p>
          <button
            onClick={() => onPick(s.id)}
            className={`group/btn flex w-full items-center justify-between rounded-full px-6 py-4 text-sm font-semibold transition-all ${
              featured
                ? "bg-[#0A0A09] text-lime hover:scale-[1.02]"
                : "border border-line hover:border-transparent hover:bg-lime hover:text-[#0A0A09]"
            }`}
          >
            {t({ pt: "Estimar este serviço", en: "Estimate this service" })}
            <ArrowUpRight className="size-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
          </button>
        </div>
      </div>
    </Reveal>
  );
}

export function Services({ onPick }: { onPick: (id: ServiceId) => void }) {
  const { t } = useLang();

  return (
    <section id="services" className="border-y border-line bg-surface/50 py-24 md:py-32">
      <div className="container-x">
        <SectionHead
          index="02"
          label={t({ pt: "Serviços e investimento", en: "Services & investment" })}
          title={
            <>
              {t({ pt: "Preço à vista,", en: "Prices up front," })} <Em>{t({ pt: "sem mistério.", en: "no mystery." })}</Em>
            </>
          }
          sub={t({
            pt: "Faixas reais de cada entrega. O valor final é fechado depois de um briefing gratuito.",
            en: "Real ranges for every deliverable. The final price is set after a free briefing.",
          })}
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((s, i) => (
            <PlanCard key={s.id} s={s} i={i} onPick={onPick} />
          ))}
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          {t({
            pt: "* Valores aproximados. O investimento final e o escopo são definidos após briefing gratuito.",
            en: "* Approximate values. Final investment and scope are defined after a free briefing.",
          })}
        </p>
      </div>
    </section>
  );
}
