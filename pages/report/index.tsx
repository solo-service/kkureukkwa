// eslint-disable-next-line import/order
import { useGeolocation } from "@/hooks/useGeolocation";
import { Button, Input } from "@nextui-org/react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import "swiper/css";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";

import { adrAtom } from "@/atoms/adr";

export default function Report() {
  const router = useRouter();
  const mapRef = useRef<kakao.maps.Map>(null);
  const markerRef = useRef<kakao.maps.Marker>(null);
  const [adr, setAdr] = useRecoilState(adrAtom);
  const { location } = useGeolocation();

  function searchDetailAddrFromCoords(coords: any, callback: any) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    new kakao.maps.services.Geocoder().coord2Address(
      coords.getLng(),
      coords.getLat(),
      callback,
    );
  }
  useEffect(() => {
    setTimeout(() => {
      const map = mapRef.current;

      if (!map) return;
      const getLoaction = map.getCenter();

      searchDetailAddrFromCoords(
        getLoaction,
        function (result: any, status: any) {
          if (status === kakao.maps.services.Status.OK) {
            const { address_name } = result[0].address;

            setAdr((prev) => ({
              ...prev,
              postion: {
                La: getLoaction.getLat(),
                Ma: getLoaction.getLng(),
              },
              address: address_name,
            }));
          }
        },
      );
    }, 200);
  }, [mapRef]);

  return (
    <div className="h-full relative">
      <Map
        ref={mapRef}
        center={location.center}
        isPanto={location.isPanto}
        level={3}
        style={{ width: "100%", height: "100%" }}
        onDrag={(map) => {
          markerRef.current?.setPosition(map.getCenter());
        }}
        onDragEnd={(map) => {
          const getLoaction = map.getCenter();
          searchDetailAddrFromCoords(
            getLoaction,
            function (result: any, status: any) {
              if (status === kakao.maps.services.Status.OK) {
                const { address_name } = result[0].address;

                setAdr((prev) => ({
                  ...prev,
                  postion: {
                    La: getLoaction.getLat(),
                    Ma: getLoaction.getLng(),
                  },
                  address: address_name,
                }));
              }
            },
          );
        }}
      >
        <MapMarker ref={markerRef} position={location.center} />
      </Map>

      <div
        className={`py-10 p-4 w-full z-10 bottom-0 left-0 bg-white rounded-3xl rounded-b-none absolute transition-all`}
      >
        <p className="text-sm">주소</p>
        <Input
          disabled
          className="mt-3"
          size="lg"
          type="text"
          value={adr.address}
        />
        <div className="mt-5 flex justify-center gap-5">
          <Button
            color="primary"
            radius="md"
            type="button"
            onClick={() => router.push("/report/middle")}
          >
            이 장소 등록하기
          </Button>
          <Button
            color="danger"
            radius="md"
            type="button"
            onClick={() => router.push("/home")}
          >
            취소
          </Button>
        </div>
      </div>
    </div>
  );
}