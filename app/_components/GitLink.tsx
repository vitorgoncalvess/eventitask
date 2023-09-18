import {
  Modal,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import rebase from "@/public/rebase.svg";

const GitLink = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <span className="cursor-pointer flex items-center gap-1" onClick={onOpen}>
        <Image src={rebase} alt="github" />
        <span className="opacity-30 text-sm">Associar repositorio...</span>
      </span>
      <Modal
        classNames={{
          base: "bg-primary",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Associar repositorio</ModalHeader>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default GitLink;
