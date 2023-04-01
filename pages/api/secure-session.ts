import { authenticateStytchSession } from "@/lib/authenticateStytchSession";
import { NextApiRequest } from "next";

export default async function withAuthSession(req: NextApiRequest) {
  const session = await authenticateStytchSession(
    req.cookies["stytch_session"]
  );
  if (!session) return false;

  return {
    user: {
      id: session.user.user_id,
    },
  };
}
