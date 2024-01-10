import { login } from "@/app/libs/firebase/services";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ status: 200, message: "Welcome to hell" });
}
export async function POST(req) {
  const res = await req.json();

  const data = await login(res, (values) => {
    return values;
  });
  if (data.status) {
    return NextResponse.json({
      status: data.status,
      data: data.data.id,
      message: data.message,
    });
  } else {
    return NextResponse.json({
      status: data.status,
      message: data.message,
    });
  }
}
