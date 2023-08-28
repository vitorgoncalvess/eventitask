import React from 'react';
import TaskNode from './TaskNode';

interface Task {
  _id: string;
  name: string;
  description: string;
  ref_id: string;
  subtasks: Task[];
}

const Tasks = ({ task, setAt }: { task: Task; setAt: Function }) => {
  return (
    <div className="h-64 bg-[#1B1B24] p-6 mt-8 rounded-md">
      <TaskNode setAt={setAt} father task={task} />
    </div>
  );
};

export default Tasks;
