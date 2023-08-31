import { query } from "@/app/(lib)/db";
import { NextResponse } from "next/server";

export async function GET(_: any, { params }: { params: { id: string } }) {
  try {
    const subtasks = await query("SELECT * FROM task WHERE task_id = ?", [
      params.id,
    ]);

    return NextResponse.json(subtasks);
  } catch (err) {
    return NextResponse.json(err);
  }
}
