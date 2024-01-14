import { Fragment } from "react";

export default function ColumnAbsenUser({ datas, preview = false }) {
  const data = datas?.data;
  return (
    <Fragment>
      {data?.preview === true
        ? data?.precence?.map((user, index) => {
            return (
              <tr
                key={index}
                className={preview ? "animate-dropdown -z-10" : ""}
              >
                <td className="border border-slate-300">
                  {preview ? "-" : (index += 1)}
                </td>

                <td
                  className="bg-primary-content font-medium"
                  colSpan={preview ? "4" : "0"}
                >
                  {user.date}, {user.times}
                </td>
              </tr>
            );
          })
        : datas?.precence?.map((user, index) => {
            return (
              <tr
                key={index}
                className={preview ? "animate-dropdown -z-10" : ""}
              >
                <td className="border border-slate-300">
                  {preview ? "-" : (index += 1)}
                </td>

                <td
                  className="bg-primary-content font-medium"
                  colSpan={preview ? "4" : "0"}
                >
                  {user.date}, {user.times}
                </td>
              </tr>
            );
          })}
    </Fragment>
  );
}
