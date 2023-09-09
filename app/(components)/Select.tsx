import React, { useState, useEffect } from "react";
import axiosInstance from "../(axios)/config";
import drop from "@/public/drop-down-arrow.png";
import Image from "next/image";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

const Select = ({ id, status }: { id: string; status: number }) => {
  const options = [
    {
      value: "Pendente",
      color: "bg-yellow-400 hover:bg-yellow-400",
      info: "Atividade está ociosa",
    },
    {
      value: "Em Desenvolvimento",
      color: "bg-blue-400 hover:bg-blue-400",
      info: "Atividade está sendo feita",
    },
    {
      value: "Concluido",
      color: "bg-emerald-400 hover:bg-emerald-400",
      info: "Atividade foi finalizada",
    },
  ];
  const [state, setState] = useState(0);

  useEffect(() => {
    setState(status);
  }, [status]);

  function handleClick(status: number) {
    setState(status);
    axiosInstance.patch(`/tasks/${id}/status`, { status }).catch(() => {
      setState((state) => state);
    });
  }

  return (
    <Dropdown className="bg-primary">
      <DropdownTrigger>
        <Button className={`${options[state].color} text-[rgb(0,0,0,0.6)]`}>
          <div>{options[state].value}</div>
          <Image className="h-3 w-3 opacity-60" src={drop} alt="status" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        //@ts-ignore
        color=""
        itemClasses={{
          base: [
            "w-full",
            "flex",
            "items-center",
            "justify-between",
            "data-[hover=true]:bg-secondary",
          ],
        }}
        disabledKeys={[options[state].value]}
        selectedKeys={options[state].value}
        selectionMode="single"
      >
        {options.map((opt, index) => (
          <DropdownItem
            endContent={
              <span className={`${opt.color} h-10 w-1 rounded `}></span>
            }
            onClick={() => handleClick(index)}
            key={opt.value}
          >
            <div className="flex flex-col">
              <span className="font-medium text-md">{opt.value}</span>
              <span className="opacity-50 text-[12px]">{opt.info}</span>
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default Select;
