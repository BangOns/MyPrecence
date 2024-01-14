"use client";

import {
  DeleteUser,
  GetUserById,
  userList,
} from "@/redux/feature/getUserSlice";
import { useSession } from "next-auth/react";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showFormattedDate } from "../libs";
import { SlArrowDown } from "react-icons/sl";
import { FaRegTrashAlt } from "react-icons/fa";
import ColumnAbsenUser from "./ColumnAbsenUser";
export default function TableAbsenAdmin() {
  const { ListUserFullField, DeleteUserFullField, GetUserByIDSFullField } =
    useSelector((state) => state.users);
  const { data: session } = useSession();
  const [previews, setPreviews] = useState(true);
  const dispatch = useDispatch();
  let generateDate = showFormattedDate(new Date().toISOString());
  const FilteredAdmin =
    session?.user?.role === "admin" &&
    ListUserFullField[0]?.data.filter((value) => {
      return value.role !== "admin";
    });

  async function getPreviews(id) {
    setPreviews(!previews);

    dispatch(
      GetUserById({
        dataID: id,
        dataPrev: previews,
      })
    );
  }

  const filteredPreviewTable = (name) => {
    return GetUserByIDSFullField.length !== 0
      ? GetUserByIDSFullField.find((value) => {
          return value?.data?.name === name;
        })
      : null;
  };
  useEffect(() => {
    dispatch(userList());
    if (DeleteUserFullField.length !== 0) {
      alert(DeleteUserFullField[0].message);
      window.location.reload();
    }
  }, [DeleteUserFullField, GetUserByIDSFullField]);
  return (
    <Fragment>
      {session?.user?.role === "admin" && FilteredAdmin?.length !== 0 ? (
        <section className="w-full flex justify-center ">
          <div className="overflow-x-auto flex justify-center w-full lg:w-4/5">
            <table className="table border-collapse max-sm:table-xs ">
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
              <tbody className="z-10 ">
                {FilteredAdmin?.map((user, index) => {
                  const findingDate = user.precence?.some((value) => {
                    return value.date === generateDate;
                  });
                  return (
                    <Fragment key={user.id}>
                      <tr>
                        <td className="border border-slate-300">
                          {(index += 1)}
                        </td>
                        <td className="border border-slate-300">{user.name}</td>
                        <td className="border border-slate-300">
                          {user.semester}
                        </td>
                        <td className={findingDate ? "bg-success" : "bg-error"}>
                          {findingDate ? "Hadir" : "Belum Hadir"}
                        </td>
                        <td className="flex gap-5 justify-center max-[600px]:flex-col max-[600px]:items-center ">
                          <button
                            className="btn btn-error max-[500px]:btn-sm max-[500px]:text-[10px] max-[390px]:text-[8px]"
                            onClick={() => dispatch(DeleteUser(user.id))}
                          >
                            <FaRegTrashAlt /> Delete
                          </button>
                          <button
                            className="btn btn-info max-[500px]:btn-sm max-[500px]:text-[10px] max-[390px]:text-[8px]"
                            onClick={() => getPreviews(user.id)}
                          >
                            <SlArrowDown /> Preview
                          </button>
                        </td>
                      </tr>
                      {filteredPreviewTable(user.name) && (
                        <ColumnAbsenUser
                          datas={filteredPreviewTable(user.name)}
                          preview={true}
                        />
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <div className="w-full flex justify-center">
          <h1 className="font-bold text-2xl text-slate-500">Tidak ada data</h1>
        </div>
      )}
    </Fragment>
  );
}
