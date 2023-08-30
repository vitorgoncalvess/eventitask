import React, { useContext, useEffect, useState } from "react";
import { BoardContext } from "../home/[[...board]]/page";
import ModalHeader from "./ModalHeader";
import Image from "next/image";
import edit from "@/public/edit_square.png";
import relogio from "@/public/clock.png";
import calendar from "@/public/calendar_month.png";
import Tasks from "./Tasks";
import Responsaveis from "./Responsaveis";
import axiosInstance from "../(axios)/config";
import Select from "./Select";

interface Task {
  id: string;
  name: string;
  description: string;
  section_id: number;
  task_id: number;
  fibonacci: number;
  priority: number;
  subtasks: number;
  responsaveis: [];
}

const ModalTask = ({
  setShow,
  task,
  sec,
}: {
  setShow: Function;
  task: Task;
  sec?: any;
}) => {
  const { board, refetch } = useContext(BoardContext) as any;
  const [at, setAt] = useState(task);
  const [bread, setBread] = useState<Task[]>([]);
  const [text, setText] = useState(at.description);
  const [fibo, setFibo] = useState(at.fibonacci || 0);
  const [prio, setPrio] = useState(at.priority || 0);
  const fib = [1, 2, 3, 5, 8, 13, 21, 34];
  const pri = ["Desejável", "Importante", "Essencial"];

  function handleOut(e: any) {
    if (e.currentTarget === e.target) {
      setShow(false);
    }
  }

  function handlePos(
    state: number,
    name: string,
    arr: any[],
    setState: Function
  ) {
    if (state === arr.length - 1) {
      setState(0);
      axiosInstance
        .post(`/tasks/${at.id}/state`, {
          state: name,
          value: 0,
        })
        .then(() => {
          refetch();
        });
    } else {
      setState((state: number) => state + 1);
      axiosInstance
        .post(`/tasks/${at.id}/state`, {
          state: name,
          value: state + 1,
        })
        .then(() => {
          refetch();
        });
    }
  }

  useEffect(() => {
    setBread((bread) => [...bread, at]);
    setText(at.description);
  }, [at]);

  return (
    <div
      onClick={handleOut}
      className="min-h-screen bg-[rgb(0,0,0,0.3)] fixed top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center p-10"
    >
      <div className="relative h-[90vh] bg-primary w-full rounded-md flex flex-col">
        <ModalHeader
          setAt={setAt}
          bread={bread}
          setBread={setBread}
          setShow={setShow}
          name={board.name}
        />
        <div className="flex items-center h-[90%] justify-center">
          <div className="w-8/12 overflow-auto h-full flex flex-col p-6">
            <header className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <ul className="flex items-center gap-2 text-xs font-medium">
                  <li>front end</li>
                  <li>back end</li>
                  <li>qualidade</li>
                </ul>
                <div className="relative flex items-end gap-2">
                  <h1 className="text-5xl font-semibold">{at.name}</h1>
                  <Image
                    className="absolute -top-2 -left-4 cursor-pointer"
                    src={edit}
                    alt="Editar"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <Select />
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
            <div className="flex items-center justify-between mt-4">
              <div className="[&>span]:h-6 [&>span]:rounded-sm [&>span]:cursor-pointer select-none flex items-center gap-2">
                <span
                  onClick={() => handlePos(fibo, "fibonacci", fib, setFibo)}
                  className="bg-red-400 px-2 flex items-center justify-center"
                >
                  {fib[fibo]}
                </span>
                <span
                  onClick={() => handlePos(prio, "priority", pri, setPrio)}
                  className="bg-emerald-500 px-2"
                >
                  {pri[prio]}
                </span>
                <span className="bg-blue-400 flex items-center gap-2 h-full">
                  <div className="border-r-[1.5px] h-full w-8 flex items-center justify-center">
                    <Image className="h-4 w-4" src={relogio} alt="tempo" />
                  </div>
                  <span>00:00</span>
                  <div className="h-full w-6 border-l-[1.5px] cursor-pointer">
                    <span className="font-semibold ml-2">{">"}</span>
                  </div>
                </span>
              </div>
              <Responsaveis task={task} />
            </div>
            <textarea
              className="bg-transparent outline-none border-2 border-[#3d3d49] rounded-md mt-8 p-4"
              name=""
              id=""
              rows={7}
              value={text}
              onChange={({ target }) => setText(target.value)}
            ></textarea>
            <Tasks key={at.name} setAt={setAt} task={at} />
          </div>
          <div className="w-4/12 h-full border-l-2 border-[#3d3d49]"></div>
        </div>
      </div>
    </div>
  );
};

export default ModalTask;
