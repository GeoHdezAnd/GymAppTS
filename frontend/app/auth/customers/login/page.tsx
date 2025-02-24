import Link from "next/link";
import { Metadata } from "next";
import LoginForm from "@/components/auth/customers/LoginForm";

export const metadata: Metadata = {
  title: "USER - Iniciar sesión",
  description: "GymApp",
};
export default function LoginPage() {
  return (
    <>
      <div className="flex flex-col justify-center text-center my-4">
        <h1 className="font-bold text-3xl ">Login</h1>
        <p className="">
          Ingresa con tus credenciales y{" "}
          <span className="font-bold ">revisa el estado de tu membresia </span>
        </p>
      </div>

      <LoginForm />
      <nav className="grid justify-center text-center mt-5">
        <Link href="/auth/customers/register" className="text-gray-700">
          ¿No tienes cuenta?{" "}
          <span className="text-black font-semibold">Crear cuenta</span>
        </Link>
        <Link href="/auth/customers/forgot-password" className="text-gray-700">
          ¿Olvidaste contraseña?{" "}
          <span className="text-black font-semibold">Recuperar aquí</span>
        </Link>
      </nav>
    </>
  );
}
