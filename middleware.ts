import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import User from "./interfaces/user";

export default withAuth(
  async function middleware(req) {
    // authorize roles
    const url = req.nextUrl.pathname;
    const user = req?.nextauth?.token?.user as User;
    const userRole = user?.role;

    if (url.startsWith("/api")) {
      NextResponse.next().headers.append("Access-Control-Allow-Origin", "*");
    }

    if (url?.startsWith("/admin") && userRole !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
      // {
      // if (!token) {
      //   return false;
      // }
      // },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*", "/shipping"],
};
