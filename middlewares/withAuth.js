import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export function withAuth(middleware, reqPages) {
  return async (req, next) => {
    const pathname = req.nextUrl.pathname;

    if (reqPages.includes(pathname)) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });
      if (!token && reqPages.includes(pathname)) {
        const urls = new URL("/", req.url);
        return NextResponse.redirect(urls);
      }
    }
    return middleware(req, next);
  };
}
