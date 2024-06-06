import { Avatar } from '@nextui-org/react'
import React from 'react'

interface StoreProps {
  className? : string;
  radius? : "sm"|"md"|"lg"|"full"|"none";
  name : string;
  onClick? : any
}

const MARKERIMAGE : {[key : string] : string} = {
  "kkwabaegi" : "/images/storetype/kkwabaegi.png",
  "takoyaki" : "/images/storetype/takoyaki.png",
  "shaped" : "/images/storetype/shaped.png",
  "hotteok" : "/images/storetype/hotteok.png",
}

export default function StoreType({className,radius,name,onClick} : StoreProps) {
  return (
    <Avatar
      onClick={onClick}
      src={MARKERIMAGE[name]} 
      className={className} 
      radius={radius} 
      name={name}
    />
  )
}