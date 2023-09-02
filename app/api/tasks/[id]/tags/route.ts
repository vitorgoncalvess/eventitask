import { query } from '@/app/(lib)/db';
import { NextResponse } from 'next/server';

export async function GET(_: any, { params }: { params: { id: string } }) {
  try {
    const tags = await query(
      'SELECT * FROM tag LEFT JOIN tag_task AS tt ON tt.tag_id = tag.id WHERE task_id = ?',
      [params.id],
    );
    return NextResponse.json(tags);''
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await req.json();
  try {
    await query('INSERT INTO tag_task VALUES (?,?)', [id, params.id]);
    return NextResponse.json({ message: 'tag adicionada' });
  } catch (err) {
    return NextResponse.json(err);
  }
}
