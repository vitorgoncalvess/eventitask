import { query } from "@/app/(lib)/db";
import { NextResponse } from "next/server";

export async function DELETE(_: any, { params }: { params: { id: string } }) {
  try {
    await query("DELETE FROM task WHERE id = ?", [params.id]);

    return NextResponse.json({ message: "atividade deletada" });
  } catch (err) {
    return NextResponse.json(err);
  }
}
