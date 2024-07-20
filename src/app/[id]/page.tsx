"use client";

import { Blink } from "@/components/Blinks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useBlinkStore from "@/store/blinks";
import Link from "next/link";
import { toast } from "react-toastify";
import RenderInputs from "../../components/RenderInputs";
import RenderMultipleButtons from "../../components/RenderMultipleButtons";
import RenderSingleButton from "../../components/RenderSingleButton";
import BlinkCard from "../../components/cards/BlinkCard";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import useBlinks from "@/hooks/useBlinks";
import useBlink from "@/hooks/useBlink";
import { useState } from "react";
import LogoAnimation from "@/components/Logo";

export default function BlinkPage() {
  const { storeBlinks, currentBlink, setCurrentBlink } = useBlinkStore();
  const route = usePathname();
  const { fetchBlink } = useBlink();
  const [error, setError] = useState(false);
  const id = route.replace("/", "");
  async function getCurrentBlink() {
    try {
      const currentBlink = await fetch(
        `/api/get-blink/?id=${id}`
      );
      const data = await currentBlink.json();
      const blink = await fetchBlink(data.data.blink);

      setCurrentBlink(
        blink,
        data.data.blink,
        data.data.User.avatar,
        data.data.User.username,
        data.data.verified
      );
      return currentBlink.json();
    } catch (error) {
      setError(true);
      console.error(error);
    }
  }

  const { data: blink, isLoading } = useQuery({
    queryKey: ["blink", id],
    queryFn: getCurrentBlink,
    enabled: !currentBlink,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <div className="h-[60vh] flex flex-col items-center gap-2 justify-center w-full border border-black border-opacity-[8%] rounded-xl">
        <LogoAnimation />
        <p className="text-gray-500 font-regular text-xl">
          Oops... blink again!
        </p>
      </div>
    );
  }

  return (
    <section className="mx-auto items-center w-full overflow-auto">
      <div className=" md:bg-black md:bg-opacity-[3%] rounded-2xl w-full flex items-center justify-center py-8 md:py-20 md:px-2">
        <div className="w-full flex flex-col max-w-5xl md:flex-row items-stretch justify-around gap-10">
          <div className="w-full md:w-1/2 relative border border-gray-300 rounded-xl">
            <img
              className="absolute inset-0 object-cover w-full aspect-square blur-sm rounded-xl"
              src={currentBlink?.blink.icon}
              style={{
                clipPath: "stroke-box",
              }}
            />
            <img
              src={currentBlink?.blink.icon}
              alt=""
              className="relative rounded-xl aspect-square object-contain w-full"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-between p-2">
            <div className="flex flex-col gap-4">
              <div className=" flex flex-col gap-4">
                <div className="flex flex-row items-center justify-between w-full">
                  <div className="flex flex-row justify-start items-center gap-2">
                    <p className="font-inter text-[16px] font-semibold text-black">
                      {currentBlink?.verified ? "Verified" : "Not Verified"}
                    </p>
                    <div>
                      {currentBlink?.verified ? (
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.52226 3.58715C9.32033 2.49138 10.5575 1.75 12 1.75C13.4403 1.75 14.6845 2.48956 15.4858 3.5867C16.8268 3.37709 18.2319 3.73232 19.2498 4.75021C20.2684 5.76882 20.6234 7.17516 20.4129 8.51702C21.507 9.31924 22.25 10.5556 22.25 12C22.25 13.4444 21.507 14.6808 20.4129 15.483C20.6234 16.8248 20.2684 18.2312 19.2498 19.2498C18.229 20.2706 16.8235 20.6154 15.4879 20.4105C14.6867 21.5092 13.4415 22.25 12 22.25C10.5544 22.25 9.31711 21.5058 8.51495 20.41C7.1785 20.6159 5.77173 20.2713 4.75021 19.2498C3.72908 18.2287 3.38355 16.8214 3.59556 15.483C2.50171 14.6824 1.75 13.4474 1.75 12C1.75 10.5526 2.50171 9.31757 3.59556 8.51703C3.38355 7.17856 3.72908 5.77134 4.75021 4.75021C5.76978 3.73064 7.17649 3.37685 8.52226 3.58715ZM15.5639 10.6808C16.02 10.3694 16.1373 9.74715 15.8258 9.29106C15.5144 8.83497 14.8922 8.71771 14.4361 9.02915L14.3493 9.08844C12.9756 10.0265 11.7852 11.2023 10.8323 12.5572L9.70673 11.4328C9.316 11.0425 8.68283 11.0428 8.29252 11.4335C7.9022 11.8243 7.90254 12.4574 8.29327 12.8477L10.3 14.8523C10.5204 15.0725 10.8308 15.1774 11.1396 15.136C11.4483 15.0946 11.7202 14.9117 11.8748 14.6413C12.7648 13.085 13.9965 11.7511 15.4771 10.7401L15.5639 10.6808Z"
                            fill="#EAC800"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          fill="none"
                          stroke="#D8000C"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        >
                          <path d="M12 13V8m0 8.375v.001M3 12a9 9 0 1 1 18 0 9 9 0 0 1-18 0Z" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 6C11.4477 6 11 5.55228 11 5C11 4.44772 11.4477 4 12 4C12.5523 4 13 4.44772 13 5C13 5.55228 12.5523 6 12 6Z"
                            stroke="black"
                            stroke-opacity="0.5"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12C13 12.5523 12.5523 13 12 13Z"
                            stroke="black"
                            stroke-opacity="0.5"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M12 20C11.4477 20 11 19.5523 11 19C11 18.4477 11.4477 18 12 18C12.5523 18 13 18.4477 13 19C13 19.5523 12.5523 20 12 20Z"
                            stroke="black"
                            stroke-opacity="0.5"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="max-w-[200px]">
                        <DropdownMenuLabel
                          className="cursor-pointer"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              currentBlink?.website!
                            );
                            toast.success("Copied successfully");
                          }}
                        >
                          <div className="flex items-center gap-2 bg-gray-100 rounded-md px-3 py-1">
                            <p className="text-xs font-semibold truncate text-gray-500">
                              {currentBlink?.website}
                            </p>
                            <div className="text-gray-500">
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z"
                                  fill="currentColor"
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                            </div>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                          <div>
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M7.23336 4.69629C7.23336 2.96884 8.63335 1.56857 10.36 1.56857C11.3736 1.56857 12.183 2.04804 12.7254 2.74385C13.3079 2.62467 13.8557 2.40913 14.3513 2.11508C14.1559 2.72598 13.7424 3.2396 13.2033 3.56463C13.2038 3.56568 13.2042 3.56674 13.2047 3.56779C13.7334 3.50361 14.2364 3.36302 14.7048 3.15546L14.7037 3.15715C14.3667 3.66183 13.9431 4.10736 13.4561 4.47034C13.4823 4.64672 13.4956 4.82427 13.4956 5.00079C13.4956 8.6871 10.6873 12.9746 5.52122 12.9746C3.93906 12.9746 2.46544 12.511 1.22505 11.7152C0.992632 11.5661 0.925108 11.2568 1.07423 11.0244C1.0874 11.0038 1.10183 10.9846 1.11734 10.9666C1.20582 10.8202 1.37438 10.7309 1.5554 10.7522C2.47066 10.8601 3.38568 10.7485 4.19219 10.3962C3.39226 10.0434 2.77129 9.35975 2.50204 8.51974C2.45359 8.3686 2.48835 8.20311 2.59351 8.08422C2.59716 8.0801 2.60087 8.07606 2.60464 8.0721C1.96391 7.50819 1.55973 6.68208 1.55973 5.76143V5.72759C1.55973 5.56814 1.64411 5.42059 1.78155 5.33974C1.82671 5.31317 1.87537 5.29511 1.92532 5.28558C1.70549 4.86154 1.58116 4.37984 1.58116 3.86958C1.58116 3.40165 1.58384 2.81192 1.91332 2.28081C1.98718 2.16175 2.10758 2.08915 2.2364 2.07195C2.42588 2.01237 2.64087 2.06969 2.77406 2.23302C3.86536 3.57126 5.44066 4.49583 7.23366 4.73961L7.23336 4.69629ZM5.52122 11.9746C4.73387 11.9746 3.97781 11.8435 3.27248 11.6023C4.13012 11.4538 4.95307 11.1159 5.66218 10.5602C5.81211 10.4427 5.87182 10.2435 5.81126 10.0629C5.7507 9.88234 5.583 9.75943 5.39255 9.75607C4.68968 9.74366 4.06712 9.39716 3.67793 8.86845C3.86828 8.85306 4.05428 8.82039 4.23445 8.77167C4.43603 8.71716 4.57363 8.53114 4.56674 8.32243C4.55985 8.11372 4.41029 7.93718 4.20555 7.89607C3.42694 7.73977 2.79883 7.16764 2.56169 6.42174C2.76255 6.47025 2.97102 6.4991 3.18482 6.5061C3.38563 6.51267 3.56646 6.38533 3.62795 6.19405C3.68943 6.00277 3.61666 5.79391 3.44963 5.68224C2.86523 5.29155 2.48116 4.62464 2.48116 3.86958C2.48116 3.70213 2.48352 3.55268 2.49355 3.41719C3.85115 4.79913 5.70873 5.68931 7.77588 5.79338C7.93225 5.80126 8.08328 5.73543 8.18395 5.61553C8.28463 5.49562 8.32332 5.33548 8.28851 5.18284C8.25255 5.02517 8.23336 4.86284 8.23336 4.69629C8.23336 3.52085 9.18591 2.56857 10.36 2.56857C11.5943 2.56857 12.4956 3.71208 12.4956 5.00079C12.4956 8.25709 10.0202 11.9746 5.52122 11.9746Z"
                                fill="currentColor"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                          </div>
                          <Link
                            className="text-sm font-medium"
                            href={`https://twitter.com/intent/tweet?text=${currentBlink?.website}`}
                            target="_blank"
                          >
                            Share
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className=" flex flex-col gap-2">
                  <h3 className="font-semibold text-2xl font-inter">
                    {currentBlink?.blink.title}
                  </h3>
                  <p className="font-inter text-sm font-medium text-black opacity-60">
                    {currentBlink?.blink.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-4">
                  <Avatar className="w-8 h-8 md:w-11 md:h-11">
                    <AvatarImage
                      src={
                        currentBlink?.avatar === null
                          ? "https://github.com/shadcn.png"
                          : currentBlink?.avatar
                      }
                    />
                    <AvatarFallback>{currentBlink?.username}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <p className="font-medium text-black opacity-60 text-sm md:text-[13px] font-inter ">
                      by
                    </p>
                    <p className="text-sm md:text-md font-medium font-inter text-gray-800">
                      {currentBlink?.username}
                    </p>
                    <a
                      href={currentBlink?.website}
                      className="hidden group"
                      target="_blank"
                    >
                      <p className="group-hover:underline text-gray-500 text-[12px] font-inter ">
                        {new URL(currentBlink!.website).hostname}
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 border border-black border-opacity-10 p-4 rounded-xl">
              {currentBlink?.blink?.links?.actions?.some(
                (action) => !action.parameters
              ) && (
                <div className="flex mb-4 flex-wrap">
                  {currentBlink.blink.links.actions.map((action, index) => {
                    if (!action.parameters) {
                      return (
                        <RenderMultipleButtons
                          key={index}
                          action={action}
                          count={
                            currentBlink.blink.links?.actions?.filter(
                              (action) => !action.parameters
                            ).length || 0
                          }
                          index={index}
                          link={currentBlink.website}
                        />
                      );
                    }
                    return null;
                  })}
                </div>
              )}
              {currentBlink?.blink?.links ? (
                <div className="flex flex-col gap-4">
                  {currentBlink.blink.links.actions.map((action, index) =>
                    action.parameters ? (
                      <RenderInputs
                        key={index}
                        action={action}
                        link={currentBlink.website}
                      />
                    ) : null
                  )}
                </div>
              ) : (
                <RenderSingleButton
                  blink={currentBlink?.blink!}
                  link={currentBlink?.website!}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start gap-6 py-6">
        <p className="text-lg font-medium font-inter">Explore other Blinks</p>
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {storeBlinks.map((blinkItem: Blink) =>
            currentBlink?.website === blinkItem.blink ? null : (
              <BlinkCard
                blink={blinkItem}
                website={new URL(blinkItem.blink).hostname}
                key={blinkItem.blink}
              />
            )
          )}
        </section>
      </div>
    </section>
  );
}
