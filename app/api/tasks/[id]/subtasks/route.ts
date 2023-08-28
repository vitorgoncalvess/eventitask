import clientPromise from '@/app/(lib)/mongodb';
import { mongo } from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET(_: any, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db('eventitask');

    const subtasks = await db
      .collection('task')
      .find({ ref_id: new mongo.ObjectId(params.id) })
      .toArray();

    return NextResponse.json(subtasks);
  } catch (err) {
    return NextResponse.json(err);
  }
}
