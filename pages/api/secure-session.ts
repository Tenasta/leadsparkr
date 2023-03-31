import { authenticateStytchSession } from "@/lib/authenticateStytchSession";
import { NextApiRequest } from "next";

export default async function withAuthSession(req: NextApiRequest) {
  // const session = await authenticateStytchSession();
  // if (!session) return false;

  return {
    user: {
      id: "clftqnie40000ypahq4hjmrqr", //session.user.user_id,
    },
  };
}
