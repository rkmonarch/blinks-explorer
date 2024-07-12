import React, { useState } from "react";
import { Button } from "./ui/button";
import Spinner from "./Spinner";
import { Blink } from "@/types/blink";
import useBlink from "@/hooks/useBlink";
import { useWallet } from "@solana/wallet-adapter-react";
import { getRawTransaction } from "@/utils/rawTransaction";
import { Transaction } from "@solana/web3.js";
import { connection } from "@/utils/connection";

export default function RenderSingleButton({
  blink,
  link,
}: {
  blink: Blink;
  link: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { fetchTransaction } = useBlink();
  const { publicKey, sendTransaction } = useWallet();

  const handlePress = async (link: string) => {
    try {
      setIsLoading(true);
      if (!publicKey) return;
      const result = await fetchTransaction(link, publicKey!.toBase58());
      let transaction = result.transaction;
      const tx = await getRawTransaction(transaction);
      const sign = await sendTransaction(tx as Transaction, connection);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      disabled={isLoading}
      onClick={async () => {
        handlePress(link);
      }}
      className="w-full"
    >
      {isLoading ? <Spinner /> : blink.label}
    </Button>
  );
}
