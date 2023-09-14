import React from "react";
import table from "../_utils/table";

const TableTasks = () => {
  const { TABLETASK } = table;
  return (
    <div className="flex flex-col col-start-1 col-end-3 text-sm">
      <ul className="grid grid-cols-[50px_1fr_1fr_1fr_1fr_1fr_1fr_80px] px-2 h-8 bg-primary">
        {TABLETASK.map((item) => (
          <li
            className="h-full border-r border-secondary last-of-type:border-r-0 flex items-center px-2"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableTasks;
