import React, { useState } from "react";
import Task from "./Task";
import Modal from "./Modal";
const colors = [
  "bg-red-400",
  "bg-emerald-400",
  "bg-lime-400",
  "bg-yellow-400",
  "bg-amber-400",
  "bg-blue-400",
  "bg-indigo-400",
  "bg-purple-400",
];

interface Section {
  _id: string;
  board_id: string;
  name: string;
  color: string;
  tasks: any[];
}

const Section = ({ sec }: { sec: Section }) => {
  const [show, setShow] = useState(false);
  const [complete, setComplete] = useState(false);
  return (
    <div>
      {show && <Modal setShow={setShow} secs={sec} />}
      <div className="flex items-center gap-2">
        <div className={`h-4 w-4 rounded-full ${sec.color}`}></div>
        <h1 className="text-text tracking-widest text-[14px]">
          {sec?.name?.toUpperCase()} ({sec?.tasks?.length || 0})
        </h1>
      </div>
      <ul className="mt-4 flex flex-col gap-4">
        {sec.tasks
          ?.filter((task) => task.status !== 2)
          .map((task) => (
            <Task key={task.id} task={task} sec={sec} />
          ))}
        <div
          onClick={() => setShow(true)}
          className="flex items-center justify-center
         w-64 bg-primary opacity-50 hover:opacity-70 rounded-md p-4 text-text cursor-pointer gap-2"
        >
          + Adicionar Tarefa
        </div>
        <div
          onClick={() => setComplete(!complete)}
          className="flex items-center justify-center
         w-64 bg-primary opacity-50 hover:opacity-70 rounded-md p-2 text-text cursor-pointer gap-2"
        >
          Tarefas Concluidas (
          {sec.tasks?.filter((task) => task.status === 2).length || 0})
        </div>
        {complete &&
          sec.tasks
            ?.filter((task) => task.status === 2)
            .map((task) => <Task key={task.id} task={task} sec={sec} />)}
      </ul>
    </div>
  );
};

export default Section;
