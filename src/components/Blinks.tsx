"use client";

import useBlinks from "@/hooks/useBlinks";
import useBlinkStore from "@/store/blinks";
import LogoAnimation from "./Logo";
import BlinkCard from "./cards/BlinkCard";
import BlinksSkeleton from "./skeletons/BlinksSkeleton";
import useSearchStore from "@/store/search";

export default function Blinks() {
  const { storeBlinks } = useBlinkStore();
  const { filteredBlinks } = useSearchStore();
  const { isLoading, isError } = useBlinks();

  console.log(filteredBlinks);

  if (isError) return;

  if (isLoading) return <BlinksSkeleton />;

  if (filteredBlinks.length === 0 || !filteredBlinks) {
    return (
      <div className="h-[60vh] flex flex-col items-center gap-2 justify-center w-full border border-black border-opacity-[8%] rounded-xl">
        <LogoAnimation />
        <p className="text-gray-500 font-regular text-xl">
          Oops... blink again!
        </p>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {filteredBlinks.map((blink: Blink) =>
    blink.blink ? (
      <BlinkCard
        blink={blink}
        website={new URL(blink.blink).hostname}
        key={blink.blink}
      />
    ) : null
  )}
</section>

  
  );
}

export type Blinks = Blink[];

export interface Blink {
  id: string;
  blink: string;
  address: string;
  createdAt: string;
  User: User;
  Tags: Tag[];
}

export interface User {
  id: string;
  address: string;
  username: string;
  avatar: any;
  first_name: any;
  last_name: any;
  bio: any;
  created_at: string;
}

export interface Tag {
  id: string;
  tag: string;
  blink_id: string;
  createdAt: string;
}
