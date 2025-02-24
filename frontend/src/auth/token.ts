import { cookies } from "next/headers";
export default async function getToken() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("GYMAPP_TOKEN")?.value;
  return token;
}


