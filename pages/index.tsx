import { Button } from "@nextui-org/button";
import { signIn, useSession } from "next-auth/react";
import { Avatar } from "@nextui-org/avatar";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function IndexPage() {

  const {data : session} = useSession();
  const router = useRouter();

  useEffect(()=>{
    if(session){
      router.push('/home');
    }
  },[session]);

  return (
    <div className="h-full flex flex-col justify-center items-center px-5">
      <Avatar className="w-32 h-32" />
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
  );
}
