import React, { useEffect, useState } from "react";
import Particles from "react-tsparticles";
import particlesOptions from "../particles.json";
import { ISourceOptions } from "tsparticles";

export const Introduction = () => {
  const techs = [
    "fullstack",
    "react",
    "express",
    "graphql",
    "typeorm",
    "react-nativeF",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setIndex((prev) => prev++), 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="justify-center items-center flex relative">
      <Particles options={particlesOptions as ISourceOptions} />
      <div
        className="absolute text-white text-6xl p-6"
        style={{ background: "rgba(255,255,255,.1)" }}
      >
        <div>
          Hi! My name is <span className="text-yellow-500">Frank Huang</span>.
        </div>
        <div>
          I am a <span className="text-yellow-500">{techs[index]}</span>{" "}
          developer.
        </div>
      </div>
    </div>
  );
};
