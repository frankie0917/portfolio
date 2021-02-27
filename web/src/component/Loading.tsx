import { motion } from "framer-motion";
import React from "react";
import loadingImg from "../img/loading.svg";

export const Loading = () => {
  return (
    <motion.div
      className="w-10 h-10 flex justify-center items-center ml-auto mr-auto mt-8 mb-4"
      animate={{ rotate: 360 }}
      transition={{
        ease: "linear",
        duration: 1,
        loop: Infinity,
      }}
    >
      <img src={loadingImg} alt="loading" />
    </motion.div>
  );
};
