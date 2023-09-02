import React, { useEffect, useState } from 'react';
import colors from '../(utils)/colors';
import node from '@/public/node.png';
import Image from 'next/image';
import axiosInstance from '../(axios)/config';

const TaskNodeTable = ({ task, setAt }: any) => {
  const [subtasks, setSubtasks] = useState([]);
  const options = [
    { value: 'Pendente', color: 'bg-yellow-400' },
    { value: 'Em Desenvolvimento', color: 'bg-blue-400' },
    { value: 'Concluido', color: 'bg-emerald-400' },
  ];
  const [show, setShow] = useState(false);
  function handleChange() {
    setSubtasks([]);
    setAt(task);
  }

  useEffect(() => {
    axiosInstance.get(`/tasks/${task.id}/subtasks`).then((response) => {
      setSubtasks(response.data);
    });
  }, [task.id]);

  return (
    <li
      className="relative items-center grid grid-cols-[70px_1fr_1fr_1fr_1fr_100px] py-2 px-4 bg-[#363640] border-b-2 border-secondary last-of-type:border-0 last-of-type:rounded-b-md"
      key={task.id}
    >
      <Image
        onClick={() => setShow(!show)}
        className="absolute h-4 w-4 left-2 cursor-pointer"
        src={node}
        alt="subtarefas"
      />
      <span className="flex items-center justify-center">
        <input type="checkbox" />
      </span>
      <span>{task.name}</span>
      <span>{new Date(task.data_estimada).toLocaleDateString('pt-br')}</span>
      <div>
        <span
          className={`${
            options[task.status].color
          } w-auto text-[rgb(0,0,0,0.5)] rounded-md px-2`}
        >
          {options[task.status].value}
        </span>
      </div>
      <ul className="flex items-center gap-2">
        {task.tags?.split(',').map((tag, index) => (
          <li
            className={`${
              colors[(index % colors.length) + 1]
            } rounded-md px-2 text-[rgb(0,0,0,0.5)]`}
            key={tag}
          >
            {tag}
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-center">
        <button
          onClick={handleChange}
          className="font-medium bg-primary hover:bg-secondary px-2 rounded-md"
        >
          Ver Mais
        </button>
      </div>
      <ul
        style={show ? { height: '60px' } : { height: '0px' }}
        className={`absolute top-10 left-0 right-0`}
      >
        {subtasks.map((task) => (
          <TaskNodeTable key={task.id} task={task} setAt={setAt} />
        ))}
      </ul>
    </li>
  );
};

export default TaskNodeTable;
