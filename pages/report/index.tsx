import { useGeolocation } from "@/hooks/useGeolocation";
import { Button, Input } from "@nextui-org/react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import 'swiper/css';
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { adrAtom } from "@/atoms/adr";
import { useRouter } from "next/navigation";

export default function Report() {

  const router = useRouter();
  const mapRef = useRef<kakao.maps.Map>(null);
  const markerRef = useRef<kakao.maps.Marker>(null);
  const [adr,setAdr] = useRecoilState(adrAtom);
  const {location} = useGeolocation();
  function searchDetailAddrFromCoords(coords : any, callback : any) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    new kakao.maps.services.Geocoder().coord2Address(coords.getLng(), coords.getLat(), callback);
  }
  useEffect(()=>{

    setTimeout(()=>{

      const map = mapRef.current;
      if (!map) return;
      const getLoaction = map.getCenter();
      searchDetailAddrFromCoords(getLoaction,function(result : any, status : any){
        if (status === kakao.maps.services.Status.OK) {
          const {address_name} = result[0].address;
          setAdr((prev)=>({
            ...prev,
            postion : {
              La : getLoaction.getLat(),
              Ma : getLoaction.getLng()
            },
            address : address_name
          }));
        }
      });

    },200);

  },[mapRef]);

  return (
    <div className='h-full relative'>
        
      <Map
        ref={mapRef}
        level={3}
        center={location.center}
        isPanto={location.isPanto}
        style={{ width: "100%", height: "100%" }}
        onDrag={(map)=>{
          markerRef.current?.setPosition(map.getCenter());
        }}
        onDragEnd={(map)=>{

          const getLoaction = map.getCenter();
          searchDetailAddrFromCoords(getLoaction,function(result : any, status : any){
            if (status === kakao.maps.services.Status.OK) {
              const {address_name} = result[0].address;
              setAdr((prev)=>({
                ...prev,
                postion : {
                  La : getLoaction.getLat(),
                  Ma : getLoaction.getLng()
                },
                address : address_name
              }));
            }
          });

        }}
      >
        <MapMarker ref={markerRef} position={location.center}/>
      </Map>

      <div className={`py-10 p-4 w-full z-10 bottom-0 left-0 bg-white rounded-3xl rounded-b-none absolute transition-all`}>
        <p className="text-sm">주소</p>
        <Input type="text" size="lg" className="mt-3" disabled value={adr.address}/>
        <div className="text-center">
          <Button onClick={()=>router.push('/report/middle')} type="button" className="mt-5" radius="md" color="primary">이 장소 등록하기</Button>
        </div>
      </div>

    </div>
  )
}
