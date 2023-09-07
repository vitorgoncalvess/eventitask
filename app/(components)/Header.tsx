"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import menu from "@/public/menu_dots.png";
import Image from "next/image";
import Modal from "./Modal";

const Header = ({ name, secs }: any) => {
  const [show, setShow] = useState(false);
  return (
    <>
      {show && <Modal setShow={setShow} secs={secs} />}
      <div className="bg-primary h-24 border-b-2 border-[#3d3d49] pl-72 flex items-center">
        <div className="flex justify-between p-8 w-full">
          <h1 className="text-3xl font-medium">{name}</h1>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setShow(true)}
              size="md"
              className="bg-base text-white"
              radius="full"
            >
              + Adicionar Tarefa
            </Button>
            <Image className="h-6 w-6 cursor-pointer" src={menu} alt="Menu" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
