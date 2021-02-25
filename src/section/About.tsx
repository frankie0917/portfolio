import { motion } from "framer-motion";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Game } from "../component/Game";
import meImg from "../img/me.jpg";

export const About = React.forwardRef<HTMLDivElement>((props, ref) => {
  const { t } = useTranslation();
  const [isBegin, setIsBegin] = useState(false);
  return (
    <div
      ref={ref}
      className="h-full flex items-center justify-center bg-gray-700 relative"
    >
      <div
        onClick={() => setIsBegin((prev) => !prev)}
        className={`${
          isBegin ? "bg-red-500 text-white" : "bg-white"
        } disable-select cursor-pointer start-btn text-black p-4 outline-none left-1/2 top-20 rounded-md absolute`}
        style={{ transform: "translate(-50%,0)" }}
      >
        {isBegin ? t("about.end") : t("about.start")}
      </div>
      {isBegin && <Game />}
      <motion.div
        animate={isBegin ? "start" : "end"}
        variants={{
          start: {
            x: [0, -window.innerWidth / 3 + 130],
            rotate: [0, 90],
            width: 150,
            height: 30,
            color: "rgba(0,0,0,0)",
            opacity: [1, 0.2, 0],
          },
          end: {},
        }}
        transition={[{ duration: 0.2 }, { duration: 1 }]}
        className={`p-6 w-auto h-auto text-xl bg-white mr-6 z-10 overflow-hidden`}
      >
        <p>{t("about.p1")}</p>
        <p>
          {t("about.p2.l1")}
          <span className="font-bold"> {t("name")}</span>
          {t("about.p2.l2")}
          <span className="font-bold"> {t("age")}</span>
          {t("about.p2.l3")}
          <span className="font-bold"> {t("from")}</span>
          {t("about.p2.l4")}
        </p>
        <p>
          {t("about.p3.l1")}
          <span className="font-bold"> {t("major")}</span>。
        </p>
        <p>{t("about.p4")}</p>
      </motion.div>
      <div
        className="rounded-full overflow-hidden w-40 z-10"
        style={{
          transition: "all .5s ease",
          left: isBegin ? "50%" : "auto",
          top: isBegin ? "50%" : "auto",
          opacity: isBegin ? 0 : 1,
          transform: isBegin ? "translate(-50%,0%) scale(.5)" : "",
        }}
      >
        <img src={meImg} alt="me" />
      </div>
    </div>
  );
});
