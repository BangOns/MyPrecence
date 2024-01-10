import {
  deleteUserById,
  retrieveDataById,
  updateUserPrecence,
} from "@/app/libs/firebase/services";
import { NextResponse } from "next/server";

export async function GET(params) {
  const ids = params.nextUrl.pathname.split("/")[3] || "";
  const response = await retrieveDataById("users", ids);

  return NextResponse.json({ status: 200, data: response });
}

export async function PATCH(req) {
  const respons = await req.json();

  const response = await updateUserPrecence("users", respons, (value) => {
    return value;
  });
  return NextResponse.json({
    status: response.status,
    data: response.data,
    message: response.message,
  });
}

export async function DELETE(params) {
  const ids = params.nextUrl.pathname.split("/")[3] || "";
  const response = await deleteUserById("users", ids);
  return NextResponse.json({ status: 200, message: response.message });
}
