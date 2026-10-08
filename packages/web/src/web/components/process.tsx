import { motion } from "motion/react";
import { useLang } from "../lib/i18n";
import { PROCESS } from "../data/content";
import { Em, SectionHead } from "./ui-bits";

export function Process() {
  const { t } = useLang();
  return (
    <section id="process" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHead
          index="03"
          label={t({ pt: "Como funciona", en: "How it works" })}
          title={
            <>
              {t({ pt: "Cinco passos,", en: "Five steps," })} <Em>{t({ pt: "zero enrolação.", en: "zero fluff." })}</Em>
            </>
          }
          sub={t({
            pt: "Você sabe em que etapa está, o que vem depois e quando recebe — do primeiro contato à publicação.",
            en: "You always know which stage you're in, what comes next and when you get it — from first contact to launch.",
          })}
        />

        <ol className="relative grid gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-5">
          {PROCESS.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative flex min-h-[18rem] flex-col bg-background p-7 transition-colors hover:bg-surface lg:min-h-[26rem]"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-6xl leading-none text-lime-text">{s.n}</span>
                <span className="label-mono">{t(s.time)}</span>
              </div>
              <h3 className="font-display mt-auto text-4xl leading-none">{t(s.title)}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t(s.text)}</p>
              <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-lime transition-transform duration-500 group-hover:scale-x-100" />
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
