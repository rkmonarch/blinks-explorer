import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LinkIcon from "@/icons/LinkIcon";
import BlinkModal from "../modals/BlinkModal";
import useBlink from "@/hooks/useBlink";
import { useQuery } from "@tanstack/react-query";

type BlinkCardProps = {
  blink: string;
  username: string;
  avatar: string;
  website: string;
};

export default function BlinkCard(props: BlinkCardProps) {
  const { fetchBlink } = useBlink();
  const { data: blink } = useQuery({
    queryKey: ["blink", props.blink],
    queryFn: ({ queryKey }) => fetchBlink(queryKey[1]),
  });

  return (
    <div className="break-inside-avoid">
      <Dialog>
        <DialogTrigger className="mb-4 w-full">
          <img
            src={blink?.icon}
            alt=""
            className="rounded-xl"
            style={{ width: "100%", height: "auto" }}
          />
        </DialogTrigger>
        <DialogContent className="w-screen h-full backdrop-blur-2xl bg-white bg-opacity-90">
          <BlinkModal />
        </DialogContent>
      </Dialog>
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2">
          <Avatar className="w-6 h-6">
            <AvatarImage
              src={
                props.avatar === null
                  ? "https://github.com/shadcn.png"
                  : props.avatar
              }
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-sm">{props.username}</p>
        </div>
        <div className="flex items-center gap-1">
          <LinkIcon width={16} height={16} color="#B5B5B5" />
          <p className="text-xs text-gray-500">{props.website}</p>
        </div>
      </div>
    </div>
  );
}
