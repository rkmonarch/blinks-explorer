import useBlink from "@/hooks/useBlink";
import { Action } from "@/types/blink";
import { connection } from "@/utils/connection";
import { getRawTransaction } from "@/utils/rawTransaction";
import { useWallet } from "@jup-ag/wallet-adapter";
import { Transaction } from "@solana/web3.js";
import React, { useState } from "react";
import { Button } from "./ui/button";
import Spinner from "./Spinner";
import { toast } from "react-toastify";

export default function RenderMultipleButtons({
  action,
  link,
  count,
  index,
}: {
  action: Action;
  link: string;
  count: number;
  index: number;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { fetchTransaction } = useBlink();
  const { publicKey, sendTransaction } = useWallet();
  const host = new URL(link).hostname;

  const handlePress = async (link: string) => {
    try {
      setIsLoading(true);
      if (!publicKey) return;
      const result = await fetchTransaction(link, publicKey!.toBase58());
      let transaction = result.transaction;
      const tx = await getRawTransaction(transaction);
      const sign = await sendTransaction(tx as Transaction, connection);
      toast.success("Transaction successfull");
    } catch (e) {
      toast.error("Failed to submit transaction");
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonClass = () => {
    if (
      count === 1 ||
      (count % 3 !== 0 && index >= Math.floor(count / 3) * 3)
    ) {
      return "w-full";
    } else if (count % 3 === 0 && index >= Math.floor(count / 3) * 3) {
      return "w-1/3";
    } else {
      return "w-1/3";
    }
  };

  return (
    <Button
      disabled={isLoading}
      key={action.label}
      onClick={async () => {
        let actionUrl = action.href;
        handlePress("https://" + host + actionUrl);
      }}
      className={getButtonClass()}
    >
      {isLoading ? <Spinner /> : action.label}
    </Button>
  );
}
