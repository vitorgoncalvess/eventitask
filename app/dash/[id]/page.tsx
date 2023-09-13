import React from "react";
import Image from "next/image";
import rebase from "@/public/rebase.svg";
import Kpi from "@/app/_components/Kpi";

type Dash = {
  name: string;
  kpis: {
    title: string;
    value: number;
  }[];
};

const getDash = async (id: string) => {
  const [nameFetch, kpisFetch] = await Promise.all([
    await fetch(`http://localhost:3000/api/boards/${id}/dash-name`, {
      cache: "no-cache",
    }),
    await fetch(`http://localhost:3000/api/boards/${id}/dash-kpi`),
  ]);
  const name = await nameFetch.json();
  const kpis = await kpisFetch.json();
  return { name: name.name, kpis };
};

const Page = async ({ params }: { params: { id: string } }) => {
  const { name, kpis }: Dash = await getDash(params.id);
  return (
    <div>
      <h1 className="text-3xl font-semibold">{name}</h1>
      <div className="flex items-center gap-2">
        <Image src={rebase} alt="github" />
        <span className="opacity-30 text-sm">Associar repositorio...</span>
      </div>
      <section className="grid grid-cols-[70%_30%] grid-rows-3 min-h-[90vh] gap-5 mt-12">
        <div className="grid grid-cols-3 gap-2">
          {kpis.map((kpi, index) => (
            <Kpi key={index} kpi={kpi.value} title={kpi.title} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Page;
