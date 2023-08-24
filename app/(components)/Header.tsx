import React from "react";
import Button from "./Button";
import menu from "@/public/menu_dots.png";
import Image from "next/image";

const Header = ({ id, name }: { id: string; name: string }) => {
  return (
    <div className="bg-primary h-24 border-b-2 border-[#3d3d49] pl-72 flex items-center">
      <div className="flex justify-between p-8 w-full">
        <h1 className="text-3xl font-medium">{name}</h1>
        <div className="flex items-center gap-2">
          <Button size="p" background="base" rounded="full">
            + Adicionar Tarefa
          </Button>
          <Image className="h-6 w-6 cursor-pointer" src={menu} alt="Menu" />
        </div>
      </div>
    </div>
  );
};

export default Header;
