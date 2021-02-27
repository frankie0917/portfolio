import { motion } from "framer-motion";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Game } from "../component/Game";
import { Leaderboard } from "../component/Leaderboard";
import meImg from "../img/me.jpg";
import leaderboardImg from "../img/leaderboard.svg";

export const About = React.forwardRef<HTMLDivElement>((props, ref) => {
  const { t } = useTranslation();
  const [isBegin, setIsBegin] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [newValue, setNewValue] = useState<{ name: string; score: number }>();
  return (
    <div
      ref={ref}
      className="h-full flex items-center justify-center bg-gray-700 relative"
    >
      <div
        className=" left-1/2 top-20 h-20 absolute flex"
        style={{ transform: "translate(-50%,0)" }}
      >
        <motion.div
          onClick={() => {
            setIsBegin((prev) => !prev);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`${
            isBegin ? "bg-red-500 text-white" : "bg-white"
          } disable-select cursor-pointer text-black p-4 outline-none rounded-md flex justify-center items-center`}
        >
          {isBegin ? t("about.end") : t("about.start")}
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowLeaderboard(true)}
          className={
            "bg-yellow-500 w-20 ml-4 text-white disable-select cursor-pointer text-black p-4 outline-none rounded-md"
          }
        >
          <img src={leaderboardImg} alt="leaderboard" />
        </motion.div>
      </div>
      <Game isBegin={isBegin} setNewValue={setNewValue} />
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
      <Leaderboard
        show={showLeaderboard}
        setShow={setShowLeaderboard}
        newValue={newValue}
        setNewValue={setNewValue}
      />
    </div>
  );
});
