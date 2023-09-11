import Image from "next/image";
import React, { useEffect, useState } from "react";
import boardIconPurple from "@/public/tablet_purple.png";
import trash from "@/public/delete.png";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@nextui-org/react";
import colors from "../(utils)/colors";

const ModalNovaSecao = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [secoes, setSecoes] = useState([]);
  const [nome, setNome] = useState("");
  const [secao, setSecao] = useState("");

  function handleAdd() {
    if (secao) {
      setSecoes([
        ...secoes,
        { name: secao, color: secoes.length % colors.length },
      ]);
      setSecao("");
    }
  }

  function handleColor(index: number, col: number) {
    const sections = secoes;
    sections[index].color = col;
    setSecoes(sections);
  }

  return (
    <>
      <li
        onClick={onOpen}
        className="px-6 py-3 w-11/12 rounded-r-full flex items-center gap-4 font-medium cursor-pointer text-base opacity-90"
      >
        <Image className="h-4 w-4" src={boardIconPurple} alt="Board" />
        <span>+ Criar Nova Área</span>
      </li>
      <Modal
        size="md"
        classNames={{
          base: "bg-primary",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Criar Nova Área</ModalHeader>
              <ModalBody>
                <Input
                  value={nome}
                  onChange={({ target }) => setNome(target.value)}
                  radius="sm"
                  classNames={{
                    label: "text-white",
                    inputWrapper:
                      "bg-primary border-2 border-[#353541] data-[hover=true]:border-[#575763] data-[hover]:bg-primary group-data-[focus=true]:border-[#575763] group-data-[focus=true]:bg-primary",
                  }}
                  label="Nome"
                  labelPlacement="outside"
                  placeholder="e.g. Dev Ops"
                />
                <h1 className="text-sm opacity-80">
                  Deseja criar seções para essa área?
                </h1>
                <Input
                  radius="sm"
                  value={secao}
                  onChange={({ target }) => setSecao(target.value)}
                  classNames={{
                    label: "text-white",
                    inputWrapper:
                      "bg-primary border-2 border-[#353541] data-[hover=true]:border-[#575763] data-[hover]:bg-primary group-data-[focus=true]:border-[#575763] group-data-[focus=true]:bg-primary",
                  }}
                  label="Seção"
                  labelPlacement="outside"
                  placeholder="e.g. AWS"
                  description="Para adicionar a seção clique no botão abaixo"
                />
                <Button onClick={handleAdd} className="bg-zinc-300">
                  Adicionar
                </Button>
                <section className="grid grid-cols-3 gap-2">
                  {secoes.map((secao, index) => (
                    <Card
                      radius="sm"
                      classNames={{
                        base: colors[secao.color + 1],
                      }}
                      key={index}
                    >
                      <CardHeader className="text-white font-medium">
                        {secao.name}
                      </CardHeader>
                      <CardFooter className="flex items-center justify-between bg-white">
                        <Popover
                          classNames={{
                            base: "bg-primary py-2",
                          }}
                        >
                          <PopoverTrigger>
                            <div
                              className={`ml-2 h-3 w-3 rounded-full cursor-pointer ${
                                colors[(secao.color % colors.length) + 1]
                              }`}
                            ></div>
                          </PopoverTrigger>
                          <PopoverContent>
                            <section className="grid grid-cols-5 gap-2">
                              {colors.map((col, ind) => (
                                <div
                                  onClick={() => handleColor(index, ind)}
                                  key={col}
                                  className={`${col} h-4 w-4 rounded-full cursor-pointer`}
                                ></div>
                              ))}
                            </section>
                          </PopoverContent>
                        </Popover>
                        <Button
                          isIconOnly
                          variant="light"
                          color="danger"
                          className="text-xs h-5"
                        >
                          <Image
                            className="h-4 w-4"
                            src={trash}
                            alt="Excluir"
                          />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </section>
              </ModalBody>
              <ModalFooter className="flex items-center justify-between">
                <Button
                  onClick={onClose}
                  variant="light"
                  className="text-white"
                >
                  Voltar
                </Button>
                <Button variant="shadow" color="warning">
                  Criar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalNovaSecao;
