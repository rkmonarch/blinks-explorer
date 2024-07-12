"use client";

import useBlinks from "@/hooks/useBlinks";
import useBlinkStore from "@/store/blinks";
import BlinkCard from "./cards/BlinkCard";
import BlinksSkeleton from "./skeletons/BlinksSkeleton";

export default function Blinks() {
  const { storeBlinks } = useBlinkStore();
  const { isLoading, isError } = useBlinks();

  if (isError) return;

  if (isLoading) return <BlinksSkeleton />;

  if (storeBlinks.length === 0) {
    return (
      <div className="h-96 w-full flex items-center justify-center">
        <p className="text-gray-500 font-semibold text-sm">Blinks not found</p>
      </div>
    );
  }

  return (
    <section className="columns-3 mb-10">
      {storeBlinks.map((blink: Blink) => (
        <BlinkCard
          blink={blink.blink}
          website={new URL(blink.blink).hostname}
          username={blink.User.username}
          avatar={blink.User.avatar}
          key={blink.blink}
        />
      ))}
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
