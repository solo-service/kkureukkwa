import { db } from "@/config/firebase";
import { Button, Input } from "@nextui-org/react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function index() {

  const {data : session,status} = useSession();
  const {register,handleSubmit,setValue,getValues} = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (event : any)=>{
    if(!session?.user) return;
    const {nickname} = event;

    try {
      setLoading(true);

      await updateDoc(doc(db,"users",session.user.id),{
        name : nickname
      });

      router.push('/home');
    }
    catch(e){
      console.log(e);
    }
    finally{
      setLoading(false);
    }

  }

  useEffect(()=>{ // DB에 존재하면 home으로
    if(!session?.user) return;
    const fetch = async ()=>{
      const docRef = doc(db,"users",session.user.id);
      if((await getDoc(docRef)).exists()){
        router.push('/home');
      }
    }
    fetch();
  },[session])

  useEffect(()=>{
    if(status === "unauthenticated"){
      router.push('/');
    }
  },[status]);

  return (
    <div className="h-full flex flex-col justify-center px-5">
      {
        session &&
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="text-sm">닉네임</p>
          <Input className="mt-3" size="lg" type="text" {...register('nickname',{value : session.user?.name})}/>
          <div className="mt-5 text-center">
            <Button type="submit" color="primary">등록</Button>
          </div>
        </form>
      }
    </div>
  );
}
