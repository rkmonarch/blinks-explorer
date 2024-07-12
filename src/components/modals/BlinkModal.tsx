import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useBlink from "@/hooks/useBlink";
import LinkIcon from "@/icons/LinkIcon";
import { Blink } from "@/types/blink";
import { connection } from "@/utils/connection";
import { getRawTransaction } from "@/utils/rawTransaction";
import { useWallet } from "@solana/wallet-adapter-react";
import { Transaction } from "@solana/web3.js";
import { ChangeEvent, useState } from "react";
import Spinner from "../Spinner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function BlinkModal({
  blink,
  link,
  avatar,
  username,
}: {
  blink: Blink;
  link: string;
  avatar: string;
  username: string;
}) {
  const { fetchTransaction } = useBlink();
  const host = new URL(link).hostname;
  const { publicKey, sendTransaction } = useWallet();
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = async (link: string) => {
    try {
      setIsLoading(true);
      if (!publicKey) return;
      const result = await fetchTransaction(link, publicKey!.toBase58());
      let transaction = result.transaction;
      const tx = await getRawTransaction(transaction);
      const sign = await sendTransaction(tx as Transaction, connection);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const ButtonsWithoutParameters =
    blink?.links?.actions?.filter((action) => !action.parameters).length || 0;

  const getButtonClass = (count: number, index: number) => {
    if (
      count === 1 ||
      (count % 3 !== 0 && index >= Math.floor(count / 3) * 3)
    ) {
      return "w-full";
    } else if (count % 3 === 0 && index >= Math.floor(count / 3) * 3) {
      return "w-1/3";
    } else {
      return "w-1/3";
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  return (
    <section className="container mx-auto flex items-center">
      <div className="h-2/3 flex items-stretch justify-around w-full">
        <img
          src={blink.icon}
          alt=""
          className="rounded-3xl w-1/3 object-cover"
        />
        <div className="w-1/3 flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={avatar} />
                  <AvatarFallback>{username}</AvatarFallback>
                </Avatar>
                <p className="text-xl text-gray-500">{username}</p>
              </div>
              <div className="flex items-center gap-1">
                <LinkIcon width={16} height={16} color="#B5B5B5" />
                <p className="text-gray-500">{new URL(link).hostname}</p>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-2xl">{blink.title}</h3>
              <p className="mt-2">{blink.description}</p>
            </div>
            {/* <div className="flex items-center gap-2">
              <Badge className="bg-white text-black py-1 px-3">Nft</Badge>
              <Badge className="bg-white text-black py-1 px-3">Airdrop</Badge>
            </div> */}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              {blink.links
                ? blink.links.actions.map((action, index) => {
                    if (!action.parameters) {
                      return (
                        <Button
                          disabled={isLoading}
                          key={action.label}
                          onClick={async () => {
                            let actionUrl = action.href;
                            handlePress("https://" + host + actionUrl);
                          }}
                          className={getButtonClass(
                            ButtonsWithoutParameters,
                            index
                          )}
                        >
                          {isLoading ? <Spinner /> : action.label}
                        </Button>
                      );
                    }
                  })
                : null}
            </div>
            {blink.links ? (
              blink.links.actions.map((action) =>
                action.parameters ? (
                  <div className="flex flex-col gap-3" key={""}>
                    {action.parameters.map((parameter) => (
                      <Input
                        placeholder={parameter.label}
                        key={parameter.name}
                        name={parameter.name}
                        onChange={handleChange}
                      />
                    ))}
                    <Button
                      disabled={isLoading}
                      key={action.label}
                      onClick={async () => {
                        let actionUrl = action.href;
                        action?.parameters?.forEach((param) => {
                          const value = (
                            document.querySelector(
                              `input[name=${param.name}]`
                            ) as HTMLInputElement
                          ).value;
                          actionUrl = actionUrl.replace(
                            `{${param.name}}`,
                            value
                          );
                        });
                        handlePress("https://" + host + actionUrl);
                      }}
                    >
                      {isLoading ? <Spinner /> : action.label}
                    </Button>
                  </div>
                ) : null
              )
            ) : (
              <Button
                disabled={isLoading}
                onClick={async () => {
                  handlePress(link);
                }}
                className="w-full"
              >
                {isLoading ? <Spinner /> : blink.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
