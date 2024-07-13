"use client";

import useBlinks from "@/hooks/useBlinks";
import FilterIcon from "@/icons/FilterIcon";
import { Tags } from "@/utils/constant";
import { Button } from "./ui/button";

export default function Filter() {
  const { selectedTag, setSelectedTag } = useBlinks();

  return (
    <section className="flex items-center gap-4">
      {/* <Button className="flex items-center gap-2" variant={"secondary"}>
        <FilterIcon width={16} height={16} color="black" />
        Filters
      </Button> */}
      <div className="flex items-center gap-2 overflow-scroll no-scrollbar">
        <Button
          variant={"outline"}
          className={`font-sf_pro_rounded px-4 py-1 font-medium ${
            !selectedTag ? "bg-black text-white" : ""
          }`}
          onClick={() => setSelectedTag("")}
        >
          All
        </Button>
        {Tags.map((tag) => (
          <Button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`font-sf_pro_rounded px-4 py-1 font-medium ${
              selectedTag === tag ? "bg-black text-white" : ""
            }`}
            variant={"outline"}
          >
            {tag}
          </Button>
        ))}
      </div>
    </section>
  );
}
