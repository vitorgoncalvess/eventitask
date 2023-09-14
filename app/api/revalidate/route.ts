import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  const tag = req.nextUrl.searchParams.get("tag");

  if (secret !== process.env.NEXT_SECRET) {
    return NextResponse.json({ message: "chave invalida" }, { status: 401 });
  }

  if (!tag) {
    return NextResponse.json(
      { message: "parametro 'tag' inexistente" },
      { status: 400 }
    );
  }

  revalidateTag(tag);

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
