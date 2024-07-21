"use client";

import useBlinks from "@/hooks/useBlinks";
import { Tags } from "@/utils/constant";
import { Button } from "./ui/button";
import useBlinkStore from "@/store/blinks";
import useSearchStore from "@/store/search";

export default function Filter() {
  const { selectedTag, setSelectedTag } = useBlinks();
  const { setStoreBlinks, setPage } = useBlinkStore();
  const { setFilteredBlinks } = useSearchStore();

  return (
    <section className="flex items-center gap-4 px-4 md:px-6 py-[14px] pt-6">
      <div className="flex items-center gap-2 overflow-scroll no-scrollbar">
        <Button
          variant={"ghost"}
          className={`font-sf_pro_rounded px-4 py-[6px] font-medium ${
            !selectedTag ? "bg-gray-100 bg-opacity-85 text-black" : ""
          }`}
          onClick={() => {
            setSelectedTag("");
          }}
        >
          Trending
          <div className="ps-2 text-sm bg-gradient-to-r from-yellow-200 to-pink-400 inline-block text-transparent bg-clip-text">
            New
          </div>
        </Button>
        {Tags.map((tag) => (
          <Button
            key={tag}
            onClick={() => {
              setPage(1);
              setSelectedTag(tag);
              setFilteredBlinks([]);
              setStoreBlinks([]);
            }}
            className={`opacity-80 font-sf_pro_rounded px-4 py-[6px] font-medium ${
              selectedTag === tag ? "bg-gray-100 bg-opacity-85 text-black" : ""
            }`}
            variant={"ghost"}
          >
            {tag}
          </Button>
        ))}
      </div>
    </section>
  );
}
