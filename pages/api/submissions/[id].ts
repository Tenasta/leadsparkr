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

  const data = await prisma.submission.findFirst({
    where: {
      Form: {
        User: {
          id: user.user.id,
        },
      },
      id: req.query.id as string,
    },
  });

  return res.json({ data });
}
