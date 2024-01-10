import { retrieveDataById } from "../libs/firebase/services";

export default async function Welcome({ params }) {
  const datas = await retrieveDataById("users", params?.user?.id);
  return (
    <section className="w-full">
      <h1 className="text-3xl font-semibold judul-welcome max-sm:text-lg">
        Welcome , <span>{datas?.name ? datas?.name : "loading..."}</span>
      </h1>
      <p className="py-3  text-xl max-sm:text-lg">
        {datas?.role
          ? datas?.role === "admin"
            ? "Welcome, please see the table listed"
            : "you have been absent"
          : "loading..."}
      </p>
    </section>
  );
}
