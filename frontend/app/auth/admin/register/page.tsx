import type { Metadata } from "next";
import Link from "next/link";
import RegisterForm from "@/components/auth/admin/RegisterForm";

export const metadata: Metadata = {
  title: "GymApp - Crear Cuenta",
  description: "GymApp - Crear Cuenta",
};

export default function RegisterPage() {
  return (
    <>
      <div className="flex flex-col justify-center text-center my-4">
        <h1 className="font-bold text-3xl">Registro</h1>
        <p className="">
          Ingresa tu información para{" "}
          <span className="font-bold">administrar el gym</span>
        </p>
      </div>

      <RegisterForm />
      <nav className="grid justify-center text-center my-5">
        <Link href="/auth/admin/login" className="text-gray-700">
          ¿Quieres iniciar sesión?{" "}
          <span className="text-black font-semibold">Iniciar sesión</span>
        </Link>

        <Link href="/auth/admin/forgot-password" className="text-gray-700">
          ¿Olvidaste contraseña?{" "}
          <span className="text-black font-semibold">Recupera aquí</span>
        </Link>
      </nav>
    </>
  );
}
