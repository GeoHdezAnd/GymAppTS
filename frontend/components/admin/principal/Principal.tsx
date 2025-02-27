"use client";
import Attendances from "./Attendances";
import QRScanner from "./QRScanner";

export default function Principal() {
  return (
    <div className="mx-auto ">
      <QRScanner />
      <Attendances />
    </div>
  );
}
