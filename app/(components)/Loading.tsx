import React from "react";
import { tv } from "tailwind-variants";

const spin = tv({
  base: "animate-spin h-5 w-5 border-2 border-t-transparent rounded-full",
  variants: {
    color: {
      base: "border-b-base border-l-base border-r-base",
      white: "border-b-white border-l-white border-r-white",
    },
  },
});

const Loading = ({ color }: { color: "base" | "white" }) => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <span className={spin({ color: color })}></span>
    </div>
  );
};

export default Loading;
