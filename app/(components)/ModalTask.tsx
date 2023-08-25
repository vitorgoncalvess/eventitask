import React, { useContext } from 'react';
import { BoardContext } from '../home/[[...board]]/page';
import ModalHeader from './ModalHeader';
import Image from 'next/image';
import edit from '@/public/edit_square.png';
import calendar from '@/public/calendar_month.png';
import Tasks from './Tasks';

interface Task {
  _id: string;
  name: string;
  description: string;
  ref_id: string;
  subtasks: Task[];
}

const ModalTask = ({
  setShow,
  task,
  sec,
}: {
  setShow: Function;
  task: Task;
  sec: any;
}) => {
  const { name } = useContext(BoardContext);

  function handleOut(e: any) {
    if (e.currentTarget === e.target) {
      setShow(false);
    }
  }

  return (
    <div
      onClick={handleOut}
      className="min-h-screen bg-[rgb(0,0,0,0.3)] fixed top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center p-10"
    >
      <div className="relative h-[90vh] bg-primary w-full rounded-md flex flex-col">
        <ModalHeader setShow={setShow} name={name} title={task.name} />
        <div className="flex items-center h-[94%] justify-center">
          <div className="w-8/12 overflow-auto h-full flex flex-col p-6">
            <header className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <ul className="flex items-center gap-2 text-xs font-medium">
                  <li>front end</li>
                  <li>back end</li>
                  <li>qualidade</li>
                </ul>
                <div className="flex items-end gap-2">
                  <h1 className="text-5xl font-semibold">{task.name}</h1>
                  <Image
                    className="h-6 w-6 mb-1.5 cursor-pointer"
                    src={edit}
                    alt="Editar"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <div className="flex items-center cursor-pointer">
                  <div
                    className={`py-1.5 px-4 bg-[${sec.color}] text-black font-medium rounded-l-md`}
                  >
                    <span className="opacity-70">{sec.name}</span>
                  </div>
                  <span
                    className={`py-1.5 px-4 bg-[${sec.color}] text-black font-medium rounded-r-md border-l-2 border-[rgb(0,0,0,0.3)]`}
                  >
                    <span className="opacity-70">V</span>
                  </span>
                </div>
                <div className="flex items-end gap-2 opacity-70">
                  <span className="text-xs mb-0.5">Estimado</span>
                  <span className="text-sm">28/08/23</span>
                  <Image
                    className="h-4 w-4 mb-0.5"
                    src={calendar}
                    alt="Data estimada"
                  />
                </div>
              </div>
            </header>
            <textarea
              className="bg-transparent outline-none border-2 border-[#3d3d49] rounded-md mt-8 p-4"
              name=""
              id=""
              rows={7}
              defaultValue={task.description}
            ></textarea>
            <Tasks task={task} />
          </div>
          <div className="w-4/12 h-full border-l-2 border-[#3d3d49]"></div>
        </div>
      </div>
    </div>
  );
};

export default ModalTask;
