import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function BlinksSkeleton({ length }: { length: number }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: length }).map((_, index) => (
        <div className="w-full" key={index}>
          <Skeleton className="w-full break-inside-avoid aspect-square mb-4 rounded-xl" />
          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2 w-full">
              <Skeleton className="w-4 h-4 sm:w-6 sm:h-6 rounded-full" />
              <Skeleton className="w-1/2 h-4" />
            </div>
            <Skeleton className="w-1/3 h-4" />
          </div>
        </div>
      ))}
    </section>
  );
}
