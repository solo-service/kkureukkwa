import React from 'react'
import {Button, ButtonGroup} from "@nextui-org/button";
import { signOut } from 'next-auth/react';

export default function Home() {
  return (
    <div>
        <Button onClick={()=>signOut({callbackUrl : "/"})}>로그아웃</Button>
    </div>
  )
}