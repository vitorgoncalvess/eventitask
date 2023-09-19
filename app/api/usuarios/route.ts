import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { query } from '@/app/_lib/db';

const key = process.env.SECRET_KEY || 'chave-secreta';

export async function GET() {
  try {
    const users = await query('SELECT id, name, img FROM user');
    return NextResponse.json(users);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function POST(req: Request) {
  const { email, senha } = await req.json();
  try {
    const result = await query('SELECT * FROM user WHERE email = ?', [email]);

    if (!result[0]) {
      return NextResponse.json(
        { message: 'Usuario inexistente' },
        { status: 404 },
      );
    }

    if (await bcrypt.compare(senha, result[0].password)) {
      const token = jwt.sign(result[0], key, { expiresIn: '1h' });
      return NextResponse.json({ ...result[0], token });
    } else {
      return NextResponse.json(
        { message: 'E-mail ou senha invalidos' },
        { status: 400 },
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(err);
  }
}
