"use client";

import useBlinks from "@/hooks/useBlinks";
import useBlinkStore from "@/store/blinks";
import LogoAnimation from "./Logo";
import BlinkCard from "./cards/BlinkCard";
import BlinksSkeleton from "./skeletons/BlinksSkeleton";

export default function Blinks() {
  const { storeBlinks } = useBlinkStore();
  const { isLoading, isError } = useBlinks();

  if (isError) return;

  if (isLoading) return <BlinksSkeleton />;

  if (storeBlinks.length === 0 || !storeBlinks) {
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
    <section className="columns-1 sm:columns-2 md:columns-2 lg:columns-3 xl:columns-4 2xl:columns-4 3xl:columns-5 4xl:columns-7 gap-6">
      {storeBlinks.map((blink: Blink) =>
        blink.blink ? (
          <BlinkCard
            blink={blink.blink}
            website={new URL(blink.blink).hostname}
            username={blink.User.username}
            avatar={blink.User.avatar}
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
