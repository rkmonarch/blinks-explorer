import React from "react";
import BlinkCard from "./cards/BlinkCard";
import { useQuery } from '@tanstack/react-query';
import useBlinkStore from "@/store/blinks";

export default function Blinks() {
  const {storeBlinks, setStoreBlinks} = useBlinkStore();

  async function getBlinks() {
    const response = await fetch('/api/get-blinks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
    const blinks = await response.json();
    setStoreBlinks(blinks);
    return response.json();
  }

  const { data: blinks } = useQuery({
    queryKey: ['blinkURL'],
    queryFn: ({ queryKey }) => getBlinks(),
  });
   
  return (
   storeBlinks ?
   <section className="containter mx-auto columns-3">
      {storeBlinks.map((blink:Blink) => (
        <BlinkCard 
        blink={blink.blink}
        website={new URL(blink.blink).hostname}
        username={blink.User.username}
        avatar={blink.User.avatar}
        key={blink.blink} />
      ))}
    </section> : <div>Loading...</div>
  );
}

export type Blinks = Blink[]

export interface Blink {
  id: string
  blink: string
  address: string
  createdAt: string
  User: User
  Tags: Tag[]
}

export interface User {
  id: string
  address: string
  username: string
  avatar: any
  first_name: any
  last_name: any
  bio: any
  created_at: string
}

export interface Tag {
  id: string
  tag: string
  blink_id: string
  createdAt: string
}
