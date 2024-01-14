import { NextResponse } from "next/server";
import WithAuth from "./middlewares/withAuth";

export function middleware(request) {
  return NextResponse.next();
}
export default WithAuth(middleware, ["/homepage"]);
