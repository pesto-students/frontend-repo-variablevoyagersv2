import React from "react";
import logo from "/Logo2.png";

export default function Logo() {
  return (
    <>
      <img
      onClick={(e) => window.location = '/'}
        src={logo}
        className="hidden sm:block cursor-pointer"
        height="180"
        width="180"
        alt="Logo"
      />
    </>
  );
}
