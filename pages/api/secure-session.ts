import { authenticateStytchSession } from "@/lib/authenticateStytchSession";
import prisma from "@/lib/prisma";
import { NextApiRequest } from "next";

export default async function withAuthSession(req: NextApiRequest) {
  const session = await authenticateStytchSession(
    req.cookies["stytch_session"]
  );
  if (!session) return false;

  const email = session.user.emails.find((e) => e.verified)?.email;
  if (!email) throw new Error("No verified email found");

  const userData = {
    email,
    first_name: session.user.name.first_name,
    last_name: session.user.name.last_name,
  };

  const user = await prisma.user.upsert({
    where: { id: session.user.user_id },
    create: {
      id: session.user.user_id,
      ...userData,
    },
    update: userData,
  });

  console.log("Current user:", user);

  return {
    user,
  };
}
