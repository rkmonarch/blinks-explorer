"use client";

import useUserStore from "@/store/user";
import { useWallet } from "@solana/wallet-adapter-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ConnectButton from "./ConnectButton";
import LogoAnimation from "./Logo";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import useSearchStore from "@/store/search";
import useBlinkStore from "@/store/blinks";

export default function Navbar() {
  const { connected, publicKey } = useWallet();
  const { avatar, setUsername, setAvatar, setFirstName, setLastName, setBio } =
    useUserStore();
  const { setSearchText, setFilteredBlinks } = useSearchStore();
  const router = useRouter();
  const { storeBlinks } = useBlinkStore();

  const handleInputChange = (e: { target: { value: string } }) => {
    const searchTerm = e.target.value;
    setSearchText(searchTerm);
    if (!storeBlinks || storeBlinks.length === 0) return;

    const filteredItems = storeBlinks.filter((blink) =>
      blink.blink.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredBlinks(filteredItems);
  };

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
    const username = `${publicKey?.toBase58().slice(0, 4)}...${publicKey
      ?.toBase58()
      .slice(-4)}`;

    if (!user) {
      const createUser = await fetch("/api/create-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: publicKey,
          username: username,
          avatar: `https://source.boringavatars.com/beam/120/${publicKey?.toBase58()}`,
        }),
      });
      const user = await createUser.json();
      // mixpanel.track("register", {
      //   distinct_id: publicKey?.toBase58(),
      //   address: publicKey?.toBase58(),
      // });
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
    <nav className="flex w-full items-center justify-between px-4 md:px-6 py-[14px] border-b-[0.8px] border-black border-opacity-10">
      <Link href={"/"}>
        <LogoAnimation />
      </Link>
      <div className="hidden md:flex items-center bg-gray-100 py-2 px-4 w-full max-w-[32rem] space-x-3 rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-[18px] w-[18px] opacity-30"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.4"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          className="bg-gray-100 placeholder:text-md placeholder:font-light outline-none w-full"
          type="text"
          placeholder="Search Blinks..."
          onChange={handleInputChange}
        />
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant={"link"}
          onClick={() => {
            router.push("/share");
          }}
        >
          Submit Blink
        </Button>
        <ConnectButton />
      </div>
    </nav>
  );
}
