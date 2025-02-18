import Link from "next/link";
import LoginForm from "@/components/auth/admin/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GymApp - Iniciar sesión",
  description: "GymApp - Iniciar sesión",
};
export default function LoginPage() {
  return (
    <>
      <div className="flex flex-col justify-center text-center my-4">
        <h1 className="font-bold text-3xl ">Login</h1>
        <p className="">
          Ingresa con tus credenciales y{" "}
          <span className="font-bold ">administra el gimnasio </span>
        </p>
      </div>

      <LoginForm />
      <nav className="grid justify-center text-center mt-5">
        <Link href="/auth/admin/register" className="text-gray-700">
          ¿No tienes cuenta?{" "}
          <span className="text-black font-semibold">Crear cuenta</span>
        </Link>
        <Link href="/auth/admin/forgot-password" className="text-gray-700">
          ¿Olvidaste contraseña?{" "}
          <span className="text-black font-semibold">Recuperar aquí</span>
        </Link>
      </nav>
    </>
  );
}
