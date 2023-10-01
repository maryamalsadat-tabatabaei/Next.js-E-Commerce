import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import User from "./interfaces/user";

export default withAuth(
  async function middleware(req) {
    const url = req.nextUrl.pathname;
    const user = req?.nextauth?.token?.user as User;
    const userRole = user?.role;

    if (url.startsWith("/api")) {
      NextResponse.next().headers.append("Access-Control-Allow-Origin", "*");
      NextResponse.next().headers.append(
        "Access-Control-Allow-Credentials",
        "true"
      );
      NextResponse.next().headers.append(
        "Access-Control-Allow-Methods",
        "GET,OPTIONS,PATCH,DELETE,POST,PUT"
      );
      NextResponse.next().headers.append(
        "Access-Control-Allow-Headers",
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
      );
    }

    if (url?.startsWith("/admin") && userRole !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    //  if (req.method == "OPTIONS") {
    //    res.header(
    //      "Access-Control-Allow-Methods",
    //      "PUT, POST, PATCH, DELETE, GET"
    //    );
    //    return res.status(200).json({});
    //  }
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
  matcher: ["/api/:path*", "/admin/:path*", "/profile/:path*", "/shipping"],
};
