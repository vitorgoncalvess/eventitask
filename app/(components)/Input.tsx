import React from "react";

interface Props {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  setValue: Function;
}

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  setValue
}: Props) => {
  return (
    <div className="flex flex-col w-full">
      <label className="opacity-90 font-medium" htmlFor={label}>
        {label}
      </label>
      <input
        value={value}
        onChange={({ target }) => setValue(target.value)}
        className="rounded-md h-14 p-4 bg-secondary outline-none"
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
