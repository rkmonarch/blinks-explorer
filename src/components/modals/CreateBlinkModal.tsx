import useBlink from "@/hooks/useBlink";
import useBlinks from "@/hooks/useBlinks";
import useCreateBlinkStore from "@/store/create";
import { useWallet } from "@solana/wallet-adapter-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../Spinner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import MultipleSelector from "../ui/multiple-selector";

export default function CreateBlinkModal({ onClick }: { onClick: () => void }) {
  const { connected, publicKey } = useWallet();
  const [isValidURL, setIsValidURL] = useState(true);
  const [isNotExists, setIsNotExists] = useState(true);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { blinkLink, setBlinkLink, setSelectedTags, selectedTags } =
    useCreateBlinkStore();
  const { refetch } = useBlinks();
  const { fetchBlink } = useBlink();

  async function handleValidation() {
    try {
      const isValid = await fetchBlink(blinkLink);
      if (!isValid) {
        setIsValidURL(false);
        setIsLoading(false);
        return false;
      }
      return true;
    } catch (error) {
      setIsValidURL(false);
      console.log(error);
    }
  }

  async function alreadyExists() {
    try {
      const res = await fetch(`/api/already-exists?link=${blinkLink}`);
      const data = await res.json();
      if (data) {
        setIsNotExists(false);
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  }

  async function createBlink() {
    try {
      if (!connected) return;
      if (!blinkLink) return;
      setIsLoading(true);
      const isValid = await handleValidation();
      if (!isValid) {
        setIsLoading(false);
        return;
      }
      const isExits = await alreadyExists();
      if (isExits) {
        setIsLoading(false);
        return;
      }
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
      await refetch();
      onClick();
      return data;
    } catch (error) {
      toast.error("Failed to create blink");
    } finally {
      setIsLoading(false);
    }
  }

  // const Tags = [
  //   { label: "Nfts", value: "NFTs" },
  //   { label: "Defi", value: "DEFI" },
  //   { label: "Infrastructure", value: "INFRASTRUCTURE" },
  //   { label: "Swap", value: "SWAP" },
  //   { label: "Airdrop", value: "AIRDROP" },
  //   { label: "Social", value: "SOCIAL" },
  //   { label: "Staking", value: "STAKING" },
  //   { label: "Trading", value: "TRADING" },
  //   { label: "Games", value: "GAMES" },
  //   { label: "Voting", value: "VOTING" },
  //   { label: "Dao", value: "DAO" },
  //   { label: "Memes", value: "MEMES" },
  // ];
  const Tags = [
    { label: "DEXs", value: "DEXs" },
    { label: "Perps", value: "Perps" },
    { label: "Lending", value: "Lending" },
    { label: "Yield", value: "Yield" },
    { label: "Liquid Staking", value: "Liquid Staking" },
    { label: "Stables", value: "Stables" },
    { label: "RWAs", value: "RWAs" },
    { label: "DEX Aggs", value: "DEX Aggs" },
    { label: "CEXs", value: "CEXs" },
    { label: "Restaking", value: "Restaking" },
    { label: "Memecoins", value: "Memecoins" },
    { label: "NFTs", value: "NFTs" },
    { label: "Gaming", value: "Gaming" },
    { label: "Creator Platforms", value: "Creator Platforms" },
    { label: "Blinks", value: "Blinks" },
    { label: "DePIN", value: "DePIN" },
    { label: "Community", value: "Community" },
    { label: "Payments", value: "Payments" },
    { label: "Wallets", value: "Wallets" },
    { label: "InterOp", value: "InterOp" },
    { label: "Dev Tooling", value: "Dev Tooling" },
    { label: "Oracles", value: "Oracles" },
    { label: "Nodes", value: "Nodes" },
    { label: "Scaling", value: "Scaling" },
    { label: "Compute", value: "Compute" },
    { label: "Analytics", value: "Analytics" }
];


  return (
    <section>
      <h4 className="font-semibold text-2xl text-center font-sf_pro_rounded">
        Share your Blink
      </h4>
      <div className="flex flex-col gap-4 mt-6">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="link" className="text-sm font-medium mb-1">
            Blink URL
          </Label>
          <Input
            onChange={(e) => setBlinkLink(e.target.value)}
            id="link"
            placeholder="Enter Blink URL"
            className={`bg-secondary border border-border rounded-xl ${
              !isValidURL || !isNotExists
                ? "ring-2 ring-offset-2 ring-red-400"
                : ""
            }`}
            onFocus={() => {
              setIsValidURL(true);
              setIsNotExists(true);
            }}
          />
          {!isValidURL && (
            <p className="text-xs text-red-500">Please enter valid blink</p>
          )}
          {!isNotExists && (
            <p className="text-xs text-red-500">Blink already exists</p>
          )}
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
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
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
