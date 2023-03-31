import prisma from "@/lib/prisma";
import withAuthSession from "../secure-session";
import { NextApiRequest, NextApiResponse } from "next";
import { NotificationPreference } from "@prisma/client";
import { nanoid } from "nanoid";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    return POST(req, res);
  } else if (req.method === "GET") {
    return GET(req, res);
  }

  throw new Error("Unsupported HTTP method");
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const user = await withAuthSession(req);
  if (!user) {
    return res.status(403).json({ error: "Not authenticated" });
  }

  const data = await prisma.form.findMany({
    where: {
      User: {
        id: user.user.id,
      },
    },
    include: {
      User: {
        select: { id: true, first_name: true },
      },
    },
  });

  return res.json({ data });
}

interface CreateFormRequest extends NextApiRequest {
  body: {
    name: string;
    emailForwardAddress: string;
    botDetection?: boolean;
    notificationPreference: NotificationPreference;
  };
}
export async function POST(req: CreateFormRequest, res: NextApiResponse) {
  console.log("POST");
  if (req.method !== "POST") {
    res.status(405).send("Method not allowed");
    return;
  }
  const user = await withAuthSession(req);
  if (!user) {
    return res.status(403).json({ error: "Not authenticated" });
  }
  const {
    name,
    emailForwardAddress,
    botDetection = false,
    notificationPreference,
  } = req.body;
  const form = await prisma.form.create({
    data: {
      name,
      emailForwardAddress,
      botDetection,
      notificationPreference:
        notificationPreference.toUpperCase() as NotificationPreference,
      endpoint: nanoid(),
      User: {
        connect: {
          id: user.user.id,
        },
      },
    },
  });
  return res.status(200).json({ data: form, success: true, errors: null });
}
