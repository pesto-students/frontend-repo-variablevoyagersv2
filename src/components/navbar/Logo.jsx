import React from "react";
import logo from "/logo.png";

export default function Logo() {
  return (
    <>
      <img
      onClick={(e) => window.location = '/'}
        src={logo}
        className="hidden md:block cursor-pointer"
        height="100"
        width="100"
        alt="Logo"
      />
    </>
  );
}
