import { NextResponse } from "next/server";
import { query } from "@/app/(lib)/db";

export async function GET(req: Request) {
  const value = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!value) {
    return NextResponse.json({ message: "Token inexistente" }, { status: 400 });
  }
  try {
    const boards = await query("SELECT * FROM board");

    return NextResponse.json({ boards });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { nome, secoes } = await req.json();
  try {
    const result = await query("INSERT INTO board (NAME) VALUES (?)", [nome]);

    secoes.forEach(({ name, color }) => {
      query("INSERT INTO section (board_id, name, color) VALUES (?, ?, ?)", [
        result.insertId,
        name,
        color,
      ]);
    });

    return NextResponse.json({ id: result.insertId });
  } catch (err) {
    return NextResponse.json(err);
  }
}
