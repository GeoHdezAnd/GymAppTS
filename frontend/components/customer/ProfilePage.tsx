"use client";
import { RiQrCodeFill } from "react-icons/ri";
import { useUser } from "@/src/context/ClientContext";
import ProfilePhotoCustomer from "../ui/ProfilePhotoCustomer";
import { formatDate } from "@/src/utils";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function ProfilePage() {
  const [showQR, setShowQR] = useState(false);
  const user = useUser();

  const toggleShowQR = () => {
    setShowQR((prev) => !prev);
  };

  // Gym-related icon (example: a dumbbell icon)
  const gymIconURL = "/gym-dumbbell-svgrepo-com.svg";

  return (
    <div className="flex items-center justify-center">
      <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-4xl w-full mx-4 md:flex md:items-center md:space-x-10 transition-all hover:shadow-3xl">
        {/* Profile Image / QR Code */}
        <div className="w-40 h-40 md:w-56 md:h-56 m-auto  md:mx-0 mb-12 md:mb-0 flex items-center justify-center perspective">
          <div
            className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
              showQR ? "rotate-y-180" : ""
            }`}
          >
            {/* Front Side (Profile Image) */}
            <div className="absolute w-full h-full backface-hidden">
              <ProfilePhotoCustomer genero={user.genero} />
            </div>

            {/* Back Side (QR Code) */}
            <div className="absolute w-full h-full backface-hidden transform rotate-y-180">
              <div className="flex items-center justify-center bg-white p-3 rounded-lg">
                <QRCodeSVG
                  value={user.matricula} // QR code value
                  size={170} // Size of the QR code
                  level="H" // Error correction level
                  includeMargin={true} // Add margin around the QR code
                  imageSettings={{
                    src: gymIconURL, // Gym icon URL
                    height: 40, // Size of the icon
                    width: 40, // Size of the icon
                    excavate: true, // Cut out a space for the icon
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* User Details */}
        <div className="text-center md:text-left flex-1 my-2 md:my-0">
          <h1 className="text-4xl font-bold text-white mb-2">
            {user.nombre} {user.apellido_paterno} {user.apellido_materno}
          </h1>
          <p className="text-md text-gray-300 mb-6">{user.email}</p>

          {/* Additional Details */}
          <div className="space-y-3 mb-6">
            <p className="text-gray-300">
              <span className="font-semibold text-gray-400">Telefono:</span>{" "}
              {user.telefono}
            </p>

            <p className="text-gray-300">
              <span className="font-semibold text-gray-400">
                Fecha de nacimiento:
              </span>{" "}
              {formatDate(user.fecha_nacimiento)}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold text-gray-400">Matrícula:</span>{" "}
              {user.matricula}
            </p>
          </div>

          {/* Toggle QR Code Button */}
          <div className="flex justify-center md:justify-start">
            <button
              type="button"
              onClick={toggleShowQR}
              className="btn-global flex items-center space-x-2 font-semibold py-2 px-4 rounded-lg transition-all"
            >
              <span>{showQR ? "Ocultar QR" : "Crear QR"}</span>
              <RiQrCodeFill className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}