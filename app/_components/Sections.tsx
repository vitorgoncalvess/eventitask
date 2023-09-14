"use client";

import React from "react";
import { Dash } from "../_utils/interfaces";
import {
  Card,
  CardBody,
  CardFooter,
  Chip,
  CircularProgress,
  ScrollShadow,
} from "@nextui-org/react";
import colors from "../_utils/colors";

const Sections = ({ sections }: Dash) => {
  return (
    <ScrollShadow
      orientation="horizontal"
      className="flex items-center gap-2 p-2 relative"
      size={0}
    >
      <div className="self-end flex items-center gap-4">
        {sections.length &&
          sections?.map((sec) => (
            <Card
              classNames={{
                base: `${sec.color} text-white w-[175px]`,
              }}
              key={sec.id}
            >
              <CardBody className="flex items-center justify-center pb-1">
                <CircularProgress
                  classNames={{
                    svg: "w-16 h-16",
                    indicator: "stroke-[rgb(255,255,255,0.7)]",
                    value: "text-lg font-medium",
                  }}
                  showValueLabel
                  value={sec.tarefas_concluidas}
                  maxValue={sec.total_tarefas || 1}
                />
              </CardBody>
              <CardFooter className="flex items-center justify-center pt-0">
                <Chip
                  classNames={{
                    base: "text-white border-white",
                  }}
                  variant="bordered"
                >
                  <span className="font-semibold">{sec.name}</span>
                </Chip>
              </CardFooter>
            </Card>
          ))}
      </div>
    </ScrollShadow>
  );
};

export default Sections;
