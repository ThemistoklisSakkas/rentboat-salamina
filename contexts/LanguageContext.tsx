"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { translationsMap, Lang } from "@/lib/translations";

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  tr: typeof translationsMap.en;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "gr",
  setLang: () => {},
  tr: translationsMap.gr,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("gr");

  useEffect(() => {
    const stored = localStorage.getItem("rbs_lang") as Lang | null;
    if (stored === "en" || stored === "gr") setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("rbs_lang", l);
  };

  const tr = translationsMap[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, tr }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
