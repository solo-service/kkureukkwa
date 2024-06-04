import React, { useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useGetMarkers from '@/hooks/useGetMarkers';
import { useGeolocation } from '@/hooks/useGeolocation';
import View from '@/components/Home/View/View';
import Navbar from '@/components/Home/Navbar/Navbar';
import Gps from '@/components/common/Gps/Gps';

export default function Home() {

  const {location,setLocation} = useGeolocation();

  const {markers} = useGetMarkers();
  const [viewShow,setViewShow] = useState(false);

  const [postid,setPostid] = useState(0);

  const onMarkerHanlder = (postid : number)=>{
    setPostid(postid);
    setViewShow(true);
  }

  return (
    <div className='h-full relative'>

      <Map
        level={3}
        center={location.center}
        isPanto={location.isPanto}
        style={{ width: "100%", height: "100%" }}
        onDragStart={()=>{ // 드래그 시작할때
          setViewShow(false);
        }}
        onDragEnd={(map)=>{ // 드래그 멈췄을때
          const getCenter = map.getCenter();
          setLocation(prev=>({
            ...prev,
            center : {
              lat : getCenter.getLat(),
              lng : getCenter.getLng(),
            }
          }))
        }}
        onZoomChanged={(map)=>{ // 줌 움직일때
          const getCenter = map.getCenter();
          setLocation(prev=>({
            ...prev,
            center : {
              lat : getCenter.getLat(),
              lng : getCenter.getLng(),
            }
          }))
        }}
      >
        {
          markers.map(marker=>(
            <MapMarker
              onClick={()=>{
                setLocation(prev=>({
                  ...prev,
                  center : {
                    lat : marker.position.lat,
                    lng : marker.position.lng,
                  },
                  isPanto : true
                }))
                onMarkerHanlder(marker.postid)
              }}
              key={marker.postid}
              position={{
                lat: marker.position.lat,
                lng: marker.position.lng,
              }}
            />
          ))
        }
      </Map>

      <Navbar/>
      <Gps setLocation={setLocation}/>
      { viewShow && <View postid={postid}/> }

    </div>
  )
}