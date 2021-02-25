import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Translation } from "../locales";

export type Link = {
  text: keyof Translation["nav"];
  ref: React.RefObject<HTMLDivElement>;
};

export const Navbar: React.FC<{
  links: Link[];
  scrollTo: (target: Link["text"]) => void;
}> = ({ links, scrollTo }) => {
  const { t } = useTranslation();
  const [passedIntro, setPassedIntro] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      const threshold = window.pageYOffset > window.innerHeight * 2 - 50;
      setPassedIntro(threshold);
    });
  }, []);

  const Link = ({ text }: { text: Link["text"] }) => {
    return (
      <div
        className={`mr-4 px-2 py-4 cursor-pointer hover:underline ${
          passedIntro
            ? "text-black hover:text-gray-500"
            : "text-white hover:text-gray-400"
        }`}
        onClick={() => scrollTo(text)}
      >
        {t("nav." + text)}
      </div>
    );
  };

  return (
    <div
      ref={ref}
      className={`disable-select flex justify-center fixed z-50 text-xl transition-all`}
      style={{ top: 0, left: 0, right: 0 }}
    >
      {links.map((it) => (
        <Link key={it.text} text={it.text} />
      ))}
    </div>
  );
};
