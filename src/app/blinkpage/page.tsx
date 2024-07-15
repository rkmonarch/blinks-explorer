"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LinkIcon from "@/icons/LinkIcon";
import { ChangeEvent, useState } from "react";
import RenderInputs from "../../components/RenderInputs";
import RenderMultipleButtons from "../../components/RenderMultipleButtons";
import RenderSingleButton from "../../components/RenderSingleButton";
import useBlinkStore from "@/store/blinks";
import BlinkCard from "../../components/cards/BlinkCard";
import { useRouter } from "next/navigation";
import { Blink } from "@/components/Blinks";

export default function BlinkPage() {
  const { storeBlinks, currentBlink } = useBlinkStore();
  const route = useRouter();
  if (!currentBlink) {
    return route.push("/");
  }

  return (
    <section className="md:container mx-auto items-center overflow-auto py-4 px-2">
      <div className="flex flex-col md:flex-row items-stretch justify-around w-full gap-4">
        <img
          src={currentBlink?.blink.icon}
          alt=""
          className="rounded-3xl aspect-square w-full md:w-1/2 object-cover"
        />
        <div className="w-full md:w-1/2 md:px-16 flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6 md:w-10 md:h-10">
                  <AvatarImage
                    src={
                      currentBlink?.avatar === null
                        ? "https://github.com/shadcn.png"
                        : currentBlink?.avatar
                    }
                  />
                  <AvatarFallback>{currentBlink?.username}</AvatarFallback>
                </Avatar>
                <p className="md:text-lg font-inter text-gray-500">
                  {currentBlink?.username}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <LinkIcon width={16} height={16} color="#B5B5B5" />
                <p className="text-gray-500 font-inter">
                  {new URL(currentBlink!.website).hostname}
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-2xl font-sf_pro_rounded">
                {currentBlink?.blink.title}
              </h3>
              <p className="mt-2 font-sf_pro_rounded">
                {currentBlink?.blink.description}
              </p>
            </div>
            {/* <div className="flex items-center gap-2">
              <Badge className="bg-white text-black py-1 px-3">Nft</Badge>
              <Badge className="bg-white text-black py-1 px-3">Airdrop</Badge>
            </div> */}
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-3 mb-4 flex-wrap md:flex-nowrap">
              {currentBlink!.blink.links
                ? currentBlink!.blink.links.actions.map((action, index) => {
                    if (!action.parameters) {
                      return (
                        <RenderMultipleButtons
                          key={index}
                          action={action}
                          count={
                            currentBlink!.blink.links?.actions?.filter(
                              (action) => !action.parameters
                            ).length || 0
                          }
                          index={index}
                          link={currentBlink!.website}
                        />
                      );
                    }
                  })
                : null}
            </div>
            {currentBlink!.blink.links ? (
              <div className="flex flex-col gap-4 flex-wrap">
                {currentBlink!.blink.links.actions.map((action, index) =>
                  action.parameters ? (
                    <RenderInputs
                      key={index}
                      action={action}
                      link={currentBlink!.website}
                    />
                  ) : null
                )}
              </div>
            ) : (
              <RenderSingleButton
                blink={currentBlink!.blink}
                link={currentBlink!.website}
              />
            )}
          </div>
        </div>
      </div>
      <section className="columns-1 sm:columns-2 md:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 my-10 gap-6 px-4">
        {storeBlinks.map((blinkItem: Blink) =>
          currentBlink.website === blinkItem.blink ? null : (
            <BlinkCard
              blink={blinkItem.blink}
              website={new URL(blinkItem.blink).hostname}
              username={blinkItem.User.username}
              avatar={blinkItem.User.avatar}
              key={blinkItem.blink}
            />
          )
        )}
      </section>
    </section>
  );
}
