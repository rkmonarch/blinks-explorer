"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import FilterIcon from "@/icons/FilterIcon";
import { Tags } from "@/utils/constant";
import { useQuery } from "@tanstack/react-query";
import useBlinkStore from "@/store/blinks";

export default function Filter() {
  const [selectedTag, setSelectedTag] = useState<string>("");
  const { setStoreBlinks } = useBlinkStore();

  async function getBlinks() {
    const response = await fetch("/api/get-blinks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedTag ? { tags: [selectedTag] } : {}),
    });
    const blinks = await response.json();
    setStoreBlinks(blinks);
    return blinks;
  }

  const { data: blinks, refetch } = useQuery({
    queryKey: ["blinkURL", selectedTag],
    queryFn: getBlinks,
    enabled: !!selectedTag || selectedTag === "",
  });

  const toggleTag = (tag: string) => {
    setSelectedTag((prevTag) => (prevTag === tag ? "" : tag));
  };

  return (
    <section className="flex items-center gap-4">
      <Button className="flex items-center gap-2" variant={"secondary"}>
        <FilterIcon width={16} height={16} color="black" />
        Filters
      </Button>
      <div className="flex items-center gap-2 overflow-scroll no-scrollbar">
        <Button
          variant={"outline"}
          className={!selectedTag ? "bg-black text-white" : ""}
          onClick={() => setSelectedTag("")}
        >
          All
        </Button>
        {Tags.map((tag) => (
          <Button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={selectedTag === tag ? "bg-black text-white" : ""}
            variant={"outline"}
          >
            {tag}
          </Button>
        ))}
      </div>
    </section>
  );
}
