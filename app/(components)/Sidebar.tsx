"use client";

import React, { useState } from "react";
import Logo from "./Logo";
import { useQuery } from "react-query";
import axiosInstance from "../(axios)/config";
import Image from "next/image";
import boardIcon from "@/public/board.png";
import boardIconWhite from "@/public/tablet_white.png";
import { useRouter } from "next/navigation";
import ModalNovaSecao from "./ModalNovaSecao";

const Sidebar = () => {
  const [boards, setBoards] = useState([]);
  useQuery(
    "boards",
    () => {
      return axiosInstance.get("/boards");
    },
    {
      onSuccess(response) {
        setBoards(response.data.boards);
      },
    },
  );

  const router = useRouter();

  return (
    <>
      <div className="w-72"></div>
      <div className="absolute top-0 bottom-0 left-0 w-72 bg-primary flex flex-col border-r-2 border-[#3d3d49]">
        <div className="p-5">
          <Logo size="lg" />
        </div>
        <h3 className="p-6 font-medium tracking-widest text-text text-sm">
          TODAS ÁREAS ({boards.length})
        </h3>
        <ul>
          {boards?.map((item: any) => (
            <li
              data-selected={location.href.includes(item.id)}
              className="px-6 py-3 data-[selected=true]:bg-base data-[selected=false]:text-text w-11/12 rounded-r-full flex items-center gap-4 font-medium cursor-pointer"
              key={item.id}
              onClick={() => router.push(`/home/${item.id}`)}
            >
              <Image
                className="h-4 w-4"
                src={
                  location.href.includes(item.id) ? boardIconWhite : boardIcon
                }
                alt="Board"
              />
              <span>{item.name}</span>
            </li>
          ))}
          <ModalNovaSecao />
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
