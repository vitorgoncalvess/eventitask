"use client";

import React from "react";
import SideItem from "./SideItem";
import strings from "../(utils)/strings";

const SidebarDash = ({
  side,
  setSide,
}: {
  side: boolean;
  setSide: Function;
}) => {
  const { DASHSIDE } = strings;
  return (
    <div
      className={`absolute top-0 bottom-0 left-0 ${
        side ? "w-56" : "w-20"
      } bg-primary transition-all flex flex-col p-3 items-center pt-28  overflow-hidden ease-linear`}
    >
      <span
        onClick={() => setSide(!side)}
        className={`absolute top-2 opacity-50 ${
          side ? "translate-x-20" : "translate-x-0 rotate-180"
        } z-10 cursor-pointer font-medium tracking-tighter text-xl bg-transparent border-2 h-8 w-8 flex items-center justify-center rounded-md transition ease-linear`}
      >
        {"<<"}
      </span>
      <ul
        className={`block w-full ${
          !side && "bg-base bg-opacity-30"
        } rounded-[30px] p-2 transition-all flex flex-col gap-1`}
      >
        {DASHSIDE.map((item) => (
          <SideItem
            key={item.path}
            img={item.img}
            selected={item.selected}
            label={item.label}
            path={item.path}
            side={side}
          />
        ))}
      </ul>
    </div>
  );
};

export default SidebarDash;
