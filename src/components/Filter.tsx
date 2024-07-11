import React from "react";
import { Button } from "./ui/button";
import FilterIcon from "@/icons/FilterIcon";

export default function Filter() {
  return (
    <section className="flex items-center gap-4">
      <Button className="flex items-center gap-2" variant={"secondary"}>
        <FilterIcon width={16} height={16} color="black" />
        Filters
      </Button>
      <div className="flex items-center gap-2 overflow-scroll no-scrollbar">
        <Button className="bg-black">All</Button>
        <Button variant={"outline"}>NFT</Button>
        <Button variant={"outline"}>Airdrop</Button>
        <Button variant={"outline"}>Solana</Button>
        <Button variant={"outline"}>NFT</Button>
        <Button variant={"outline"}>Airdrop</Button>
        <Button variant={"outline"}>Solana</Button>
        <Button variant={"outline"}>NFT</Button>
        <Button variant={"outline"}>Airdrop</Button>
        <Button variant={"outline"}>Solana</Button>
        <Button variant={"outline"}>NFT</Button>
        <Button variant={"outline"}>Airdrop</Button>
        <Button variant={"outline"}>Solana</Button>
        <Button variant={"outline"}>NFT</Button>
        <Button variant={"outline"}>Airdrop</Button>
        <Button variant={"outline"}>Solana</Button>
        <Button variant={"outline"}>NFT</Button>
        <Button variant={"outline"}>Airdrop</Button>
        <Button variant={"outline"}>Solana</Button>
        <Button variant={"outline"}>NFT</Button>
        <Button variant={"outline"}>Airdrop</Button>
        <Button variant={"outline"}>Solana</Button>
        <Button variant={"outline"}>NFT</Button>
        <Button variant={"outline"}>Airdrop</Button>
        <Button variant={"outline"}>Solana</Button>
      </div>
    </section>
  );
}
