import { NextResponse } from "next/server";
import { query } from "@/app/_lib/db";

export async function POST(req: Request) {
  const { title, desc, status, subtarefas } = await req.json();
  try {
    const task = await query(
      "INSERT INTO task (section_id, name, priority, fibonacci, description, status) VALUES (?,?,1,1,?,0)",
      [status, title, desc],
    );

    if (subtarefas)
      subtarefas.map((item: any) => {
        query(
          "INSERT INTO task (name, task_id, priority, fibonacci, description, status) VALUES (?,?,0,0,'',0)",
          [item, task.insertId],
        );
      });

    return NextResponse.json(task, { status: 201 });
  } catch (err) {
    return NextResponse.json(err);
  }
}
