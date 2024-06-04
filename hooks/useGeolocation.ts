import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function useGeolocation() {
  
    const [location,setLocation] = useState({
        center : {
            lat : 0,
            lng : 0,
        },
        isPanto: false,
    });

    useEffect(()=>{
        
        const {geolocation} = navigator;

        if(!geolocation) return;

        geolocation.getCurrentPosition(
            (pos)=>{ // 성공
                const {coords} = pos;
                setLocation(prev=>({
                    ...prev,
                    center : {
                        lat : coords.latitude,
                        lng : coords.longitude,
                    },
                    isPanto: false,
                }));
            },
            (err)=>{ // 실패
                
            },
            { // 옵션

            }
        )

    },[]);

    return {
        location,
        setLocation
    };

}
