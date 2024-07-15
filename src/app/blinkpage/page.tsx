'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import LinkIcon from '@/icons/LinkIcon';
import { ChangeEvent, useState } from 'react';
import RenderInputs from '../../components/RenderInputs';
import RenderMultipleButtons from '../../components/RenderMultipleButtons';
import RenderSingleButton from '../../components/RenderSingleButton';
import useBlinkStore from '@/store/blinks';
import BlinkCard from '../../components/cards/BlinkCard';
import { useRouter } from 'next/navigation';
import { Blink } from '@/components/Blinks';
import { Button } from '@/components/ui/button';

export default function BlinkPage() {
  const { storeBlinks, currentBlink } = useBlinkStore();
  const route = useRouter();
  if (!currentBlink) {
    return route.push('/');
  }

  return (
    <section className='mx-auto items-center w-full overflow-auto'>
      <div className=' bg-black bg-opacity-[3%] rounded-2xl w-full flex items-center justify-center py-20'>
        <div className='w-full flex flex-col max-w-4xl md:flex-row items-stretch justify-around gap-10'>
          <img
            src={currentBlink?.blink.icon}
            alt=''
            className='rounded-xl border border-black border-opacity-[8%] aspect-square w-full md:w-1/2 object-cover'
          />
          <div className='w-full md:w-1/2 flex flex-col justify-between p-2'>
            <div className='flex flex-col gap-4'>
              <div className=' flex flex-col gap-4'>
                <div className='flex flex-row items-center justify-between w-full'>
                  <div className='flex flex-row justify-start items-center gap-2'>
                    <p className='font-inter text-[16px] font-semibold text-black'>
                      Verified
                    </p>
                    <div>
                      <svg
                        width='18'
                        height='18'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M8.52226 3.58715C9.32033 2.49138 10.5575 1.75 12 1.75C13.4403 1.75 14.6845 2.48956 15.4858 3.5867C16.8268 3.37709 18.2319 3.73232 19.2498 4.75021C20.2684 5.76882 20.6234 7.17516 20.4129 8.51702C21.507 9.31924 22.25 10.5556 22.25 12C22.25 13.4444 21.507 14.6808 20.4129 15.483C20.6234 16.8248 20.2684 18.2312 19.2498 19.2498C18.229 20.2706 16.8235 20.6154 15.4879 20.4105C14.6867 21.5092 13.4415 22.25 12 22.25C10.5544 22.25 9.31711 21.5058 8.51495 20.41C7.1785 20.6159 5.77173 20.2713 4.75021 19.2498C3.72908 18.2287 3.38355 16.8214 3.59556 15.483C2.50171 14.6824 1.75 13.4474 1.75 12C1.75 10.5526 2.50171 9.31757 3.59556 8.51703C3.38355 7.17856 3.72908 5.77134 4.75021 4.75021C5.76978 3.73064 7.17649 3.37685 8.52226 3.58715ZM15.5639 10.6808C16.02 10.3694 16.1373 9.74715 15.8258 9.29106C15.5144 8.83497 14.8922 8.71771 14.4361 9.02915L14.3493 9.08844C12.9756 10.0265 11.7852 11.2023 10.8323 12.5572L9.70673 11.4328C9.316 11.0425 8.68283 11.0428 8.29252 11.4335C7.9022 11.8243 7.90254 12.4574 8.29327 12.8477L10.3 14.8523C10.5204 15.0725 10.8308 15.1774 11.1396 15.136C11.4483 15.0946 11.7202 14.9117 11.8748 14.6413C12.7648 13.085 13.9965 11.7511 15.4771 10.7401L15.5639 10.6808Z'
                          fill='#EAC800'
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <svg
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M12 6C11.4477 6 11 5.55228 11 5C11 4.44772 11.4477 4 12 4C12.5523 4 13 4.44772 13 5C13 5.55228 12.5523 6 12 6Z'
                        stroke='black'
                        stroke-opacity='0.5'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                      <path
                        d='M12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12C13 12.5523 12.5523 13 12 13Z'
                        stroke='black'
                        stroke-opacity='0.5'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                      <path
                        d='M12 20C11.4477 20 11 19.5523 11 19C11 18.4477 11.4477 18 12 18C12.5523 18 13 18.4477 13 19C13 19.5523 12.5523 20 12 20Z'
                        stroke='black'
                        stroke-opacity='0.5'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                    </svg>

                    {/* <Button size={'sm'}  variant='secondary'></Button> */}
                  </div>
                </div>
                <div className=' flex flex-col gap-2'>
                  <h3 className='font-semibold text-2xl font-inter'>
                    {currentBlink?.blink.title}
                  </h3>
                  <p className='font-inter text-sm font-medium text-black opacity-60'>
                    {currentBlink?.blink.description}
                  </p>
                </div>
              </div>
              <div className='flex items-center justify-between mt-3'>
                <div className='flex items-center gap-4'>
                  <Avatar className='w-5 h-5 md:w-11 md:h-11'>
                    <AvatarImage
                      src={
                        currentBlink?.avatar === null
                          ? 'https://github.com/shadcn.png'
                          : currentBlink?.avatar
                      }
                    />
                    <AvatarFallback>{currentBlink?.username}</AvatarFallback>
                  </Avatar>
                  <div className='flex flex-col items-start  '>
                    <p className='font-medium text-black opacity-60 text-[13px] font-inter '>
                      by
                    </p>
                    <p className='md:text-md font-medium font-inter text-gray-800'>
                      {currentBlink?.username}
                    </p>

                    <a
                      href={currentBlink!.website}
                      className='hidden group'
                      target='_blank'
                    >
                      <p className='group-hover:underline text-gray-500 text-[12px] font-inter '>
                        {new URL(currentBlink!.website).hostname}
                      </p>
                    </a>
                  </div>{' '}
                </div>
              </div>
              {/* <div className="flex items-center gap-2">
                <Badge className="bg-white text-black py-1 px-3">Nft</Badge>
                <Badge className="bg-white text-black py-1 px-3">Airdrop</Badge>
              </div> */}
            </div>
            <div className='mt-4 border border-black border-opacity-10 p-4 rounded-xl'>
              {currentBlink?.blink?.links?.actions?.some(
                (action) => !action.parameters
              ) && (
                <div className='flex flex-wrap gap-3 mb-4'>
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
                <div className='flex flex-col gap-4'>
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
                  blink={currentBlink.blink}
                  link={currentBlink.website}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-start gap-6 py-6'>
        <p className='text-lg font-medium font-inter'>Explore other Blinks</p>
        <section className='columns-1 sm:columns-2 md:columns-2 lg:columns-3 xl:columns-4 2xl:columns-4 3xl:columns-5 4xl:columns-7 gap-6'>
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
      </div>
    </section>
  );
}
