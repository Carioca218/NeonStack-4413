import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "pt" | "en";
export type L = { pt: string; en: string };

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** pick the string for the current language */
  t: (v: L) => string;
};

const LangContext = createContext<Ctx | null>(null);

function initialLang(): Lang {
  if (typeof window === "undefined") return "pt";
  try {
    const saved = localStorage.getItem("ns-lang");
    if (saved === "pt" || saved === "en") return saved;
  } catch {}
  return navigator.language?.toLowerCase().startsWith("pt") ? "pt" : "en";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("ns-lang", l);
    } catch {}
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: (v) => v[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}

/** Theme */
type Theme = "dark" | "light";
const ThemeContext = createContext<{ theme: Theme; toggle: () => void } | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")
      ? "dark"
      : "light",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#0A0A09" : "#F3F0E8");
    try {
      localStorage.setItem("ns-theme", theme);
    } catch {}
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
