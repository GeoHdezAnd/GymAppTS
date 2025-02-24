import { cookies } from "next/headers";

export default async function getTokenClient() {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("USERGYM_TOKEN")?.value;
    return token;
  }