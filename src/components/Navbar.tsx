"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import CreateBlinkModal from "./modals/CreateBlinkModal";
import useUserStore from "@/store/user";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileModal from "./modals/UserProfileModal";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const { connected, publicKey } = useWallet();
  const { avatar, setUsername, setAvatar, setFirstName, setLastName, setBio } =
    useUserStore();
  const [isOpen, setIsOpen] = useState(false);

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
    <nav className="flex items-center justify-between py-4">
      <Image src="/logo.svg" alt="Logo" width={128} height={42} />
      {connected && user ? (
        <div className="flex items-center gap-2">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger
              asChild
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <Button className="font-sf_pro_rounded font-medium px-5 py-2">
                Register Blink
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm rounded-lg">
              <CreateBlinkModal
                onClick={() => {
                  setIsOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
          <Dialog>
            {/* <DialogTrigger> */}
            {/* <Avatar className="w-9 h-9">
              <AvatarImage
                src={avatar ? avatar : "https://github.com/shadcn.png"}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar> */}
            {/* <DialogContent className="max-w-sm rounded-lg"> */}
            {/* <UserProfileModal /> */}
            {/* </DialogContent> */}
            {/* </DialogTrigger> */}
          </Dialog>
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
