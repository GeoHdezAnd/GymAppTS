"use client";

export default function ForgotPasswordForm() {
  return (
    <div className="flex justify-center items-center  ">
      <form
        className="p-4 m-2 border border-gray-800 rounded-md min-w-80 shadow-lg"
        action=""
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
