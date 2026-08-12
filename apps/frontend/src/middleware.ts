import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/login", "/signup"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("jwt")?.value;
  console.log(token);
  
  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
