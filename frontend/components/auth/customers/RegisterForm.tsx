"use client";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { LuEyeClosed } from "react-icons/lu";


export default function RegisterForm (){
    const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConf, setShowPasswordConf] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordConfVisibility = () => {
    setShowPasswordConf(!showPasswordConf);
  };
  return (
    <>
      <form
        className="p-4 m-2 border border-gray-800 rounded-md min-w-80 shadow-lg"
        action=""
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
        {/*Campo de apellidos*/}
        <div className="mb-2 flex gap-2">
          <div>
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
          <div>
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
            maxLength={10}
            name="telefono"
            id="telefono"
            placeholder="Ingresa tu email"
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

        <div className="mb-2 flex gap-2">
          {/* Campo Fecha nacimiento */}
          <div>
            <label htmlFor="fecha_nacimiento" className="form-label">
              Fecha nacimiento
            </label>
            <input
              className="form-input"
              type="date"
              name="fecha_nacimiento"
              id="fecha_nacimiento"
            />
          </div>
          {/* Campo genero */}
          <div>
            <label htmlFor="genero" className="form-label">
              Genero
            </label>
            <select
              className="form-input"
              name="genero"
              id="genero"
              defaultValue={""}
            >
              <option value="" disabled>
                --Selecciona genero--
              </option>
              <option value="M">M</option>
              <option value="M">F</option>
            </select>
          </div>
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

        {/* Campo confirmar Contraseña */}
        {/* Campo Contraseña */}
        <div className="mb-2 relative">
          <label htmlFor="password_confirm" className="form-label">
            Confirmar contraseña
          </label>
          <input
            className="form-input pr-10" /* Padding para el ícono */
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
        <button type="submit" className="mt-2 w-full btn-global">
          Enviar
        </button>
      </form>
    </>
  );
}