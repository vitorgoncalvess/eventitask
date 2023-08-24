import React from "react";

const colors = ["bg-[#ff5555]"];

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
        <div className={`h-4 w-4 rounded-full bg-[${sec.color}]`}></div>
        <h1 className="text-text tracking-widest text-[14px]">
          {sec.name.toUpperCase()} (
          {sec.tasks.filter((item) => item.name).length})
        </h1>
      </div>
      {sec.tasks.map((task) => (
        <span key={task.name}>{task.name}</span>
      ))}
    </div>
  );
};

export default Section;
