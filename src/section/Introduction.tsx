import React, { useEffect, useState } from "react";
import Particles from "react-tsparticles";
import particlesOptions from "../particles.json";
import { ISourceOptions } from "tsparticles";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import fullstackImg from "../img/fullstack.svg";
import frontendImg from "../img/frontend.svg";
import typescriptImg from "../img/typescript.svg";
import reactImg from "../img/react.svg";
import expressImg from "../img/express.png";
import typeormImg from "../img/typeorm.png";
import graphqlImg from "../img/graphql.svg";
import nexusImg from "../img/nexus.png";
import sequelizeImg from "../img/sequelize.svg";
import postgresImg from "../img/Postgres.svg";
import reactNativeImg from "../img/react-native.svg";

export type Tech = {
  name: string;
  bg?: string;
  img: string;
};

export const Introduction = React.forwardRef<HTMLDivElement>((props, ref) => {
  const { t } = useTranslation();

  const techs: Tech[] = [
    { name: "fullstack", img: fullstackImg },
    { name: "frontend", img: frontendImg },
    { name: "typescript", img: typescriptImg },
    { name: "react", img: reactImg },
    { name: "express", img: expressImg },
    { name: "graphql", img: graphqlImg },
    { name: "typeorm", img: typeormImg },
    { name: "graphql-nexus", img: nexusImg },
    { name: "sequelize", img: sequelizeImg },
    { name: "postgres", img: postgresImg },
    { name: "react-native", img: reactNativeImg },
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
  const { img, name, bg } = techs[index];
  const transition = {
    delay: 1.8,
    repeat: Infinity,
    duration: 0.6,
    repeatDelay: 1.4,
  };

  return (
    <div
      ref={ref}
      className="justify-center items-center flex relative w-full h-full bg-gray-500"
    >
      <Particles
        options={particlesOptions as ISourceOptions}
        width="100%"
        height="100%"
        className="absolute w-full h-full z-0"
      />
      <div
        className="absolute text-white md:text-4xl text-6xl p-6 z-50 left-1/2 top-1/2 text-right"
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
            animate={{
              rotateX: 360,
            }}
            transition={transition}
          >
            {name}
          </motion.span>
          {t("introduction.developer")}
        </div>
      </div>
      <div
        className="absolute w-52 h-52 left-1/2"
        style={{ transform: "translateX(100%)" }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ ...transition, type: "spring" }}
          className="w-full h-full bg-white flex justify-center items-center p-2 overflow-hidden rounded-xl convex"
        >
          <img
            className={`${name === "frontend" ? "h-full w-auto" : ""}`}
            src={img}
            alt={name}
          />
        </motion.div>
      </div>
    </div>
  );
});
