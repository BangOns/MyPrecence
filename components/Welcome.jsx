"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Welcome() {
  const username = useSelector((state) => state.users.userLogin);
  const [thisUser, setThisUser] = useState([]);
  function getDataLocal() {
    const UserName = JSON.parse(localStorage.getItem("displayLogin"));
    setThisUser(UserName);
  }
  useEffect(() => {
    getDataLocal();
  }, []);
  return (
    <section className="w-full">
      <h1 className="text-3xl font-semibold judul-welcome max-sm:text-lg">
        Welcome , <span>{username.nama ? username.nama : thisUser.nama}</span>
      </h1>
      <p className="py-3  text-xl max-sm:text-lg">
        {username.role === "admin" || thisUser.role === "admin"
          ? "Welcome, please see the table listed"
          : "you have been absent"}
      </p>
    </section>
  );
}
