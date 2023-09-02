import React from 'react';
import TaskNode from './TaskNode';
import strings from '../(utils)/strings';

interface Task {
  id: string;
  name: string;
  description: string;
  section_id: number;
  task_id: number;
  subtasks: number;
  data_estimada: string;
}

const Tasks = ({
  task,
  setAt,
  table,
}: {
  task: Task;
  setAt: Function;
  table: boolean;
}) => {
  const { TABLE } = strings;
  if (table)
    return (
      <>
        <ul className="mt-8 bg-secondary grid grid-cols-[70px_1fr_1fr_1fr_1fr_100px] py-2 px-4 rounded-t-md">
          {TABLE.map((tab, index) => (
            <li
              className={index === 0 ? 'flex items-center justify-center' : ''}
              key={tab}
            >
              {tab}
            </li>
          ))}
        </ul>
        <ul>
          <TaskNode setAt={setAt} task={task} table />
        </ul>
      </>
    );
  else
    return (
      <div className="min-h-64 bg-[#1B1B24] p-6 mt-8 rounded-md">
        <TaskNode setAt={setAt} father task={task} />
      </div>
    );
};

export default Tasks;
