import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Navbar() {
  return (
    <nav className="container mx-auto flex items-center justify-between py-4">
      <h1>Only Blink</h1>
      <div className="flex items-center gap-2">
        <Button>Create</Button>
        <Avatar className="w-9 h-9">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}
