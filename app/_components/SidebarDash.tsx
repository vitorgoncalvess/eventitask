"use client";

import React from "react";
import SideItem from "./SideItem";
import strings from "../_utils/strings";
import logo from "@/public/logo_transparent.png";
import home from "@/public/home.svg";
import homeWhite from "@/public/homeWhite.svg";
import Image from "next/image";

const SidebarDash = ({
  side,
  setSide,
}: {
  side: boolean;
  setSide: Function;
}) => {
  const { DASHSIDEPURPLE, DASHSIDERED } = strings;
  return (
    <div
      className={`absolute top-0 bottom-0 left-0 ${
        side ? "w-56" : "w-20"
      } bg-primary transition-all flex flex-col p-4 items-center pt-28  overflow-hidden ease-linear`}
    >
      <div className="group">
        <Image
          data-open={side}
          className="absolute top-5 left-[1.4rem] h-9 w-9 transition data-[open=false]:group-hover:rotate-180 duration-500"
          src={logo}
          alt="Eventitask"
        />
        <span
          onClick={() => setSide(!side)}
          className={`absolute top-5 ${
            side ? "translate-x-16 opacity-50" : "-translate-x-4 opacity-0"
          } z-20 cursor-pointer font-bold tracking-tighter text-xl bg-transparent border-2 h-8 w-8 flex items-center justify-center rounded-md transition ease-linear`}
        >
          {"<"}
        </span>
      </div>
      <ul
        className={`w-full rounded-[30px] p-2 transition-all flex flex-col gap-1 mt`}
      >
        <SideItem
          img={home}
          selected={homeWhite}
          label="Home"
          side={side}
          color="white"
        />
      </ul>
      <ul
        className={`w-full ${
          !side && "bg-base bg-opacity-30"
        } rounded-[30px] p-2 transition-all flex flex-col gap-3 mt-8`}
      >
        {DASHSIDEPURPLE.map((item) => (
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
      <ul
        className={`w-full ${
          !side && "bg-red-500 bg-opacity-30"
        } rounded-[30px] p-2 transition-all flex flex-col gap-3 mt-8`}
      >
        {DASHSIDERED.map((item) => (
          <SideItem
            key={item.path}
            img={item.img}
            selected={item.selected}
            path={item.path}
            label={item.label}
            side={side}
            color="red"
          />
        ))}
      </ul>
    </div>
  );
};

export default SidebarDash;
