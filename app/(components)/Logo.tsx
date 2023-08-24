import Image from "next/image";
import React from "react";
import logo from "@/public/logo_transparent.png";
import { tv } from "tailwind-variants";

const img = tv({
  base: "h-10 w-10",
  variants: {
    size: {
      base: "h-10 w-10",
      md: "h-12 w-12",
      lg: "h-14 w-14",
    },
  },
});

const text = tv({
  base: "text-xl font-medium",
  variants: {
    size: {
      base: "text-xl",
      md: "text-2xl",
      lg: "text-3xl",
    },
  },
});

const Logo = ({ size }: { size: "base" | "md" | "lg" }) => {
  return (
    <div className="flex items-center select-none">
      <Image
        draggable={false}
        className={img({ size: size })}
        src={logo}
        alt="Eventify"
      />
      <h1 className={text({ size: size })}>Eventify</h1>
    </div>
  );
};

export default Logo;
