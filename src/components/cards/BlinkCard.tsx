import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LinkIcon from "@/icons/LinkIcon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BlinkModal from "../modals/BlinkModal";

type BlinkCardProps = {
  image: string;
  //   avatar: string;
  //   username: string;
  //   website: string;
};

export default function BlinkCard(props: BlinkCardProps) {
  return (
    <Dialog>
      <DialogTrigger className="break-inside-avoid mb-4 w-full">
        <img src={props.image} alt="" className="rounded-xl w-full" />
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-sm">SEND</p>
          </div>
          <div className="flex items-center gap-1">
            <LinkIcon width={16} height={16} color="#B5B5B5" />
            <p className="text-xs text-gray-500">www.tensor.trade</p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="w-screen h-full backdrop-blur-2xl bg-white bg-opacity-40">
        <BlinkModal />
      </DialogContent>
    </Dialog>
  );
}
