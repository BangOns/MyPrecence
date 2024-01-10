import TableAbsenUser from "@/app/components/TableAbsenUser";
import WelcomeProfile from "@/app/components/WelcomeProfile";
import { retrieveDataById } from "@/app/libs/firebase/services";
import React from "react";

export default async function Profile({ params }) {
  const data = await retrieveDataById("users", params.id);
  return (
    <section className="w-full">
      <WelcomeProfile params={params} />
      {data?.role === "user" && <TableAbsenUser data={data} />}
    </section>
  );
}
