import React, { useEffect, useState } from 'react';
import colors from '../(utils)/colors';
import node from '@/public/node.png';
import Image from 'next/image';
import axiosInstance from '../(axios)/config';

const TaskNodeTable = ({ task, setAt }: any) => {
  const [subtasks, setSubtasks] = useState([]);
  const [show, setShow] = useState(false);
  const [state, setState] = useState(task.status);
  const options = [
    { value: 'Pendente', color: 'bg-yellow-400' },
    { value: 'Em Desenvolvimento', color: 'bg-blue-400' },
    { value: 'Concluido', color: 'bg-emerald-400' },
  ];

  function handleChange() {
    setSubtasks([]);
    setAt(task);
  }

  useEffect(() => {
    axiosInstance.get(`/tasks/${task.id}/subtasks`).then((response) => {
      setSubtasks(response.data);
    });
  }, [task.id]);

  function handleComplete() {
    if (state === 2) {
      axiosInstance.patch(`/tasks/${task.id}/status`, { status: 0 });
      setState(0);
    } else {
      axiosInstance.patch(`/tasks/${task.id}/status`, { status: 2 });
      setState(2);
    }
  }

  return (
    <>
      <li
        className="relative items-center grid grid-cols-[70px_1fr_1fr_1fr_1fr_90px] py-2 px-4 bg-[#363640] border-b-2 border-secondary last-of-type:border-0 last-of-type:rounded-b-md"
        key={task.id}
      >
        <div
          onClick={() => setShow(!show)}
          className="absolute left-2 cursor-pointer"
        >
          <Image className="h-4 w-4" src={node} alt="subtarefas" />
          <span className="text-xs absolute left-3 top-2 opacity-50">
            {subtasks.length}
          </span>
        </div>
        <span className="flex items-center justify-center">
          <input
            checked={state === 2}
            onChange={handleComplete}
            type="checkbox"
          />
        </span>
        <span>{task.name}</span>
        <span>{new Date(task.data_estimada).toLocaleDateString('pt-br')}</span>
        <div>
          <span
            className={`${options[state].color} w-auto text-[rgb(0,0,0,0.5)] rounded-md px-2 text-xs`}
          >
            {options[state].value}
          </span>
        </div>
        <ul className="flex items-center gap-2 text-xs">
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
      </li>
      {show &&
        subtasks.map((task) => (
          <TaskNodeTable key={task.id} task={task} setAt={setAt} />
        ))}
    </>
  );
};

export default TaskNodeTable;
