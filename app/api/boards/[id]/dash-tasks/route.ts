import { query } from "@/app/_lib/db";
import { NextResponse } from "next/server";

export async function GET(_: any, { params }: { params: { id: string } }) {
  try {
    const result = await query(
      "SELECT task_id, task_name, task_status, task_fibonacci, task_time, task_time_estimado, task_data_estimada, u_resp FROM tasks_board WHERE board_id = ?",
      [params.id]
    );

    const resultFormat = await Promise.all(
      result.map(async (item: any) => {
        const usuarios = item.u_resp.split(",");
        const responsaveis = await Promise.all(
          usuarios.map(async (u: number) => {
            const responsavel = await query("SELECT * FROM user WHERE id = ?", [
              u,
            ]);
            return responsavel[0];
          })
        );
        return { ...item, u_resp: responsaveis, show_more: "" };
      })
    );

    return NextResponse.json(resultFormat);
  } catch (err) {
    return NextResponse.json(err);
  }
}
