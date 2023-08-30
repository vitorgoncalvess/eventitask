import React, { useState } from "react";

const Select = () => {
  const options = [
    { value: "Pendente", color: "bg-blue-400" },
    { value: "Em Desenvolvimento", color: "bg-emerald-400" },
    { value: "Concluido", color: "bg-yellow-400" },
  ];
  const [state, setState] = useState(0);
  const [show, setShow] = useState(false);
  return (
    <div
      onClick={() => setShow(!show)}
      className="flex items-center cursor-pointer relative"
    >
      <div
        className={`py-1.5 px-4 ${options[state].color} text-black font-medium rounded-l-md`}
      >
        <span className="opacity-60">{options[state].value}</span>
      </div>
      <span
        className={`py-1.5 px-4 ${options[state].color} text-black font-medium rounded-r-md border-l-2 border-[rgb(0,0,0,0.3)]`}
      >
        <span className="opacity-60">V</span>
      </span>
      {show && (
        <div className="absolute z-50 top-12 right-0 flex flex-col text-xs w-44">
          {options.map((opt, index) => {
            if (index !== state)
              return (
                <div className="text-end bg-white py-1.5 px-4 text-black border-d-2">
                  {opt.value}
                </div>
              );
          })}
        </div>
      )}
    </div>
  );
};

export default Select;
