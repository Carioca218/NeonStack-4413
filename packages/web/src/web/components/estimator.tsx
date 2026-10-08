import { useMemo, useState } from "react";
import { Check, Clock, MessageCircle, Zap } from "lucide-react";
import { useLang } from "../lib/i18n";
import { ADDONS, SERVICES, type ServiceId } from "../data/content";
import { waLink } from "../data/site";
import { AnimatedNumber, Em, SectionHead, brl } from "./ui-bits";

export type EstimateSummary = { text: string; type: ServiceId };

const LEVELS = [
  { id: 0, f: 0, label: { pt: "Essencial", en: "Essential" }, desc: { pt: "Direto ao ponto, conteúdo enxuto", en: "Straight to the point, lean content" } },
  { id: 1, f: 0.5, label: { pt: "Padrão", en: "Standard" }, desc: { pt: "Equilíbrio entre design e alcance", en: "Balance of design and reach" } },
  { id: 2, f: 1, label: { pt: "Premium", en: "Premium" }, desc: { pt: "Motion, detalhes e acabamento máximo", en: "Motion, details and maximum polish" } },
];

const round = (n: number, step: number) => Math.round(n / step) * step;

export function Estimator({
  serviceId,
  setServiceId,
  onSendBrief,
}: {
  serviceId: ServiceId;
  setServiceId: (id: ServiceId) => void;
  onSendBrief: (s: EstimateSummary) => void;
}) {
  const { t, lang } = useLang();
  const [level, setLevel] = useState(1);
  const [addons, setAddons] = useState<string[]>([]);
  const [rush, setRush] = useState(false);

  const svc = SERVICES.find((s) => s.id === serviceId)!;
  const f = LEVELS[level].f;

  const est = useMemo(() => {
    const activeAddons = svc.web ? ADDONS.filter((a) => addons.includes(a.id)) : [];
    let price = svc.min + (svc.max - svc.min) * f + activeAddons.reduce((a, b) => a + b.price, 0);
    let days = svc.days[0] + (svc.days[1] - svc.days[0]) * f + activeAddons.reduce((a, b) => a + b.days, 0);
    if (rush) {
      price *= 1.25;
      days *= 0.65;
    }
    const step = price > 1000 ? 50 : 10;
    const low = round(price * 0.93, step);
    const high = round(price * 1.07, step);
    const dLow = Math.max(1, Math.round(days * 0.85));
    const dHigh = Math.max(dLow + 1, Math.round(days * 1.15));
    return { low, high, dLow, dHigh, activeAddons };
  }, [svc, f, addons, rush]);

  const summary = () => {
    const lines =
      lang === "pt"
        ? [
            `Olá Breno! Fiz uma estimativa no site:`,
            `• Projeto: ${svc.name.pt}`,
            `• Nível: ${LEVELS[level].label.pt}`,
            est.activeAddons.length ? `• Extras: ${est.activeAddons.map((a) => a.label.pt).join(", ")}` : null,
            `• Prazo: ${rush ? "urgente" : "normal"}`,
            `• Estimativa: ${brl(est.low)} – ${brl(est.high)} em ${est.dLow}–${est.dHigh} dias`,
            ``,
            `Podemos conversar?`,
          ]
        : [
            `Hi Breno! I ran an estimate on your site:`,
            `• Project: ${svc.name.en}`,
            `• Level: ${LEVELS[level].label.en}`,
            est.activeAddons.length ? `• Extras: ${est.activeAddons.map((a) => a.label.en).join(", ")}` : null,
            `• Deadline: ${rush ? "rush" : "standard"}`,
            `• Estimate: ${brl(est.low)} – ${brl(est.high)} in ${est.dLow}–${est.dHigh} days`,
            ``,
            `Can we talk?`,
          ];
    return lines.filter((l) => l !== null).join("\n");
  };

  const toggle = (id: string) => setAddons((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));

  return (
    <section id="estimate" className="border-y border-line bg-surface/50 py-24 md:py-32">
      <div className="container-x">
        <SectionHead
          index="04"
          label={t({ pt: "Orçamento interativo", en: "Interactive estimate" })}
          title={
            <>
              {t({ pt: "Monte seu projeto e veja o", en: "Build your project and see the" })}{" "}
              <Em>{t({ pt: "preço na hora.", en: "price instantly." })}</Em>
            </>
          }
          sub={t({
            pt: "Uma estimativa honesta em 20 segundos. Gostou? Mande direto para o WhatsApp ou transforme em briefing.",
            en: "An honest estimate in 20 seconds. Like it? Send it straight to WhatsApp or turn it into a briefing.",
          })}
        />

        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
          <div className="space-y-12">
            {/* 1 type */}
            <fieldset>
              <legend className="label-mono mb-4">1 — {t({ pt: "O que você precisa?", en: "What do you need?" })}</legend>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {SERVICES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setServiceId(s.id)}
                    aria-pressed={serviceId === s.id}
                    className={`rounded-2xl border p-4 text-left transition-all ${
                      serviceId === s.id
                        ? "border-lime bg-lime text-[#0A0A09]"
                        : "border-line bg-background hover:border-foreground/40"
                    }`}
                  >
                    <div className="font-display text-2xl leading-tight">{t(s.name)}</div>
                    <div className={`mt-1 text-xs ${serviceId === s.id ? "text-[#0A0A09]/70" : "text-muted-foreground"}`}>
                      {t(s.focus)}
                    </div>
                  </button>
                ))}
              </div>
            </fieldset>

            {/* 2 level */}
            <fieldset>
              <legend className="label-mono mb-4">2 — {t({ pt: "Nível de acabamento", en: "Level of polish" })}</legend>
              <div className="grid gap-3 sm:grid-cols-3">
                {LEVELS.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLevel(l.id)}
                    aria-pressed={level === l.id}
                    className={`rounded-2xl border p-4 text-left transition-all ${
                      level === l.id ? "border-foreground bg-foreground text-background" : "border-line bg-background hover:border-foreground/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{t(l.label)}</span>
                      <span className="flex gap-1">
                        {[0, 1, 2].map((d) => (
                          <span key={d} className={`size-1.5 rounded-full ${d <= l.id ? "bg-lime" : "bg-current opacity-20"}`} />
                        ))}
                      </span>
                    </div>
                    <div className={`mt-1.5 text-xs ${level === l.id ? "opacity-70" : "text-muted-foreground"}`}>{t(l.desc)}</div>
                  </button>
                ))}
              </div>
            </fieldset>

            {/* 3 extras */}
            {svc.web && (
              <fieldset>
                <legend className="label-mono mb-4">3 — {t({ pt: "Extras (opcional)", en: "Extras (optional)" })}</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {ADDONS.map((a) => {
                    const on = addons.includes(a.id);
                    return (
                      <button
                        key={a.id}
                        onClick={() => toggle(a.id)}
                        aria-pressed={on}
                        className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-colors ${
                          on ? "border-lime-text bg-lime/10" : "border-line bg-background hover:border-foreground/40"
                        }`}
                      >
                        <span
                          className={`grid size-5 shrink-0 place-items-center rounded-md border ${
                            on ? "border-transparent bg-lime text-[#0A0A09]" : "border-line"
                          }`}
                        >
                          {on && <Check className="size-3.5" strokeWidth={3} />}
                        </span>
                        <span className="flex-1 text-sm">{t(a.label)}</span>
                        <span className="font-mono text-xs text-muted-foreground">+{brl(a.price)}</span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            )}

            {/* 4 deadline */}
            <fieldset>
              <legend className="label-mono mb-4">
                {svc.web ? "4" : "3"} — {t({ pt: "Prazo", en: "Deadline" })}
              </legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { v: false, icon: Clock, title: { pt: "Normal", en: "Standard" }, d: { pt: "Prazo médio do serviço", en: "Typical lead time" } },
                  { v: true, icon: Zap, title: { pt: "Urgente", en: "Rush" }, d: { pt: "Entrega ~35% mais rápida · +25%", en: "~35% faster delivery · +25%" } },
                ].map((o) => (
                  <button
                    aria-label={t(o.title)}
                    key={String(o.v)}
                    onClick={() => setRush(o.v)}
                    aria-pressed={rush === o.v}
                    className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition-all ${
                      rush === o.v ? "border-foreground bg-foreground text-background" : "border-line bg-background hover:border-foreground/40"
                    }`}
                  >
                    <o.icon className={`size-5 ${rush === o.v ? "text-lime" : "text-muted-foreground"}`} />
                    <div>
                      <div className="font-medium">{t(o.title)}</div>
                      <div className={`text-xs ${rush === o.v ? "opacity-70" : "text-muted-foreground"}`}>{t(o.d)}</div>
                    </div>
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          {/* result */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative overflow-hidden rounded-3xl border border-line bg-background p-7 md:p-9">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full opacity-25 blur-[80px]"
                style={{ background: "#C8FF2E" }}
              />
              <div className="label-mono">{t({ pt: "Sua estimativa", en: "Your estimate" })}</div>
              <div className="mt-1 text-sm text-muted-foreground">{t(svc.name)} · {t(LEVELS[level].label)}</div>

              <div className="font-display mt-6 text-[clamp(2.6rem,5vw,3.8rem)] leading-none" aria-live="polite">
                <AnimatedNumber value={est.low} format={(n) => brl(round(n, 10))} />
                <span className="text-muted-foreground"> – </span>
                <br className="hidden sm:block lg:hidden xl:block" />
                <AnimatedNumber value={est.high} format={(n) => brl(round(n, 10))} />
              </div>

              <div className="mt-6 flex items-center gap-3 border-t border-line pt-6 text-sm">
                <Clock className="size-4 text-lime-text" />
                <span>
                  {t({ pt: "Prazo estimado:", en: "Estimated lead time:" })}{" "}
                  <strong className="font-semibold">
                    {est.dLow}–{est.dHigh} {t({ pt: "dias", en: "days" })}
                  </strong>
                </span>
              </div>

              <ul className="mt-5 space-y-2">
                {svc.includes.slice(0, 4).map((inc, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-lime-text" />
                    {t(inc)}
                  </li>
                ))}
              </ul>

              <div className="mt-8 grid gap-3">
                <a
                  href={waLink(summary())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-lime inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-transform hover:scale-[1.02]"
                >
                  <MessageCircle className="size-4" />
                  {t({ pt: "Enviar estimativa no WhatsApp", en: "Send estimate on WhatsApp" })}
                </a>
                <button
                  onClick={() => {
                    onSendBrief({ text: summary(), type: serviceId });
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-full border border-line px-6 py-3.5 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
                >
                  {t({ pt: "Transformar em briefing", en: "Turn into a briefing" })}
                </button>
              </div>
              <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                {t({
                  pt: "Estimativa de referência, não é proposta final. O valor fechado vem após o briefing gratuito.",
                  en: "A reference estimate, not a final proposal. The fixed price comes after the free briefing.",
                })}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
