import React, { useState } from 'react';
import TaskNode from './TaskNode';
import strings from '../(utils)/strings';
import { Task } from '../(utils)/interfaces';
import Image from 'next/image';
import tableIcon from '@/public/tablet_white.png';
import node from '@/public/node.png';

const Tasks = ({ task, setAt }: { task: Task; setAt: Function }) => {
  const [table, setTable] = useState(true);
  const { TABLE } = strings;
  if (table)
    return (
      <>
        <ul className="relative mt-8 bg-secondary grid grid-cols-[70px_1fr_1fr_1fr_1fr_90px] py-2 px-4 rounded-t-md">
          {TABLE.map((tab, index) => (
            <li
              className={index === 0 ? 'flex items-center justify-center' : ''}
              key={tab}
            >
              {tab}
            </li>
          ))}
          <Image
            onClick={() => setTable(false)}
            className="h-4 w-4 absolute top-3 right-3 opacity-50 cursor-pointer"
            src={tableIcon}
            alt="tabela"
          />
        </ul>
        <ul>
          <TaskNode setAt={setAt} task={task} table />
        </ul>
      </>
    );
  else
    return (
      <div className="min-h-64 bg-[#1B1B24] p-6 mt-8 rounded-md relative">
        <TaskNode setAt={setAt} father task={task} />
        <Image
          onClick={() => setTable(true)}
          className="h-4 w-4 absolute top-3 right-3 opacity-50 cursor-pointer"
          src={node}
          alt="node"
        />
      </div>
    );
};

export default Tasks;
