import { Unsubscribe, collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "@/config/firebase";
import { MarkerType } from "@/types/marker";

export default function useGetMarkers() {
  const [markers, setMarkers] = useState<MarkerType[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;

    const fetch = async () => {
      const markerQuery = query(collection(db, "marker"));

      // const snapshot = await getDocs(markerQuery);

      unsubscribe = await onSnapshot(markerQuery, (snapshot) => {
        const getMarker = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        }) as MarkerType[];

        setMarkers(getMarker);
      });
    };

    fetch();

    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return { markers };
}
