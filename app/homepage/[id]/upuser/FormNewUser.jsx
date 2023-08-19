"use client";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

export default function FormNewUser({ id }) {
  const [nama, setNama] = useState("");
  const [semester, setSemester] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const route = useRouter();
  function GetLocalData() {
    const user = JSON.parse(localStorage.getItem("user"));
    let filterUser = user.find((value) => value.id === id);
    setNama(filterUser.nama);
    setSemester(filterUser.semester);
    setPassword(filterUser.password);
    setRole(filterUser.role);
  }
  function handleNewSubmit(e) {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    let filterUser = user.find((value) => value.id === id);
    let IndexUser = user.indexOf(filterUser);
    filterUser.nama = nama;
    user[IndexUser].nama = nama;
    user[IndexUser].semester = semester;
    user[IndexUser].password = password;
    localStorage.setItem("displayLogin", JSON.stringify(filterUser));
    localStorage.setItem("user", JSON.stringify(user));
    route.push("/homepage");
    setNama("");
    setSemester("");
    setPassword("");
  }
  useEffect(() => {
    GetLocalData();
  }, []);
  return (
    <Fragment>
      <form onSubmit={handleNewSubmit}>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            New Name (Optional)
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="dev.."
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            New Semester (Optional)
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="your semester..."
            disabled={role === "admin" ? true : false}
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            New password (Optional)
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="****"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </Fragment>
  );
}
