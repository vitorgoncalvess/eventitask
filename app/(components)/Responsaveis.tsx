import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ModalResponsaveis from './ModalResponsaveis';
import add from '@/public/add_circle.png';
import axiosInstance from '../(axios)/config';

interface User {
  _id: string;
  name: string;
  email: string;
  img: string;
}

const Responsaveis = ({ task }: { task: { resp: [] } }) => {
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    task.resp?.forEach((responsavel) => {
      axiosInstance.get(`/usuarios/${responsavel}`).then((response) => {
        setUsers((users) => [...users, response.data]);
      });
    });
  }, [task]);

  return (
    <div className="flex items-center justify-end relative gap-2 mt-4">
      <span className="text-zinc-400 text-sm">Responsaveis</span>
      <div className="flex items-center gap-2">
        {users.map((user) => (
          <Image
            className="h-10 w-10 rounded-full object-cover cursor-pointer"
            width={100}
            height={100}
            key={user._id}
            src={user.img}
            alt="User"
          />
        ))}
      </div>
      <Image
        onClick={() => setShow(!show)}
        className="cursor-pointer"
        src={add}
        alt="Participante"
      />
      {show && (
        <ModalResponsaveis
          setShow={setShow}
          users={users}
          setUsers={setUsers}
          task={task}
        />
      )}
    </div>
  );
};

export default Responsaveis;
