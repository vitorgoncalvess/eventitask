import { query } from "@/app/_lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { date } = await req.json();
  try {
    await query("UPDATE task SET data_estimada = ? WHERE id = ?", [
      date,
      params.id,
    ]);

    return NextResponse.json({ message: "data alterada" });
  } catch (err) {
    return NextResponse.json(err);
  }
}
