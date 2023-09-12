import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import React from "react";
import menu from "@/public/menu_dots.png";
import Image from "next/image";
import dash from "@/public/data-analytics.png";
import trash from "@/public/delete.png";
import ModalDeletarSecao from "./ModalDeletarSecao";
import { usePathname, useRouter } from "next/navigation";

const MenuHeader = ({ name }: { name: string }) => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <Dropdown
      size="sm"
      classNames={{
        base: "bg-primary min-w-[10rem]",
      }}
      closeOnSelect={false}
    >
      <DropdownTrigger>
        <div>
          <Image className="h-6 w-6 cursor-pointer" src={menu} alt="Menu" />
        </div>
      </DropdownTrigger>
      <DropdownMenu
        itemClasses={{
          base: "data-[hover]:bg-secondary",
        }}
        variant="bordered"
        color="secondary"
      >
        <DropdownSection
          title="Ações"
          showDivider
          classNames={{
            divider: "bg-zinc-600",
          }}
        >
          <DropdownItem
            onClick={() => router.push(`/dash/${pathname.split("/")[2]}`)}
            className="data-[hover=true]:text-white"
            startContent={
              <Image className="h-5 w-5" src={dash} alt="Dashboard" />
            }
          >
            <div>
              <h1>Dashboard</h1>
              <h2 className="text-xs opacity-50 group-data-[hover=true]:opacity-100">
                Analise dos dados
              </h2>
            </div>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title={"Zona de Perigo"}>
          <DropdownItem
            className="text-red-400 data-[hover=true]:text-red-400"
            startContent={
              <Image className="h-5 w-5" src={trash} alt="Deletar" />
            }
          >
            <ModalDeletarSecao name={name} />
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default MenuHeader;
