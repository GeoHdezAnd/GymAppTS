import ForgotPasswordForm from "@/components/auth/admin/ForgotPasswordForm";
import Link from "next/link";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "GymApp - Olvide mi contraseña",
  description: "GymApp - Olvide mi contraseña",
};
export default function ForgotPasswordPage() {
  return (
    <>
      <div className="flex flex-col justify-center text-center my-4">
        <h1 className="font-bold text-3xl ">¿Olvidaste contraseña?</h1>
        <p className="">
          Ingresa tu correo para enviar instrucciones de{" "}
          <span className="font-bold ">como recuperar contraseña </span>
        </p>
      </div>
      <ForgotPasswordForm />
      <nav className="grid justify-center text-center mt-5">
        <Link href="/auth/admin/login" className="text-gray-700">
          ¿Quieres iniciar sesión?{" "}
          <span className="text-black font-semibold">Iniciar sesión</span>
        </Link>

        <Link href="/auth/admin/register" className="text-gray-700">
          ¿No tienes cuenta?{" "}
          <span className="text-black font-semibold">Crear cuenta</span>
        </Link>
      </nav>
    </>
  );
}
