import Blinks from "@/components/Blinks";
import Filter from "@/components/Filter";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="flex flex-col gap-6">
      <Navbar />
      <Filter />
      <Blinks />
    </main>
  );
}
