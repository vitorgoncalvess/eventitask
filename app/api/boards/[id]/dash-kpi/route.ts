import { query } from "@/app/_lib/db";
import { NextResponse } from "next/server";

export async function GET(_: any, { params }: { params: { id: string } }) {
  try {
    // const result = await query("SELECT * FROM vw_board_dash_kpi");
    const temp = [
      {
        title: "Distribuição de tarefas",
        value: [
          ["Name", "Value"],
          ["Vitor", 5],
          ["Leonardo", 3],
          ["Victor", 1],
        ],
      },
      { title: "Tempo medio na tarefa", value: 10 },
      { title: "Data de conclusão", value: 24 },
    ];
    return NextResponse.json(temp);
  } catch (err) {
    return NextResponse.json(err);
  }
}
