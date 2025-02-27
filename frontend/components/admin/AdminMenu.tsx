"use client";

import { Fragment } from "react";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import Logo from "../ui/Logo";
import { Admin } from "@/src/schemas/admin";
import logout from "@/actions/admin/auth/logout-action";

export default function AdminMenu({ admin }: { admin: Admin }) {
  return (
    <Popover className="relative px-5 space-x-2">
      <PopoverButton className="w-12 inline-flex items-center gap-x-1 text-sm font-semibold rounded-full ring-2 ring-red-800 ">
        <Logo />
      </PopoverButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel className="absolute left-1/2 z-10  flex w-screen lg:max-w-min -translate-x-1/2 lg:-translate-x-48">
          <div className="w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
            <p className={`block md:hidden`}>
              Hola:{" "}
              {`${admin.nombre} ${admin.apellido_paterno} ${admin.apellido_materno}`}
            </p>

            <button
              className="block p-2 hover:bg-gray-300 rounded-md w-full text-left  transition- duration-300"
              type="button"
              onClick={logout}
            >
              Cerrar Sesión
            </button>
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
}
