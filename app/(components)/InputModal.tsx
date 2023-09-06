import React from "react";

const InputModal = ({
  label,
  value,
  defaultValue,
  setValue,
  placeholder,
  type,
  setSubtarefas,
}: any) => {
  return (
    <div className="flex flex-col text-sm relative">
      <label htmlFor={label}>{label}</label>
      {type === "textarea" ? (
        <textarea
          id={label}
          name={label}
          value={value}
          onChange={({ target }) => setValue(target.value)}
          className="bg-transparent border-[1px] border-[#353541] rounded-md outline-none h-18 px-4 py-2 resize-none"
          placeholder={placeholder}
        />
      ) : (
        <>
          <input
            id={label}
            name={label}
            value={defaultValue ? defaultValue : value}
            onChange={({ target }) => setValue(target.value)}
            className="bg-transparent border-[1px] border-[#353541] rounded-md outline-none h-10 p-4"
            type="text"
            placeholder={placeholder}
          />
          {defaultValue && (
            <span
              onClick={() =>
                setSubtarefas((tarefas: any) =>
                  tarefas.filter((item: any) => item !== defaultValue),
                )
              }
              className="absolute bottom-[10px] right-3 cursor-pointer"
            >
              X
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default InputModal;
