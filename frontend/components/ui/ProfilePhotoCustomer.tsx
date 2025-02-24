import Image from "next/image";

interface Props {
  genero: string;
}

export default function ProfilePhotoCustomer({ genero }: Props) {
  return (
    <Image
      src={genero == "M" ? "/profile-men.jpg" : "/profile-women.jpg"}
      alt="logo-admin"
      width={200}
      height={200}
      className={`w-full rounded-full ring-2 m-auto ${
        genero == "M" ? "ring-red-800" : "ring-violet-800"
      }`}
      priority
    />
  );
}
