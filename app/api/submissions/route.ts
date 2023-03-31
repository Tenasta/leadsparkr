import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const data = await prisma.submission.findMany({
    include: {
      Form: {
        select: { name: true, endpoint: true },
      },
    },
  });

  return NextResponse.json({ data });
}
