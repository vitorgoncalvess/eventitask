import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import clientPromise from "@/app/(lib)/mongodb";
import { mongo } from "mongoose";

export async function GET(req: Request) {
  const value = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!value) {
    return NextResponse.json({ message: "Token inexistente" }, { status: 400 });
  }
  const { _id }: any = jwt.decode(value);
  try {
    const client = await clientPromise;
    const db = client.db("eventitask");

    const boards = await db
      .collection("board")
      .find({ user_id: new mongo.ObjectId(_id) })
      .toArray();
    return NextResponse.json({ boards });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}
