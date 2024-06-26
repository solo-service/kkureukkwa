export interface MarkerType {
  created: number;
  address: string;
  position: Position;
  name: string;
  author: string;
  type: string;
  id: string;
  authorUid : string;
}

export interface Position {
  lng: number;
  lat: number;
}
