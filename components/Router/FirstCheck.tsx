import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function FirstCheck({children} : {children : React.ReactNode}) {

    const {data : session} = useSession();
    const router = useRouter();

    useEffect(()=>{ // DB에 존재하면 home으로
        if(!session?.user) return;
        const fetch = async ()=>{
            const docRef = doc(db,"users",session.user.id);
            const data = (await getDoc(docRef)).data() as any;
            if(data.first){
            router.push('/change');
            }
        }
        fetch();
    },[session])

  return (
    <>{children}</>
  )
}
