import React, { useEffect, useRef } from "react";
import { LanguageBtn } from "./component/LanguageBtn";
import { Link, Navbar } from "./component/Navbar";
import { About } from "./section/About";
import { Contact } from "./section/Contact";
import { Introduction } from "./section/Introduction";
import { Projects } from "./section/Projects";
import { Tech } from "./section/Tech";

function App() {
  const introRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
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
      text: "tech",
      ref: techRef,
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
      <Navbar links={links} scrollTo={scrollTo} />
      <Introduction ref={introRef} />
      <About ref={aboutRef} />
      <Tech ref={techRef} />
      <Projects ref={projectsRef} />
      <Contact ref={contactRef} />
      <LanguageBtn />
    </div>
  );
}

export default App;
