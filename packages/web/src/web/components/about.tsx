import { useLang, type L } from "../lib/i18n";
import { CONTACT, BRANDS } from "../data/site";
import { Em, Reveal, SectionHead } from "./ui-bits";

const PRINCIPLES: { title: L; text: L }[] = [
  {
    title: { pt: "Métrica antes do visual", en: "Metrics before visuals" },
    text: {
      pt: "Começo pelo objetivo de negócio. Animação só entra se ajudar alguém a decidir.",
      en: "I start from the business goal. Animation only gets in if it helps someone decide.",
    },
  },
  {
    title: { pt: "Navegação invisível", en: "Invisible navigation" },
    text: {
      pt: "Layouts que guiam o olhar sem o visitante perceber que foi guiado.",
      en: "Layouts that guide the eye without the visitor noticing they were guided.",
    },
  },
  {
    title: { pt: "Microinterações com propósito", en: "Micro-interactions with purpose" },
    text: {
      pt: "Feedback que explica o fluxo e dá acabamento — nunca enfeite.",
      en: "Feedback that explains the flow and adds polish — never decoration.",
    },
  },
  {
    title: { pt: "Código que escala", en: "Code that scales" },
    text: {
      pt: "TypeScript e componentes limpos: seu site cresce sem virar retrabalho.",
      en: "TypeScript and clean components: your site grows without turning into rework.",
    },
  },
];

const STACK = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB", "Figma", "HTML5 & CSS3"];

export function About() {
  const { t } = useLang();
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="overflow-hidden rounded-[2rem] border border-line">
                <img
                  src="/images/breno.jpg"
                  alt={CONTACT.name}
                  width={700}
                  height={933}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover object-top grayscale transition-all duration-700 hover:grayscale-0"
                />
              </div>
              <div className="btn-lime absolute -bottom-5 -right-3 rotate-[-4deg] rounded-2xl px-5 py-3 shadow-xl md:-right-6">
                <div className="font-display text-3xl leading-none">2022</div>
                <div className="text-[11px] font-semibold uppercase tracking-wider">
                  {t({ pt: "criando desde", en: "building since" })}
                </div>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-8">
            <SectionHead
              index="05"
              label={t({ pt: "Sobre", en: "About" })}
              title={
                <>
                  {t({ pt: "Do design ao deploy,", en: "From design to deploy," })}{" "}
                  <Em>{t({ pt: "uma pessoa só.", en: "one person." })}</Em>
                </>
              }
              className="!mb-8"
            />
            <Reveal>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {t({
                  pt: `Sou ${CONTACT.name}, desenvolvedor e designer no Rio de Janeiro. Desde 2022 crio experiências digitais que equilibram estética e performance. Falar direto comigo significa zero telefone-sem-fio: quem desenha é quem programa, e quem programa responde no WhatsApp.`,
                  en: `I'm ${CONTACT.name}, a developer and designer in Rio de Janeiro. Since 2022 I've built digital experiences that balance aesthetics and performance. Talking to me directly means no broken telephone: the person who designs is the one who codes — and answers on WhatsApp.`,
                })}
              </p>
            </Reveal>

            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {PRINCIPLES.map((p, i) => (
                <Reveal key={i} delay={i * 0.06} className="bg-background p-6">
                  <div className="label-mono text-lime-text">0{i + 1}</div>
                  <h3 className="mt-3 text-lg font-medium">{t(p.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(p.text)}</p>
                </Reveal>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {STACK.map((s) => (
                <span key={s} className="rounded-full border border-line px-4 py-2 font-mono text-xs">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <Reveal className="mt-24 border-t border-line pt-10">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <p className="label-mono max-w-[16rem]">{t({ pt: "Marcas que já passaram pela oficina", en: "Brands that have been through the workshop" })}</p>
            <ul className="flex flex-wrap items-center gap-4">
              {BRANDS.map((b) => (
                <li key={b.name} title={b.name}>
                  <img
                    src={b.img}
                    alt={b.name}
                    loading="lazy"
                    className="size-16 rounded-full border border-line object-cover grayscale transition-all duration-300 hover:scale-110 hover:grayscale-0 md:size-20"
                  />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
