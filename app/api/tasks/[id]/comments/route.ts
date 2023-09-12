import { query } from "@/app/_lib/db";
import { NextResponse } from "next/server";

export async function GET(_: any, { params }: { params: { id: string } }) {
  try {
    const result = await query(
      "SELECT * FROM vw_message_user WHERE task_id = ?",
      [params.id],
    );

    result.forEach((res: any) => {
      res.time = new Date(res.time).toLocaleTimeString("pt-br");
    });

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { message, idUser } = await req.json();
  try {
    const time = new Date();
    const res = await query(
      "INSERT INTO comment (task_id, user_id, message, time) VALUES (?,?,?,?)",
      [params.id, idUser, message, time],
    );

    const user = await query("SELECT name, img FROM usuario WHERE id = ?", [
      idUser,
    ]);

    const result = {
      task_id: params.id,
      id: res.insertId,
      message: message,
      user_id: idUser,
      name: user[0].name,
      img: user[0].img,
      time: time.toLocaleTimeString("pt-br"),
    };

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(err);
  }
}
