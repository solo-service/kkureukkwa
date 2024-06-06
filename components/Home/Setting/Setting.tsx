import { db } from "@/config/firebase";
import { Button, ButtonGroup, Input } from "@nextui-org/react";
import { doc, getDoc, query, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Setting({setSettingShow} : {setSettingShow : any}) {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const {data : session} = useSession();
  const [loading,setLoading] = useState(false);
  const [name,setName] = useState('');
  const [anmaiton,setAnmaiton] = useState(false);

  const onSubmit = async (event : any)=>{
    if(!session?.user) return;
    const {nickname} = event;

    try {
      setLoading(true);
      await updateDoc(doc(db,"users",session.user.id),{
        name : nickname
      });
      setAnmaiton(false);
      setTimeout(() => {
        setSettingShow(false);
      }, 250);
    }
    catch(e){
      console.log(e);
    }
    finally{
      setLoading(false);
    }

  }

  const cancleHanlder = ()=>{
    setAnmaiton(false);
    setTimeout(() => {
      setSettingShow(false);
    }, 250);
  }

  useEffect(()=>{
    if(!session?.user) return;
    const fetch = async() => {
      const docRef = doc(db,"users",session.user.id);
      const get = (await getDoc(docRef)).data() as any;
      setName(get.name);
    }
    fetch();
  },[session]);

  useEffect(()=>{
    setAnmaiton(true);
  },[]);

  return (
    <div className={`absolute bottom-0 left-0 w-full h-[95%] z-10 border-2 bg-white rounded-2xl py-12 px-5 transition-all ${anmaiton ? "translate-y-0" : "translate-y-full"}`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="text-sm">닉네임 변경</p>
        {
          name && 
          <Input
            className="mt-2"
            errorMessage="Please enter a valid email"
            isInvalid={false}
            placeholder="닉네임"
            type="text"
            size="lg"
            {...register("nickname",{value : name})}
          />
        }
        <div className="w-full mt-2 flex gap-4 justify-end">
          <Button className="bg-orange-400 text-white" size="sm" type="submit">
            닉네임 변경
          </Button>
          <Button className="bg-red-500 text-white" size="sm" onClick={cancleHanlder}>
            취소
          </Button>
        </div>
      </form>
    </div>
  );
}
