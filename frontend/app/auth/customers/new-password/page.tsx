import PasswordResetHandler from "@/components/auth/customers/PasswordResetHandler";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "USER - Nueva contraseña",
  description: "GymApp USER",
};

export default function NewPasswordPage() {
  return (
    <>
      <div className="flex flex-col justify-center text-center my-4">
        <h1 className="font-bold text-3xl ">Ingresa token</h1>
        <p className="">
          y despúes ingresa <span className="font-bold ">nueva contraseña</span>
        </p>
      </div>

     <PasswordResetHandler />
    </>
  );
}
