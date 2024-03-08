import React from "react";
import logo from "/Logo1.png";

export default function Logo() {
  return (
    <>
      <img
      onClick={(e) => window.location = '/'}
        src={logo}
        className="hidden md:block cursor-pointer"
        height="180"
        width="180"
        alt="Logo"
      />
    </>
  );
}
