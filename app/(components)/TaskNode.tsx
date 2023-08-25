import React from 'react';

interface Task {
  _id: string;
  name: string;
  description: string;
  ref_id: string;
  subtasks: Task[];
}

const TaskNode = ({ task }: { task: Task }) => {
  return <div>{task?.name}</div>;
};

export default TaskNode;
