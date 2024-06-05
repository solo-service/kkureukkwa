import { Avatar } from "@nextui-org/react";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { MarkerType } from "@/types/marker";
import { db } from "@/config/firebase";
import { IoFootsteps, IoTrash } from "react-icons/io5";
import { useSession } from "next-auth/react";

export interface PostType {
  type: string;
  postid: number;
  created: number;
  name: string;
  author: string;
}

export default function View({ id,setViewShow }: { id: string,setViewShow : any }) {
  const [view, setView] = useState<MarkerType>();
  const viewRef = useRef(null);
  const [animation, setAnimation] = useState(false);
  const [loading,setLoading] = useState(false);
  const {data : session} = useSession();

  const fetch = async () => {[]
    const getMarker = (
      await getDoc(doc(db, "marker", id))
    ).data() as MarkerType;

    setView({
      ...getMarker,
      id,
    });
  };

  useEffect(() => {
    fetch();
    setTimeout(() => {
      setAnimation(true);
    }, 200);
  }, [id]);

  const removeHandler = async (id : string,authorUid : string)=>{

    if(!session) return alert('로그인을 해야합니다.');

    if(session.user.id !== authorUid) return alert('사용자 권한이 없습니다.');

    if(confirm('정말 삭제하시겠습니까?')){

      try {
        setLoading(true);
  
        await deleteDoc(doc(db,"markers",id));
  
        alert('삭제가 완료 되었습니다.');
        setAnimation(false);
        setTimeout(() => {
          setViewShow(false);
        }, 250);
      }
      catch(e){
        console.log(e);
      }
      finally{
        setLoading(false);
      }

    }

  }

  return (
    <div
      ref={viewRef}
      className={`py-10 p-4 w-full z-10 bottom-0 left-0 bg-white rounded-3xl rounded-b-none absolute transition-all ${animation ? "translate-y-0" : "translate-y-full"}`}
    >
      {view && (
        <div className="flex gap-3">
          <Avatar name={view.type} radius="full" size="lg" />
          <div>
            <dl>
              <dt className="text-base font-bold">{view.name}</dt>
              <dd className="text-xs mt-1 text-gray-500">{view.address}</dd>
              <dd className="text-xs mt-2 text-gray-500">
                {moment(view.created).format("YYYY-MM-DD")}
              </dd>
            </dl>
            <p className="text-xs mt-5 text-gray-500">제보자 - {view.author}</p>
          </div>

          <div className="ml-auto">
            {/* <dl className="flex flex-col items-center">
              <dt className="text-xl"><IoFootsteps /></dt>
              <dd className="text-sm mt-1">몇 km</dd>
            </dl> */}
            {
              view.authorUid === session?.user.id &&
                <div className="mt-5 text-2xl text-center">
                  <button onClick={()=>removeHandler(view.id,authorUid)} className="text-red-500"><IoTrash /></button>
                </div>
            }
          </div>

        </div>
      )}
    </div>
  );
}
