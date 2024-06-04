import { db } from "@/config/firebase";
import { Avatar } from "@nextui-org/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import moment from "moment";
import { useEffect, useRef, useState } from "react";

export interface PostType {
    type: string;
    postid: number;
    created: number;
    name: string;
    author : string;
}
  
export default function View({postid} : {postid : number}){

    const [view,setView] = useState<PostType>();
    const viewRef = useRef(null);
    const [animation,setAnimation] = useState(false);

    const fetch = async ()=>{
        const q = query(
        collection(db,"post"),
        where("postid","==",postid)
        )
        const snapshot = await getDocs(q);
        
        const getView = snapshot.docs.map(doc=>{
        const {type,postid,name,created,author} = doc.data();
        return {
            type,
            postid,
            name,
            created,
            author
        }
        })[0];

        setView(getView);

    }

    useEffect(()=>{
        fetch();
        setTimeout(() => {
            setAnimation(true);
        }, 200);
    },[postid]);

    return (
        <div 
        ref={viewRef}
        className={`py-10 p-4 w-full z-10 bottom-0 left-0 bg-white rounded-3xl rounded-b-none absolute transition-all translate-y-full ${animation ? "translate-y-0" : ""}`}
        >
        {
            view &&
            <div className='flex gap-3'>
            <Avatar radius="full" size="lg"/>
            <div>
                <dl>
                <dt className="text-base font-bold">{view.name}</dt>
                <dd className='text-xs mt-1 text-gray-500'>
                    {moment(view.created).format("YYYY-MM-DD")}
                </dd>
                </dl>
                <p className="text-xs mt-5 text-gray-500">제보자 - {view.author}</p>
            </div>
            </div>
        }
        </div>
    )
}