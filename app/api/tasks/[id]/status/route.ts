import { query } from "@/app/_lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { status } = await req.json();
  try {
    const result = await query("UPDATE task SET status = ? where id = ?", [
      status,
      params.id,
    ]);

    return NextResponse.json({ result });
  } catch (err) {
    return NextResponse.json(err);
  }
}
