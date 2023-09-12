import React, { FormEvent, useContext, useState } from "react";
import InputModal from "./InputModal";
import Button from "./Button";
import axiosInstance from "../_axios/config";
import { BoardContext } from "../home/[[...board]]/page";
import Loading from "./Loading";
const colors = [
  "bg-red-400",
  "bg-emerald-400",
  "bg-lime-400",
  "bg-yellow-400",
  "bg-amber-400",
  "bg-blue-400",
  "bg-indigo-400",
  "bg-purple-400",
];

const ModalSection = ({ setShow }: { setShow: Function }) => {
  const { refetch }: any = useContext(BoardContext);
  const [name, setName] = useState("");
  const [tarefas, setTarefas] = useState<string[]>([]);
  const [tarefa, setTarefa] = useState("");
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(false);
  const id = location.pathname.split("/")[2];

  function handleOut(e: any) {
    if (e.currentTarget === e.target) {
      setShow(false);
    }
  }

  function handleTask(e: FormEvent) {
    e.preventDefault();
    if (tarefa) {
      setTarefas([...tarefas, tarefa]);
      setTarefa("");
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (name) {
      setLoading(true);
      axiosInstance
        .post("/sections", { id, name, color: colors[selected], tarefas })
        .then(() => {
          refetch();
          setShow(false);
        });
    }
  }

  return (
    <div
      onClick={handleOut}
      className="absolute min-h-[100vh] top-0 bottom-0 left-0 right-0 flex flex-col py-20 items-center bg-[rgb(0,0,0,0.3)] z-50"
    >
      <div className="bg-primary p-6 w-[420px] rounded-md flex flex-col items-start gap-4">
        <h1 className="text-lg font-semibold">Criar Nova Seção</h1>
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
          <InputModal
            value={name}
            setValue={setName}
            label="Nome"
            placeholder="e.g Sprint 4"
          />
          <h2 className="mt-2">Deseja adicionar tarefas?</h2>
          {tarefas.length > 0 ? (
            <>
              {tarefas.map((item, index) => (
                <InputModal
                  key={index}
                  setSubtarefas={setTarefas}
                  defaultValue={item}
                />
              ))}
              <InputModal
                placeholder="e.g Refatoração da tela..."
                value={tarefa}
                setValue={setTarefa}
              />
            </>
          ) : (
            <InputModal
              placeholder="e.g Refatoração da tela..."
              value={tarefa}
              setValue={setTarefa}
            />
          )}
          <Button
            onClick={handleTask}
            size="p"
            background="base_inv"
            rounded="full"
          >
            + Adicionar Mais Tarefas
          </Button>
          <h2>Escolha uma cor para sua Seção</h2>
          <ul className="flex items-center justify-between rounded-md p-1">
            {colors.map((color, index) => (
              <li
                onClick={() => setSelected(index)}
                data-selected={selected === index}
                className={`border-2 ${
                  selected === index ? "border-white" : "border-transparent"
                } p-0.5 rounded-full`}
                key={color}
              >
                <span
                  className={`block cursor-pointer p-1 h-5 w-5 rounded-full ${color}`}
                ></span>
              </li>
            ))}
          </ul>
          <Button size="p" background="base" rounded="full">
            {loading ? <Loading color="white" /> : "Criar Seção"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ModalSection;
