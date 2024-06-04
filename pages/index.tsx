import {Button} from "@nextui-org/button";
import {signIn} from "next-auth/react";
import {Avatar} from "@nextui-org/avatar";
import Link from "next/link";

export default function IndexPage() {
  return (
    <div className="h-full flex flex-col justify-center items-center px-5">
      <Avatar className="w-32 h-32"/>
      <Button
        radius="md"
        className="w-full bg-[#fee500] mt-10"
        onClick={(()=>signIn("kakao",{callbackUrl : '/home'}))}
      >카카오 로그인</Button>
      <Link href={'/home'} className="text-sm mt-5 text-gray-500">둘러보기</Link>
    </div>
  );
}
