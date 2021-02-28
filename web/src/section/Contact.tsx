import React from "react";
import { useTranslation } from "react-i18next";

export const Contact = React.forwardRef<HTMLDivElement>((props, ref) => {
  const { t } = useTranslation();
  const contacts = [
    {
      name: t("contact.wechat"),
      value: "j2675413",
    },
    {
      name: t("contact.phone"),
      value: "18144885044",
    },
  ];
  return (
    <div
      ref={ref}
      className="h-full flex justify-center items-center"
      style={{ background: "#e0e0e0" }}
    >
      <div
        className="w-1/2 p-10 pb-4"
        style={{
          borderRadius: 10,
          background: "#e0e0e0",
          boxShadow: "20px 20px 60px #bebebe, -20px -20px 60px #ffffff",
        }}
      >
        {contacts.map((it) => (
          <div className="text-2xl mb-6">
            <div>{it.name}</div>
            <div
              className="mt-2 flex items-center p-4 px-6"
              style={{
                borderRadius: 5,
                background: "#e0e0e0",
                boxShadow:
                  "inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff",
              }}
            >
              {it.value}
            </div>
          </div>
        ))}
        <div></div>
      </div>
    </div>
  );
});
