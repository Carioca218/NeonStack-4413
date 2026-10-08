import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Menu, Moon, Sun, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { AnimatedBrand, boot } from "./brand";
import { useLang, useTheme, type L } from "../lib/i18n";

const LINKS: { href: string; label: L }[] = [
  { href: "/#work", label: { pt: "Trabalho", en: "Work" } },
  { href: "/#services", label: { pt: "Serviços", en: "Services" } },
  { href: "/#process", label: { pt: "Processo", en: "Process" } },
  { href: "/#estimate", label: { pt: "Orçamento", en: "Estimate" } },
  { href: "/blog", label: { pt: "Blog", en: "Blog" } },
];

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="NeonStack Studio">
      <span className="grid size-8 place-items-center rounded-[9px] bg-lime font-display text-xl leading-none text-[#0A0A09]">
        N
      </span>
      <span className="text-[15px] font-semibold tracking-tight">
        <AnimatedBrand text="NeonStack" delay={boot.delay + 0.1} />
        <span className="text-muted-foreground font-normal"> Studio</span>
      </span>
    </Link>
  );
}

export function Nav() {
  const { lang, setLang, t } = useLang();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "border-b border-line bg-background/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="container-x flex h-[68px] items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {t(l.label)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex rounded-full border border-line p-0.5 text-xs font-medium" aria-label="Language">
            {(["pt", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`rounded-full px-2.5 py-1.5 uppercase transition-colors ${
                  lang === l ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <button
            onClick={toggle}
            aria-label={theme === "dark" ? t({ pt: "Modo claro", en: "Light mode" }) : t({ pt: "Modo escuro", en: "Dark mode" })}
            className="grid size-9 place-items-center rounded-full border border-line text-muted-foreground transition-colors hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <a
            href="/#contact"
            className="btn-lime hidden rounded-full px-5 py-2.5 text-sm font-semibold transition-transform hover:scale-[1.03] sm:inline-block"
          >
            {t({ pt: "Iniciar projeto", en: "Start a project" })}
          </a>
          <button
            className="grid size-9 place-items-center rounded-full border border-line lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100dvh - 68px)" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-background lg:hidden"
          >
            <div className="container-x flex h-full flex-col justify-between py-8">
              <div className="flex flex-col">
                {[...LINKS, { href: "/#contact", label: { pt: "Contato", en: "Contact" } }].map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    className="font-display border-b border-line py-4 text-4xl"
                  >
                    {t(l.label)}
                  </motion.a>
                ))}
              </div>
              <a
                href="/#contact"
                onClick={() => setOpen(false)}
                className="btn-lime rounded-full py-4 text-center text-sm font-semibold"
              >
                {t({ pt: "Iniciar projeto", en: "Start a project" })}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
