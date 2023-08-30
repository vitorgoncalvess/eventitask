import { query } from "@/app/(lib)/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { time } = await req.json();
  try {
    await query("UPDATE task SET time = ? where id = ?", [time, params.id]);

    return NextResponse.json({ message: "atualizo o timer" });
  } catch (err) {
    return NextResponse.json(err);
  }
}
