import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideItem = ({ img, selected, label, path, side, color }: any) => {
  const pathname = usePathname();
  return (
    <Link href={path ? `${pathname}/${path}` : `${pathname}`}>
      <li
        data-selected={pathname.split("/")[3] === path}
        className={`flex text-[#8392a6] items-center gap-2 font-medium ${
          color === "white"
            ? "data-[selected=true]:bg-[rgb(255,255,255,0.2)]"
            : color === "red"
            ? "data-[selected=true]:bg-red-500"
            : "data-[selected=true]:bg-base"
        } data-[selected=true]:text-white bg-opacity-50 rounded-full p-1 w-full overflow-hidden transition cursor-pointer`}
      >
        <Image
          src={pathname.split("/")[3] === path ? selected : img}
          alt={label}
        />
        <span
          className={`transition ease-linear overflow-hidden opacity-100 ${
            !side && "opacity-0"
          }`}
        >
          {label}
        </span>
      </li>
    </Link>
  );
};

export default SideItem;
