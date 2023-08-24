import React, { FormEvent, useState } from 'react';
import InputModal from './InputModal';
import Button from './Button';
import axiosInstance from '../(axios)/config';

interface Section {
  _id: string;
  name: string;
  color: string;
  order: number;
}

const Modal = ({
  setShow,
  secs,
  refetch,
}: {
  setShow: Function;
  secs: Section[];
  refetch: Function;
}) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [status, setStatus] = useState('');

  console.log(secs);

  function handleOut(e: any) {
    if (e.currentTarget === e.target) {
      setShow(false);
    }
  }

  function handleSub(e: FormEvent) {
    e.preventDefault();
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    axiosInstance.post('/tasks', { title, desc, status }).then((response) => {
      if (response.status === 201) {
        refetch();
        setShow(false);
      }
    });
  }

  return (
    <div
      onClick={handleOut}
      className="absolute min-h-screen left-0 right-0 flex justify-center items-center bg-[rgb(0,0,0,0.3)] z-50 p-20"
    >
      <div className="bg-primary p-6 w-[420px] rounded-md flex flex-col items-start gap-4">
        <h1 className="text-lg font-semibold">Adicionar Nova Tarefa</h1>
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
          <InputModal
            value={title}
            setValue={setTitle}
            label="Titulo"
            placeholder="e.g. Pegar um Cafe"
          />
          <InputModal
            value={desc}
            setValue={setDesc}
            type="textarea"
            label="Descrição"
            placeholder="e.g. Sempre é bom dar um break no trabalho e tomar um cafe"
          />
          <InputModal
            label="Subtarefa"
            placeholder="e.g. Colocar 3 colheres de açucar"
          />
          <Button
            onClick={handleSub}
            size="p"
            background="base_inv"
            rounded="full"
          >
            + Adicionar Mais Subtarefas
          </Button>
          <label htmlFor="">Status</label>
          <select
            className="bg-transparent border-[1px] border-[#353541] rounded-md h-9 flex items-center px-2"
            defaultValue="Selecione"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option disabled value="Selecione">
              Selecione
            </option>
            {secs.map((item) => (
              <option value={item._id}>{item.name}</option>
            ))}
          </select>
          <Button size="p" background="base" rounded="full">
            Criar Tarefa
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
