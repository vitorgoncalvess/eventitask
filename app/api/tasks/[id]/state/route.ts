import { NextResponse } from "next/server";
import clientPromise from "@/app/(lib)/mongodb";
import { mongo } from "mongoose";
import { query } from "@/app/(lib)/db";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { state, value } = await req.json();
  try {
    if (state === "fibonacci")
      await query("UPDATE task SET fibonacci = ? WHERE id = ?", [
        value,
        params.id,
      ]);
    else
      await query("UPDATE task SET priority = ? WHERE id = ?", [
        value,
        params.id,
      ]);

    return NextResponse.json({ message: "estado atualizado" });
  } catch (err) {
    return NextResponse.json(err);
  }
}
