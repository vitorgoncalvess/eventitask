import React from 'react';
import Image from 'next/image';
import rebase from '@/public/rebase.svg';
import Kpi from '@/app/_components/Kpi';
import Logs from '@/app/_components/Logs';
import Sections from '@/app/_components/Sections';
import { Dash } from '@/app/_utils/interfaces';

const getDash = async (id: string) => {
  const [name, kpis, sections] = await Promise.all([
    fetch(`http://localhost:3000/api/boards/${id}/dash-name`).then((response) =>
      response.json(),
    ),
    fetch(`http://localhost:3000/api/boards/${id}/dash-kpi`).then((response) =>
      response.json(),
    ),
    fetch(`http://localhost:3000/api/boards/${id}/dash-sections`, {
      cache: 'no-cache',
    }).then((response) => response.json()),
  ]);
  return { name: name.name, kpis, sections };
};

const Page = async ({ params }: { params: { id: string } }) => {
  const { name, kpis, sections }: Dash = await getDash(params.id);
  return (
    <div>
      <h1 className="text-3xl font-semibold">{name}</h1>
      <div className="flex items-center gap-2">
        <Image src={rebase} alt="github" />
        <span className="opacity-30 text-sm">Associar repositorio...</span>
      </div>
      <section className="grid grid-cols-[70%_30%] grid-rows-3 min-h-[80vh] gap-5 mt-12">
        <div className="grid grid-cols-3 gap-4">
          {kpis.map((kpi, index) => (
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
        <Sections sections={sections} />
      </section>
    </div>
  );
};

export default Page;
