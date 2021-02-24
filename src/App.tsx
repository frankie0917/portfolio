import React, { useEffect, useRef } from "react";
import { LanguageBtn } from "./component/LanguageBtn";
import { Link, Navbar } from "./component/Navbar";
import { Introduction } from "./section/Introduction";

function App() {
  const introRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  const links: Link[] = [
    {
      text: "intro",
    },
    {
      text: "about",
    },
  ];

  useEffect(() => {
    scrollTo("intro");
  }, []);

  const scrollTo = (target: Link["text"]) => {
    switch (target) {
      case "intro":
        introRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "about":
        aboutRef.current!.scrollIntoView({ behavior: "smooth" });
        break;
    }
  };
  return (
    <div className="w-full h-full">
      <Navbar links={links} scrollTo={scrollTo} />
      <Introduction ref={introRef} />
      <LanguageBtn />
      <div className="h-full" ref={aboutRef}>
        about
      </div>
    </div>
  );
}

export default App;
