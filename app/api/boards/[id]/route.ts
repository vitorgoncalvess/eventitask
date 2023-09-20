import { query } from "@/app/_lib/db";
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
            tags: sec.tags ? sec.tags.split(",") : [],
            tags_id: sec.tags_id ? sec.tags_id.split(",") : [],
            subtasks_status: sec.subtasks_status
              ? sec.subtasks_status.split(",")
              : [],
            time: sec.time,
            data_estimada:
              sec.data_estimada &&
              sec.data_estimada
                .toLocaleDateString("pt-br")
                .split("/")
                .reverse()
                .join("-"),
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
              tags: sec.tags ? sec.tags.split(",") : [],
              tags_id: sec.tags_id ? sec.tags_id.split(",") : [],
              subtasks_status: sec.subtasks_status
                ? sec.subtasks_status.split(",")
                : [],
              status: sec.status,
              time: sec.time,
              data_estimada:
                sec.data_estimada &&
                sec.data_estimada
                  .toLocaleDateString("pt-br")
                  .split("/")
                  .reverse()
                  .join("-"),
              responsaveis: resp?.map((item: string, index: number) => ({
                id: ids[index],
                img: item,
              })),
            },
          ],
        });
      }
    });

    console.log(_board);

    return NextResponse.json(_board, {
      headers: {
        "Content-Encoding": "gzip, deflate, br",
      },
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err });
  }
}

export async function DELETE(_: any, { params }: { params: { id: string } }) {
  try {
    await query("DELETE FROM board WHERE id = ?", [params.id]);

    return NextResponse.json({ message: "area deletada" });
  } catch (err) {
    return NextResponse.json(err);
  }
}
