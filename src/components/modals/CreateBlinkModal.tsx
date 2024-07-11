import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export default function CreateBlinkModal() {
  return (
    <section>
      <h4 className="font-semibold text-2xl text-center">Share your Blink</h4>
      <div className="flex flex-col gap-4 mt-6">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="link" className="text-sm font-medium mb-1">
            Blink Link
          </Label>
          <Input
            id="link"
            placeholder="Enter Blink Link"
            className="bg-secondary border border-border rounded-xl"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="link" className="text-sm font-medium mb-1">
            Blink Link
          </Label>
          <Input
            id="link"
            placeholder="Enter Blink Link"
            className="bg-secondary border border-border rounded-xl"
          />
        </div>
        <Button className="w-full rounded-xl">Share</Button>
      </div>
    </section>
  );
}
