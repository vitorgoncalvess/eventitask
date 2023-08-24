import React from 'react';

const InputModal = ({ label, value, setValue, placeholder, type }: any) => {
  return (
    <div className="flex flex-col text-sm">
      <label htmlFor={label}>{label}</label>
      {type === 'textarea' ? (
        <textarea
          id={label}
          name={label}
          value={value}
          onChange={({ target }) => setValue(target.value)}
          className="bg-transparent border-[1px] border-[#353541] rounded-md outline-none h-44 p-4"
          placeholder={placeholder}
        />
      ) : (
        <input
          id={label}
          name={label}
          value={value}
          onChange={({ target }) => setValue(target.value)}
          className="bg-transparent border-[1px] border-[#353541] rounded-md outline-none h-10 p-4"
          type="text"
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default InputModal;
