import React from 'react'
import {Button, ButtonGroup} from "@nextui-org/button";
import { signOut } from 'next-auth/react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import {Badge} from "@nextui-org/badge";
import { Avatar } from '@nextui-org/react';

export default function Home() {
  return (
    <div className='h-full relative'>
      <Map
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: "100%", height: "100%" }}
      >
      </Map>
      <div className="py-8 p-4 absolute w-full z-10 bottom-0 left-0 bg-white rounded-2xl flex gap-3">
        <Avatar radius='md' size="lg"/>
        <dl>
          <dt className="text-base font-bold">가게이름</dt>
          <dd className='text-xs mt-2'>등록날짜</dd>
        </dl>
      </div>
    </div>
  )
}

// {/* <Button onClick={()=>signOut({callbackUrl : "/"})}>로그아웃</Button> */}