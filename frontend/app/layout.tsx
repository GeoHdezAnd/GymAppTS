import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "GymApp",
  description: "Sistema gimnasio",
};
const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>{children}</body>
    </html>
  );
}
