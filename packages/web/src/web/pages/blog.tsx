import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { Nav } from "../components/nav";
import { Footer, WhatsAppFab } from "../components/contact";
import { Em, Reveal } from "../components/ui-bits";
import { useLang } from "../lib/i18n";
import { POSTS, formatDate } from "../data/posts";

export default function Blog() {
  const { t, lang } = useLang();
  return (
    <div className="grain relative">
      <Nav />
      <main className="container-x pt-36 pb-24 md:pt-44 md:pb-32">
        <Reveal>
          <div className="label-mono mb-5">Blog</div>
          <h1 className="font-display max-w-4xl text-[clamp(3rem,8vw,6.5rem)] leading-[0.95]">
            {t({ pt: "Ideias sobre", en: "Ideas on" })} <Em>{t({ pt: "design que vende.", en: "design that sells." })}</Em>
          </h1>
        </Reveal>
        <div className="mt-16 divide-y divide-[var(--line)] border-y border-line">
          {POSTS.map((p, k) => (
            <Reveal key={p.slug} delay={k * 0.05}>
              <Link
                href={`/blog/${p.slug}`}
                className="group grid gap-4 py-9 md:grid-cols-[10rem_1fr_auto] md:items-baseline md:gap-10"
              >
                <div className="label-mono">
                  {formatDate(p.date, lang)} · {p.read} min
                </div>
                <div>
                  <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.05] transition-transform group-hover:translate-x-1">
                    {t(p.title)}
                  </h2>
                  <p className="mt-3 max-w-2xl text-muted-foreground">{t(p.excerpt)}</p>
                </div>
                <ArrowUpRight className="hidden size-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 md:block" />
              </Link>
            </Reveal>
          ))}
        </div>
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
