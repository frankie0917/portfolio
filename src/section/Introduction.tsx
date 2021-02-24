import React, { useEffect, useState } from "react";
import Particles from "react-tsparticles";
import particlesOptions from "../particles.json";
import { ISourceOptions } from "tsparticles";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const Introduction = React.forwardRef<HTMLDivElement>((props, ref) => {
  const { t } = useTranslation();

  const techs = [
    "fullstack",
    "frontend",
    "typescript",
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
    <div
      ref={ref}
      className="justify-center items-center flex relative w-full h-full"
    >
      <Particles
        options={particlesOptions as ISourceOptions}
        width="100%"
        height="100%"
        className="absolute w-full h-full z-0"
      />
      <div
        className="absolute text-white text-6xl p-6 z-50 left-1/2 top-1/2 text-right"
        style={{
          background: "rgba(255,255,255,.1)",
          transform: `translate(-75%, -50%)`,
        }}
      >
        <div className="mb-6">
          {t("introduction.greeting")}
          <span className="text-yellow-500 ml-4">{t("introduction.name")}</span>
        </div>
        <div className="flex">
          {t("introduction.im_a")}
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
          {t("introduction.developer")}
        </div>
      </div>
      <div
        className="absolute w-52 h-52 bg-white top-1/2 left-1/2"
        style={{ transform: `translate(130%, -50%)` }}
      >
        1
      </div>
    </div>
  );
});
