import React, { useState } from "react";
import ModalTask from "./ModalTask";
import Image from "next/image";
import calendar from "@/public/calendar_month.png";
import { Task } from "@/app/_utils/interfaces";
import CircleGraph from "./CircleGraph";
import colors from "../_utils/colors";
import { Avatar, AvatarGroup } from "@nextui-org/react";

const Task = ({ task, sec }: { task: Task; sec: any }) => {
  const [show, setShow] = useState(false);
  const options = [
    { value: "Pendente", color: "bg-yellow-400" },
    { value: "Em Desenvolvimento", color: "bg-blue-400" },
    { value: "Concluido", color: "bg-emerald-400" },
  ];

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString();
  }

  return (
    <>
      {show && <ModalTask setShow={setShow} task={task} sec={sec} />}
      <div
        data-finished={task.status === 2}
        onClick={() => setShow(true)}
        className="flex flex-col w-64 bg-primary data-[finished=true]:opacity-50 rounded-md p-4 text-text cursor-pointer gap-2"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-lg text-white font-medium w-44 break-words">
            {task.name}
          </h1>
          <div className="h-6 w-6">
            <CircleGraph
              data={task.subtasks_status?.filter((item) => item === "2").length}
              max={task.status === 2 ? task.subtasks : task.subtasks + 1}
              single={!task.subtasks_status}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div
            className={`text-xs py-0.5 px-1.5 w-auto text-[rgb(0,0,0,0.7)] rounded-md ${
              options[task.status].color
            }`}
          >
            <span>{options[task.status].value}</span>
          </div>
          <ul className="flex items-center gap-1">
            {task?.tags?.map((tag: string, index: number) => (
              <li
                className={`${
                  colors[task.tags_id[index] % colors.length]
                } rounded-md py-0.5 px-1 opacity-80 text-[8px] text-white`}
                key={index}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <h2 className="mt-1 mb-1 opacity-60 text-sm">{task.description}</h2>
        <h2 className="text-sm"></h2>
        <div className="flex items-center justify-between">
          <ul className="flex items-center justify-end gap-1">
            <AvatarGroup
              size="sm"
              max={3}
              renderCount={(count) => (
                <p className="text-xs ml-1">+{count} resp</p>
              )}
            >
              {task?.responsaveis?.length > 0
                ? task.responsaveis.map((user: any) => (
                    <li key={user.id}>
                      <Avatar size="sm" src={user.img} name={user.name} />
                    </li>
                  ))
                : "..."}
            </AvatarGroup>
          </ul>
          <div className="flex items--center gap-1">
            <Image src={calendar} alt="Data Estimada" />
            <span className="text-sm">{formatDate(task.data_estimada)}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Task;
