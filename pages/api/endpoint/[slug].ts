import prisma from "@/lib/prisma";
import formidable from "formidable";
import IncomingForm from "formidable/Formidable";
import { NextApiRequest, NextApiResponse } from "next";
import requestIp from "request-ip";

export const config = {
  api: {
    bodyParser: false,
  },
};

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

  const submissionData = await buildSubmissionData(req);

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

async function buildSubmissionData(req: NextApiRequest) {
  const detectedIp = requestIp.getClientIp(req) ?? "unknown";

  const data: { fields: { [key: string]: any }; err: any } = await new Promise(
    (resolve, reject) => {
      const form: IncomingForm = formidable();

      form.parse(req, (err, fields) => {
        if (err) reject({ err });
        resolve({ err, fields });
      });
    }
  );
  return {
    user_ip: detectedIp,
    data: data?.fields ?? req.body,
  };
}
