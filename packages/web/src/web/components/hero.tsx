import { lazy, Suspense, useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue, type MotionStyle } from "motion/react";
import { ArrowDown } from "lucide-react";
import { useLang } from "../lib/i18n";
import { CONTACT, waLink } from "../data/site";
import { boot } from "./brand";
import { CountUp, Em, GhostButton, PrimaryButton } from "./ui-bits";

const Hero3D = lazy(() => import("./hero3d"));

function canUse3D() {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

function Frame({
  src,
  url,
  className,
  style,
  eager,
}: {
  src: string;
  url: string;
  className?: string;
  style?: MotionStyle;
  eager?: boolean;
}) {
  return (
    <motion.div
      style={style}
      className={`absolute overflow-hidden rounded-xl border border-line bg-surface shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)] ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-line bg-surface px-3 py-2.5">
        <span className="size-2 rounded-full bg-foreground/20" />
        <span className="size-2 rounded-full bg-foreground/20" />
        <span className="size-2 rounded-full bg-foreground/20" />
        <span className="ml-3 truncate rounded-md bg-secondary px-3 py-0.5 font-mono text-[10px] text-muted-foreground">
          {url}
        </span>
      </div>
      <img
        src={src}
        alt=""
        width={1400}
        height={875}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="block aspect-[16/10] w-full object-cover object-top"
      />
    </motion.div>
  );
}

function Stack2D({ y1, y2, y3 }: { y1: MotionValue<number>; y2: MotionValue<number>; y3: MotionValue<number> }) {
  return (
    <>
      <Frame src="/images/work/nexus.webp" url="nexus-analytics.app" className="right-0 top-0 w-[72%]" style={{ y: y3, rotate: 3 }} />
      <Frame src="/images/work/barber.webp" url="barbearia-elite.com.br" className="left-0 top-[18%] z-10 w-[74%]" style={{ y: y1, rotate: -2.5 }} eager />
      <Frame src="/images/work/fiber.webp" url="redegigafibra.com.br" className="bottom-0 right-[6%] z-20 w-[62%]" style={{ y: y2, rotate: 1.5 }} />
    </>
  );
}

export function Hero() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -130]);

  const [use3d] = useState(canUse3D);

  const stats = [
    { n: 195, s: "+", l: { pt: "projetos entregues", en: "projects delivered" } },
    { n: 166, s: "+", l: { pt: "artes e designs", en: "artworks & designs" } },
    { n: 2022, s: "", l: { pt: "criando desde", en: "building since" } },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden pt-[68px]">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 size-[640px] rounded-full opacity-[0.16] blur-[120px] dark:opacity-[0.14]"
        style={{ background: "radial-gradient(circle, #C8FF2E, transparent 65%)" }}
      />
      <div className="container-x relative grid items-center gap-10 pb-16 pt-10 lg:min-h-[calc(100svh-68px)] lg:grid-cols-12 lg:gap-6 lg:pb-12 lg:pt-8">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: boot.delay }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 py-1.5 pl-3 pr-4 text-xs backdrop-blur"
          >
            <span className="pulse-dot size-2 rounded-full bg-lime" />
            <span className="text-muted-foreground">
              {t({ pt: "Agenda aberta para novos projetos", en: "Open for new projects" })}
            </span>
          </motion.div>

          <h1 className="font-display text-[clamp(3.1rem,8.2vw,8.2rem)] leading-[0.92]">
            {[
              [t({ pt: "Sites e marcas", en: "Websites & brands" })],
              [t({ pt: "que", en: "that" }), <Em key="e">{t({ pt: "vendem", en: "sell" })}</Em>],
              [t({ pt: "por você.", en: "for you." })],
            ].map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: boot.delay + 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line.map((part, j) => (
                    <span key={j}>
                      {j > 0 && " "}
                      {part}
                    </span>
                  ))}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            className="mt-10 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: boot.delay + 0.5, duration: 0.7 }}
          >
            <p className="text-lg leading-relaxed text-muted-foreground">
              {t({
                pt: `Sou o ${CONTACT.name}. Desenho e programo sites, landing pages, identidades e convites digitais — do briefing ao deploy, com um objetivo só: fazer o telefone do seu negócio tocar.`,
                en: `I'm ${CONTACT.name}. I design and build websites, landing pages, brand identities and digital invitations — from brief to deploy, with one goal: make your business phone ring.`,
              })}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryButton
                href={waLink(
                  t({
                    pt: "Olá Breno! Vi o site da NeonStack e quero conversar sobre um projeto.",
                    en: "Hi Breno! I saw the NeonStack site and I'd like to talk about a project.",
                  }),
                )}
                external
              >
                {t({ pt: "Falar no WhatsApp", en: "Chat on WhatsApp" })}
              </PrimaryButton>
              <GhostButton href="#work">
                {t({ pt: "Ver trabalhos", en: "See the work" })}
                <ArrowDown className="size-4" />
              </GhostButton>
            </div>

            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-6">
              {stats.map((s) => (
                <div key={s.n}>
                  <dt className="font-display text-4xl leading-none md:text-5xl">
                    {s.s ? <CountUp to={s.n} suffix={s.s} /> : s.n}
                  </dt>
                  <dd className="label-mono mt-2 !normal-case !tracking-normal">{t(s.l)}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>

        {/* 3D stage (falls back to the 2D stack without WebGL / with reduced motion) */}
        <div className="relative h-[420px] sm:h-[520px] lg:col-span-5 lg:h-[min(680px,calc(100svh-140px))]">
          {use3d ? (
            <Suspense fallback={<Stack2D y1={y1} y2={y2} y3={y3} />}>
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: boot.delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <Hero3D />
              </motion.div>
            </Suspense>
          ) : (
            <Stack2D y1={y1} y2={y2} y3={y3} />
          )}
        </div>
      </div>
    </section>
  );
}

export function Marquee() {
  const { t } = useLang();
  const items = [
    { pt: "Sites de marca", en: "Brand websites" },
    { pt: "Landing pages", en: "Landing pages" },
    { pt: "Redesign", en: "Redesign" },
    { pt: "Identidade visual", en: "Brand identity" },
    { pt: "Convites digitais", en: "Digital invitations" },
    { pt: "Tabelas de preço", en: "Price boards" },
    { pt: "Dashboards", en: "Dashboards" },
    { pt: "Lojas virtuais", en: "Online stores" },
  ];
  const row = [...items, ...items];
  return (
    <div className="marquee overflow-hidden border-y border-black/10 bg-lime py-4 text-[#0A0A09]" aria-hidden>
      <div className="marquee-track flex gap-10 whitespace-nowrap">
        {row.map((it, i) => (
          <span key={i} className="font-display flex items-center gap-10 text-3xl md:text-4xl">
            {t(it)}
            <span className="text-xl">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
