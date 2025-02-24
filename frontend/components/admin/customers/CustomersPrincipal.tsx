"use client";
import { useState } from "react";
import CreateClientModal from "./CreateClientModal";
import { CustomerType, CustomersType } from "@/types";
import ProfilePhotoCustomer from "@/components/ui/ProfilePhotoCustomer";
import { formatDate } from "@/src/utils";
import CustomerMenu from "./CustomerMenu";

type Props = {
  customers: CustomersType;
};

export default function CustomersPrincipal({ customers }: Props) {
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
          Agregar Cliente
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && <CreateClientModal handleCloseModal={handleCloseModal} />}

      {/*TABLE */}
      <div className="shadow-md rounded-lg text-center w-full">
        <table className="w-full bg-white border-collapse">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold uppercase tracking-wider rounded-tl-lg">
                #
              </th>
              <th className="px-4 py-3 text-sm font-semibold uppercase tracking-wider">
                Foto
              </th>
              <th className="px-4 py-3 text-sm font-semibold uppercase tracking-wider">
                Nombre
              </th>
              <th className="hidden md:table-cell px-4 py-3 text-sm font-semibold uppercase tracking-wider">
                Email
              </th>
              <th className="hidden md:table-cell px-4 py-3 text-sm font-semibold uppercase tracking-wider">
                Teléfono
              </th>
              <th className="hidden md:table-cell px-4 py-3 text-sm font-semibold uppercase tracking-wider">
                Matricula
              </th>
              <th className="hidden md:table-cell px-4 py-3 text-sm font-semibold uppercase tracking-wider">
                Fecha nacimiento
              </th>
              <th>{""}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customers.length == 0 ? (
              <tr>
                <td
                  colSpan={8} // Update colSpan to 8 to account for the new column
                  className="px-4 py-6 text-sm text-gray-500 text-center"
                >
                  No hay nada que mostrar
                </td>
              </tr>
            ) : (
              customers.map((customer: CustomerType, index: number) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-all duration-100"
                >
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3">
                    <div className="w-10 h-10 flex m-auto items-center justify-center">
                      <ProfilePhotoCustomer genero={customer.genero} />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{`${customer.nombre} ${customer.apellido_paterno} ${customer.apellido_materno}`}</td>
                  <td className="hidden md:table-cell px-4 py-3 text-sm text-gray-700">
                    {customer.email}
                  </td>
                  <td className="hidden md:table-cell px-4 py-3 text-sm text-gray-700">
                    {customer.telefono}
                  </td>
                  <td className="hidden md:table-cell px-4 py-3 text-sm text-gray-700">
                    {customer.matricula}
                  </td>
                  <td className="hidden md:table-cell px-4 py-3 text-sm text-gray-700">
                    {formatDate(customer.fecha_nacimiento)}
                  </td>
                  <td className="px-4 py-3 text-sm relative">
                    <div className="flex justify-center">
                      <CustomerMenu clientID={customer.id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
