"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import CreateBlinkModal from "./modals/CreateBlinkModal";
import useUserStore from "@/store/user";

export default function Navbar() {
  const { connected, publicKey } = useWallet();
  const { avatar, setUsername, setAvatar, setFirstName, setLastName, setBio } =
    useUserStore();

  async function getOrCreateUser() {
    const getUser = await fetch(`/api/get-profile?address=${publicKey}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const user = await getUser.json();
    if (user) {
      setUsername(user.username);
      setAvatar(user.avatar);
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setBio(user.bio);
    }
    if (!user) {
      const createUser = await fetch("/api/create-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: publicKey,
          username: publicKey?.toBase58().trim().slice(0, 8),
        }),
      });
      const user = await createUser.json();
      setUsername(user.username);
      setAvatar(user.avatar);
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setBio(user.bio);
      return createUser.json();
    }
    return user;
  }

  const { data: user } = useQuery({
    queryKey: ["user", publicKey],
    queryFn: getOrCreateUser,
    enabled: connected,
  });

  return (
    <nav className="container mx-auto flex items-center justify-between py-4">
      <h1>Only Blink</h1>
      {connected && user ? (
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Create</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md rounded-lg">
              <CreateBlinkModal />
            </DialogContent>
          </Dialog>
          <Avatar className="w-9 h-9">
            <AvatarImage
              src={avatar ? avatar : "https://github.com/shadcn.png"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      ) : (
        <div>
          <WalletMultiButton
            style={{
              borderRadius: 100,
              fontWeight: 500,
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 12,
              paddingBottom: 12,
              backgroundColor: "#2558DC",
            }}
          />
        </div>
      )}
    </nav>
  );
}
