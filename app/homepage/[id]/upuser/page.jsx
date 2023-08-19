import FormNewUser from "./FormNewUser";

export default function page({ params }) {
  return <FormNewUser id={params.id} />;
}
