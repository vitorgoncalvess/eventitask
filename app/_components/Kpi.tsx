"use client";

import { Card, CardBody, CardHeader, Tooltip } from "@nextui-org/react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import React from "react";
import colors from "../_utils/colors";
import Image from "next/image";
import info from "@/public/info.svg";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Kpi = ({ kpi, title, subtitle, information }: any) => {
  const options: ApexOptions = {
    plotOptions: {
      pie: {
        donut: {
          size: "50%",
        },
      },
    },
    colors: ["#f87171", "#34d399", "#a3e635"],
    legend: {
      show: false,
    },
    labels: kpi.names,
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "12px",
      },
    },
    stroke: {
      colors: ["#2c2c37"],
    },
  };
  return (
    <Card
      radius="sm"
      classNames={{
        base: "bg-primary text-white",
        body: "py-0",
      }}
    >
      <CardHeader className="relative font-medium flex flex-col items-start">
        <h1>{title}</h1>
        <h2 className="font-normal text-xs opacity-50">{subtitle}</h2>
        <Tooltip
          classNames={{
            base: "w-56 bg-primary py-2",
          }}
          content={<span className="opacity-80">{information}</span>}
        >
          <Image
            className="absolute top-2 right-2 opacity-30"
            src={info}
            alt="informação adicional"
          />
        </Tooltip>
      </CardHeader>
      <CardBody>
        {kpi.names ? (
          <div className="w-full flex justify-between overflow-hidden">
            <ul className="flex flex-col-reverse text-sm font-medium gap-1 h-24">
              {kpi.names.map((name, index) => (
                <li key={name}>
                  <span>{name}</span>
                  <span
                    className={`inline-block w-2 h-2 ml-2 rounded-sm ${
                      colors[index % colors.length]
                    }`}
                  ></span>
                </li>
              ))}
            </ul>
            <div className="w-24">
              <Chart
                options={options}
                height={125}
                series={kpi.values}
                type="donut"
              />
            </div>
          </div>
        ) : (
          <span className="text-4xl font-semibold h-5/6 flex items-end text-[#ae4fe3]">
            {kpi}
          </span>
        )}
      </CardBody>
    </Card>
  );
};

export default Kpi;
