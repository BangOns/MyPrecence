import FormNewUser from "./FormNewUser";

async function getUpdateUser(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/userId/${id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export default async function page({ params }) {
  const response = await getUpdateUser(params.id);
  return <FormNewUser users={response?.data} />;
}
