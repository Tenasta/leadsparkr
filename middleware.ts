import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authenticateStytchSession } from "./lib/authenticateStytchSession";

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
  const { pathname } = req.nextUrl;

  // Pass any guest routes straight through
  if (guestRoutes.some((prefix) => pathname === prefix)) {
    return NextResponse.next();
  }

  // Pass any open routes straight through
  if (openRoutes.some((regex) => new RegExp(regex).test(pathname))) {
    return NextResponse.next();
  }

  // Redirect any other routes
  const session = await authenticateStytchSession(
    req.cookies.get("stytch_session")?.value
  );

  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  req.headers.set("x-user-id", session.user.user_id);

  return NextResponse.next({
    request: {
      headers: req.headers,
    },
  });
}
