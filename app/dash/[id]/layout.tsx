"use client";

import SidebarDash from "@/app/(components)/SidebarDash";
import React, { useState } from "react";

const Page = ({ children }) => {
  const [side, setSide] = useState(true);
  return (
    <div className="min-h-screen relative flex justify-end">
      <SidebarDash side={side} setSide={setSide} />
      <section
        className={`self-end min-h-screen ${
          side ? "w-[calc(100vw-14rem)]" : "w-[calc(100vw-5rem)]"
        } transition-all ease-linear p-5`}
      >
        {children}
      </section>
    </div>
  );
};

export default Page;
