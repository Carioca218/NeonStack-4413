import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Nav } from "../components/nav";
import { Footer, WhatsAppFab } from "../components/contact";
import { PrimaryButton } from "../components/ui-bits";
import { useLang } from "../lib/i18n";
import { POSTS, formatDate } from "../data/posts";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { t, lang } = useLang();
  const post = POSTS.find((p) => p.slug === slug);

  useEffect(() => {
    if (post) document.title = `${t(post.title)} — NeonStack Studio`;
    return () => {
      document.title = "NeonStack Studio";
    };
  }, [post, t]);

  return (
    <div className="grain relative">
      <Nav />
      <main className="container-x pt-36 pb-24 md:pt-44 md:pb-32">
        <Link href="/blog" className="label-mono inline-flex items-center gap-2 hover:text-foreground">
          <ArrowLeft className="size-3.5" /> Blog
        </Link>

        {!post ? (
          <div className="py-24">
            <h1 className="font-display text-5xl">{t({ pt: "Artigo não encontrado.", en: "Article not found." })}</h1>
          </div>
        ) : (
          <article className="mt-8">
            <div className="label-mono flex flex-wrap gap-4">
              <span className="text-lime-text">{t(post.tag)}</span>
              <span>{formatDate(post.date, lang)}</span>
              <span>{post.read} min</span>
            </div>
            <h1 className="font-display mt-6 max-w-4xl text-[clamp(2.6rem,6.5vw,5.5rem)] leading-[0.98]">{t(post.title)}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{t(post.excerpt)}</p>

            <div className="mt-14 max-w-2xl space-y-6 text-[1.08rem] leading-[1.75]">
              {post.body.map((b, i) => {
                if (b.type === "h")
                  return (
                    <h2 key={i} className="font-display pt-6 text-4xl leading-tight">
                      {t(b.text)}
                    </h2>
                  );
                if (b.type === "p") return <p key={i}>{t(b.text)}</p>;
                if (b.type === "ul")
                  return (
                    <ul key={i} className="space-y-3">
                      {b.items.map((it, j) => (
                        <li key={j} className="flex gap-3">
                          <span className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-lime" />
                          <span>{t(it)}</span>
                        </li>
                      ))}
                    </ul>
                  );
                return (
                  <blockquote key={i} className="font-display border-l-2 border-lime pl-6 text-3xl italic leading-snug">
                    {t(b.text)}
                  </blockquote>
                );
              })}
            </div>

            <div className="mt-20 flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-line bg-surface p-8 md:p-10">
              <p className="font-display max-w-md text-3xl leading-tight">
                {t({ pt: "Quer aplicar isso no seu projeto?", en: "Want to apply this to your project?" })}
              </p>
              <PrimaryButton href="/#contact">{t({ pt: "Começar um projeto", en: "Start a project" })}</PrimaryButton>
            </div>
          </article>
        )}
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
