"use client";
import useBlink from "@/hooks/useBlink";
import useBlinks from "@/hooks/useBlinks";
import useCreateBlinkStore from "@/store/create";
import { useWallet } from "@jup-ag/wallet-adapter";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import MultipleSelector from "../../components/ui/multiple-selector";

export default function BlinkPage() {
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
      return data;
    } catch (error) {
      toast.error("Failed to create blink");
    } finally {
      setIsLoading(false);
    }
  }

  const Tags = [
    { label: "NFTs", value: "nfts" },
    { label: "DEFI", value: "defi" },
    { label: "DAO", value: "dao" },
    { label: "Tokens", value: "tokens" },
    { label: "Social", value: "social" },
    { label: "Prediction Market", value: "prediction_market" },
    { label: "Swap", value: "swap" },
    { label: "Donations", value: "donations" },
    { label: "Trade", value: "trade" },
    { label: "Airdrop", value: "airdrop" },
    { label: "Votes", value: "votes" },
    { label: "Memes", value: "memes" },
    { label: "Staking", value: "staking" },
    { label: "Token gated", value: "token_gated" },
    { label: "Games", value: "games" },
  ];

  return (
    <section className="mx-auto items-center w-full">
      <div className="w-full flex flex-col max-w-xl mx-auto items-center justify-center py-20">
        <h4 className="font-semibold text-3xl text-center font-sf_pro_rounded">
          Share your Blink with everyone
        </h4>
        <div className="flex flex-col w-full gap-4 mt-12 px-12">
          <div className="flex flex-col space-y-1.5">
            <div className="flex flex-row items-center justify-between">
              <Label htmlFor="link" className="text-lg font-medium mb-1">
                Blink URL
              </Label>
              <p className="text-sm text-gray-500">Not Validated</p>
            </div>
            <Input
              onChange={(e) => setBlinkLink(e.target.value)}
              id="link"
              placeholder="Enter Blink URL"
              className={`bg-secondary h-12 border border-border rounded-xl ${
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
            <Label htmlFor="link" className="text-lg font-medium mb-1">
              Tags
            </Label>
            <MultipleSelector
              badgeClassName="bg-white text-black hover:bg-white"
              className="bg-secondary flex  justify-start items-center h-12 border border-border rounded-xl"
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
          <div className="pt-6 w-full">
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
        </div>
      </div>
    </section>
  );
}
