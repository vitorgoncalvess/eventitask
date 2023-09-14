'use client';

import React from 'react';

const Logs = () => {
  return (
    <div className="col-start-2 col-end-3 row-start-1 row-end-4 rounded-lg drop-shadow p-2 flex flex-col gap-4">
      <h1 className="text-2xl font-medium text-[#ae4fe3]">
        Atividades Recentes
      </h1>
      <ul className="flex flex-col-reverse gap-2 overflow-auto h-[80vh] p-2 rounded-md"></ul>
    </div>
  );
};

export default Logs;
