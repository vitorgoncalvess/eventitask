import { query } from "@/app/(lib)/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { text } = await req.json();
  try {
    await query("UPDATE task SET description = ? WHERE id = ?", [
      text,
      params.id,
    ]);

    return NextResponse.json({ message: "descrição alterada" });
  } catch (err) {
    return NextResponse.json(err);
  }
}
