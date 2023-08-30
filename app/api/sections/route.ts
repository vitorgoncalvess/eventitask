import { NextResponse } from "next/server";
import { query } from "@/app/(lib)/db";

export async function POST(req: Request) {
  const { id, name, color, tarefas } = await req.json();
  try {
    const result = await query(
      "INSERT INTO section (board_id, name, color) VALUES (?,?,?)",
      [id, name, color]
    );

    tarefas.forEach((task: string) => {
      query(
        "INSERT INTO task (section_id, name, description, priority, fibonacci, status) VALUES (?,?,'',0,0,0)",
        [result.insertId, task]
      );
    });

    return NextResponse.json({ message: "Seção criada" });
  } catch (err) {
    return NextResponse.json(err);
  }
}
