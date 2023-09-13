import { query } from "@/app/_lib/db";
import { NextResponse } from "next/server";

export async function GET(_: any, { params }: { params: { id: string } }) {
  try {
    // const result = await query("SELECT * FROM vw_board_dash_kpi");
    const temp = [
      {
        title: "Distribuição de tarefas",
        subtitle: "As 10 tarefas estão distribuidas assim.",
        info: "Aqui mostra como as tarefas estão distruibuidas entre os responsaveis da área.",
        value: {
          names: ["Vitor", "Leonardo", "Victor"],
          values: [5, 2, 3],
        },
      },
      {
        title: "Tempo médio na tarefa",
        subtitle: "Média de tempo gasto em cada tarefa",
        info: "Baseado nas contagem de horas nas tarefas, aqui está uma media de quanto tempo leva para se concluir uma tarefa nesta área.",
        value: "2 Horas",
      },
      {
        title: "Data de conclusão",
        subtitle: "Data estimada para conclusão da área",
        info: "Levando em consideração o tempo medio gasto por tarefa, quanto tempo cada responsavel tem por semana, e mais um pequena penalidade, esta é a data prevista para o termino da área.",
        value: "18/09/23",
      },
    ];
    return NextResponse.json(temp);
  } catch (err) {
    return NextResponse.json(err);
  }
}
