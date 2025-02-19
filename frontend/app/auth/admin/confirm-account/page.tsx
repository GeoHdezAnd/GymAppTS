import ConfirmAccountForm from "@/components/auth/admin/ConfirmAccountForm";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "GymApp - Confirm Account",
  description: "GymApp - Confirm Account",
};

export default function ConfirmAccountPage() {
  return (
    <>
      <div className="flex flex-col justify-center text-center my-4">
        <h1 className="font-bold text-3xl ">Confirma cuenta</h1>
        <p className="">
          Ingresa el token para{" "}
          <span className="font-bold ">activar cuenta</span>
        </p>
      </div>
      <ConfirmAccountForm />
    </>
  );
}
