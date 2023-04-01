import { NextApiRequest, NextApiResponse } from "next";
import withAuthSession from "../secure-session";
import prisma from "@/lib/prisma";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await withAuthSession(req);
  if (!user) {
    return res.status(403).json({ error: "Not authenticated" });
  }
  console.log("Looking for form with id:", req.query.id, "for user:", user.id);

  const data = await prisma.form.findFirst({
    where: {
      User: {
        id: user.user.id,
      },
      id: req.query.id as string,
    },
    include: {
      User: {
        select: { id: true, first_name: true },
      },
    },
  });

  return res.json({ data });
}
