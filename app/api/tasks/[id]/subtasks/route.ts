import { query } from "@/app/(lib)/db";
import { NextResponse } from "next/server";

export async function GET(_: any, { params }: { params: { id: string } }) {
  try {
    const subtasks = await query("SELECT t.*, GROUP_CONCAT(tg.name) as tags FROM task as t LEFT JOIN tag_task as tt on tt.task_id = t.id LEFT JOIN tag as tg on tg.id = tt.tag_id WHERE t.task_id = ? GROUP BY t.id", [
      params.id,
    ]);

    return NextResponse.json(subtasks);
  } catch (err) {
    return NextResponse.json(err);
  }
}
