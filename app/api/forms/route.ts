import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const data = await prisma.form.findMany({
    include: {
      User: {
        select: { first_name: true },
      },
    },
  });

  return NextResponse.json({ data });
}
