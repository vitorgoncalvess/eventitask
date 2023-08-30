import React from "react";
import TaskNode from "./TaskNode";

interface Task {
  id: string;
  name: string;
  description: string;
  section_id: number;
  task_id: number;
  subtasks: number;
}

const Tasks = ({ task, setAt }: { task: Task; setAt: Function }) => {
  return (
    <div className="min-h-64 bg-[#1B1B24] p-6 mt-8 rounded-md">
      <TaskNode setAt={setAt} father task={task} />
    </div>
  );
};

export default Tasks;
