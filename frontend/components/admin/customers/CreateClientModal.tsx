import { IoMdCloseCircle } from "react-icons/io";
import { useActionState, useEffect } from "react";
import createNewClient from "@/actions/admin/dashboard/customers/create-client";
import { toast } from "react-toastify";

type ModalTypes = {
  handleCloseModal: () => void;
};
export default function CreateClientModal({ handleCloseModal }: ModalTypes) {
  const [state, dispatch] = useActionState(createNewClient, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(error);
      });
    }
    if (state.success) {
      toast.success(state.success, {
        onClose: () => handleCloseModal(),
        onClick: () => handleCloseModal(),
      });
    }
  }, [state, handleCloseModal]);
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg overflow-y-auto">
        <div className="w-full flex justify-between items-center">
          <h3 className="text-lg font-semibold ">Nuevo Cliente</h3>
          {/* Aquí iría el formulario para agregar un nuevo cliente */}
          <button onClick={handleCloseModal} className="text-red-600 text-2xl">
            <IoMdCloseCircle />
          </button>
        </div>
        <div className="flex justify-center items-center my-auto overflow-y-auto-auto">
          <form
            className="p-4 m-2 border border-gray-800 rounded-md min-w-80 shadow-lg "
            action={dispatch}
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
                placeholder="Ingresa nombre"
              />
            </div>

            {/* Campo de apellidos */}
            <div className="mb-2 grid md:flex gap-2">
              <div className="m-auto w-full">
                <label htmlFor="apellido_paterno" className="form-label">
                  Apellido paterno
                </label>
                <input
                  className="form-input"
                  type="text"
                  name="apellido_paterno"
                  id="apellido_paterno"
                  placeholder="Ingresa apellido paterno"
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
                  placeholder="Ingresa apellido materno"
                />
              </div>
            </div>
            <div className="mb-2 grid md:flex w-full gap-2">
              {/* Campo Fecha nacimiento */}
              <div className="w-full">
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
              <div className="w-full">
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
                maxLength={10}
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

            {/* Botón de Envío */}
            <button
              type="submit"
              className={`mt-2 w-full btn-global "opacity-70 cursor-not-allowed" : ""
          }`}
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
