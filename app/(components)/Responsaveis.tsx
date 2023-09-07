import Image from "next/image";
import React, { useState, useContext } from "react";
import ModalResponsaveis from "./ModalResponsaveis";
import add from "@/public/add_circle.png";
import cross from "@/public/cross.png";
import Loading from "./Loading";
import axiosInstance from "../(axios)/config";
import { BoardContext } from "../home/[[...board]]/page";
import { Avatar } from "@nextui-org/react";

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
  const [respo, setRespo] = useState<User[]>(task?.responsaveis || []);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleExclude(id: string) {
    setLoading(true);
    axiosInstance.delete(`/tasks/${task?.id}/${id}/resp`).then(() => {
      setRespo(respo.filter((resp) => resp.id !== id));
      setLoading(false);
    });
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
      <div>
        {loading ? (
          <Loading color="white" />
        ) : (
          <Image
            onClick={() => setShow(!show)}
            className="cursor-pointer"
            src={add}
            alt="Participante"
          />
        )}
      </div>
      {show && (
        <ModalResponsaveis
          setShow={setShow}
          task={task}
          respo={respo}
          setRespo={setRespo}
          setLoading={setLoading}
        />
      )}
    </div>
  );
};

export default Responsaveis;
