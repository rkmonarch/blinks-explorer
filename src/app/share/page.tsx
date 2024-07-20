"use client";
import useBlink from "@/hooks/useBlink";
import useBlinks from "@/hooks/useBlinks";
import useCreateBlinkStore from "@/store/create";
import { useWallet } from "@jup-ag/wallet-adapter";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import MultipleSelector from "../../components/ui/multiple-selector";
import { useRouter } from "next/navigation";
import { isValidURL as ss } from "@/utils/constant";

interface Action {
  pathPattern: string;
  apiPath: string;
}

export interface ActionBlink {
  rules: Action[];
}

export default function BlinkPage() {
  const { connected, publicKey } = useWallet();
  const [isValidURL, setIsValidURL] = useState(true);
  const [isNotExists, setIsNotExists] = useState(true);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { blinkLink, setBlinkLink, setSelectedTags, selectedTags } =
    useCreateBlinkStore();
  const { refetch } = useBlinks();
  const { fetchBlink } = useBlink();
  const router = useRouter();

  interface ActionBlink {
    rules: {
      pathPattern: string;
      apiPath: string;
    }[];
  }
  
  async function updateActionsJson(blinkLink: string): Promise<string | null> {
    try {
      const url = new URL(blinkLink);
      const host = url.host;
     try {
      const actionsUrl = `https://${host}/actions.json`;
      const response = await fetch(actionsUrl);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch ${actionsUrl}`);
      }
  
      const actionsResponse: ActionBlink = await response.json();
  
      // Iterate through each rule in actionsResponse
      for (const action of actionsResponse.rules) {
        const { pathPattern, apiPath } = action;
  
        // Construct regex pattern based on pathPattern
        const regexPattern = `^${pathPattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^\/]*)")}$`;
        const pathRegex = new RegExp(regexPattern);
  
        // Match the url pathname with the constructed regex
        const match = url.pathname.match(pathRegex);
  
        if (match) {
          // Extract matched parts from the regex
          const capturedGroups = match.slice(1);
  
          // Replace corresponding parts in apiPath
          let newApiPath = apiPath;
          capturedGroups.forEach((group, index) => {
            newApiPath = newApiPath.replace(`*${index + 1}`, group);
          });
  
          // Replace ** with the first captured group
          newApiPath = newApiPath.replace(/\*\*/, capturedGroups[0]);
  
          // Replace * with the first captured group if it ends with *
          if (newApiPath.endsWith("*")) {
            newApiPath = newApiPath.replace(/\*$/, capturedGroups[0]);
          }
  
          return newApiPath;
        }
      }
  
      return null; // Return null if no match found
     } catch (error) {
      const actionsUrl = `https://www.${host}/actions.json`;
    const response = await fetch(actionsUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${actionsUrl}`);
    }

    const actionsResponse: ActionBlink = await response.json();

    // Iterate through each rule in actionsResponse
    for (const action of actionsResponse.rules) {
      const { pathPattern, apiPath } = action;

      if (pathPattern === "/") {
        return `https://www.${host}${apiPath}`;
      }

      // Construct regex pattern based on pathPattern
      const regexPattern = `^${pathPattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^\/]*)")}$`;
      const pathRegex = new RegExp(regexPattern);

      // Match the url pathname with the constructed regex
      const match = url.pathname.match(pathRegex);

      if (match) {
        // Extract matched parts from the regex
        const capturedGroups = match.slice(1);

        // Replace corresponding parts in apiPath
        let newApiPath = apiPath;
        capturedGroups.forEach((group, index) => {
          newApiPath = newApiPath.replace(`*${index + 1}`, group);
        });

        // If newApiPath still contains **, replace it with the first captured group
        if (newApiPath.includes("**")) {
          newApiPath = newApiPath.replace("**", capturedGroups[0]);
        }

        return newApiPath;
      }
    }

    return null;
     }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  

  async function handleValidation() {
    try {
      const isValid = await fetchBlink(blinkLink);
      if (!isValid) {
        setIsValidURL(false);
        setIsLoading(false);
        return false;
      }
      const isExits = await alreadyExists(blinkLink);
      if (isExits) {
        setIsLoading(false);
        return;
      }
      const isValidU = ss(blinkLink as string);
      if (!isValidU) {
        setIsValidURL(false);
        setIsLoading(false);
        return false;
      }
      const response = await fetch("/api/create-blink", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: publicKey?.toBase58(),
          blink: blinkLink,
          tags: selectedTags.map((tag) => tag.value),
        }),
      });
      const data = await response.json();
      toast.success("Blink added successfully");
      await refetch();
      return true;
    } catch (error) {
      const actionsRespnse = await updateActionsJson(blinkLink);

      if (actionsRespnse) {
        const isValid = await fetchBlink(actionsRespnse);

        if (!isValid) {
          setIsValidURL(false);
          setIsLoading(false);
          return false;
        }
        const isExits = await alreadyExists(actionsRespnse);

        if (isExits) {
          setIsLoading(false);
          return;
        }
        const response = await fetch("/api/create-blink", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            address: publicKey?.toBase58(),
            blink: actionsRespnse,
            tags: selectedTags.map((tag) => tag.value),
          }),
        });
        const data = await response.json();
        toast.success("Blink added successfully");
        await refetch();
        setIsValidURL(true);
        setIsLoading(false);
        return true;
      }
      setIsValidURL(false);
      console.log(error);
    }
  }

  async function alreadyExists(blink:string) {
    try {
      const res = await fetch(`/api/already-exists?link=${blink}`);
      const data = await res.json();
      if (data) {
        setIsNotExists(false);
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  }

  async function createBlink() {
    try {
      if (!connected) return;
      if (!blinkLink) return;
      setIsLoading(true);
      const isValid = await handleValidation();
      if (!isValid) {
        setIsLoading(false);
        return;
      }
      return router.push("/");
    } catch (error) {
      toast.error("Failed to create blink");
    } finally {
      setIsLoading(false);
    }
  }

  const Tags = [
    { label: "Blinkathon", value: "Blinkathon" },
    { label: "NFTs", value: "NFTs" },
    { label: "DEFI", value: "DEFI" },
    { label: "DAO", value: "DAO" },
    { label: "Tokens", value: "Tokens" },
    { label: "Social", value: "Social" },
    { label: "Prediction Market", value: "Prediction Market" },
    { label: "Swap", value: "Swap" },
    { label: "Donations", value: "Donations" },
    { label: "Trade", value: "Trade" },
    { label: "Airdrop", value: "Airdrop" },
    { label: "Votes", value: "Votes" },
    { label: "Memes", value: "Memes" },
    { label: "Staking", value: "Staking" },
    { label: "Token gated", value: "Token gated" },
    { label: "Games", value: "Games" },
  ];

  return (
    <section className="mx-auto items-center w-full">
      <div className="w-full flex flex-col max-w-xl mx-auto items-center justify-center py-6 md:py-20">
        <h4 className="font-semibold text-3xl text-center font-sf_pro_rounded">
          Share your Blink with everyone
        </h4>
        <div className="flex flex-col w-full gap-4 mt-12 md:px-12">
          <div className="flex flex-col space-y-1.5">
            <div className="flex flex-row items-center justify-between">
              <Label htmlFor="link" className="text-lg font-medium mb-1">
                Blink URL
              </Label>
            </div>
            <Input
              onChange={(e) => setBlinkLink(e.target.value)}
              id="link"
              placeholder="Enter Blink URL"
              className={`bg-secondary h-12 border border-border rounded-xl ${
                !isValidURL || !isNotExists
                  ? "ring-2 ring-offset-2 ring-red-400"
                  : ""
              }`}
              onFocus={() => {
                setIsValidURL(true);
                setIsNotExists(true);
              }}
            />
            {!isValidURL && (
              <p className="text-xs text-red-500">Please enter valid blink</p>
            )}
            {!isNotExists && (
              <p className="text-xs text-red-500">Blink already exists</p>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="link" className="text-lg font-medium mb-1">
              Tags
            </Label>
            <MultipleSelector
              badgeClassName="bg-white text-black hover:bg-white"
              className="bg-secondary flex  justify-start items-center h-12 border border-border rounded-xl"
              defaultOptions={Tags}
              placeholder="Select suitable tags"
              emptyIndicator={
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  No more tags
                </p>
              }
              onChange={(options) => setSelectedTags(options)}
            />
          </div>
          <div className="pt-6 w-full">
            <Button
              disabled={isLoading}
              onClick={(e) => {
                e.preventDefault();
                createBlink();
              }}
              className="w-full h-12 rounded-xl"
            >
              {isLoading ? <Spinner /> : "Share"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
