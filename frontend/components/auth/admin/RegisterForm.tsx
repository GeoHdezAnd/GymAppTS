"use client";
import { register } from "@/actions/create-account-admin-action";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { LuEyeClosed } from "react-icons/lu";
import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConf, setShowPasswordConf] = useState(false);
  const [password, setPassword] = useState("");
  const [showStrength, setShowStrength] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    specialChar: false,
    uppercase: false,
    number: false,
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordConfVisibility = () => {
    setShowPasswordConf(!showPasswordConf);
  };

  const toggleShowStrength = () => {
    setShowStrength(!showStrength);
  };

  const validatePassword = (value: string) => {
    const strength = {
      length: value.length >= 8,
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      uppercase: /[A-Z]/.test(value),
      number: /\d/.test(value),
    };
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const isPasswordValid = Object.values(passwordStrength).every(Boolean);
  const validCount = Object.values(passwordStrength).filter(Boolean).length;

  return (
    <div className="flex justify-center items-center my-auto">
      <form
        className="p-4 m-2 border border-gray-800 rounded-md min-w-80 shadow-lg"
        action={register}
        noValidate
      >
        {/* Campo Nombre */}
        <div className="mb-2">
          <label htmlFor="nombre" className="form-label">
            Nombre(s)
          </label>
          <input
            className="form-input"
            type="text"
            name="nombre"
            id="nombre"
            placeholder="Ingresa tu nombre"
          />
        </div>

        {/* Campo de apellidos */}
        <div className="mb-2 flex gap-2">
          <div className="m-auto w-full">
            <label htmlFor="apellido_paterno" className="form-label">
              Apellido paterno
            </label>
            <input
              className="form-input"
              type="text"
              name="apellido_paterno"
              id="apellido_paterno"
              placeholder="Ingresa tu apellido paterno"
            />
          </div>
          <div className="m-auto w-full">
            <label htmlFor="apellido_materno" className="form-label">
              Apellido materno
            </label>
            <input
              className="form-input"
              type="text"
              name="apellido_materno"
              id="apellido_materno"
              placeholder="Ingresa tu apellido"
            />
          </div>
        </div>

        {/* Campo telefono */}
        <div className="mb-2">
          <label htmlFor="telefono" className="form-label">
            Telefono
          </label>
          <input
            className="form-input"
            type="tel"
            name="telefono"
            id="telefono"
            placeholder="Ingresa tu telefono"
          />
        </div>

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
            className="form-input pr-10"
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={handlePasswordChange}
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

        {/* Indicador de Fortaleza de la Contraseña */}
        <div className="mb-2">
          <div className="w-full h-2 bg-gray-300 rounded overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                validCount <= 1
                  ? "bg-red-500"
                  : validCount <= 3
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
              style={{ width: `${(validCount / 4) * 100}%` }} // Tamaño de la barra 25%, 50%, 75%, 100%
            ></div>
          </div>
          <div className="text-sm text-gray-600 mt-1 border-2 rounded-md px-2 ">
            <div className="flex justify-between items-center">
              <p
                className={`${
                  isPasswordValid ? "text-green-600" : "text-red-600"
                }`}
              >
                La contraseña debe tener:
              </p>
              <button
                className="p-1"
                type="button"
                onClick={toggleShowStrength}
              >
                {showStrength ? (
                  <BsChevronCompactUp className="font-bold text-lg" />
                ) : (
                  <BsChevronCompactDown className="font-bold text-lg" />
                )}
              </button>
            </div>
            {showStrength ? (
              <ul>
                <li
                  className={`${
                    passwordStrength.length ? "text-green-600" : "text-red-600"
                  }`}
                >
                  Al menos 8 caracteres
                </li>
                <li
                  className={`${
                    passwordStrength.specialChar
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  Un carácter especial
                </li>
                <li
                  className={`${
                    passwordStrength.uppercase
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  Una letra mayúscula
                </li>
                <li
                  className={`${
                    passwordStrength.number ? "text-green-600" : "text-red-600"
                  }`}
                >
                  Un número
                </li>
              </ul>
            ) : (
              ""
            )}
          </div>
        </div>

        {/* Campo Confirmar Contraseña */}
        <div className="mb-2 relative">
          <label htmlFor="password_confirm" className="form-label">
            Confirmar contraseña
          </label>
          <input
            className="form-input pr-10"
            type={showPasswordConf ? "text" : "password"}
            name="password_confirm"
            id="password_confirm"
            placeholder="Confirma tu contraseña"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 px-2 top-5 flex items-center justify-center focus:outline-none"
            onClick={togglePasswordConfVisibility}
          >
            {showPasswordConf ? (
              <FaEye className="w-5 h-5 text-gray-700 hover:text-gray-900 transition-colors" />
            ) : (
              <LuEyeClosed className="w-5 h-5 text-gray-700 hover:text-gray-900 transition-colors" />
            )}
          </button>
        </div>

        {/* Botón de Envío */}
        <button
          type="submit"
          className="mt-2 w-full btn-global"
          disabled={!isPasswordValid}
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
