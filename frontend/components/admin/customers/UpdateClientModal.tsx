"use client";
import { IoMdCloseCircle } from "react-icons/io";
import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getClientById } from "@/actions/admin/dashboard/customers/get-client-by-id";
import { CustomerType } from "@/types";
import updateClient from "@/actions/admin/dashboard/customers/update-action";

interface Props {
  handleUpdateClose: () => void;
  clientID: number;
}

export default function UpdateClientModal({
  handleUpdateClose,
  clientID,
}: Props) {
  const [clientData, setClienteData] = useState<CustomerType | null>(null);
  const updateClientWithToken = updateClient.bind(null, clientID);
  const [state, dispatch] = useActionState(updateClientWithToken, {
    errors: [],
    success: "",
  });

  // Fetch client data
  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const data = await getClientById(clientID);
        setClienteData(data);
      } catch (error) {
        toast.error("Error al cargar los datos del cliente");
        console.error(error);
      }
    };
    fetchClientData();
  }, [clientID]);

  // Handle API response messages
  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(error);
      });
    }
    if (state.success) {
      toast.success(state.success, {
        onClose: () => handleUpdateClose(),
        onClick: () => handleUpdateClose(),
      });
    }
  }, [state, handleUpdateClose]);

  // Show loading state while fetching client data
  if (!clientData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg overflow-y-auto mx-3">
        <div className="w-full flex justify-between items-center">
          <h3 className="text-lg font-semibold">Actualizar datos de cliente</h3>
          <button onClick={handleUpdateClose} className="text-red-600 text-2xl">
            <IoMdCloseCircle />
          </button>
        </div>
        <div className="flex justify-center items-center my-auto overflow-y-auto-auto">
          <form
            className="p-4 m-2 border border-gray-800 rounded-md min-w-80 shadow-lg"
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
                defaultValue={clientData.nombre || ""}
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
                  defaultValue={clientData.apellido_paterno || ""}
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
                  defaultValue={clientData.apellido_materno || ""}
                />
              </div>
            </div>

            {/* Campo Fecha nacimiento */}
            <div className="mb-2">
              <label htmlFor="fecha_nacimiento" className="form-label">
                Fecha nacimiento
              </label>
              <input
                className="form-input"
                type="date"
                name="fecha_nacimiento"
                id="fecha_nacimiento"
                defaultValue={clientData.fecha_nacimiento || ""}
              />
            </div>

            {/* Campo genero */}
            <div className="mb-2">
              <label htmlFor="genero" className="form-label">
                Genero
              </label>
              <select
                className="form-input"
                name="genero"
                id="genero"
                defaultValue={clientData.genero || ""}
              >
                <option value="" disabled>
                  --Selecciona genero--
                </option>
                <option value="M">M</option>
                <option value="F">F</option>
              </select>
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
                defaultValue={clientData.telefono || ""}
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
                defaultValue={clientData.email || ""}
              />
            </div>

            {/* Botón de Envío */}
            <button type="submit" className="mt-2 w-full btn-global">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
