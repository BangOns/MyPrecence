import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default function WithAuth(middleware, reqPages) {
  return async (req, next) => {
    console.log(reqPages);
    const pathname = req.nextUrl.pathname;
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    console.log(pathname);
    if (!token) {
      const urls = new URL("/", req.url);
      return NextResponse.redirect(urls);
    } else if (token) {
      return NextResponse.redirect(new URL("/homepage", req.url));
    }

    return middleware(req, next);
  };
}
