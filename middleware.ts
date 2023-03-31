import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import loadStytch from "./lib/loadStytch";

const guestRoutes = ["/", "/login", "/signup"];

const openRoutes = [
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   * - images directory
   */
  "^/((api|_next/static|_next/image|favicon.ico|images/).*)",
];

export async function middleware(req: NextRequest) {
  //const { session } =

  const res = NextResponse.next();
  const { pathname } = req.nextUrl;

  // Pass any guest routes straight through
  if (guestRoutes.some((prefix) => pathname === prefix)) {
    return NextResponse.next();
  }

  // Pass any open routes straight through
  if (openRoutes.some((regex) => new RegExp(regex).test(pathname))) {
    return NextResponse.next();
  }
  console.log("Did not match any paths", pathname);

  // Redirect any other routes
  const session = await authenticateStytchSession(req);

  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return res;
}

const authenticateStytchSession = async (req: NextRequest) => {
  try {
    const client = loadStytch();
    const storedSession = req.cookies.get("stytch_session");
    if (!storedSession) {
      return false;
    }

    return await client.sessions.authenticate({
      session_token: storedSession.value,
    });
  } catch (error) {
    console.error(error);
    return false;
  }
};
