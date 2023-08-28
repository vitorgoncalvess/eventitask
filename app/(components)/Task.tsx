import React, { useState } from 'react';
import ModalTask from './ModalTask';
import Image from 'next/image';

interface Task {
  _id: string;
  name: string;
  description: string;
  ref_id: string;
  subtasks: Task[];
  resp: [];
  responsibleUsers: [];
}

const Task = ({ task, sec }: { task: Task; sec: any }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      {show && <ModalTask setShow={setShow} task={task} sec={sec} />}
      <div
        onClick={() => setShow(true)}
        className="flex flex-col w-64 bg-primary rounded-md p-4 text-text cursor-pointer"
      >
        <h1 className="text-lg text-white font-medium">{task.name}</h1>
        <h2 className="mt-1 mb-1">{task.description}</h2>
        <h2 className="text-sm">
          <b>0</b> de <b>{task.subtasks.length}</b> subtarefas feitas.
        </h2>
        <ul className="flex items-center justify-end gap-2 mt-1">
          {task.responsibleUsers.map((user: any) => (
            <li key={user._id}>
              <Image
                width={100}
                height={100}
                className="h-6 w-6 rounded-full object-cover"
                src={user.img}
                alt="usuario"
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Task;
