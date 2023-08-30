import React from "react";
import Task from "./Task";
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
  return (
    <div>
      <div className="flex items-center gap-2">
        <div className={`h-4 w-4 rounded-full ${sec.color}`}></div>
        <h1 className="text-text tracking-widest text-[14px]">
          {sec?.name?.toUpperCase()} ({sec?.tasks?.length || 0})
        </h1>
      </div>
      <ul className="mt-4 flex flex-col gap-4">
        {sec.tasks?.map((task) => (
          <Task key={task.name} task={task} sec={sec} />
        ))}
      </ul>
    </div>
  );
};

export default Section;
