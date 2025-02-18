import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/logo.png"
      alt="logo-admin"
      width={200}
      height={200}
      className="w-full"
      priority
    />
  );
}
