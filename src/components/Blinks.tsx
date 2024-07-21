"use client";

import useBlinks from "@/hooks/useBlinks";
import LogoAnimation from "./Logo";
import BlinkCard from "./cards/BlinkCard";
import BlinksSkeleton from "./skeletons/BlinksSkeleton";
import useSearchStore from "@/store/search";
import useBlinkStore from "@/store/blinks";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";

export default function Blinks() {
  const { storeBlinks, setStoreBlinks, page, setPage, totalPage } =
    useBlinkStore();
  const { filteredBlinks, setFilteredBlinks } = useSearchStore();
  const { isLoading, isError, selectedTag, hasMore, setHasMore } = useBlinks();

  console.log(isLoading);

  useEffect(() => {
    if (totalPage === 1) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [totalPage]);

  if (isError) return;

  if (isLoading) return <BlinksSkeleton length={8} />;

  if (!filteredBlinks || filteredBlinks.length === 0) {
    return (
      <div className="h-[60vh] flex flex-col items-center gap-2 justify-center w-full border border-black border-opacity-[8%] rounded-xl">
        <LogoAnimation />
        {/* <p className="text-gray-500 font-regular text-xl">
          Oops... blink again!
        </p> */}
      </div>
    );
  }

  const fetchMoreData = async () => {
    const response = await fetch("/api/get-blinks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        selectedTag
          ? {
              tags: [selectedTag],
              page: page + 1,
              limit: 15,
            }
          : {
              tags: [],
              page: page + 1,
              limit: 15,
            }
      ),
    });
    const data = await response.json();
    if (data.data) {
      setStoreBlinks([...storeBlinks, ...data.data]);
      setFilteredBlinks([...storeBlinks, ...data.data]);
      setPage(page + 1);

      if (totalPage === page) {
        setHasMore(false);
      }
    }
  };

  return (
    <InfiniteScroll
      dataLength={filteredBlinks.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<BlinksSkeleton length={4} />}
    >
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
    </InfiniteScroll>
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
