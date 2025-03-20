import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
  "/admin",
  "/games",
  "/marketers",
  "/overview",
  "/verifiers",
];
const publicRoutes = ["/", "/signin"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Check if current path is protected
  const isProtectedRoute = protectedRoutes.some(
    (route) => path === route || path.startsWith(`${route}/`)
  );

  // Check if current path is public
  const isPublicRoute = publicRoutes.some(
    (route) => path === route || path.startsWith(`${route}/`)
  );

  // Skip middleware for API routes and static files
  if (path.startsWith("/_next/") || path.includes(".")) {
    return NextResponse.next();
  }

  // Get the accessToken from cookies
  const accessToken = req.cookies.get("accessToken")?.value;

  // For protected routes, check if token exists
  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // For public routes with token, redirect to dashboard
  if (isPublicRoute && accessToken) {
    return NextResponse.redirect(new URL("/verifiers", req.url));
  }

  // For all other routes, proceed normally
  return NextResponse.next();
}

// Define the routes where the middleware should run
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
