"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/react";
import React from "react";
import Chart, { ChartWrapperOptions } from "react-google-charts";

const Kpi = ({ kpi, title }: any) => {
  const options: ChartWrapperOptions["options"] = {
    pieHole: 0.4,
    pieSliceText: "none",
    legend: "none",
    is3D: false,
    tooltip: { trigger: "none" },
  };
  return (
    <Card
      classNames={{
        body: "text-black",
      }}
    >
      <CardHeader>{title}</CardHeader>
      <CardBody>
        {kpi[0] ? (
          <>
            <div>
              <Chart
                chartType="PieChart"
                data={kpi}
                options={options}
                width="100px"
                height="100px"
              />
            </div>
          </>
        ) : (
          kpi
        )}
      </CardBody>
    </Card>
  );
};

export default Kpi;
