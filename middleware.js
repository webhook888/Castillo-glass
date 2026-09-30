import { NextResponse } from "next/server";

export function middleware(request) {
  return NextResponse.rewrite(new URL("/coming-soon", request.url));
}

export const config = {
  matcher: ["/((?!api|admin|coming-soon|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
