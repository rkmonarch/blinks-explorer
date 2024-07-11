"use client";

import Blinks from "@/components/Blinks";
import Filter from "@/components/Filter";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="container mx-auto flex flex-col gap-8">
      <Navbar />
      <Filter />
      <Blinks />
    </main>
  );
}
