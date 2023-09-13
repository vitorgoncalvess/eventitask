import { query } from "@/app/_lib/db";
import { NextResponse } from "next/server";

export async function GET(_: any, { params }: { params: { id: string } }) {
  try {
    const result = await query("SELECT name FROM board WHERE id = ?", [
      params.id,
    ]);
    if (!result.length) {
      return NextResponse.json(
        { message: "area inexistente" },
        { status: 204 },
      );
    }
    return NextResponse.json(result[0]);
  } catch (err) {
    return NextResponse.json(err);
  }
}
