"use client";

import forgotPassword from "@/actions/customer/auth/forgot-password-account-action";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export default function ForgotPasswordForm() {
  const [state, dispatch] = useActionState(forgotPassword, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.errors && state.errors.length > 0) {
      state.errors.forEach((error) => {
        toast.error(error);
      });
    }
    if (state.success) {
      toast.success(state.success);
    }
  }, [state]);

  return (
    <div className="flex justify-center items-center  ">
      <form
        className="p-4 m-2 border border-gray-800 rounded-md min-w-80 shadow-lg"
        action={dispatch}
        noValidate
      >
        {/* Campo Email */}
        <div className="mb-2">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            className="form-input"
            type="email"
            name="email"
            id="email"
            placeholder="Ingresa tu email"
          />
        </div>
        {/* Botón de Envío */}
        <button type="submit" className="mt-2 w-full btn-global">
          Enviar
        </button>
      </form>
    </div>
  );
}
