import React, { Fragment } from "react";
import { retrieveDataById } from "../libs/firebase/services";
import Link from "next/link";

export default async function WelcomeProfile({ params }) {
  const datas = await retrieveDataById("users", params.id);
  return (
    <Fragment>
      <h1 className="text-3xl font-semibold judul-welcome max-sm:text-lg ">
        Welcome to your profile page
      </h1>
      <div className="flex width-auto justify-between items-center py-5 max-sm:text-lg">
        <p className="text-2xl text-semibold  max-sm:text-lg">
          Your Name: {datas?.name ? datas?.name : "Loading..."}
        </p>
        <Link
          href={`/homepage/${params.id}/upuser`}
          className="btn btn-info max-sm:btn-sm"
        >
          <p className="max-sm:text-xs">Update Account</p>
        </Link>
      </div>
    </Fragment>
  );
}
