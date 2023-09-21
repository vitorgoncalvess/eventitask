import React, { useCallback, useEffect, useState } from "react";
import axiosInstance from "../_axios/config";
import { Select, SelectItem } from "@nextui-org/react";

const possibleDays = [
  "grid-cols-[repeat(7,minmax(0,1fr))]",
  "grid-cols-[repeat(14,minmax(0,1fr))]",
  "grid-cols-[repeat(30,minmax(0,1fr))]"
];

const History = ({ id }: { id: string }) => {
  const [dash, setDash] = useState(null);
  const [dias, setDias] = useState(7);

  const fecthData = useCallback(
    async (dias: number) => {
      axiosInstance
        .get(`/boards/${id}/dash-daily-tasks?dias=${dias}`)
        .then((response) => {
          setDash(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [id]
  );

  useEffect(() => {
    if (dias) fecthData(dias);
  }, [fecthData, dias]);

  return (
    <div
      className={`relative bg-primary rounded-md grid grid-cols-[repeat(${dias},minmax(0,1fr))]`}
    >
      <span className="absolute top-2 left-2 font-medium">
        Tarefas realizadas
      </span>
      {dash?.dates?.map((item: any, index: number) => {
        return (
          <div
            key={index}
            className="flex flex-col items-center justify-end h-full"
          >
            <ul className="mb-1">
              {dash.values
                .filter((task) => task.date === item)
                .map((task) => (
                  <li
                    className="bg-base h-5 w-5 rounded-sm"
                    key={task.name}
                  ></li>
                ))}
            </ul>
            <div className="flex items-center justify-center">
              <h1 className="text-xs font-semibold opacity-50 mb-1">{item}</h1>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default History;
