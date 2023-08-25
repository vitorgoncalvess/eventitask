import React from 'react';

const ModalHeader = ({
  setShow,
  name,
  title,
}: {
  setShow: Function;
  name: string;
  title: string;
}) => {
  return (
    <div className="h-12 flex items-center justify-between border-b-2 rounded-t-md bg-[#272735] border-[#3d3d49] p-6">
      <div>
        <ul className="flex items-center gap-2 text-[12px] [&>li]:after:ml-2">
          <li
            onClick={() => setShow(false)}
            className="after:content-['>'] cursor-pointer"
          >
            EventiTask
          </li>
          <li
            onClick={() => setShow(false)}
            className="after:content-['>'] cursor-pointer"
          >
            {name}
          </li>
          <li className="after:content-[''] cursor-default">{title}</li>
        </ul>
      </div>
      <ul className="flex items-center gap-3 [&>li]:cursor-pointer">
        <li
          onClick={() => setShow(false)}
          className="h-3.5 w-3.5 rounded-full bg-[#87DB32]"
        ></li>
        <li className="h-3.5 w-3.5 rounded-full bg-[#DBC032]"></li>
        <li
          onClick={() => setShow(false)}
          className="h-3.5 w-3.5 rounded-full bg-[#DB3232]"
        ></li>
      </ul>
    </div>
  );
};

export default ModalHeader;
