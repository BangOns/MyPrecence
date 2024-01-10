"use client";
import { LoginUser } from "@/redux/feature/getUserSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { signIn, signOut, useSession } from "next-auth/react";
export default function Login() {
  const userLoginCondition = useSelector((state) => state.users);
  const [nama, setNama] = useState("");
  const [password, setPassword] = useState("");
  const [activeAccount, setActiveAcccount] = useState(false);
  const [loadings, setLoadings] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  // async function handleFunctionSuccess(success) {
  //   if (!success.userLoginPending) {
  //     if (
  //       success.userLoginFullField.length !== 0 &&
  //       success.userLoginFullField[0]?.status
  //     ) {
  //       router.push("/homepage");
  //       setActiveAcccount(false);
  //     } else {
  //       setActiveAcccount(true);
  //     }
  //     setNama("");
  //     setPassword("");
  //     setLoadings(false);
  //   } else {
  //     setLoadings(true);
  //   }
  // }

  async function handleSubmit(e) {
    e.preventDefault();
    const user = {
      name: nama,
      password: password,
    };
    setLoadings(true);

    try {
      signIn("credentials", {
        redirect: false,
        ...user,
        callbackUrl: "/",
      }).then((value) => {
        if (!value.ok) {
          setActiveAcccount(true);
        } else {
          setActiveAcccount(false);
          router.push("/homepage");
        }
        setLoadings(false);
      });
    } catch (error) {
      console.log(error);
      setLoadings(false);
    }
    // dispatch(LoginUser(user));
  }
  // useEffect(() => {
  //   if (status === "authenticated") {
  //   }
  // }, [status]);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="w-full flex justify-center">
          <button
            className="btn btn-error hover:bg-orange-600"
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </button>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="nama"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Your Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="nama"
                  type="text"
                  value={nama}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setNama(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                {activeAccount ? (
                  <div className="text-sm">
                    <p className="font-semibold text-orange-600">
                      Your'e a not member
                    </p>
                  </div>
                ) : null}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loadings ? true : false}
                className={`flex w-full justify-center rounded-md  px-3 py-1.5 text-sm bg-indigo-600 font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-500`}
              >
                {loadings ? "Loading..." : "Sign in"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              href="/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

// async function handleSubmit(e) {
//   e.preventDefault();
//   let Users = await JSON.parse(localStorage.getItem("user"));
//   let FindUser = Users.find((value) => {
//     return value.nama === nama && value.password === password;
//   });
//   let findIndex = Users.indexOf(FindUser);
//   if (FindUser) {
//     FindUser.dates = date[new Date().getDay()];
//     Users[findIndex].dates = date[new Date().getDay()];
//     localStorage.setItem("displayLogin", JSON.stringify(FindUser));
//     localStorage.setItem("user", JSON.stringify(Users));
//     setActiveAcccount(false);
//     dispatch(GetUsers(FindUser));
//     router.push("/homepage");
//   } else {
//     setActiveAcccount(true);
//   }
//   setNama("");
//   setPassword("");
// }

// useEffect(() => {
// Swal.fire({
//   icon: "info",
//   title: "Information This Website",
//   html:
//     `<ol>` +
//     `<li>1. This website has 2 roles admin & user account</li>` +
//     "<li>2. If you want to be an admin, register an account, fill in the semester with zeros</li>" +
//     "<li>3. If you want to become a user, register an account, fill in the semester above zero</li>" +
//     "</ol>",
// });
// }, []);

// const res = await fetch(
//   `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/auth`,
//   {
//     method: "POST",
//     body: JSON.stringify(user),
//   }
// );
// const response = await res.json();
// console.log(response);
// if (response.status) {
//   router.push("/homepage");
//   setNama("");
//   setPassword("");
//   setActiveAcccount(false);
// } else {
//   setActiveAcccount(true);
// }
