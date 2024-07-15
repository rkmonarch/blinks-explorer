import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import LinkIcon from '@/icons/LinkIcon';
import BlinkModal from '../modals/BlinkModal';
import useBlink from '@/hooks/useBlink';
import { useQuery } from '@tanstack/react-query';

export type BlinkCardProps = {
  blink: string;
  username: string;
  avatar: string;
  website: string;
};

export default function BlinkCard(props: BlinkCardProps) {
  const { fetchBlink } = useBlink();
  const { data: blink } = useQuery({
    queryKey: ['blink', props.blink],
    queryFn: ({ queryKey }) => fetchBlink(queryKey[1]),
  });

  return (
    <div className='relative break-inside-avoid group mb-7 w-full'>
      {/* <div className='absolute hidden group-hover:flex  items-end justify-between w-full p-3 transition-all'>
        <div className='bg-gray-400 bg-opacity-35 p-1 px-3 rounded-2xl'>
          <div className='text-xs bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text'>
            Verified
          </div>
        </div>
        <div>go</div>
      </div> */}
      <Dialog>
        <DialogTrigger className='w-full border border-black border-opacity-[12%] rounded-xl overflow-clip'>
          <img
            src={blink?.icon}
            alt=''
            className='w-full bg-white'
            style={{ width: '100%', height: 'auto' }}
          />
        </DialogTrigger>
        <DialogContent className='w-screen h-full backdrop-blur-2xl bg-white bg-opacity-90'>
          <BlinkModal
            blink={blink!}
            link={props.blink}
            avatar={props.avatar}
            username={props.username}
          />
        </DialogContent>
      </Dialog>
      <div className='flex items-center justify-between mt-1'>
        <div className='flex items-center gap-2'>
          <Avatar className='w-4 h-4 sm:w-6 sm:h-6'>
            <AvatarImage
              src={
                props.avatar === null
                  ? 'https://github.com/shadcn.png'
                  : props.avatar
              }
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className='text-sm font-medium font-inter'>{props.username}</p>
        </div>
        <div className='cursor-pointer hover:text-blue-500 text-gray-400 flex items-center gap-1'>
          <p className='text-xs font-normal font-inter'>{props.website}</p>
          {/* <LinkIcon width={16} height={16} color='#B5B5B5' /> */}
        </div>
      </div>
    </div>
  );
}
