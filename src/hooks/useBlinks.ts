import useBlinkStore from '@/store/blinks';
import useSearchStore from '@/store/search';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'

export default function useBlinks() {
    const [selectedTag, setSelectedTag] = useState<string>("");
    const { setStoreBlinks, page, setTotalPage } = useBlinkStore()
    const { setFilteredBlinks } = useSearchStore()

    async function getBlinks() {
        const response = await fetch("/api/get-blinks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedTag ? {
                tags: [selectedTag],
                page: page,
                limit: 15
            } : {
                tags: [],
                page: page,
                limit: 15
            }),
        });
        const blinks = await response.json();
        setStoreBlinks(blinks.data);
        setFilteredBlinks(blinks.data)
        setTotalPage(blinks.totalPages)
        return blinks;
    }

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["blinkURL", selectedTag],
        queryFn: getBlinks,
        enabled: !!selectedTag || selectedTag === "",
    });

    return { isError, isLoading, refetch, selectedTag, setSelectedTag }
}
