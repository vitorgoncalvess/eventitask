import Image from 'next/image';
import React, { useState } from 'react';
import ModalResponsaveis from './ModalResponsaveis';
import add from '@/public/add_circle.png';

interface User {
  _id: string;
  name: string;
  email: string;
  img: string;
}

const Responsaveis = ({ task }: { task: { responsibleUsers: [] } }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex items-center justify-end relative gap-2 ">
      <span className="text-zinc-400 text-sm">Responsaveis</span>
      <div className="flex items-center gap-2">
        {task.responsibleUsers.map((user: any) => (
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
      {show && <ModalResponsaveis setShow={setShow} task={task} />}
    </div>
  );
};

export default Responsaveis;
