import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LinkIcon from "@/icons/LinkIcon";
import { Blink } from "@/types/blink";
import { ChangeEvent, useState } from "react";
import RenderInputs from "../RenderInputs";
import RenderMultipleButtons from "../RenderMultipleButtons";
import RenderSingleButton from "../RenderSingleButton";

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
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});

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
                  <AvatarImage
                    src={
                      avatar === null ? "https://github.com/shadcn.png" : avatar
                    }
                  />
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
            <div className="flex items-center gap-3 mb-4">
              {blink.links
                ? blink.links.actions.map((action, index) => {
                    if (!action.parameters) {
                      return (
                        <RenderMultipleButtons
                          key={index}
                          action={action}
                          count={
                            blink?.links?.actions?.filter(
                              (action) => !action.parameters
                            ).length || 0
                          }
                          index={index}
                          link={link}
                        />
                      );
                    }
                  })
                : null}
            </div>
            {blink.links ? (
              blink.links.actions.map((action, index) =>
                action.parameters ? (
                  <RenderInputs key={index} action={action} link={link} />
                ) : null
              )
            ) : (
              <RenderSingleButton blink={blink} link={link} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
