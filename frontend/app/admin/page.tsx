import Principal from "@/components/admin/Principal";

export default async function AdminPage() {
  return (
    <div className=" ">
      <h2 className="font-bold text-2xl text-gray-800 ">
        ¡Bienvenido al panel de administración!
      </h2>
      <Principal />
    </div>
  );
}
