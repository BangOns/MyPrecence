import Welcome from "@/app/components/WelcomeHomePage";
import React from "react";
import TableAbsenAdmin from "../components/TableAbsenAdmin";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function page() {
  const data = await getServerSession(authOptions);
  return (
    <section>
      <Welcome params={data} />
      <TableAbsenAdmin />
    </section>
  );
}
