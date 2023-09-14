"use client";

import { Button } from "@nextui-org/react";
import React from "react";

const Logs = () => {
  return (
    <div className="col-start-2 col-end-3 row-start-1 row-end-4 rounded-lg drop-shadow p-2 flex flex-col justify-between gap-4">
      <h1 className="text-2xl font-medium">Atividades Recentes</h1>
      <ul className="flex flex-col-reverse gap-2 overflow-auto h-[75vh] p-2 rounded-md"></ul>
      <Button
        radius="none"
        variant="bordered"
        className="text-white font-medium"
      >
        Ver Mais
      </Button>
    </div>
  );
};

export default Logs;
