import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axiosInstance from '../(axios)/config';

interface User {
  _id: string;
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

  useQuery(
    'resp',
    async () => {
      return await axiosInstance.get('/usuarios');
    },
    {
      onSuccess(response) {
        setResponsaveis(response.data);
      },
    },
  );

  function handleResp(resp: User) {
    if (!task.responsibleUsers.some((user: any) => user._id === resp._id)) {
      axiosInstance.post(`/tasks/${task._id}/${resp._id}/resp`).then(() => {
        setShow(false);
      });
    }
  }

  return (
    <ul className="absolute w-52 flex flex-col items-end bg-secondary top-12 rounded-md">
      {responsaveis.map((resp) => (
        <li
          onClick={() => handleResp(resp)}
          data-already={task.responsibleUsers.some(
            (user: any) => user._id === resp._id,
          )}
          className="w-full cursor-pointer flex justify-end border-b-[1px] border-primary p-2 data-[already=true]:opacity-50 data-[already=true]:cursor-default"
          key={resp._id}
        >
          {resp.name}
        </li>
      ))}
    </ul>
  );
};

export default ModalResponsaveis;
