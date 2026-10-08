import { useEffect, useState, type FormEvent } from "react";
import { Link } from "wouter";
import { Check, Instagram, MessageCircle, Globe, Loader2 } from "lucide-react";
import { useLang, type L } from "../lib/i18n";
import { SERVICES, type ServiceId } from "../data/content";
import { CONTACT, waLink } from "../data/site";
import { useCreateBriefing } from "../queries/briefing";
import { Em, PrimaryButton, Reveal } from "./ui-bits";
import { BigWordmark } from "./brand";
import { Logo } from "./nav";

const BUDGETS: L[] = [
  { pt: "Até R$ 500", en: "Up to R$ 500" },
  { pt: "R$ 500 – 1.500", en: "R$ 500 – 1,500" },
  { pt: "R$ 1.500 – 3.000", en: "R$ 1,500 – 3,000" },
  { pt: "Acima de R$ 3.000", en: "Over R$ 3,000" },
  { pt: "Ainda não sei", en: "Not sure yet" },
];
const DEADLINES: L[] = [
  { pt: "Urgente (até 1 semana)", en: "Rush (within 1 week)" },
  { pt: "Até 2 semanas", en: "Within 2 weeks" },
  { pt: "Até 1 mês", en: "Within 1 month" },
  { pt: "Sem pressa", en: "No rush" },
];

const field =
  "w-full rounded-xl border border-line bg-background px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-lime-text focus:ring-2 focus:ring-lime/30";

export type Prefill = { text: string; type: ServiceId; nonce: number } | null;

