"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Profile({ params }) {
  const [names, setNames] = useState("");
  const router = useRouter();
  function getParamsData() {
    const user = JSON.parse(localStorage.getItem("displayLogin"));
    setNames(user.nama);
  }
  useEffect(() => {
    getParamsData();
  }, []);
  return (
    <section className="w-full">
      <h1 className="text-3xl font-semibold judul-welcome max-sm:text-lg ">
        Welcome to your profile page
      </h1>
      <div className="flex width-auto justify-between items-center py-5 max-sm:text-lg">
        <p className="text-2xl text-semibold  max-sm:text-lg">
          Your Name: {names}
        </p>
        <button
          className="btn btn-info max-sm:btn-sm"
          onClick={() => router.push(`/homepage/${params.id}/upuser`)}
        >
          <p className="max-sm:text-xs">Update Account</p>
        </button>
      </div>
    </section>
  );
}
