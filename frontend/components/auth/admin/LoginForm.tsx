"use client";
import { loginAdmin } from "@/actions/admin/login-account-admin-action";
import { useActionState, useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { LuEyeClosed } from "react-icons/lu";
import { toast } from "react-toastify";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, dispatch] = useActionState(loginAdmin, {
    errors: [],
  });
  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(error);
      });
    }
  }, [state]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
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

        {/* Campo Contraseña */}
        <div className="mb-2 relative">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            className="form-input pr-10" /* Padding para el ícono */
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Ingresa tu contraseña"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 px-2 top-5 flex items-center justify-center focus:outline-none"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <FaEye className="w-5 h-5 text-gray-700 hover:text-gray-900 transition-colors" />
            ) : (
              <LuEyeClosed className="w-5 h-5 text-gray-700 hover:text-gray-900 transition-colors" />
            )}
          </button>
        </div>

        {/* Botón de Envío */}
        <button type="submit" className="mt-2 w-full btn-global">
          Enviar
        </button>
      </form>
    </div>
  );
}
