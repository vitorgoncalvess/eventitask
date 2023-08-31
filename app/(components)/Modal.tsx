import React, { FormEvent, useState, useContext } from "react";
import InputModal from "./InputModal";
import Button from "./Button";
import axiosInstance from "../(axios)/config";
import { BoardContext } from "../home/[[...board]]/page";

interface Section {
  id: string;
  board_id: string;
  name: string;
  color: string;
  tasks: any[];
}

const Modal = ({ setShow, secs }: { setShow: Function; secs: any }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("");
  const [subtarefas, setSubtarefas] = useState<string[]>([]);
  const [tarefa, setTarefa] = useState("");

  const { refetch }: any = useContext(BoardContext);

  function handleOut(e: any) {
    if (e.currentTarget === e.target) {
      setShow(false);
    }
  }

  function handleSub(e: FormEvent) {
    e.preventDefault();
    setSubtarefas([...subtarefas, tarefa]);
    setTarefa("");
  }

  function handleSubmit(e: FormEvent) {
    let body;
    if (secs[0]) body = { title, desc, status, subtarefas };
    else body = { title, desc, status: secs.id, subtarefas };
    e.preventDefault();
    axiosInstance.post("/tasks", body).then((response) => {
      if (response.status === 201) {
        refetch();
        setShow(false);
      }
    });
  }

  return (
    <div
      onClick={handleOut}
      className="absolute min-h-[110vh] top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center bg-[rgb(0,0,0,0.3)] z-50"
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
          <label htmlFor="">Subtarefas</label>
          {subtarefas.length > 0 ? (
            <>
              {subtarefas.map((item, index) => (
                <InputModal
                  key={index}
                  setSubtarefas={setSubtarefas}
                  defaultValue={item}
                />
              ))}
              <InputModal
                placeholder="e.g Colocar 3 colheres de açucar"
                value={tarefa}
                setValue={setTarefa}
              />
            </>
          ) : (
            <InputModal
              placeholder="e.g Colocar 3 colheres de açucar"
              value={tarefa}
              setValue={setTarefa}
            />
          )}
          <Button
            onClick={handleSub}
            size="p"
            background="base_inv"
            rounded="full"
          >
            + Adicionar Mais Subtarefas
          </Button>
          <label htmlFor="">Seção</label>
          {secs[0] ? (
            <select
              className="bg-transparent border-[1px] border-[#353541] rounded-md h-9 flex items-center px-2"
              defaultValue="Selecione"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option disabled value="Selecione">
                Selecione
              </option>
              {secs.map((item: Section) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          ) : (
            <div className={`${secs.color} text-black p-2 rounded-md`}>
              <span className="opacity-70">{secs.name}</span>
            </div>
          )}
          <Button size="p" background="base" rounded="full">
            Criar Tarefa
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
