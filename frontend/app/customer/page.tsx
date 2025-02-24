import ProfilePage from "@/components/customer/ProfilePage";

export default async function AdminPage() {
  return (
    <div className="m-auto">
      <h2 className="font-bold text-xl">¡Bienvenido a tu perfil!</h2>
      <ProfilePage />
    </div>
  );
}