export function Contact({ prefill }: { prefill: Prefill }) {
  const { t, lang } = useLang();
  const mutation = useCreateBriefing();
  const [form, setForm] = useState({
    name: "",
    whatsapp: "",
    email: "",
    projectType: "landing" as string,
    budget: "",
    deadline: "",
    message: "",
    website: "",
  });
  const [sent, setSent] = useState<{ name: string } | null>(null);

  useEffect(() => {
    if (!prefill) return;
    setForm((f) => ({ ...f, projectType: prefill.type, message: prefill.text }));
  }, [prefill]);

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const svc = SERVICES.find((s) => s.id === form.projectType);
    mutation.mutate(
      {
        name: form.name,
        whatsapp: form.whatsapp,
        email: form.email,
        projectType: svc ? svc.name.pt : form.projectType,
        budget: form.budget || undefined,
        deadline: form.deadline || undefined,
        message: form.message,
        lang,
        website: form.website,
      },
      { onSuccess: () => setSent({ name: form.name.split(" ")[0] }) },
    );
  };

  const err = mutation.error as { message?: string } | null;

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-20 size-[560px] rounded-full opacity-[0.12] blur-[120px]"
        style={{ background: "radial-gradient(circle, #C8FF2E, transparent 65%)" }}
      />
      <div className="container-x relative">
        <Reveal>
          <div className="label-mono mb-5 flex items-center gap-3">
            <span className="text-lime-text">09</span>
            <span className="h-px w-10 bg-line" />
            <span>{t({ pt: "Contato", en: "Contact" })}</span>
          </div>
          <h2 className="font-display max-w-5xl text-[clamp(2.8rem,8vw,7rem)] leading-[0.94]">
            {t({ pt: "Traga o problema.", en: "Bring the problem." })}
            <br />
            <Em>{t({ pt: "Eu desenho a saída.", en: "I'll design the way out." })}</Em>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div className="rounded-3xl border border-line bg-surface/60 p-6 md:p-10">
            {sent ? (
              <output className="block py-10 text-center">
                <div className="btn-lime mx-auto grid size-16 place-items-center rounded-full">
                  <Check className="size-8" strokeWidth={3} />
                </div>
                <h3 className="font-display mt-6 text-4xl">
                  {t({ pt: `Recebido, ${sent.name}!`, en: `Got it, ${sent.name}!` })}
                </h3>
                <p className="mx-auto mt-3 max-w-sm text-muted-foreground">
                  {t({
                    pt: "Seu briefing foi salvo. Respondo em até 24h com escopo e prazo. Quer acelerar? Me chame no WhatsApp.",
                    en: "Your briefing is saved. I'll reply within 24h with scope and timeline. Want it faster? Ping me on WhatsApp.",
                  })}
                </p>
                <div className="mt-8 flex justify-center">
                  <PrimaryButton
                    href={waLink(
                      t({
                        pt: `Olá Breno! Acabei de enviar um briefing pelo site (${sent.name}).`,
                        en: `Hi Breno! I just sent a briefing through the site (${sent.name}).`,
                      }),
                    )}
                    external
                  >
                    {t({ pt: "Chamar no WhatsApp", en: "Message on WhatsApp" })}
                  </PrimaryButton>
                </div>
              </output>
            ) : (
              <form onSubmit={submit} className="grid gap-5" noValidate={false}>
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xl font-medium">{t({ pt: "Briefing rápido", en: "Quick briefing" })}</h3>
                  <span className="label-mono">{t({ pt: "~2 min", en: "~2 min" })}</span>
                </div>
                {/* honeypot */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={set("website")}
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  aria-hidden
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm">
                    {t({ pt: "Seu nome", en: "Your name" })}
                    <input aria-label={t({ pt: "Seu nome", en: "Your name" })} required minLength={2} className={field} value={form.name} onChange={set("name")} autoComplete="name" />
                  </label>
                  <label className="grid gap-2 text-sm">
                    WhatsApp
                    <input
                      aria-label="WhatsApp"
                      required
                      minLength={8}
                      className={field}
                      value={form.whatsapp}
                      onChange={set("whatsapp")}
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="(21) 90000-0000"
                    />
                  </label>
                </div>
                <label className="grid gap-2 text-sm">
                  E-mail <span className="-mt-1 text-xs text-muted-foreground">{t({ pt: "opcional", en: "optional" })}</span>
                  <input aria-label="E-mail" type="email" className={field} value={form.email} onChange={set("email")} autoComplete="email" />
                </label>
                <div className="grid gap-5 sm:grid-cols-3">
                  <label className="grid gap-2 text-sm">
                    {t({ pt: "Projeto", en: "Project" })}
                    <select className={field} value={form.projectType} onChange={set("projectType")}>
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.id}>
                          {t(s.name)}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="grid gap-2 text-sm">
                    {t({ pt: "Investimento", en: "Budget" })}
                    <select className={field} value={form.budget} onChange={set("budget")}>
                      <option value="">{t({ pt: "Selecione", en: "Select" })}</option>
                      {BUDGETS.map((b) => (
                        <option key={b.pt} value={b.pt}>
                          {t(b)}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="grid gap-2 text-sm">
                    {t({ pt: "Prazo", en: "Deadline" })}
                    <select className={field} value={form.deadline} onChange={set("deadline")}>
                      <option value="">{t({ pt: "Selecione", en: "Select" })}</option>
                      {DEADLINES.map((d) => (
                        <option key={d.pt} value={d.pt}>
                          {t(d)}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <label className="grid gap-2 text-sm">
                  {t({ pt: "Conte o objetivo e envie referências", en: "Tell me the goal and share references" })}
                  <textarea
                    aria-label={t({ pt: "Mensagem", en: "Message" })}
                    required
                    minLength={10}
                    rows={5}
                    className={`${field} resize-y`}
                    value={form.message}
                    onChange={set("message")}
                    placeholder={t({
                      pt: "Ex.: Tenho uma barbearia e quero que os clientes agendem pelo WhatsApp…",
                      en: "E.g. I run a barbershop and want clients to book through WhatsApp…",
                    })}
                  />
                </label>

                {mutation.isError && (
                  <p role="alert" className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {err?.message === "rate_limited"
                      ? t({ pt: "Muitos envios seguidos. Tente de novo em alguns minutos ou chame no WhatsApp.", en: "Too many submissions. Try again in a few minutes or use WhatsApp." })
                      : t({ pt: "Não consegui enviar. Confira os campos ou chame no WhatsApp.", en: "Couldn't send. Check the fields or use WhatsApp." })}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <PrimaryButton type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="size-4 animate-spin" /> {t({ pt: "Enviando…", en: "Sending…" })}
                      </>
                    ) : (
                      t({ pt: "Enviar briefing", en: "Send briefing" })
                    )}
                  </PrimaryButton>
                  <span className="text-xs text-muted-foreground">
                    {t({ pt: "Resposta em até 24h. Sem spam.", en: "Reply within 24h. No spam." })}
                  </span>
                </div>
              </form>
            )}
          </div>

          <aside className="grid content-start gap-4">
            <a
              href={waLink(t({ pt: "Olá Breno! Quero conversar sobre um projeto.", en: "Hi Breno! I'd like to talk about a project." }))}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-lime group flex items-center justify-between rounded-3xl p-7 transition-transform hover:scale-[1.015]"
            >
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider opacity-70">WhatsApp</div>
                <div className="font-display mt-1 text-3xl leading-none">{CONTACT.whatsappLabel}</div>
              </div>
              <MessageCircle className="size-8" />
            </a>
            {[
              { href: CONTACT.instagram, label: "Instagram", value: CONTACT.instagramHandle, icon: Instagram },
              { href: CONTACT.fiverr, label: "Fiverr", value: "Gigs & reviews", icon: Globe },
              { href: CONTACT.contra, label: "Contra", value: t({ pt: "Portfólio independente", en: "Independent portfolio" }), icon: Globe },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                aria-label={c.label}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-2xl border border-line p-5 transition-colors hover:bg-secondary"
              >
                <div>
                  <div className="label-mono">{c.label}</div>
                  <div className="mt-1 font-medium">{c.value}</div>
                </div>
                <c.icon className="size-5 text-muted-foreground" />
              </a>
            ))}
            <p className="px-1 text-sm text-muted-foreground">
              {t({
                pt: `${CONTACT.city} · atendimento em todo o Brasil e remoto internacional.`,
                en: `${CONTACT.city} · serving all of Brazil and remote worldwide.`,
              })}
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="overflow-hidden border-t border-line pt-16">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t({
                pt: "Portfólio independente para marcas que precisam parecer reais, confiáveis e prontas para vender.",
                en: "An independent studio for brands that need to look real, trustworthy and ready to sell.",
              })}
            </p>
          </div>
          <nav aria-label="Footer" className="grid content-start gap-2.5 text-sm">
            <span className="label-mono mb-1">{t({ pt: "Navegar", en: "Navigate" })}</span>
            <a href="/#work" className="hover:text-lime-text">{t({ pt: "Trabalho", en: "Work" })}</a>
            <a href="/#services" className="hover:text-lime-text">{t({ pt: "Serviços", en: "Services" })}</a>
            <a href="/#estimate" className="hover:text-lime-text">{t({ pt: "Orçamento", en: "Estimate" })}</a>
            <Link href="/blog" className="hover:text-lime-text">Blog</Link>
          </nav>
          <div className="grid content-start gap-2.5 text-sm">
            <span className="label-mono mb-1">{t({ pt: "Canais", en: "Channels" })}</span>
            <a href={waLink("Olá Breno!")} target="_blank" rel="noopener noreferrer" className="hover:text-lime-text">WhatsApp</a>
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-lime-text">Instagram</a>
            <a href={CONTACT.fiverr} target="_blank" rel="noopener noreferrer" className="hover:text-lime-text">Fiverr</a>
            <a href={CONTACT.contra} target="_blank" rel="noopener noreferrer" className="hover:text-lime-text">Contra</a>
          </div>
        </div>
        <BigWordmark
          text="NeonStack"
          className="font-display mt-10 text-center text-[clamp(4rem,19vw,17rem)] leading-[0.85] tracking-tight text-foreground/[0.07]"
        />
        <div className="flex flex-wrap justify-between gap-3 border-t border-line py-6 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} NeonStack Studio · {CONTACT.name}</span>
          <span>{t({ pt: "Feito com React, Three.js e atenção aos detalhes.", en: "Built with React, Three.js and attention to detail." })}</span>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFab() {
  const { t } = useLang();
  return (
    <a
      href={waLink(t({ pt: "Olá Breno! Vim pelo site.", en: "Hi Breno! I came from the website." }))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-[#06260f] shadow-[0_10px_30px_-5px_rgba(37,211,102,0.55)] transition-transform hover:scale-105"
    >
      <MessageCircle className="size-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
