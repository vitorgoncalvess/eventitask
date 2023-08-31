import React, { useState, useContext } from "react";
import axiosInstance from "../(axios)/config";
import { BoardContext } from "../home/[[...board]]/page";
import Loading from "./Loading";

const ModalDeletar = ({
  setShow,
  name,
  id,
  modal,
}: {
  setShow: Function;
  name: string;
  id: string;
  modal: Function;
}) => {
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const { refetch }: any = useContext(BoardContext);

  function handleOut(e: any) {
    if (e.currentTarget === e.target) {
      setShow(false);
    }
  }

  function handleDelete() {
    if (name === confirm) {
      setLoading(true);
      axiosInstance.delete(`/tasks/${id}`).then(() => {
        refetch();
        setShow(false);
        modal(false);
      });
    }
  }

  return (
    <div
      onClick={handleOut}
      className="fixed min-h-[100vh] top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center bg-[rgb(0,0,0,0.3)] z-10"
    >
      <div className="relative bg-primary p-6 w-[500px] rounded-md flex flex-col items-start gap-4">
        <h1 className="text-lg font-semibold">Deletar Tarefa</h1>
        <span
          onClick={() => setShow(false)}
          className="absolute top-2 right-2 font-semibold cursor-pointer"
        >
          X
        </span>
        <span className="opacity-80 text-sm">
          Tem certeza que deseja deletar a tarefa? Ela e todas as suas
          subtarefas serão deletadas.
        </span>
        <span className="opacity-80 text-sm">
          Para proseguir, escreva o nome da tarefa para deleta-la.
        </span>
        <input
          className="w-full h-12 p-4 bg-secondary outline-none rounded-md placeholder:opacity-20"
          onChange={({ target }) => setConfirm(target.value)}
          placeholder={name}
          value={confirm}
          type="text"
        />
        <div className="flex items-center justify-between w-full">
          <button
            onClick={() => setShow(false)}
            className="opacity-80 py-2 px-4"
          >
            Voltar
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 py-2 px-4 rounded-md"
          >
            {loading ? <Loading color="white" /> : "Deletar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeletar;
