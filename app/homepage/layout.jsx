import ButtonInfo from "@/components/ButtonInfo";
import Nav from "@/components/Nav";
import React from "react";

export default function RootLayout({ children }) {
  return (
    <div className="relative">
      <Nav />
      <div className="py-8 px-8 ">{children}</div>
      <ButtonInfo />
    </div>
  );
}
