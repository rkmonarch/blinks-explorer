"use client";

import React from "react";
import Navbar from "../Navbar";
import Filter from "../Filter";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <Filter />
      {children}
    </div>
  );
}
