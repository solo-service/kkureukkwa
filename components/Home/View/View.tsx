import { db } from "@/config/firebase";
import { MarkerType } from "@/types/marker";
import { Avatar } from "@nextui-org/react";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import moment from "moment";
import { useEffect, useRef, useState } from "react";

export interface PostType {
    type: string;
    postid: number;
    created: number;
    name: string;
    author : string;
}
  
export default function View({id} : {id : string}){

    const [view,setView] = useState<MarkerType>();
    const viewRef = useRef(null);
    const [animation,setAnimation] = useState(false);

    const fetch = async ()=>{
        const getMarker = (await getDoc(doc(db,"marker",id))).data() as MarkerType;
        setView({
            ...getMarker,
            id
        });
    }

    useEffect(()=>{
        fetch();
        setTimeout(() => {
            setAnimation(true);
        }, 200);
    },[id]);

    return (
        <div 
            ref={viewRef}
            className={`py-10 p-4 w-full z-10 bottom-0 left-0 bg-white rounded-3xl rounded-b-none absolute transition-all ${animation ? "translate-y-0" : "translate-y-full"}`}
            >
            {
                view &&
                <div className='flex gap-3'>
                    <Avatar radius="full" size="lg" name={view.type}/>
                    <div>
                        <dl>
                            <dt className="text-base font-bold">{view.name}</dt>
                            <dd className='text-xs mt-1 text-gray-500'>{view.address}</dd>
                            <dd className='text-xs mt-2 text-gray-500'>{moment(view.created).format("YYYY-MM-DD")}</dd>
                        </dl>
                        <p className="text-xs mt-5 text-gray-500">제보자 - {view.author}</p>
                    </div>
                </div>
            }
        </div>
    )
}