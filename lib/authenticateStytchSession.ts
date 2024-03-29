import loadStytch from "./loadStytch";

export const authenticateStytchSession = async (sessionCookie?: string) => {
  if (!sessionCookie) {
    return false;
  }
  try {
    const client = loadStytch();
    console.log("Loaded client");

    return await client.sessions.authenticate({
      session_token: sessionCookie,
    });
  } catch (error) {
    console.error(error);
    return false;
  }
};
