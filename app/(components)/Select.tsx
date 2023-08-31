import React, { useState, useEffect } from "react";
import axiosInstance from "../(axios)/config";

const Select = ({ id, status }: { id: string; status: number }) => {
  const options = [
    { value: "Pendente", color: "bg-yellow-400" },
    { value: "Em Desenvolvimento", color: "bg-blue-400" },
    { value: "Concluido", color: "bg-emerald-400" },
  ];
  const [state, setState] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setState(status);
  }, [status]);

  function handleClick(status: number) {
    setState(status);
    setShow(false);
    axiosInstance.patch(`/tasks/${id}/status`, { status }).catch(() => {
      setState((state) => state);
    });
  }

  return (
    <div className="flex items-center cursor-pointer relative">
      <div
        onClick={() => setShow(!show)}
        className={`py-1.5 px-4 ${options[state].color} text-black font-medium rounded-l-md`}
      >
        <span className="opacity-60">{options[state].value}</span>
      </div>
      <span
        onClick={() => setShow(!show)}
        className={`py-1.5 px-4 ${options[state].color} text-black font-medium rounded-r-md border-l-2 border-[rgb(0,0,0,0.3)]`}
      >
        <span className="opacity-60">V</span>
      </span>
      {show && (
        <div className="absolute z-50 top-10 right-0 flex flex-col text-xs w-44">
          {options.map((opt, index) => {
            if (index !== state)
              return (
                <div
                  onClick={() => handleClick(index)}
                  className="text-end py-2 bg-zinc-100 px-4 text-black border-d-2 flex items-center justify-end gap-2 border-b-2 border-zinc-500 last-of-type:border-0 hover:bg-zinc-200 first-of-type:rounded-t last-of-type:rounded-b"
                >
                  {opt.value}
                  <span
                    className={`h-2 w-2 mt-0.5 rounded-full ${opt.color}`}
                  ></span>
                </div>
              );
          })}
        </div>
      )}
    </div>
  );
};

export default Select;
