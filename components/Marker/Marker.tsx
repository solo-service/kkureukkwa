import { MarkerType } from '@/types/marker';
import React from 'react'
import { MapMarker } from 'react-kakao-maps-sdk';

interface MarkerProps extends MarkerType {
    setLocation : any;
    onMarkerHanlder : any;
}

const MARKERIMAGE : {[key : string] : string} = {
    "kkwabaegi" : "/images/markers/kkwabaegi.png",
    "takoyaki" : "/images/markers/takoyaki.png",
    "shaped" : "/images/markers/shaped.png",
    "hotteok" : "/images/markers/hotteok.png",
}

export default function Marker({id,position,type,setLocation,onMarkerHanlder} : MarkerProps) {
  return (
    <MapMarker
        key={id}
        position={{
            lat: position.lat,
            lng: position.lng,
        }}
        image={{
            src : MARKERIMAGE[type],
            size : {
                width : 24,
                height : 29.7
            },
            options : {
                offset : {
                x : 24/2,
                y : 29.7
                }
            }
        }}
        onClick={() => {
            setLocation((prev : any) => ({
                ...prev,
                center: {
                    lat: position.lat,
                    lng: position.lng,
                },
                isPanto: true,
            }));
            onMarkerHanlder(id);
        }}
    />
  )
}
