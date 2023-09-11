import React, { FormEvent, useState, useContext } from "react";
import InputModal from "./InputModal";
import { Button, Chip } from "@nextui-org/react";
import axiosInstance from "../(axios)/config";
import { BoardContext } from "../home/[[...board]]/page";
import colors from "../(utils)/colors";

interface Section {
  id: string;
  board_id: string;
  name: string;
  color: string;
  tasks: any[];
}

const Modal = ({
  setShow,
  secs,
  task,
  setId,
}: {
  setShow: Function;
  secs?: any;
  task?: any;
  setId?: Function;
}) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("");
  const [subtarefas, setSubtarefas] = useState<string[]>([]);
  const [tarefa, setTarefa] = useState("");
  const [loading, setLoading] = useState(false);

  const { refetch }: any = useContext(BoardContext);

  function handleOut(e: any) {
    if (e.currentTarget === e.target) {
      setShow(false);
    }
  }

  function handleSub(e: FormEvent) {
    e.preventDefault();
    if (tarefa) setSubtarefas([...subtarefas, tarefa]);
    setTarefa("");
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    let body: Object;
    if (task) {
      setLoading(true);
      axiosInstance
        .post(`/tasks/${task}/subtasks`, {
          title,
          desc,
          task,
          subtarefas,
        })
        .then((response) => {
          if (response.status === 201) {
            setShow(false);
            setId(Math.random());
          }
        });
    } else {
      if (secs[0]) body = { title, desc, status, subtarefas };
      else body = { title, desc, status: secs.id, subtarefas };
      setLoading(true);
      axiosInstance.post("/tasks", body).then((response) => {
        if (response.status === 201) {
          refetch();
          setShow(false);
        }
      });
    }
  }

  return (
    <div
      onClick={handleOut}
      className="absolute min-h-[100vh] top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center bg-[rgb(0,0,0,0.3)] z-10"
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
          {!task && (
            <>
              <div>
                <label htmlFor="">Subtarefas</label>
                {subtarefas.length > 0 && (
                  <ul className="overflow-auto flex items-center gap-2 mt-1">
                    {subtarefas.map((task, index) => (
                      <Chip
                        classNames={{
                          base: `${
                            colors[index % colors.length]
                          } text-[rgb(0,0,0,0.5)] px-2 h-7 mt-1 mb-2 cursor-pointer`,
                        }}
                        radius="full"
                        onClose={() =>
                          setSubtarefas((tarefas) =>
                            tarefas.filter((tarefa) => tarefa !== task),
                          )
                        }
                        key={index}
                      >
                        {task}
                      </Chip>
                    ))}
                  </ul>
                )}
              </div>
              <InputModal
                placeholder="e.g Colocar 3 colheres de açucar"
                value={tarefa}
                setValue={setTarefa}
              />
              <Button onClick={handleSub} radius="full">
                + Adicionar Mais Subtarefas
              </Button>
            </>
          )}
          {!task && (
            <>
              <label htmlFor="">Seção</label>
              {secs && secs[0] ? (
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
            </>
          )}
          <Button
            isLoading={loading}
            onClick={handleSubmit}
            color="warning"
            radius="full"
          >
            Criar Tarefa
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
