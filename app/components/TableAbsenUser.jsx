import { retrieveDataById } from "../libs/firebase/services";
import ColumnAbsenUser from "./ColumnAbsenUser";
import React from "react";

export default async function TableAbsenUser({ data }) {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full md:w-full lg:w-4/5 ">
        <section className="w-full">
          <div className="overflow-x-auto flex justify-center">
            <table className="table border-collapse max-sm:table-xs">
              <thead>
                <tr className="bg-info text-white rounded-md">
                  <th className="border border-slate-300 font-medium">No</th>

                  <th className="border border-slate-300 font-medium">
                    Waktu hadir
                  </th>
                </tr>
              </thead>
              <tbody>
                <ColumnAbsenUser datas={data} preview={false} />
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
