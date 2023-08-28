import clientPromise from '@/app/(lib)/mongodb';
import { mongo } from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET(_: any, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db('eventitask');

    const board = await db
      .collection('board')
      .aggregate(
        [
          {
            $lookup: {
              from: 'section',
              localField: '_id',
              foreignField: 'board_id',
              as: 'sections',
            },
          },
          {
            $sort: {
              'section.order': 1,
            },
          },
          {
            $unwind: {
              path: '$sections',
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $lookup: {
              from: 'task',
              localField: 'sections._id',
              foreignField: 'ref_id',
              as: 'sections.tasks',
            },
          },
          {
            $unwind: {
              path: '$sections.tasks',
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $lookup: {
              from: 'task',
              localField: 'sections.tasks._id',
              foreignField: 'ref_id',
              as: 'sections.tasks.subtasks',
            },
          },
          {
            $lookup: {
              from: 'task',
              localField: 'sections.tasks._id',
              foreignField: 'ref_id',
              as: 'sections.tasks.subtasks',
            },
          },
          {
            $lookup: {
              from: 'usuario',
              localField: 'sections.tasks.resp',
              foreignField: '_id',
              as: 'sections.tasks.responsibleUsers',
            },
          },
          {
            $group: {
              _id: {
                boardId: '$_id',
                sectionId: '$sections._id',
                taskId: '$sections.tasks._id',
              },
              board: {
                $first: '$$ROOT',
              },
              section: {
                $first: '$sections',
              },
              task: {
                $first: '$sections.tasks',
              },
            },
          },
          {
            $group: {
              _id: {
                boardId: '$_id.boardId',
                sectionId: '$_id.sectionId',
              },
              board: {
                $first: '$board',
              },
              section: {
                $first: '$section',
              },
              tasks: {
                $push: '$task',
              },
            },
          },
          {
            $group: {
              _id: '$_id.boardId',
              board: {
                $first: '$board',
              },
              sections: {
                $push: {
                  _id: '$_id.sectionId',
                  name: '$section.name',
                  color: '$section.color',
                  order: '$section.order',
                  tasks: '$tasks',
                },
              },
            },
          },
          {
            $unwind: {
              path: '$sections',
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $sort: {
              'sections.order': 1,
            },
          },
          {
            $group: {
              _id: '$_id',
              board: {
                $first: '$board',
              },
              sections: {
                $push: '$sections',
              },
            },
          },
          {
            $addFields: {
              'board.sections': '$sections',
            },
          },
          {
            $replaceRoot: {
              newRoot: '$board',
            },
          },
        ],
        { maxTimeMS: 60000, allowDiskUse: true },
      )
      .toArray();

    if (board.length === 0) {
      return NextResponse.json(
        { message: 'Board inexistente' },
        { status: 204 },
      );
    }

    return NextResponse.json(board[0]);
  } catch (err) {
    return NextResponse.json({ err });
  }
}
