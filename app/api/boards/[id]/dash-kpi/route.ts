import { query } from "@/app/_lib/db";
import { NextResponse } from "next/server";

export async function GET(_: any, { params }: { params: { id: string } }) {
  try {
    const dist = await query(
      "SELECT * FROM vw_kpi_distribution_tasks WHERE board_id = ?",
      [params.id]
    );
    const date = await query(
      "SELECT data_estimada FROM vw_expected_time_to_conclusion_board WHERE board_id = ?",
      [params.id]
    );
    const time = await query(
      "SELECT media_tempo FROM vw_avg_board_by_board WHERE board_id = ?",
      [params.id]
    );
    const kpis = [
      {
        title: "Distribuição de tarefas",
        subtitle: "As 10 tarefas estão distribuidas assim.",
        info: "Aqui mostra como as tarefas estão distruibuidas entre os responsaveis da área.",
        value: dist.reduce(
          (acc: any, val: any) => {
            return {
              names: [...acc.names, val.user],
              values: [...acc.values, val.qtd_tasks],
            };
          },
          { names: [], values: [] }
        ),
      },
      {
        title: "Tempo médio na tarefa",
        subtitle: "Média de tempo gasto em cada tarefa",
        info: "Baseado nas contagem de horas nas tarefas, aqui está uma media de quanto tempo leva para se concluir uma tarefa nesta área.",
        value: time[0].media_tempo + " horas",
      },
      {
        title: "Data de conclusão",
        subtitle: "Data estimada para conclusão da área",
        info: "Levando em consideração o tempo medio gasto por tarefa, quanto tempo cada responsavel tem por semana, e mais um pequena penalidade, esta é a data prevista para o termino da área.",
        value: new Date(date[0].data_estimada).toLocaleDateString("pt-bt"),
      },
    ];
    return NextResponse.json(kpis);
  } catch (err) {
    console.log(err);
    return NextResponse.json(err);
  }
}
