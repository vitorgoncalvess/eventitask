"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import Modal from "./Modal";
import MenuHeader from "./MenuHeader";

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
            <MenuHeader name={name} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
