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
    { value: "Pendente", color: "bg-yellow-400" },
    { value: "Em Desenvolvimento", color: "bg-blue-400" },
    { value: "Concluido", color: "bg-emerald-400" },
  ];
  const [state, setState] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setState(status);
  }, [status]);

  function handleClick(status: number) {
    setState(status);
    setShow(false);
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
        disabledKeys={[options[state].value]}
        selectedKeys={options[state].value}
        selectionMode="single"
      >
        {options.map((opt, index) => (
          <DropdownItem
            onClick={() => handleClick(index)}
            className={`${options[index].color}`}
            key={opt.value}
          >
            {opt.value}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default Select;
