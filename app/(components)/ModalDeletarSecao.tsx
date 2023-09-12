import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { useRouter, usePathname } from 'next/navigation';
import React, { useState } from 'react';
import useAxios from '../(hooks)/useAxios';

const ModalDeletarSecao = ({ name }: { name: string }) => {
  const [confirm, setConfirm] = useState('');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const pathname = usePathname();
  const id: string = pathname.split('/')[2];

  const { isLoading, error, fetch } = useAxios('delete', `/boards/${id}`);

  const router = useRouter();

  function handleDelete() {
    fetch().then(() => {
      router.push(`/home`);
    });
  }

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
          backdrop: 'z-[10000000]',
          wrapper: 'z-[100000001]',
          base: 'bg-primary',
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
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
                  value={confirm}
                  onChange={({ target }) => setConfirm(target.value)}
                  placeholder={name}
                  classNames={{
                    inputWrapper: [
                      'bg-secondary',
                      'data-[hover=true]:bg-secondary',
                      'group-data-[focus=true]:bg-secondary',
                    ],
                  }}
                />
              </ModalBody>
              <ModalFooter className="flex items-center justify-between">
                <Button
                  onClick={onClose}
                  className="text-white"
                  variant="light"
                >
                  Cancelar
                </Button>
                <Button
                  isLoading={isLoading}
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

export default ModalDeletarSecao;
