"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useBlink from "@/hooks/useBlink";
import useBlinkStore from "@/store/blinks";
import { useQuery } from "@tanstack/react-query";
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
  const { data: blink } = useQuery({
    queryKey: ["blink", props.blink],
    queryFn: ({ queryKey }) => fetchBlink(queryKey[1]),
  });
  const route = useRouter();

  return (
    <div className="relative break-inside-avoid group mb-7 w-full">
      {/* <div className='absolute hidden group-hover:flex  items-end justify-between w-full p-3 transition-all'>
        <div className='bg-gray-400 bg-opacity-35 p-1 px-3 rounded-2xl'>
          <div className='text-xs bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text'>
            Verified
          </div>
        </div>
        <div>go</div>
      </div> */}

      <img
        onClick={() => {
          setCurrentBlink(blink!, props.blink, props.avatar, props.username);
          route.push("/blinkpage");
        }}
        src={blink?.icon}
        alt=""
        className="w-full bg-white rounded-lg cursor-pointer"
        style={{ width: "100%", height: "auto" }}
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
        <div className="cursor-pointer hover:text-blue-500 text-gray-400 flex items-center gap-1">
          <p className="text-xs font-normal font-inter">{props.website}</p>
          {/* <LinkIcon width={16} height={16} color='#B5B5B5' /> */}
        </div>
      </div>
    </div>
  );
}
