import React, { useState, useContext, useEffect } from "react";
import axiosInstance from "../_axios/config";
import { BoardContext } from "../home/[[...board]]/page";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

const ModalDeletar = ({ name, id }: { name: string; id: string }) => {
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { refetch }: any = useContext(BoardContext);

  function handleDelete() {
    if (!confirm) {
      setError("Preencha o campo");
    }
    if (name === confirm) {
      setLoading(true);
      axiosInstance.delete(`/tasks/${id}`).then(() => {
        onOpenChange();
        setTimeout(() => {
          refetch();
        }, 500);
      });
    } else {
      setError("Nome da tarefa invalido");
    }
  }

  useEffect(() => {
    if (error) setError("");
  }, [confirm]); //eslint-disable-line

  return (
    <>
      <Button onPress={onOpen} size="sm" className="bg-red-400 text-white">
        Deletar
      </Button>
      <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="bg-primary">
          {(onOpen) => (
            <>
              <ModalHeader>Deletar Tarefa</ModalHeader>
              <ModalBody className="text-zinc-400">
                <h1 className="text-sm">
                  Tem certeza que deseja deletar a tarefa? Ela e todas as suas
                  subtarefas serão deletadas.
                </h1>
                <h2 className="text-sm">
                  Para proseguir, escreva o nome da tarefa para deleta-la.
                </h2>
                <Input
                  value={confirm}
                  onChange={({ target }) => setConfirm(target.value)}
                  type="text"
                  placeholder={name}
                  errorMessage={error}
                  classNames={{
                    inputWrapper: [
                      "bg-secondary",
                      "data-[hover=true]:bg-secondary",
                      "group-data-[focus=true]:bg-secondary",
                    ],
                  }}
                />
              </ModalBody>
              <ModalFooter className="flex items-center justify-between">
                {/* @ts-ignore */}
                <Button onClick={onOpen} variant="light" color="">
                  Voltar
                </Button>
                <Button
                  isLoading={loading}
                  onClick={handleDelete}
                  color="danger"
                >
                  Deletar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalDeletar;
