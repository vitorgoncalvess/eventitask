import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axiosInstance from '../(axios)/config';
import Image from 'next/image';

interface User {
  id: string;
  name: string;
  email: string;
  img: string;
}

const ModalResponsaveis = ({
  setShow,
  task,
  respo,
  setRespo,
  setLoading,
}: {
  setShow: Function;
  task: any;
  respo: User[];
  setRespo: Function;
  setLoading: Function;
}) => {
  const [responsaveis, setResponsaveis] = useState<User[]>([]);
  useQuery(
    'resp',
    async () => {
      setLoading(true);
      return await axiosInstance.get('/usuarios');
    },
    {
      onSuccess(response) {
        setLoading(false);
        setResponsaveis(response.data);
      },
    },
  );

  function handleResp(resp: User) {
    if (!respo?.some((user: any) => user.id == resp.id)) {
      setLoading(true);
      axiosInstance.post(`/tasks/${task.id}/${resp.id}/resp`).then(() => {
        setRespo((responsaveis: User[]) => [...responsaveis, resp]);
        setShow(false);
        setLoading(false);
      });
    }
  }

  return (
    <ul className="absolute flex flex-col items-end bg-secondary top-8 rounded-md">
      {responsaveis?.map((resp) => (
        <li
          onClick={() => handleResp(resp)}
          data-already={respo?.some((user: any) => user.id == resp.id)}
          className={`w-64 justify-center cursor-pointer flex items-center gap-2 border-b-[1px] border-primary p-2 data-[already=true]:opacity-50 data-[already=true]:cursor-default`}
          key={resp.id}
        >
          <Image
            className="h-9 w-9 rounded-full"
            height={100}
            width={100}
            src={resp.img}
            alt="User"
          />
          <span>{resp.name}</span>
        </li>
      ))}
    </ul>
  );
};
export default ModalResponsaveis;
