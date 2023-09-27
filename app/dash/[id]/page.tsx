"use client";

import React, { useEffect, useState } from "react";
import Kpi from "@/app/_components/Kpi";
import Logs from "@/app/_components/Logs";
import Sections from "@/app/_components/Sections";
import { Dash } from "@/app/_utils/interfaces";
import axiosInstance from "@/app/_axios/config";
import Loading from "@/app/_components/Loading";
import GitLink from "@/app/_components/GitLink";
import History from "@/app/_components/History";
import TableTasks from "@/app/_components/TableTasks";

const Page = ({ params }: { params: { id: string } }) => {
  const [dash, setDash] = useState<Dash>();
  useEffect(() => {
    const fetchData = async () => {
      const [name, kpis, sections, tasks] = await Promise.all([
        axiosInstance
          .get(`/boards/${params.id}/dash-name`)
          .then((response) => response.data),
        axiosInstance
          .get(`/boards/${params.id}/dash-kpi`)
          .then((response) => response.data),
        axiosInstance
          .get(`/boards/${params.id}/dash-sections`)
          .then((response) => response.data),
        axiosInstance
          .get(`/boards/${params.id}/dash-tasks`)
          .then((response) => response.data)
      ]);
      setDash((dash) => ({ ...dash, name: name.name, kpis, sections, tasks }));
    };
    fetchData();
  }, [params.id]);

  if (dash)
    return (
      <div>
        <h1 className="text-3xl font-semibold">{dash?.name}</h1>
        <div className="flex items-center gap-2">
          <GitLink />
        </div>
        <section className="grid grid-cols-[70%_30%] grid-rows-3 min-h-[100vh] gap-5 mt-4">
          <div className="grid grid-cols-3 gap-4">
            {dash?.kpis?.map((kpi, index) => (
              <Kpi
                key={index}
                kpi={kpi.value}
                title={kpi.title}
                subtitle={kpi.subtitle}
                information={kpi.info}
              />
            ))}
          </div>
          <Logs />
          <div>
            <h1 className="text-lg font-medium">Seções</h1>
            <Sections sections={dash?.sections} />
          </div>
          <History id={params.id} />
        </section>
        <TableTasks id={params.id} />
      </div>
    );
  else return <Loading color="white" />;
};

export default Page;
