import clientPromise from '@/app/(lib)/mongodb';
import { mongo } from 'mongoose';
import { NextResponse } from 'next/server';

export async function POST(
  _: any,
  { params }: { params: { id: string; idUser: string } },
) {
  try {
    const client = await clientPromise;
    const db = client.db('eventitask');

    db.collection('task').findOneAndUpdate(
      { _id: new mongo.ObjectId(params.id) },
      { $push: { resp: new mongo.ObjectId(params.idUser) as any } },
    );

    return NextResponse.json({ message: 'usuario inserido' });
  } catch (err) {
    return NextResponse.json(err);
  }
}
