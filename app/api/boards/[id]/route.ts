import { query } from "@/app/(lib)/db";
import clientPromise from "@/app/(lib)/mongodb";
import { mongo } from "mongoose";
import { NextResponse } from "next/server";

interface Board {
  name: string;
  sections: {
    id: string;
    name: string;
    color: string;
    tasks: Object[];
  }[];
}

export async function GET(_: any, { params }: { params: { id: string } }) {
  try {
    const result: any[] = await query(
      "SELECT * FROM vw_sections_task_resp WHERE id = ?",
      [params.id]
    );

    const _board: Board = {
      name: result[0].name,
      sections: [],
    };

    result.forEach((sec) => {
      const resp = sec.responsaveis?.split(",");
      const ids = sec.responsaveis_id?.split(",");
      const has = _board.sections.findIndex((pred: any) => {
        return pred.id === sec.section_id;
      });
      if (has != -1) {
        if (sec.task_id) {
          _board.sections[has].tasks.push({
            id: sec.task_id,
            name: sec.task_name,
            description: sec.description,
            priority: sec.priority,
            fibonacci: sec.fibonacci,
            subtasks: sec.subtask_id,
            status: sec.status,
            time: sec.time,
            responsaveis: resp?.map((item: string, index: number) => ({
              id: ids[index],
              img: item,
            })),
          });
        }
      } else {
        _board.sections.push({
          id: sec.section_id,
          name: sec.section_name,
          color: sec.color,
          tasks: sec.task_id && [
            {
              id: sec.task_id,
              name: sec.task_name,
              description: sec.description,
              priority: sec.priority,
              fibonacci: sec.fibonacci,
              subtasks: sec.subtask_id,
              status: sec.status,
              time: sec.time,
              responsaveis: resp?.map((item: string, index: number) => ({
                id: ids[index],
                img: item,
              })),
            },
          ],
        });
      }
    });

    return NextResponse.json(_board);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err });
  }
}
