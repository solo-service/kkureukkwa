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
                width : 40,
                height : 49.5
            },
            options : {
                offset : {
                x : 40/2,
                y : 49.5
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
