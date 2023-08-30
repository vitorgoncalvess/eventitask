import React, { useState } from "react";
import { useQuery } from "react-query";
import axiosInstance from "../(axios)/config";

interface User {
  id: string;
  name: string;
  email: string;
}

const ModalResponsaveis = ({
  setShow,
  task,
}: {
  setShow: Function;
  task: any;
}) => {
  const [responsaveis, setResponsaveis] = useState<User[]>([]);
  console.log(task.responsaveis);
  console.log(responsaveis);

  useQuery(
    "resp",
    async () => {
      return await axiosInstance.get("/usuarios");
    },
    {
      onSuccess(response) {
        setResponsaveis(response.data);
      },
    }
  );

  function handleResp(resp: User) {
    // eslint-disable-next-line
    if (!task.responsaveis?.some((user: any) => user.id == resp.id)) {
      axiosInstance.post(`/tasks/${task.id}/${resp.id}/resp`).then(() => {
        setShow(false);
      });
    }
  }

  return (
    <ul className="absolute w-52 flex flex-col items-end bg-secondary top-12 rounded-md">
      {responsaveis?.map((resp) => (
        <li
          onClick={() => handleResp(resp)}
          data-already={task.responsaveis?.some(
            (user: any) => user.id == resp.id // eslint-disable-line
          )}
          className="w-full cursor-pointer flex justify-end border-b-[1px] border-primary p-2 data-[already=true]:opacity-50 data-[already=true]:cursor-default"
          key={resp.id}
        >
          {resp.name}
        </li>
      ))}
    </ul>
  );
};

export default ModalResponsaveis;
