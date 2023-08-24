import clientPromise from "@/app/(lib)/mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const key = process.env.SECRET_KEY || "chave-secreta";

export async function POST(req: Request) {
  const { email, senha } = await req.json();
  try {
    const client = await clientPromise;
    const db = client.db("eventitask");

    const user = await db.collection("usuario").findOne({ email: email });

    if (!user) {
      return NextResponse.json(
        { message: "Usuario inexistente" },
        { status: 404 }
      );
    }

    if (await bcrypt.compare(senha, user.senha)) {
      const token = jwt.sign(user, key, { expiresIn: "1h" });
      return NextResponse.json({ ...user, token });
    } else {
      return NextResponse.json(
        { message: "E-mail ou senha invalidos" },
        { status: 400 }
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(err);
  }
}
