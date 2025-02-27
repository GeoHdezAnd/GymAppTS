import { getAttendances } from "@/actions/admin/dashboard/attendance/get-all-attendance";
import { formatDate } from "@/src/utils";
import { useEffect, useState } from "react";

// Define the interface for the attendance object
interface Cliente {
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  matricula: string;
  telefono: string;
  genero: string;
}

interface Attendance {
  id: number;
  fecha_asistencia: string;
  hora_entrada: string;
  hora_salida: string | null;
  cliente_id: number;
  cliente: Cliente;
}

export default function Attendances() {
  // Explicitly type the `attendances` state variable
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getAttendances();
        setAttendances(data);
        setLoading(true);
      } catch (error) {
        console.log(error);
        setAttendances([]);
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (!loading) return <p>Loading...</p>;

  return (
    <div className="py-4 ">
      <h3 className="font-bold text-2xl">Asistencias</h3>
      {/* TABLE */}
      <div className="shadow-md rounded-lg text-center w-full p-4 overflow-y-auto">
        <table className="w-full bg-white border-collapse">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold uppercase tracking-wider rounded-tl-lg">
                #
              </th>
              <th className="px-4 py-3 text-sm font-semibold uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-4 py-3 text-sm font-semibold uppercase tracking-wider">
                Matrícula
              </th>
              <th className="px-4 py-3 text-sm font-semibold uppercase tracking-wider">
                Fecha de Asistencia
              </th>
              <th className="px-4 py-3 text-sm font-semibold uppercase tracking-wider">
                Hora de Entrada
              </th>
              <th className="px-4 py-3 text-sm font-semibold uppercase tracking-wider">
                Hora de Salida
              </th>
              <th className="px-4 py-3 text-sm font-semibold uppercase tracking-wider">
                Teléfono
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {attendances.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-6 text-sm text-gray-500 text-center"
                >
                  No hay asistencias el día de hoy
                </td>
              </tr>
            ) : (
              attendances.map((attendance, index) => (
                <tr key={attendance.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {attendance.cliente.nombre}{" "}
                    {attendance.cliente.apellido_paterno}{" "}
                    {attendance.cliente.apellido_materno}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {attendance.cliente.matricula}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {formatDate(attendance.fecha_asistencia)}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {attendance.hora_entrada}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {attendance.hora_salida || "No registrada"}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {attendance.cliente.telefono}
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
