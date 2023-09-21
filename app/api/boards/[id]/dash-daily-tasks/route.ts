import { query } from "@/app/_lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const dias = req.nextUrl.searchParams.get("dias");
  try {
    const res = await query("CALL sp_tasks('dia',?,?)", [dias, params.id]);

    const result = res[0].reduce(
      (acc: { dates: []; values: [] }, val: any) => {
        return {
          dates: [...acc.dates, new Date(val.conclusion_date)],
          values: [...acc.values, val]
        };
      },
      { dates: [], values: [] }
    );

    // group by date
    const newValues = result.values.reduce((acc, val) => {
      const date = new Date(val.conclusion_date);
      const dateStr = date.toLocaleDateString("pt-br");
      const has = acc.findIndex((pred: any) => {
        return pred.date === dateStr;
      });
      if (has != -1) {
        acc[has].values.push(val);
      } else {
        acc.push({ date: dateStr, values: [val] });
      }
      return acc;
    }, []);

    const startDate = result.dates[result.dates.length - 1];

    const newDates = [];

    for (let x = 0; x < Number(dias); x++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + x);
      const dateStr = date.toLocaleDateString("pt-br");
      const has = result.dates.findIndex((pred: string) => {
        return pred === dateStr;
      });
      if (has != -1) {
        newDates.push(result.values[has]);
      } else {
        newDates.push(dateStr);
      }
    }

    return NextResponse.json({ values: newValues, dates: newDates });
  } catch (err) {
    console.log(err);
    return NextResponse.json(err);
  }
}
