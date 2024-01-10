import ButtonInfo from "@/app/components/ButtonInfo";
import Nav from "@/app/components/Nav";
import React from "react";
import TableAbsen from "../components/TableAbsenAdmin";

export default function RootLayout({ children }) {
  return (
    <div className="relative">
      <Nav />
      <div className="py-8 px-8 ">{children}</div>
      <ButtonInfo />
    </div>
  );
}
