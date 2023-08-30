import React from "react";

interface Task {
  id: string;
  name: string;
  description: string;
  section_id: number;
  task_id: number;
  subtasks: number;
}

const ModalHeader = ({
  setShow,
  name,
  setAt,
  bread,
  setBread,
}: {
  setShow: Function;
  name: string;
  setAt: Function;
  bread: Task[];
  setBread: Function;
}) => {
  function handleChange(item: Task, act: number) {
    if (act !== bread.length - 1) {
      setBread(bread.filter((_, index) => index < act));
      setAt(item);
    }
  }

  return (
    <div className="h-12 flex items-center justify-between border-b-2 rounded-t-md bg-[#272735] border-[#3d3d49] p-6">
      <div>
        <ul className="flex items-center gap-2 text-[12px] [&>li]:after:ml-2">
          <li
            onClick={() => setShow(false)}
            className="after:content-['>'] cursor-pointer"
          >
            EventiTask
          </li>
          <li
            onClick={() => setShow(false)}
            className="after:content-['>'] cursor-pointer"
          >
            {name}
          </li>
          {bread.map((item, index) => (
            <li
              key={index}
              onClick={() => handleChange(item, index)}
              className={`${
                index === bread.length - 1 ? "" : "after:content-['>']"
              } cursor-pointer`}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <ul className="flex items-center gap-3 [&>li]:cursor-pointer">
        <li
          onClick={() => setShow(false)}
          className="h-3.5 w-3.5 rounded-full bg-[#87DB32]"
        ></li>
        <li className="h-3.5 w-3.5 rounded-full bg-[#DBC032]"></li>
        <li
          onClick={() => setShow(false)}
          className="h-3.5 w-3.5 rounded-full bg-[#DB3232]"
        ></li>
      </ul>
    </div>
  );
};

export default ModalHeader;
