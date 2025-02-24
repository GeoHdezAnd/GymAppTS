"use client";
import { recordAttendance } from "@/actions/admin/dashboard/attendance/create-action";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";

const QRScanner: React.FC = () => {
  const [reqMessage, setReqMessage] = useState<string | boolean>(false); // Store the API response message
  const [reqStateSuccess, setReqStateSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [matricula, setMatricula] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scannerKey, setScannerKey] = useState(0); // Unique key for the scanner container
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  // Regex to validate the matricula format (AAAA-1234)
  const validateMatricula = (matricula: string): boolean => {
    const regex = /^[A-Z]{4}-\d{4}$/;
    return regex.test(matricula);
  };

  const handleAttendance = async (matricula: string) => {
    if (matricula !== "") {
      // Validate the matricula format
      if (!validateMatricula(matricula)) {
        setReqMessage("Formato no valido");
        setReqStateSuccess(false);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setReqMessage(false); // Reset the message before making a new request
      try {
        const result = await recordAttendance(matricula);
        if (result.errors) {
          // Save the first error message in reqMessage
          setReqMessage(result.errors[0]);
          setReqStateSuccess(false);
        }
        if (result.success) {
          // Save the success message in reqMessage
          setReqMessage(result.success);
          setReqStateSuccess(true);
        }
      } catch (error) {
        setReqMessage(
          error instanceof Error ? error.message : "Error desconocido"
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const startScanner = () => {
    // Clear any existing scanner instance
    if (scannerRef.current) {
      scannerRef.current.clear();
      scannerRef.current = null;
    }

    // Initialize a new scanner
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        qrbox: { width: 200, height: 200 },
        fps: 10,
      },
      false
    );

    scanner.render(
      (data: string) => {
        setIsLoading(true);
        setError(null);
        setMatricula(data);
        handleAttendance(data);

        // Stop the scanner after a successful scan
        scanner.clear();
        scannerRef.current = null; // Reset the scanner ref
      },
      (error: string) => {
        setIsLoading(false);
        console.log(error);
        if (error.includes("NotFoundException")) {
          setError(
            "No se encuentra el código QR. Asegúrate de que el código esté centrado y bien iluminado."
          );
        } else if (error.includes("NotAllowedError")) {
          setError(
            "Permiso de cámara denegado. Por favor, permite el acceso a la cámara."
          );
        } else {
          setError("Error al escanear el código QR. Inténtalo de nuevo.");
        }
      }
    );

    // Store the scanner instance in the ref
    scannerRef.current = scanner;
  };

  useEffect(() => {
    startScanner();

    // Cleanup on unmount
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
        scannerRef.current = null;
      }
    };
  }, [scannerKey]); // Reinitialize the scanner when scannerKey changes

  const handleRestartScan = () => {
    setMatricula(null); // Reset the matricula state
    setError(null); // Reset any errors
    setReqMessage(false); // Reset the API response message
    setScannerKey((prevKey) => prevKey + 1); // Force re-render of the scanner container
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="p-5 rounded-lg shadow-lg w-full md:w-1/2 max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">
          Asistencias lector QR
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Centra tu QR en los contornos del scanner
        </p>

        {/* Scanner Container */}
        <div
          key={scannerKey} // Use a unique key to force re-render
          id="qr-reader"
          className="w-full md:w-4/5 aspect-square rounded-lg overflow-hidden relative m-auto"
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              <p className="ml-3">Escaneando...</p>
            </div>
          )}

          {/* Display API Response Message */}
          {reqMessage && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90">
              <div
                className={`p-4 rounded-lg text-center border grid ${
                  reqStateSuccess
                    ? "bg-green-100 border-green-400 text-green-700"
                    : "bg-red-100 border-red-400 text-red-700"
                } `}
              >
                {reqMessage}
                <button
                  onClick={handleRestartScan}
                  className="btn-global my-2 text-sm"
                >
                  Escanear otro código
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Result or Error Message */}
        {matricula ? (
          <div className="mt-4 p-2 bg-gray-800 text-white rounded-lg text-center">
            {`Matricula: ${matricula}`}
          </div>
        ) : (
          error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
              {error}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default QRScanner;
