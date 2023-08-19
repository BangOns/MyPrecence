"use client";

import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function TableAbsen() {
  const date = useSelector((state) => state.users.date);
  const [getRole, setGetRole] = useState("");
  const [getListUser, setGetListUser] = useState([]);
  function getDataLocal() {
    const { role } = JSON.parse(localStorage.getItem("displayLogin"));
    const list = JSON.parse(localStorage.getItem("user"));
    let FilterUser = list.filter((value) => {
      return value.role !== "admin";
    });
    setGetRole(role);
    setGetListUser(FilterUser);
  }
  function deleteUser(account) {
    const list = JSON.parse(localStorage.getItem("user"));
    let FilterUserDelete = list.filter((value) => {
      return value.id !== account.id;
    });
    localStorage.setItem("user", JSON.stringify(FilterUserDelete));
    window.location.reload();
  }
  useEffect(() => {
    getDataLocal();
  }, []);
  return (
    <Fragment>
      {getRole === "admin" ? (
        <section className="w-full">
          <div className="overflow-x-auto flex justify-center">
            <table className="table border-collapse max-sm:table-xs">
              {/* head */}
              <thead>
                <tr className="bg-info text-white rounded-md">
                  <th className="border border-slate-300 font-medium">No</th>
                  <th className="border border-slate-300 font-medium">Nama</th>
                  <th className="border border-slate-300 font-medium">
                    semester
                  </th>
                  <th className="border border-slate-300 font-medium">
                    Kehadiran
                  </th>
                  <th className="border border-slate-300 font-medium">
                    Action Account
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {getListUser?.map((user, index) => {
                  const DatePresent = date[new Date().getDay()];
                  return (
                    <tr key={user.id}>
                      <td className="border border-slate-300">{index}</td>
                      <td className="border border-slate-300">{user.nama}</td>
                      <td className="border border-slate-300">
                        {user.semester}
                      </td>
                      <td
                        className={
                          user.dates === DatePresent ? "bg-success" : "bg-error"
                        }
                      >
                        {user.dates
                          ? user.dates === DatePresent
                            ? "Hadir"
                            : "Belum Hadir"
                          : "Belum Hadir"}
                      </td>
                      <td>
                        <button
                          className="btn btn-error"
                          onClick={deleteUser.bind(this, user)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}
    </Fragment>
  );
}
