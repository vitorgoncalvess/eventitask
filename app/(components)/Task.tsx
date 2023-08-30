import React, { useState } from "react";
import ModalTask from "./ModalTask";
import Image from "next/image";
import { Task } from "@/app/(utils)/interfaces";

const Task = ({ task, sec }: { task: Task; sec: any }) => {
  const [show, setShow] = useState(false);
  const options = [
    { value: "Pendente", color: "bg-blue-400" },
    { value: "Em Desenvolvimento", color: "bg-emerald-400" },
    { value: "Concluido", color: "bg-yellow-400" },
  ];
  return (
    <>
      {show && <ModalTask setShow={setShow} task={task} sec={sec} />}
      <div
        data-finished={task.status === 2}
        onClick={() => setShow(true)}
        className="flex flex-col w-64 bg-primary data-[finished=true]:opacity-50 rounded-md p-4 text-text cursor-pointer"
      >
        <h1 className="text-lg text-white font-medium w-44 break-words">
          {task.name}
        </h1>
        <h2 className="mt-1 mb-1">{task.description}</h2>
        <h2 className="text-sm">
          <b>0</b> de <b>{task.subtasks}</b> subtarefas feitas.
        </h2>
        <div className="flex items-center justify-between mt-2">
          <div
            className={`text-xs py-0.5 px-1.5 text-[rgb(0,0,0,0.7)] rounded ${
              options[task.status].color
            }`}
          >
            <span>{options[task.status].value}</span>
          </div>
          <ul className="flex items-center justify-end gap-2 mt-1">
            {task.responsaveis?.map((user: any) => (
              <li key={user.id}>
                <Image
                  width={100}
                  height={100}
                  className="h-6 w-6 rounded-full object-cover"
                  src={user.img}
                  alt="usuario"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Task;
