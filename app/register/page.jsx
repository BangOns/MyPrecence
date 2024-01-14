"use client";
import { CreateUser } from "@/redux/feature/getUserSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Register() {
  const userCreateCondition = useSelector((state) => state.users);
  const [nama, setNama] = useState("");
  const [semester, setSemester] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  async function handleFunctionSuccess(success) {
    if (!success.RegisterAccountPending) {
      if (
        success.RegisterAccountFullField.length !== 0 &&
        success.RegisterAccountFullField[0]?.status
      ) {
        alert(success.RegisterAccountFullField[0]?.message);
        router.push("/");
        setNama("");
        setPassword("");
      }

      setLoad(false);
    } else {
      setLoad(true);
    }
  }
  async function handleRegister(e) {
    e.preventDefault();
    const CreateUsers = {
      nama,
      semester,
      password,
      role: parseInt(semester) > 0 ? "user" : "admin",
    };
    dispatch(CreateUser(CreateUsers));
  }
  useEffect(() => {
    if (nama !== "" && password !== "") {
      handleFunctionSuccess(userCreateCondition);
    }
  }, [userCreateCondition, dispatch]);
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Your Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="semester"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Your Semester
              </label>
              <div className="mt-2">
                <input
                  id="semester"
                  name="semester"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Create Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button
                disabled={load ? true : false}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                disabled:cursor-not-allowed
                "
              >
                {load ? "Loading..." : "Register"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Are you member?{" "}
            <Link
              href="/"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
