/* eslint-disable react-hooks/rules-of-hooks */
import { Avatar, Button, Input } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoArrowBack } from "react-icons/io5";
import { SwiperRef, SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { addDoc, collection } from "firebase/firestore";

import { adrAtom } from "@/atoms/adr";
import { db } from "@/config/firebase";

export default function index() {
  const router = useRouter();
  const adr = useRecoilValue(adrAtom);
  const swiperRef = useRef<SwiperRef>(null);
  const { register, handleSubmit, getValues } = useForm();
  const [storeType, setStoreType] = useState("");
  const [step, setStep] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);

  const onSubmitHanlder = async (event: any) => {
    const { name } = event;

    try {
      setLoading(true);
      await addDoc(collection(db, "marker"), {
        position: {
          lat: adr.postion.La,
          lng: adr.postion.Ma,
        },
        address: adr.address,
        type: storeType,
        author: "땡땡땡",
        name,
        created: Date.now(),
      });
      nextButtonHandler();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const nextButtonHandler = () => {
    if (step === 1) {
      if (getValues("name") === "") {
        return alert("가게 이름을 작성해주세요");
      }
      setStep(2);
    }

    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const prevButtonHandler = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
      setStep(step - 1);
    }
  };

  const storeClickHandler = (store: string) => {
    setStoreType(store);
    nextButtonHandler();
    setStep(1);
  };

  useEffect(() => {
    if (adr.address === "") {
      router.push("/report");
    }
  }, [adr]);

  return (
    <div className="h-full relative">
      <form onSubmit={handleSubmit(onSubmitHanlder)}>
        <Swiper ref={swiperRef} touchRatio={0}>
          <SwiperSlide>
            <div className="h-screen flex flex-col">
              <button
                className="text-3xl mt-5"
                type="button"
                onClick={() => router.push("/report")}
              >
                <IoArrowBack />
              </button>
              <div className="flex-1 flex flex-col items-center justify-center">
                <p className="text-sm">어떤 가게인가요?</p>
                <div className="flex justify-center gap-6 mt-8">
                  <Avatar
                    className="cursor-pointer w-20 h-20"
                    name="꽈배기"
                    onClick={() => storeClickHandler("kkwabaegi")}
                  />
                  <Avatar
                    className="cursor-pointer w-20 h-20"
                    name="타코야끼"
                    onClick={() => storeClickHandler("takoyaki")}
                  />
                  <Avatar
                    className="cursor-pointer w-20 h-20"
                    name="붕어빵"
                    onClick={() => storeClickHandler("bong")}
                  />
                  <Avatar
                    className="cursor-pointer w-20 h-20"
                    name="호떡"
                    onClick={() => storeClickHandler("hodduk")}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="h-screen flex flex-col">
              <button
                className="text-3xl mt-5"
                type="button"
                onClick={prevButtonHandler}
              >
                <IoArrowBack />
              </button>
              <div className="flex-1 flex flex-col items-center justify-center">
                <p className="text-sm">가게 이름을 알려주세요!</p>
                <Input
                  className="mt-3"
                  size="lg"
                  type="text"
                  {...register("name")}
                />
                <div className="text-center">
                  <Button
                    className="mt-5"
                    color="primary"
                    radius="md"
                    onClick={nextButtonHandler}
                  >
                    다음
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="h-screen flex flex-col">
              <button
                className="text-3xl mt-5"
                type="button"
                onClick={prevButtonHandler}
              >
                <IoArrowBack />
              </button>
              <div className="flex-1 flex flex-col justify-center">
                <dl className="flex gap-5 items-center">
                  <dt className="font-bold text-xl">주소</dt>
                  <dd className="text-base">{adr.address}</dd>
                </dl>
                <dl className="flex gap-5 mt-5 items-center">
                  <dt className="font-bold text-xl">가게타입</dt>
                  <dd className="mt-2">
                    <Avatar className="w-20 h-20" name={storeType} />
                  </dd>
                </dl>
                <dl className="flex gap-5 mt-5 items-center">
                  <dt className="font-bold text-xl">가게 이름</dt>
                  <dd className="text-base">{getValues("name")}</dd>
                </dl>
                <div className="text-center">
                  <Button
                    className="mt-5"
                    color="primary"
                    radius="md"
                    type="submit"
                  >
                    등록하기
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-screen flex flex-col">
              <div className="flex-1 flex flex-col justify-center items-center">
                <h3>등록이 완료 되었습니다.</h3>
                <Button
                  className="mt-5"
                  color="primary"
                  radius="md"
                  onClick={() => router.push("/home")}
                >
                  돌아가기
                </Button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </form>
    </div>
  );
}