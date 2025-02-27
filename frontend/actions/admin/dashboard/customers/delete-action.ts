"use server";
import getToken from "@/src/auth/token";

export async function deleteClientByID(clientID: number) {
  const token = await getToken();
  const url = `${process.env.API_URL}/client/${clientID}`;

  try {
    const req = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!req.ok) {
      const errorData = await req.json();
      throw new Error(errorData.error || "Error al eliminar cliente");
    }

    const json = await req.json();
    return { success: true, data: json };
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}
