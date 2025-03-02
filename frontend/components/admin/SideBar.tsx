"use client";
import { MdSpaceDashboard } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import { BsFillPostcardFill } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../ui/Logo";
import AdminMenu from "./AdminMenu";
import { Admin } from "@/src/schemas/admin";
// import { useEffect } from "react";

export default function SideBar({
  content,
  admin,
}: Readonly<{
  content: React.ReactNode;
  admin: Admin;
}>) {
  const [sideBarActive, setSideBarActive] = useState(false);
  const pathname = usePathname();

  const toggleSideBarState = () => {
    setSideBarActive(!sideBarActive);
  };

  // // Stop the QR scanner when the sidebar is active on mobile
  // useEffect(() => {
  //   const qrScanner = document.getElementById("qr-reader");
  //   if (sideBarActive && qrScanner) {
  //     qrScanner.style.display = "none";
  //   } else if (qrScanner) {
  //     qrScanner.style.display = "block";
  //   }
  // }, [sideBarActive]);

  return (
    <>
      {/* Header */}
      <header className="bg-gray-900 shadow-md p-2 flex justify-between items-center fixed w-full z-50 text-white ">
        <div className="flex items-center px-2">
          <button
            type="button"
            onClick={toggleSideBarState}
            className="text-white px-2 hover:text-gray-300 focus:outline-none block md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>
        <div className="flex items-center gap-3">
          <p className="hidden md:block font-bold italic ">{`${admin.nombre} ${admin.apellido_paterno} ${admin.apellido_materno}`}</p>
          <AdminMenu admin={admin} />
        </div>
      </header>

      {/* Contenedor Principal */}
      <div className="flex flex-1 pt-[65px]">
        {/* Sidebar */}
        <aside
          className={`bg-gray-800 text-white p-4 fixed h-full w-48 transform transition-transform duration-500 ease-in-out z-40 ${
            sideBarActive
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="p-1 mx-auto text-center">
            <div className="w-28">
              <Logo />
              <h2 className="text-lg font-semibold mt-2">Gym App</h2>
            </div>

            {/* Menú del Sidebar */}
            <nav className="mt-6 ">
              <ul>
                <li className="mb-2">
                  <Link
                    href="/admin"
                    className={`flex items-center gap-2 p-2 text-gray-300 hover:bg-gray-700 rounded ${
                      pathname === "/admin" ? "bg-gray-700" : ""
                    }`}
                  >
                    <MdSpaceDashboard />
                    <span>Inicio</span>
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="/admin/customers"
                    className={`flex items-center gap-2 p-2 text-gray-300 hover:bg-gray-700 rounded ${
                      pathname === "/admin/customers" ? "bg-gray-700" : ""
                    }`}
                  >
                    <HiUserGroup />
                    <span>Clientes</span>
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="/admin/memberships"
                    className={`flex items-center gap-2 p-2 text-gray-300 hover:bg-gray-700 rounded ${
                      pathname === "/admin/memberships" ? "bg-gray-700" : ""
                    }`}
                  >
                    <BsFillPostcardFill />
                    <span>Membresias</span>
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="#"
                    className={`flex items-center gap-2 p-2 text-gray-300 hover:bg-gray-700 rounded ${
                      pathname === "#" ? "bg-gray-700" : ""
                    }`}
                  >
                    <AiFillSetting />
                    <span>Configuración</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </aside>

        {/* Contenido Principal */}
        <main
          className={`p-2 flex-1 bg-gray-100 overflow-auto pt-10 pl-2 md:pl-52 transition-all duration-300 `}
        >
          {content}
        </main>
      </div>
    </>
  );
}
