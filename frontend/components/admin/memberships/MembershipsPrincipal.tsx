"use client";
import { useState } from "react";
import CreateMembershipModal from "./CreateMembershipModal";
import { MembershipsType, MembershipType } from "@/types";
import { formatCurrency } from "@/src/utils";
import MembershipMenu from "./MembeshipMenu";

type Props = {
  memberships: MembershipsType;
};

export default function CustomersPrincipal({ memberships }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="px-1 py-1">
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
      <div className="shadow-md rounded-lg text-center w-full">
        <table className="w-full bg-white border-collapse">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold uppercase tracking-wider rounded-tl-lg">
                #
              </th>

              <th className="px-4 py-3 text-sm font-semibold uppercase tracking-wider">
                Nombre
              </th>
              <th className="hidden md:table-cell px-4 py-3 text-sm font-semibold uppercase tracking-wider">
                Beneficios
              </th>
              <th className=" px-4 py-3 text-sm font-semibold uppercase tracking-wider">
                Duración días
              </th>
              <th className=" px-4 py-3 text-sm font-semibold uppercase tracking-wider">
                Precio
              </th>

              <th>{""}</th>
            </tr>
          </thead>
          <tbody className=" divide-gray-200">
            {memberships.length == 0 ? (
              <tr>
                <td
                  colSpan={5} // Update colSpan to 8 to account for the new column
                  className="px-4 py-6 text-sm text-gray-500 text-center"
                >
                  No hay nada que mostrar
                </td>
              </tr>
            ) : (
              memberships.map((membership: MembershipType, index: number) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-all duration-100"
                >
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {membership.nombre}
                  </td>
                  <td className="hidden md:table-cell px-4 py-3 text-sm text-gray-700">
                    <ul>
                      {membership.beneficios.map((beneficio, index) => (
                        <li key={index}>{beneficio}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {membership.duracion_dias}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {formatCurrency(membership.precio)}
                  </td>
                  <td className=" text-sm relative">
                    <div className="flex justify-center">
                      <MembershipMenu membershipID={membership.id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
            {/* Aquí irían los datos de los clientes */}

            {/* Más filas de clientes */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
