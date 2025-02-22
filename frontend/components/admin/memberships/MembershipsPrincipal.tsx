"use client";
import { useState } from "react";
import CreateMembershipModal from "./CreateMembershipModal";

export default function CustomersPrincipal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="px-3 py-1">
      <div className="flex justify-end mb-4">
        <button onClick={handleOpenModal} className="btn-global">
          Agregar membresia
        </button>
      </div>

      {/*MODAL*/}
      {/* Modal */}
      {isModalOpen && (
        <CreateMembershipModal handleCloseModal={handleCloseModal} />
      )}

      {/* Tabla de clientes */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Nombre</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Teléfono</th>
              <th className="px-4 py-2 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody className="">
            {/* Aquí irían los datos de los clientes */}
            <tr className="hover:bg-gray-100 transition-all duration-100 text-center">
              <td className="px-4 py-2 border-b">Juan Pérez</td>
              <td className="px-4 py-2 border-b">juan@example.com</td>
              <td className="px-4 py-2 border-b">123-456-7890</td>
              <td className="px-4 py-2 border-b flex gap-2 justify-center">
                <button className="text-blue-500 hover:text-blue-700 ">
                  Editar
                </button>
                <button className="text-red-500 hover:text-red-700 ml-2 ">
                  Eliminar
                </button>
              </td>
            </tr>
            {/* Más filas de clientes */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
