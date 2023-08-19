"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Nav() {
  const router = useRouter();
  const [id, setId] = useState("");
  function getLocalData() {
    const { id } = JSON.parse(localStorage.getItem("displayLogin"));
    setId(id);
  }
  useEffect(() => {
    getLocalData();
  }, []);
  return (
    <section className="w-full h-auto px-8 py-8 flex justify-between">
      <h1
        className="font-sans text-2xl font-bold max-sm:text-lg flex items-center hover:cursor-pointer"
        onClick={() => router.push("/homepage")}
      >
        MyPresence
      </h1>
      {/* Desktop */}
      <div className=" w-auto justify-between gap-5 flex  max-sm:hidden">
        <button className="btn" onClick={() => router.push(`/homepage/${id}`)}>
          My Profile
        </button>
        <button
          className="btn btn-error hover:bg-orange-600"
          onClick={() => {
            localStorage.removeItem("displayLogin");
            router.push("/");
          }}
        >
          Sign Out
        </button>
      </div>
      {/* Mobile */}
      <div className="dropdown  dropdown-bottom dropdown-end sm:hidden">
        <label tabIndex={0} className="btn h-5">
          <div className="burgerButton">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <Link href={`/homepage/${123}`}>My Profile</Link>
          </li>
          <li>
            <Link href={"/"} className="hover:bg-orange-600 hover:text-white ">
              Sign Out
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
