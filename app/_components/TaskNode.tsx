import React, { useEffect, useState } from "react";
import TaskNodeTable from "./TaskNodeTable";
import { Task } from "../_utils/interfaces";

const TaskNode = ({
  task,
  setAt,
  father,
  table,
}: {
  task: Task;
  setAt?: Function;
  father?: boolean;
  table?: boolean;
}) => {
  const [subtasks, setSubtasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/tasks/${task.id}/subtasks`);
      const data = await response.json();
      setSubtasks(data);
    };
    fetchData();
  }, [task.id]);

  function handleChange() {
    if (!father) {
      setSubtasks([]);
      setAt(task);
    }
  }

  if (table)
    return (
      <>
        {subtasks?.map((task) => (
          <TaskNodeTable key={task.id} task={task} setAt={setAt} />
        ))}
      </>
    );
  else
    return (
      <div className="relative mb-2 mt-2 text-zinc-400 group">
        <h1
          onClick={handleChange}
          className={`flex items-center hover:text-white cursor-pointer ${
            !father &&
            "before:content-[''] before:inline-block before:h-1 before:bg-zinc-400 before:ml-1 before:mr-2 before:w-4 hover:before:bg-white hover:text-white"
          }`}
        >
          {task.name}
        </h1>
        <ul className="relative ml-8">
          <div
            className={`absolute ${
              subtasks.length > 1
                ? "h-[calc(100%-10px)]"
                : subtasks.length > 0
                ? "h-[14px]"
                : ""
            } w-1 bg-zinc-400 rounded-bl-lg`}
          ></div>
          {subtasks?.map((item) => (
            <TaskNode key={item.id} setAt={setAt} task={item} />
          ))}
        </ul>
      </div>
    );
};

export default TaskNode;
