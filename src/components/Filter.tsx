'use client';

import useBlinks from '@/hooks/useBlinks';
import FilterIcon from '@/icons/FilterIcon';
import { Tags } from '@/utils/constant';
import { Button } from './ui/button';

export default function Filter() {
  const { selectedTag, setSelectedTag } = useBlinks();

  return (
    <section className='flex items-center gap-4'>
      {/* <Button className="flex items-center gap-2" variant={"secondary"}>
        <FilterIcon width={16} height={16} color="black" />
        Filters
      </Button> */}
      <div className='flex items-center gap-2 overflow-scroll no-scrollbar'>
        <Button
          variant={'secondary'}
          className={`font-sf_pro_rounded px-4 py-1 font-medium ${
            !selectedTag ? 'bg-gray-100 text-black' : ''
          }`}
          onClick={() => setSelectedTag('')}
        >
          All Blinks{' '}
          <div className='ps-2 text-xs bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text'>
            Trending
          </div>
        </Button>
        {Tags.map((tag) => (
          <Button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`opacity-80 font-sf_pro_rounded px-4 py-1 font-medium ${
              selectedTag === tag ? 'bg-gray-100 text-black' : ''
            }`}
            variant={'ghost'}
          >
            {tag}
          </Button>
        ))}
      </div>
    </section>
  );
}
