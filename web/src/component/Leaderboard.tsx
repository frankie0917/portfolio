import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Loading } from "./Loading";

export type score = {
  name: string;
  score: number;
};

export const Leaderboard = ({
  show,
  setShow,
  newValue,
  setNewValue,
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  newValue?: { name: string; score: number };
  setNewValue: React.Dispatch<
    React.SetStateAction<
      | {
          name: string;
          score: number;
        }
      | undefined
    >
  >;
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [listData, setListData] = useState<score[]>([]);
  const [emphasize, setEmphasize] = useState(false);

  const fetchLeaderboard = (isCancelled: boolean) => {
    return fetch("http://localhost:4000/leaderboard")
      .then((res) => res.json())
      .then((val) => {
        if (!isCancelled) {
          setListData(val);
          setLoading(false);
        }
      })
      .catch((e) => {
        if (!isCancelled) {
          setLoading(false);
          setError(t("fetch_error"));
          console.error(e);
        }
      });
  };

  useEffect(() => {
    let isCancelled = false;
    fetchLeaderboard(isCancelled);
    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    if (newValue) setShow(true);

    let isCancelled = false;
    fetchLeaderboard(isCancelled);
    setEmphasize(true);
    return () => {
      isCancelled = true;
    };
  }, [newValue]);

  if (!show) return <div></div>;

  return (
    <div
      className="absolute left-0 top-0 bottom-0 right-0 flex justify-center items-center z-50"
      style={{ background: "rgba(0,0,0,.5)" }}
    >
      <div
        className="bg-gray-200 p-6 rounded-lg relative"
        style={{ minWidth: 320 }}
      >
        <div className="mb-2 text-4xl text-yellow-500">
          {t("about.leaderboard.title")}
        </div>
        <div className="text-gray-500 mb-4">{t("about.leaderboard.note")}</div>
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="mt-4 text-red-500">{error}</div>
        ) : (
          <AnimateSharedLayout>
            <AnimatePresence>
              {listData.map((it, i) => (
                <motion.div
                  key={it.name}
                  layout
                  className={`bg-white text-2xl flex overflow-hidden justify-between items-center mb-4 rounded w-80 ${
                    newValue?.name === it.name &&
                    emphasize &&
                    "border-4 border-yellow-500"
                  }`}
                  animate={{
                    scale: newValue?.name === it.name && emphasize ? 1.1 : 1,
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="flex items-center">
                    <div className="text-white mr-4 p-2 w-12 text-center bg-yellow-400">
                      {i + 1}
                    </div>
                    <div>{it.name}</div>
                  </div>
                  <div className="text-yellow-500 pr-4">{it.score}</div>
                </motion.div>
              ))}
            </AnimatePresence>
          </AnimateSharedLayout>
        )}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setShow(false);
            setEmphasize(false);
            setNewValue(undefined);
          }}
          className="disable-select cursor-pointer text-red-500 text-xl absolute absolute right-8 top-8"
        >
          X
        </motion.div>
      </div>
    </div>
  );
};
