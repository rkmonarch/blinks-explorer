"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useBlink from "@/hooks/useBlink";
import useRegistry from "@/hooks/useRegistry";
import useBlinkStore from "@/store/blinks";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";

export type BlinkCardProps = {
  blink: string;
  username: string;
  avatar: string;
  website: string;
};

export default function BlinkCard(props: BlinkCardProps) {
  const { fetchBlink } = useBlink();
  const { setCurrentBlink } = useBlinkStore();
  const route = useRouter();
  const { verifyBlink } = useRegistry();
  const { data: blink } = useQuery({
    queryKey: ["blink", props.blink],
    queryFn: ({ queryKey }) => fetchBlink(queryKey[1]),
  });

  const { data: verified } = useQuery({
    queryKey: ["verified", props.blink],
    queryFn: ({ queryKey }) => verifyBlink(queryKey[1]),
  });


  return (
    <div className="relative  break-inside-avoid group mb-7 w-full">
      <img
        onClick={() => {
          setCurrentBlink(
            blink!,
            props.blink,
            props.avatar,
            props.username,
            verified || false
          );
          route.push("/blinkpage");
        }}
        src={blink?.icon}
        alt=""
        className="w-full border border-black border-opacity-10 bg-white rounded-xl cursor-pointer"
      />
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-2">
          <Avatar className="w-4 h-4 sm:w-6 sm:h-6">
            <AvatarImage
              src={
                props.avatar === null
                  ? "https://github.com/shadcn.png"
                  : props.avatar
              }
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-sm font-medium font-inter">{props.username}</p>
        </div>
        <Link
          className="cursor-pointer hover:text-blue-500 text-gray-400 flex items-center gap-1 text-xs font-normal font-inter"
          href={`https://${props.website}`}
          target="_blank"
        >
          {props.website}
        </Link>
      </div>
    </div>
  );
}
