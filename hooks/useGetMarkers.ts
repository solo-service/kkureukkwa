import { db } from "@/config/firebase";
import { MarkerType } from "@/types/marker";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useGetMarkers() {

    const [markers,setMarkers] = useState<MarkerType[]>([]);

    const fetch = async ()=>{

        const markerQuery = query(
            collection(db,"marker")
        );

        const snapshot = await getDocs(markerQuery);

        const getMarker = snapshot.docs.map((doc)=>{
            return doc.data();
        }) as MarkerType[];

        setMarkers(getMarker);

    }

    useEffect(()=>{
        fetch();
    },[]);

    return {markers};

}
