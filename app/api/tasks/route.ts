import clientPromise from '@/app/(lib)/mongodb';
import { NextResponse } from 'next/server';
import { mongo } from 'mongoose';

export async function POST(req: Request) {
  const { title, desc, status, subtarefas } = await req.json();
  try {
    const client = await clientPromise;
    const db = client.db('eventitask');

    const task = await db.collection('task').insertOne({
      name: title,
      description: desc,
      ref_id: new mongo.ObjectId(status),
      resp: [],
    });

    if (subtarefas)
      await db.collection('task').insertMany(
        subtarefas.map((item: any) => ({
          name: item,
          description: null,
          ref_id: task.insertedId,
        })),
      );

    return NextResponse.json(task, { status: 201 });
  } catch (err) {
    return NextResponse.json(err);
  }
}
