import React, { useState } from "react";
import { Map, MarkerClusterer } from "react-kakao-maps-sdk";
import useGetMarkers from "@/hooks/useGetMarkers";
import { useGeolocation } from "@/hooks/useGeolocation";
import View from "@/components/Home/View/View";
import Navbar from "@/components/Home/Navbar/Navbar";
import Gps from "@/components/common/Gps/Gps";
import Setting from "@/components/Home/Setting/Setting";
import Marker from "@/components/Marker/Marker";

export default function Home() {
  const { location, setLocation } = useGeolocation();
  const { markers } = useGetMarkers();
  const [viewShow, setViewShow] = useState(false);
  const [settingShow,setSettingShow] = useState(false);
  const [id, setId] = useState("");

  const onMarkerHanlder = (id: string) => {
    setId(id);
    setViewShow(true);
  };

  return (
    <div className="h-full relative">
      <Map
        center={location.center}
        isPanto={location.isPanto}
        level={3}
        style={{ width: "100%", height: "100%" }}
        onDragEnd={(map) => {
          // 드래그 멈췄을때
          const getCenter = map.getCenter();
          setLocation((prev) => ({
            ...prev,
            center: {
              lat: getCenter.getLat(),
              lng: getCenter.getLng(),
            },
          }));
        }}
        onDragStart={() => {
          // 드래그 시작할때
          setViewShow(false);
        }}
        onZoomChanged={(map) => {
          // 줌 움직일때
          const getCenter = map.getCenter();

          setLocation((prev) => ({
            ...prev,
            center: {
              lat: getCenter.getLat(),
              lng: getCenter.getLng(),
            },
          }));
          
        }}
      >
        <MarkerClusterer
          averageCenter={true}
          minLevel={7}
        >
          {markers.map((marker) => 
            <Marker 
              key={marker.id} 
              setLocation={setLocation}
              onMarkerHanlder={onMarkerHanlder}
              {...marker}
            />
          )}
        </MarkerClusterer>
      </Map>
      <Navbar setSettingShow={setSettingShow} />
      <Gps setLocation={setLocation} />
      {viewShow && <View id={id} setViewShow={setViewShow}/>}
      {settingShow && <Setting setSettingShow={setSettingShow}/>}
    </div>
  );
}