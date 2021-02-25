import { motion } from "framer-motion";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export const LanguageBtn = () => {
  const { i18n } = useTranslation();
  const [x, setX] = useState(0);
  const [current, setCurrent] = useState(0);

  const renderLng = (text: string, index: number) => {
    const first = index === 0;
    const isCurrent = index === current;

    const calcX = () => {
      if (first) {
        return isCurrent ? x : -x - 55.99;
      } else {
        return isCurrent ? -x : x + 55.99;
      }
    };
    return (
      <motion.div
        animate={{
          x: calcX(),
        }}
        transition={{ type: "just" }}
        className={`disable-select text-2xl absolute flex justify-center items-center w-14 h-14 ${
          first ? "text-white bg-pink-600" : "text-pink-600 bg-white"
        }`}
      >
        <motion.span
          animate={{
            x: first ? (isCurrent ? -x / 2 : -x / 2 - 5) : x / 2,
            fontSize: isCurrent && x !== 0 ? "75%" : "100%",
          }}
          transition={{ type: "just" }}
        >
          {text}
        </motion.span>
      </motion.div>
    );
  };

  return (
    <motion.div
      className="fixed rounded-full bg-white w-14 h-14 shadow-lg cursor-pointer overflow-hidden"
      style={{ right: 20, bottom: 20 }}
      onClick={() => {
        setCurrent((prev) => (prev === 0 ? 1 : 0));
        i18n.changeLanguage(current === 0 ? "en" : "cn");
        // setX(0);
      }}
      onHoverStart={() => {
        setX(-35);
      }}
      onHoverEnd={() => {
        setX(0);
      }}
    >
      {renderLng("中", 0)}
      {renderLng("En", 1)}
    </motion.div>
  );
};
