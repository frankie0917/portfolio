import React, { useEffect, useRef } from "react";
import { LanguageBtn } from "./component/LanguageBtn";
import { Link, Navbar } from "./component/Navbar";
import { About } from "./section/About";
import { Contact } from "./section/Contact";
import { Introduction } from "./section/Introduction";
import { Projects } from "./section/Projects";

function App() {
  const introRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const links: Link[] = [
    {
      text: "intro",
      ref: introRef,
    },
    {
      text: "about",
      ref: aboutRef,
    },
    {
      text: "projects",
      ref: projectsRef,
    },
    {
      text: "contact",
      ref: contactRef,
    },
  ];

  useEffect(() => {
    scrollTo("intro");
  }, []);

  const scrollTo = (target: Link["text"]) => {
    const { ref } = links.find((it) => it.text === target)!;
    ref.current!.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="w-full h-full">
      <Introduction ref={introRef} />
      <About ref={aboutRef} />
      <Projects ref={projectsRef} />
      <Contact ref={contactRef} />
      <Navbar links={links} scrollTo={scrollTo} />
      <LanguageBtn />
    </div>
  );
}

export default App;
