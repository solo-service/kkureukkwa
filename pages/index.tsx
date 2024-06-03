import {Button} from "@nextui-org/button";
import {signIn} from "next-auth/react";
import {Avatar} from "@nextui-org/avatar";

export default function IndexPage() {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Avatar className="w-32 h-32"/>
      <Button
        radius="md"
        className="w-full bg-[#fee500] mt-10"
        onClick={(()=>signIn("kakao",{callbackUrl : '/home'}))}
      >로그인 버튼</Button>
    </div>
  );
}
