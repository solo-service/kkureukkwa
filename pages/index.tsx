import { Button } from "@nextui-org/button";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import StoreType from "@/components/StoreType/StoreType";
import { useEffect } from "react";
import FirstCheck from "@/components/Router/FirstCheck";

export default function IndexPage() {

  const {data : session} = useSession();
  const router = useRouter();

  useEffect(()=>{
    if(session){
      router.push('/home');
    }
  },[session]);

  return (
    <FirstCheck>
      <div className="h-full flex flex-col justify-center items-center px-5">
        <StoreType name="kkwabaegi" className="w-32 h-32" />
        <p className="text-sm mt-4">꾸르꽈에 오신걸 환영해요!</p>
        <Button
          className="w-full bg-[#fee500] mt-10"
          radius="md"
          onClick={() => signIn("kakao", { callbackUrl: "/change" })}
        >
          카카오 로그인
        </Button>
        <Link className="text-sm mt-5 text-gray-500" href={"/home"}>
          둘러보기
        </Link>
      </div>
    </FirstCheck>
  );
}
