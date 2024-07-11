import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export default function Navbar() {
  const { connected } = useWallet();
  return (
    <nav className="container mx-auto flex items-center justify-between py-4">
      <h1>Only Blink</h1>
      {connected ? (
        <div className="flex items-center gap-2">
          <Button>Create</Button>
          <Avatar className="w-9 h-9">
            <AvatarImage src="https://github.com/shadcn.png" />
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
