import { motion } from "framer-motion";
import React, { useState } from "react";
import FrankHuangImg from "../img/FrankHuang.svg";
import nonogramImg from "../img/nonogram.png";
import covidImg from "../img/covid.png";
import changeImg from "../img/change.svg";

export const Projects = React.forwardRef<HTMLDivElement>((props, ref) => {
  const [current, setCurrent] = useState(0);
  const [rotate, setRotate] = useState(0);
  const projects = [
    {
      name: "Nonogram",
      desc: "Simple nonogram game.",
      img: nonogramImg,
      link: "http://localhost:4000/nonogram",
    },
    {
      name: "Covid-19 Tracker",
      desc: "Simple covid tracker.",
      img: covidImg,
      link: "http://localhost:4000/covid",
    },
  ];
  const { desc, img, name, link } = projects[current];
  return (
    <div
      ref={ref}
      className="h-full relative flex justify-center items-center"
      style={{
        backgroundImage: " linear-gradient(120deg, #f093fb 0%, #f5576c 100%)",
      }}
    >
      <div
        className="absolute top-1/2 left-1/2 disable-select"
        style={{ transform: "translate(-50%,-50%)", width: "70%" }}
      >
        <img src={FrankHuangImg} alt="Frank Huang" />
      </div>
      <motion.div
        style={{
          top: 100,
          left: "50%",
          x: "-50%",
          background: "rgba(255,255,255,.25)",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setRotate((prev) => prev + 360);
          setCurrent((prev) => {
            return (prev + 1) % projects.length;
          });
        }}
        className="absolute w-12 h-12 p-2 rounded-full cursor-pointer shadow-lg"
      >
        <img src={changeImg} alt="change" />
      </motion.div>
      <motion.div
        className="shadow-lg p-6 rounded-lg relative"
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        style={{
          width: "30%",
          backdropFilter: "blur(8px)",
          background: "rgba(255,255,255,.25)",
        }}
        animate={{ rotateY: rotate }}
      >
        <div>
          <motion.a
            href={link}
            style={{ display: "block" }}
            className="text-5xl flex justify-between mb-4 border-b-2 pb-4 border-gray-600"
          >
            {name}
            <span>{"->"}</span>
          </motion.a>
          <div className="text-lg mb-4">{desc}</div>
        </div>
        <div>
          <motion.img src={img} alt={name} />
        </div>
      </motion.div>
    </div>
  );
});
