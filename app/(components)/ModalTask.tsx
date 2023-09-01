import React, { useContext, useEffect, useState } from "react";
import { BoardContext } from "../home/[[...board]]/page";
import ModalHeader from "./ModalHeader";
import Image from "next/image";
import relogio from "@/public/clock.png";
import Tasks from "./Tasks";
import Responsaveis from "./Responsaveis";
import axiosInstance from "../(axios)/config";
import Select from "./Select";
import { Task } from "../(utils)/interfaces";
import Comments from "./Comments";
import pause from "@/public/video-pause-button.png";
import play from "@/public/play-button-arrowhead.png";
import ModalDeletar from "./ModalDeletar";
import Tags from "./Tags";

const ModalTask = ({
  setShow,
  task,
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
  const [time, setTime] = useState(at.time);
  const [del, setDel] = useState(false);
  const [going, setGoing] = useState(false);
  const [date, setDate] = useState<any>(at.data_estimada);
  const fib = [1, 2, 3, 5, 8, 13, 21, 34];
  const pri = ["Desejável", "Importante", "Essencial"];

  function handleOut(e: any) {
    if (e.currentTarget === e.target) {
      axiosInstance.patch(`/tasks/${at.id}/timer`, { time });
      refetch();
      setShow(false);
    }
  }

  useEffect(() => {
    if (going) {
      if (time % 300 === 0) {
        axiosInstance.patch(`/tasks/${at.id}/timer`, { time });
        refetch();
      }
      setTimeout(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else {
      axiosInstance.patch(`/tasks/${at.id}/timer`, { time });
      refetch();
    }
  }, [going, time]); //eslint-disable-line

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

  function formatTime(segundos: number) {
    const horas = Math.floor(segundos / 3600);
    segundos %= 3600;
    const minutos = Math.floor(segundos / 60);
    segundos %= 60;
    return `${horas.toString().padStart(2, "0")}:${minutos
      .toString()
      .padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
  }

  function handleDesc() {
    axiosInstance.patch(`/tasks/${at.id}/description`, { text });
  }

  function handleDate({ target }: any) {
    setDate(target.value);
    axiosInstance.patch(`/tasks/${at.id}/date`, { date: target.value });
  }

  return (
    <div
      onClick={handleOut}
      className="min-h-screen bg-[rgb(0,0,0,0.3)] fixed top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center p-10 z-10"
    >
      <div className="relative h-[90vh] bg-primary w-full rounded-md flex flex-col">
        <ModalHeader
          setAt={setAt}
          bread={bread}
          setBread={setBread}
          setShow={setShow}
          name={board.name}
          time={time}
          id={at.id}
        />
        <div className="flex items-center h-[90%] justify-center">
          <div className="w-8/12 overflow-auto h-full flex flex-col p-6">
            <header className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <Tags id={at.id} tag={at.tags} />
                <div className="relative flex items-end gap-2">
                  <h1 className="text-5xl font-semibold">{at.name}</h1>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <Select id={at.id} status={at.status} />
                <div className="flex items-center gap-2 opacity-70">
                  <span className="text-sm">Data estimada:</span>
                  <input
                    value={date}
                    onChange={handleDate}
                    type="date"
                    className="bg-transparent"
                  />
                </div>
              </div>
            </header>
            <div className="flex items-center justify-between mt-4">
              <div className="[&>span]:h-6 [&>span]:rounded [&>span]:cursor-pointer select-none flex items-center gap-2">
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
                <span
                  onClick={() => setGoing(!going)}
                  className="bg-blue-400 flex items-center gap-2 h-full"
                >
                  <div className="border-r-[1.5px] h-full w-8 flex items-center justify-center">
                    <Image className="h-4 w-4" src={relogio} alt="tempo" />
                  </div>
                  <span>{formatTime(time)}</span>
                  <div className="h-full w-6 border-l-[1.5px] cursor-pointer flex items-center justify-center">
                    {going ? (
                      <Image className="h-4 w-4" alt="pausar" src={pause} />
                    ) : (
                      <Image className="h-3 w-3" alt="play" src={play} />
                    )}
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
              onBlur={handleDesc}
            ></textarea>
            <Tasks key={at.name} setAt={setAt} task={at} />
            <h1 className="text-lg opacity-90 mt-8">Configurações</h1>
            <div className="flex items-center gap-2 text-sm opacity-80 mt-4">
              <span>Mudar o nome da tarefa?</span>
              <button className="py-1 px-2 bg-zinc-400 text-white rounded-md">
                Mudar
              </button>
            </div>
            {del && (
              <ModalDeletar
                setShow={setDel}
                name={at.name}
                id={at.id}
                modal={setShow}
              />
            )}
            <div className="flex items-center gap-2 text-sm opacity-80 mt-4">
              <span>Deletar a tarefa?</span>
              <button
                onClick={() => setDel(true)}
                className="py-1 px-2 bg-red-500 text-white rounded-md"
              >
                Deletar
              </button>
            </div>
          </div>
          <Comments id={at.id} />
        </div>
      </div>
    </div>
  );
};

export default ModalTask;
