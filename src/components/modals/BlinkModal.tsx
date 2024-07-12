import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LinkIcon from "@/icons/LinkIcon";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Blink } from "@/types/blink";
import useUserStore from "@/store/user";
import useBlink from "@/hooks/useBlink";
import { useWallet } from "@solana/wallet-adapter-react";
import { Input } from "../ui/input";
import { Transaction, Connection, VersionedTransaction } from '@solana/web3.js'
import { connection } from "@/utils/connection";
import { getRawTransaction } from "@/utils/rawTransaction";

export default function BlinkModal({
  blink,
  link,
  avatar,
  username,
}: {
  blink: Blink;
  link: string;
  avatar: string;
  username: string;
}) {
  const { fetchTransaction } = useBlink();
  const host = new URL(link).hostname;
  const { publicKey, sendTransaction } = useWallet()

  const handlePress = async (link: string) => {
    try {
      if (!publicKey) return;
      const result = await fetchTransaction(link, publicKey!.toBase58());
      let transaction = result.transaction;
      const tx = await getRawTransaction(transaction);
      const sign = await sendTransaction(tx as Transaction, connection);
      console.log(sign);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="container mx-auto flex items-center">
      <div className="h-2/3 flex items-stretch justify-around w-full">
        <img
          src={blink.icon}
          alt=""
          className="rounded-3xl w-1/3 object-cover"
        />
        <div className="w-1/3 flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={avatar} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="text-xl text-gray-500">{username}</p>
              </div>
              <div className="flex items-center gap-1">
                <LinkIcon width={16} height={16} color="#B5B5B5" />
                <p className="text-gray-500">{new URL(link).hostname}</p>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-2xl">{blink.title}</h3>
              <p className="mt-2">{blink.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-white text-black py-1 px-3">Nft</Badge>
              <Badge className="bg-white text-black py-1 px-3">Airdrop</Badge>
            </div>
          </div>
          {blink.links ? (
            blink.links.actions.map((action) =>
              action.parameters ? (
                action.parameters.map((parameter) => (
                  <Input key={parameter.name} name={parameter.name} />
                )
              )
              ) : (
                <Button
                  key={action.label}
                  onClick={async () => {
                    let actionUrl = action.href;
                    handlePress('https://' + host +  actionUrl);
                  }}
                >
                  {action.label}
                </Button>
              )
            )
          ) : (
            <Button
              onClick={async () => {
                handlePress(link);
              }}
            >
              {blink.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
