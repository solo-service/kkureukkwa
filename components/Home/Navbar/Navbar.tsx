import React from 'react'
import { IoBuildSharp } from 'react-icons/io5'
import { PiMegaphoneSimpleFill } from 'react-icons/pi'

export default function Navbar() {
  return (
    <div
        className="fixed right-[5%] top-[3%] z-10 flex flex-col gap-2"
    >
        <div className="w-10 h-10 bg-white flex items-center justify-center rounded border text-xl cursor-pointer">
            <IoBuildSharp/>
        </div>
        <div className="w-10 h-10 bg-white flex items-center justify-center rounded border text-xl cursor-pointer">
            <PiMegaphoneSimpleFill />
        </div>
    </div>
  )
}
