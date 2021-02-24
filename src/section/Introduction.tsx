import React, { useEffect, useState } from "react";
import Particles from "react-tsparticles";
import particlesOptions from "../particles.json";
import { ISourceOptions } from "tsparticles";
import { motion } from "framer-motion";

export const Introduction = () => {
  const techs = [
    "fullstack",
    "react",
    "express",
    "graphql",
    "typeorm",
    "graphql-nexus",
    "sequelize",
    "postgres",
    "react-native",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev === techs.length - 1 ? 0 : prev + 1)),
      2000
    );
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="justify-center items-center flex relative w-full h-full">
      <Particles
        options={particlesOptions as ISourceOptions}
        width="100%"
        height="100%"
        className="w-full h-full"
      />
      <div
        className="absolute text-white text-6xl p-6"
        style={{ background: "rgba(255,255,255,.1)" }}
      >
        <div>
          Hi! My name is <span className="text-yellow-500">Frank Huang</span>.
        </div>
        <div className="flex">
          I am a
          <motion.span
            className="px-2 mx-2 text-yellow-500"
            animate={(index % 2) + ""}
            variants={{
              0: {
                rotateX: 360,
              },
              1: { rotateX: 0 },
            }}
          >
            {techs[index]}
          </motion.span>
          developer.
        </div>
      </div>
    </div>
  );
};
