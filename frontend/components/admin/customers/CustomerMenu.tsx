import { Fragment, useState } from "react"; // Add useState
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Customer } from "@/src/schemas/customer";
import { toast } from "react-toastify"; // Add toast for notifications
import { deleteClientByID } from "@/actions/admin/dashboard/customers/delete-action";

interface Props {
  clientID: Customer["id"];
  handleUpdateOpen: (id: number) => void;
}

export default function CustomerMenu({ clientID, handleUpdateOpen }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este cliente?"
    );
    if (!confirmDelete) return;

    setIsDeleting(true); // Start loading
    try {
      const result = await deleteClientByID(clientID);

      if (result.success) {
        toast.success("Cliente eliminado correctamente");
      } else {
        toast.error(result.error || "Error al eliminar el cliente");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error al eliminar el cliente");
    } finally {
      setIsDeleting(false); // Stop loading
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton
          className="flex items-center justify-center p-2 text-gray-500 hover:text-gray-900 focus:outline-none"
          aria-label="Opciones"
          aria-haspopup="true"
        >
          <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true" />
        </MenuButton>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
          <div className="py-1">
            <MenuItem>
              <button
                type="button"
                className="block w-full px-4 py-2 text-left text-sm text-gray-500 hover:bg-gray-100"
                onClick={() => handleUpdateOpen(clientID)}
              >
                Editar cliente
              </button>
            </MenuItem>
            <MenuItem>
              <button
                type="button"
                className="block w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100"
                onClick={handleDelete} // Call handleDelete on click
                disabled={isDeleting} // Disable button while deleting
              >
                {isDeleting ? "Eliminando..." : "Eliminar cliente"}
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
