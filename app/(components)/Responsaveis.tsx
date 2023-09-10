import Image from "next/image";
import React, { useEffect, useState } from "react";
import add from "@/public/add_circle.png";
import cross from "@/public/cross.png";
import axiosInstance from "../(axios)/config";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Skeleton,
} from "@nextui-org/react";

interface User {
  id: string;
  name: string;
  email: string;
  img: string;
}

const Responsaveis = ({
  task,
}: {
  task?: { id: string; responsaveis: [] };
  resp?: User[];
}) => {
  const [responsaveis, setResponsaveis] = useState([]);
  const [respo, setRespo] = useState<User[]>(task?.responsaveis || []);

  useEffect(() => {
    axiosInstance.get("/usuarios").then((response) => {
      setResponsaveis(response.data);
    });
  }, []);

  function handleExclude(id: string) {
    axiosInstance.delete(`/tasks/${task?.id}/${id}/resp`).then(() => {
      setRespo(respo.filter((resp) => resp.id !== id));
    });
  }

  function handleResp(resp: User) {
    if (!respo?.some((user: any) => user.id == resp.id)) {
      axiosInstance.post(`/tasks/${task.id}/${resp.id}/resp`).then(() => {
        setRespo((responsaveis: User[]) => [...responsaveis, resp]);
      });
    }
  }

  return (
    <div className="flex items-center justify-end relative gap-2 ">
      <span className="text-zinc-400 text-sm">Responsaveis</span>
      <div className="flex items-center gap-2">
        {respo.map((user: any) => (
          <div key={user.id} className="relative group">
            <Avatar src={user.img} name={user.name} />
            <Image
              onClick={() => handleExclude(user.id)}
              className="hidden h-4 w-4 group-hover:block absolute top-0 right-0 cursor-pointer z-10"
              src={cross}
              alt="excluir"
            />
          </div>
        ))}
      </div>
      <Dropdown
        key={respo.length}
        classNames={{
          base: ["bg-primary"],
        }}
      >
        <DropdownTrigger>
          <Button
            variant="light"
            size="sm"
            className="data-[hover=true]:bg-transparent min-w-[0px]"
          >
            <Image className="cursor-pointer" src={add} alt="Participante" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disabledKeys={respo.map((r) => r.id)}
          itemClasses={{
            base: "data-[hover=true]:bg-secondary data-[hover=true]:text-white",
          }}
        >
          {responsaveis?.map((responsavel) => (
            <DropdownItem
              isReadOnly={true}
              className={`${
                respo.find((r) => r.id === responsavel.id)
                  ? "opacity-50 cursor-default data-[hover]:bg-transparent"
                  : ""
              }`}
              onClick={() => handleResp(responsavel)}
              key={responsavel.id}
            >
              <div className="flex items-center gap-2">
                <Avatar
                  classNames={{
                    base: "border-2 border-secondary",
                  }}
                  src={responsavel.img}
                />
                <section className="flex items-start flex-col">
                  <h1 className="font-medium">{responsavel.name}</h1>
                  <h2 className="text-xs opacity-40">Desenvolvedor</h2>
                </section>
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default Responsaveis;
