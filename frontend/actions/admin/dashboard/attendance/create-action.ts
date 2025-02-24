"use server";

import getToken from "@/src/auth/token";
import { ErrorSchema, SuccessSchema } from "@/src/schemas";

export async function recordAttendance(matricula: string) {
  try {
    const token = await getToken();
    const url = `${process.env.API_URL}/attendance/`;
    const req = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ matricula }),
    });

    const json = await req.json();
    if (!req.ok) {
      const error = ErrorSchema.parse(json);
      return {
        errors: [error.error],
        success: false,
      };
    }
     const success = SuccessSchema.parse(json);
    
      return {
        errors: [],
        success,
      };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}
