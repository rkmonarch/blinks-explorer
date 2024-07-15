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
    console.log(count, count % 2 === 0);
    if (count % 2 === 0) {
      return "w-1/2";
    } else if (count % 3 === 0) {
      return "w-1/3";
    }
  };

  return (
    <div className={`${getButtonClass()} p-2`}>
      <Button
        disabled={isLoading}
        key={action.label}
        onClick={async () => {
          let actionUrl = action.href;
          handlePress("https://" + host + actionUrl);
        }}
        variant={"secondary"}
        className="w-full"
        size={"lg"}
      >
        {isLoading ? <Spinner /> : action.label}
      </Button>
    </div>
  );
}
