import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function BlinksSkeleton() {
  return (
    <section className="containter mx-auto columns-3 w-full">
      <Skeleton className="w-full break-inside-avoid h-96 mb-4 rounded-xl" />
      <Skeleton className="w-full break-inside-avoid h-96 mb-4 rounded-xl" />
      <Skeleton className="w-full break-inside-avoid h-80 mb-4 rounded-xl" />
      <Skeleton className="w-full break-inside-avoid h-72 mb-4 rounded-xl" />
      <Skeleton className="w-full break-inside-avoid h-96 mb-4 rounded-xl" />
      <Skeleton className="w-full break-inside-avoid h-80 mb-4 rounded-xl" />
      <Skeleton className="w-full break-inside-avoid h-96 mb-4 rounded-xl" />
      <Skeleton className="w-full break-inside-avoid h-72 mb-4 rounded-xl" />
      <Skeleton className="w-full break-inside-avoid h-72 mb-4 rounded-xl" />
    </section>
  );
}
