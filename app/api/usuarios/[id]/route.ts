import clientPromise from '@/app/(lib)/mongodb';
import { mongo } from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET(_: any, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db('eventitask');

    const user = await db
      .collection('usuario')
      .findOne({ _id: new mongo.ObjectId(params.id) });

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json(err);
  }
}
