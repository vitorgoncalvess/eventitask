import { query } from "@/app/_lib/db";
import { NextResponse } from "next/server";

export async function GET(_: any, { params }: { params: { id: string } }) {
  try {
    const result = await query(
      "SELECT * FROM section_view_by_board WHERE board_id = ?",
      [params.id]
    );
    if (!result.length) {
      return NextResponse.json({ message: "sem seções" }, { status: 204 });
    }
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(err);
  }
}
