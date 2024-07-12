import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useWallet } from "@solana/wallet-adapter-react";

export default function CreateBlinkModal() {
  const { connected, publicKey } = useWallet();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [blink, setBlink] = React.useState<string>("");

  async function createBlink() {
    if (!connected) return;
    if (!blink) return;
    setIsLoading(true);
    try {
      const response = await fetch("/api/create-blink", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: publicKey?.toBase58(),
          blink: blink,
          tags: ["DEFI"],
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setBlink("");
    }
  }

  return (
    <section>
      <h4 className="font-semibold text-2xl text-center">Share your Blink</h4>
      <div className="flex flex-col gap-4 mt-6">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="link" className="text-sm font-medium mb-1">
            Blink URL
          </Label>
          <Input
            onChange={(e) => setBlink(e.target.value)}
            value={blink}
            id="link"
            placeholder="Enter Blink URL"
            className="bg-secondary border border-border rounded-xl"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="link" className="text-sm font-medium mb-1">
            Blink Link
          </Label>
          <Input
            id="link"
            placeholder="Enter Blink Link"
            className="bg-secondary border border-border rounded-xl"
          />
        </div>
        <Button
          onClick={(e) => {
            e.preventDefault();
            createBlink();
          }}
          className="w-full rounded-xl"
        >
          Share
        </Button>
      </div>
    </section>
  );
}
