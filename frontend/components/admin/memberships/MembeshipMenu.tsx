"use client";
import { Fragment } from "react";
import Link from "next/link";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Membership } from "@/src/schemas/membership";

export default function MembershipMenu({
  membershipID,
}: {
  membershipID: Membership["id"];
}) {
  console.log(membershipID);
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
              <Link
                href={``}
                className="block md:hidden px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Ver cliente
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                href={``}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Editar cliente
              </Link>
            </MenuItem>
            <MenuItem>
              <button
                type="button"
                className="block w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100"
                onClick={() => {}}
              >
                Eliminar cliente
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
