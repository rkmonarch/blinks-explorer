import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useWallet } from "@solana/wallet-adapter-react";
import MultipleSelector, { Option } from "../ui/multiple-selector";
import useCreateBlinkStore from "@/store/create";
import Spinner from "../Spinner";

export default function CreateBlinkModal({ onClick }: { onClick: () => void }) {
  const { connected, publicKey } = useWallet();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { blinkLink, setBlinkLink, setSelectedTags, selectedTags } =
    useCreateBlinkStore();

  async function createBlink() {
    try {
      if (!connected) return;
      if (!blinkLink) return;
      setIsLoading(true);
      const response = await fetch("/api/create-blink", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: publicKey?.toBase58(),
          blink: blinkLink,
          tags: selectedTags.map((tag) => tag.value),
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setBlinkLink("");
      onClick();
    }
  }

  const Tags = [
    { label: "Nfts", value: "NFTs" },
    { label: "Defi", value: "DEFI" },
    { label: "Infrastructure", value: "INFRASTRUCTURE" },
    { label: "Swap", value: "SWAP" },
    { label: "Airdrop", value: "AIRDROP" },
    { label: "Social", value: "SOCIAL" },
    { label: "Staking", value: "STAKING" },
    { label: "Trading", value: "TRADING" },
    { label: "Games", value: "GAMES" },
    { label: "Voting", value: "VOTING" },
    { label: "Dao", value: "DAO" },
    { label: "Memes", value: "MEMES" },
  ];

  return (
    <section>
      <h4 className="font-semibold text-2xl text-center">Share your Blink</h4>
      <div className="flex flex-col gap-4 mt-6">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="link" className="text-sm font-medium mb-1">
            Blink URL
          </Label>
          <Input
            onChange={(e) => setBlinkLink(e.target.value)}
            id="link"
            placeholder="Enter Blink URL"
            className="bg-secondary border border-border rounded-xl"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="link" className="text-sm font-medium mb-1">
            Tags
          </Label>
          <MultipleSelector
            badgeClassName="bg-white text-black hover:bg-white"
            className="bg-secondary border border-border rounded-xl"
            defaultOptions={Tags}
            placeholder="Select suitable tags"
            emptyIndicator={
              <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                No more tags
              </p>
            }
            onChange={(options) => setSelectedTags(options)}
          />
        </div>
        <Button
          disabled={isLoading}
          onClick={(e) => {
            e.preventDefault();
            createBlink();
          }}
          className="w-full rounded-xl"
        >
          {isLoading ? <Spinner /> : "Share"}
        </Button>
      </div>
    </section>
  );
}
