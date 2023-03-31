import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import withAuthSession from "../secure-session";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return GET(req, res);
  }

  throw new Error("Unsupported HTTP method");
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
  const user = await withAuthSession(req);
  if (!user) {
    return res.status(403).json({ error: "Not authenticated" });
  }

  const data = await prisma.submission.findMany({
    where: {
      Form: {
        User: {
          id: user.user.id,
        },
      },
      id: req.query.id as string,
    },
    include: {
      Form: {
        select: { name: true, endpoint: true },
      },
    },
  });

  return res.json({ data });
}
