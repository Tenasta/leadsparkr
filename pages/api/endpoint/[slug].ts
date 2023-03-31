import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import requestIp from "request-ip";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    return POST(req, res);
  }

  throw new Error("Unsupported HTTP method");
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  const form = await prisma.form.findFirst({
    where: {
      endpoint: req.query.slug as string,
    },
  });

  if (!form) {
    return res.status(404).json({ error: "Not found." });
  }

  const submissionData = buildSubmissionData(req);

  const submission = await prisma.submission.create({
    data: {
      ...submissionData,
      Form: {
        connect: {
          id: form.id,
        },
      },
    },
  });

  return res.json({ data: form });
}

function buildSubmissionData(req: NextApiRequest) {
  const detectedIp = requestIp.getClientIp(req) ?? "unknown";

  return {
    user_ip: detectedIp,
    data: req.body,
  };
}
