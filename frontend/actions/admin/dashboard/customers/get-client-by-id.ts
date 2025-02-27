"use server";

import getToken from "@/src/auth/token";

export async function getClientById(clientID: number) {
  const token = await getToken();
  const url = `${process.env.API_URL}/client/${clientID}`;
  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await req.json();
  return json;
}
