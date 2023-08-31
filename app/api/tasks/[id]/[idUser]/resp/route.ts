import { query } from "@/app/(lib)/db";
import { NextResponse } from "next/server";

export async function POST(
  _: any,
  { params }: { params: { id: string; idUser: string } }
) {
  try {
    await query("INSERT INTO user_task VALUES (?,?)", [
      params.idUser,
      params.id,
    ]);

    return NextResponse.json({ message: "usuario inserido" });
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function DELETE(
  _: any,
  { params }: { params: { id: string; idUser: string } }
) {
  try {
    await query("DELETE FROM user_task WHERE user_id = ? AND task_id = ?", [
      params.idUser,
      params.id,
    ]);

    return NextResponse.json({ message: "responsavel deletado" });
  } catch (err) {
    return NextResponse.json(err);
  }
}
