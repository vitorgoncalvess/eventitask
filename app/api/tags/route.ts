import { query } from "@/app/_lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tags = await query("SELECT * FROM tag");
    return NextResponse.json(tags);
  } catch (err) {
    return NextResponse.json(err);
  }
}
