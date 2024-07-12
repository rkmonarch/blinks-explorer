import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LinkIcon from "@/icons/LinkIcon";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function BlinkModal() {
  return (
    <section className="container mx-auto flex items-center">
      <div className="h-2/3 flex items-stretch justify-around w-full">
        <img
          src="https://s3-alpha-sig.figma.com/img/35be/6598/a096795824098e92b56ab04401477268?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hwxDrEbU25Z3mEx5RLbIoQ~TUbnVbuKhx2Rg13B7-NLzdoJvP8j7JgQatSa0tGVmiPsFpqMEUD-nbkGGPcW5yfYqfpI~xu-BC~o6reABmVq2MqN0-WgP4GJszw~E7B2kX8D3-un7Adk42y1yQs2cikN0q3Y5Lf3w6tZudHv8qvPGs3en~N4Kpva6gMpSwXIRlI3AKLtpSvCozdJCe~vazREJy4GnYsUsJdbN9Nco8Sz2XD6W43cSDU7XQlRqcmuGRRME3B8aOITE32NG0bwZl711o~1xqoH9WL49l47I~jrqqWPhkmxdQftmwV47PtW8nUEE-5wtCcbFo7OCljMFRQ__"
          alt=""
          className="rounded-3xl w-1/3 object-cover"
        />
        <div className="w-1/3 flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={"https://github.com/shadcn.png"} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="text-xl text-gray-500">Hedgehog</p>
              </div>
              <div className="flex items-center gap-1">
                <LinkIcon width={16} height={16} color="#B5B5B5" />
                <p className="text-gray-500">hedgehog.markets</p>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-2xl">
                Ladies of the Vale | Powered by Truffle
              </h3>
              <p className="mt-2">
                19 / 69 Minted - Limit: 6 - GRAFFITO's Genesis Collection on
                Truffle.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-white text-black py-1 px-3">Nft</Badge>
              <Badge className="bg-white text-black py-1 px-3">Airdrop</Badge>
            </div>
          </div>
          <Button>Mint for 0.1 SOL</Button>
        </div>
      </div>
    </section>
  );
}
