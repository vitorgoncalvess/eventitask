import { query } from "@/app/_lib/db";
import { NextResponse } from "next/server";

export async function GET(_: any, { params }: { params: { id: string } }) {
  try {
    const subtasks = await query(
      "SELECT t.*, GROUP_CONCAT(tg.name) as tags, GROUP_CONCAT(tg.id) as tags_id FROM task as t LEFT JOIN tag_task as tt on tt.task_id = t.id LEFT JOIN tag as tg on tg.id = tt.tag_id WHERE t.task_id = ? GROUP BY t.id",
      [params.id],
    );

    const subs = subtasks.map((sub: any) => ({
      ...sub,
      tags: sub.tags ? sub.tags.split(",") : [],
      tags_id: sub.tags_id ? sub.tags_id.split(",") : [],
    }));

    return NextResponse.json(subs);
  } catch (err) {
    console.log(err);
    return NextResponse.json(err);
  }
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { title, desc, task } = await req.json();
  try {
    const date = new Date();
    await query(
      "INSERT INTO task (task_id, name, priority, fibonacci, description, status, data_estimada) VALUES (?,?,1,1,?,0,?)",
      [task, title, desc, date],
    );

    return NextResponse.json({ title, desc, date, status: 0 }, { status: 201 });
  } catch (err) {
    return NextResponse.json(err);
  }
}
