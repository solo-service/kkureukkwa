import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { IoBuildSharp } from "react-icons/io5";
import { PiMegaphoneSimpleFill } from "react-icons/pi";

export default function Navbar({setSettingShow} : {setSettingShow :any}) {

  const router = useRouter();
  const {data : session} = useSession();

  const settingHanlder = ()=>{
    if(!session) {
      alert('로그인을 해야합니다.');
      return router.push('/');
    }
    setSettingShow(true);
  }

  const reportHanlder = ()=>{
    if(!session) {
      alert('로그인을 해야합니다.');
      return router.push('/');
    }
    router.push('/report');
  }

  return (
    <div className="absolute right-[5%] top-[3%] z-10 flex flex-col gap-2">
      <button
        onClick={settingHanlder}
        type="button"
        className="w-10 h-10 bg-white flex items-center justify-center rounded border text-xl cursor-pointer"
      >
        <IoBuildSharp />
      </button>
      <button
        onClick={reportHanlder}
        type="button"
        className="w-10 h-10 bg-white flex items-center justify-center rounded border text-xl cursor-pointer"
      >
        <PiMegaphoneSimpleFill />
      </button>
    </div>
  );
}
