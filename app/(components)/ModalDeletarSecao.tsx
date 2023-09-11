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
import React from "react";

const ModalDeletarSecao = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <div onClick={onOpen}>
        <h1>Deletar</h1>
        <h2 className="text-xs opacity-50 w-12 text-white group-data-[hover=true]:text-red-400 group-data-[hover=true]:opacity-100">
          Excluir seção
        </h2>
      </div>
      <Modal
        size="lg"
        classNames={{
          backdrop: "z-[10000000]",
          wrapper: "z-[100000001]",
          base: "bg-primary",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader>Deletar Seção</ModalHeader>
          <ModalBody className="text-zinc-400">
            <h1 className="text-sm">
              Tem certeza que deseja deletar a seção? Ela e todas as suas
              tarefas serão deletadas.
            </h1>
            <h2 className="text-sm">
              Para proseguir, escreva o nome da seção para deleta-la.
            </h2>
            <Input
              type="text"
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
            <Button>Cancelar</Button>
            <Button>Deletar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalDeletarSecao;
