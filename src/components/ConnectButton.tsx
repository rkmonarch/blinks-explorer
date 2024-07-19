import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useUserStore from "@/store/user";
import { UnifiedWalletButton, useWallet } from "@jup-ag/wallet-adapter";

export default function ConnectButton() {
  const { connected, disconnect } = useWallet();
  const { avatar, first_name } = useUserStore();

  if (connected) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="w-8 h-8">
            <AvatarImage src={avatar} alt={first_name} />
            <AvatarFallback>{first_name}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-4">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={disconnect}>
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <UnifiedWalletButton
      currentUserClassName="!focus:outline-none !hover:bg-blue-800 !focus:ring-4 !px-5 !py-3 !text-lg font-normal border border-black !border-opacity-[12%]  !h-10 !rounded-md"
      buttonClassName="!text-white !bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    />
  );
}
