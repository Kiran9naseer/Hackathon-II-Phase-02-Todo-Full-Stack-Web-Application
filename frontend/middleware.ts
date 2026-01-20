import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/tasks", "/categories"];
const authRoutes = ["/login"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path starts with any protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if the path starts with any auth route
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Get the session token from cookies
  const token = request.cookies.get("jwt_token")?.value;

  // NOTE: On localhost, browsers often block cross-site cookies between 127.0.0.1 and localhost.
  // Since we also use Bearer tokens (localStorage), skipping strict middleware redirect 
  // allows the client-side useSession hook to handle authentication properly.
  
  /* 
  // Redirect to login if accessing protected route without token
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to tasks if accessing auth route with token
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/tasks", request.url));
  }
  */

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
