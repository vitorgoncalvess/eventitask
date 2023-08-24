import clientPromise from '@/app/(lib)/mongodb';
import { NextResponse } from 'next/server';
import { mongo } from 'mongoose';

export async function POST(req: Request) {
  const { title, desc, status } = await req.json();
  try {
    const client = await clientPromise;
    const db = client.db('eventitask');

    const task = await db.collection('task').insertOne({
      name: title,
      description: desc,
      ref_id: new mongo.ObjectId(status),
    });

    return NextResponse.json(task, { status: 201 });
  } catch (err) {
    return NextResponse.json(err);
  }
}
