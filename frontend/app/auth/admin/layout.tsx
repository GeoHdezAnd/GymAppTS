import Logo from "@/components/ui/Logo";
import { ToastContainer } from "react-toastify";

export default function AuthAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="lg:flex lg:min-h-screen">
      {/* Contenedor de la imagen de fondo (estático) */}
      <div className="relative bg-auth bg-cover bg-center lg:w-1/2 lg:h-screen lg:fixed">
        {/* Fondo semitransparente */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Contenido centrado (Logo) */}
        <div className="relative flex justify-center items-center h-full">
          <div className="w-44 lg:w-80 py-4 lg:py-20">
            <Logo />
          </div>
        </div>
      </div>

      {/* Contenedor del contenido dinámico (children) */}
      <div className="lg:w-1/2 lg:ml-auto  items-center justify-center mt-10 md:mt-auto my-auto bg-gray-50 lg:overflow-auto">
        {children}
      </div>
      <ToastContainer />
    </div>
  );
}
