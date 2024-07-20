import React, { useState } from "react";
import { Button } from "./ui/button";
import Spinner from "./Spinner";
import { Blink } from "@/types/blink";
import useBlink from "@/hooks/useBlink";
import { useWallet } from "@jup-ag/wallet-adapter";
import { getRawTransaction } from "@/utils/rawTransaction";
import { Transaction } from "@solana/web3.js";
import { connection } from "@/utils/connection";
import { toast } from "react-toastify";

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
      console.log(result);
      const tx = await getRawTransaction(transaction);
      const sign = await sendTransaction(tx as Transaction, connection);
      if (result?.message) {
        toast.success(result.message);
      } else {
        toast.success("Transaction successfull");
      }
    } catch (e) {
      toast.error("Failed to submit transaction");
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
      variant={"secondary"}
    >
      {isLoading ? <Spinner /> : blink.label}
    </Button>
  );
}
