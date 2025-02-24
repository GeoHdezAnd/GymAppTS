"use client";
import { confirmAccount } from "@/actions/admin/auth/confirm-account-action";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ConfirmAccountForm() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const confirmAccountWithToken = confirmAccount.bind(null, token); // Bind es para pasar valores adicionales a nuestro serverAction
  const [state, dispatch] = useActionState(confirmAccountWithToken, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (isComplete) {
      startTransition(() => {
        dispatch(); // Despacha la acción dentro de startTransition
      });
    }
  }, [isComplete]);

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(error);
      });
    }
    if (state.success) {
      toast.success(state.success, {
        onClose: () => {
          router.push("/auth/admin/login");
        },
      });
    }
  }, [state, router]);

  const toggleToken = (token: string) => {
    setIsComplete(false);
    setToken(token);
  };
  const handleComplete = () => {
    setIsComplete(true);
  };
  return (
    <>
      <div className="flex  justify-center items-center gap-5 my-8 ">
        <PinInput
          value={token}
          onChange={toggleToken}
          onComplete={handleComplete}
        >
          <PinInputField className="h-10 w-10 border border-gray-800 shadow-md rounded-lg text-center placeholder-white" />
          <PinInputField className="h-10 w-10 border border-gray-800 shadow-md rounded-lg text-center placeholder-white" />
          <PinInputField className="h-10 w-10 border border-gray-800 shadow-md rounded-lg text-center placeholder-white" />
          <PinInputField className="h-10 w-10 border border-gray-800 shadow-md rounded-lg text-center placeholder-white" />
          <PinInputField className="h-10 w-10 border border-gray-800 shadow-md rounded-lg text-center placeholder-white" />
          <PinInputField className="h-10 w-10 border border-gray-800 shadow-md rounded-lg text-center placeholder-white" />
        </PinInput>
      </div>
    </>
  );
}
