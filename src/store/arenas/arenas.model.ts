export interface Arenas {
  arenas: Arena[];
}

export interface Arena {
  id: number;
  name: string;
  address: string;
  address2: string;
  city: string;
  zipcode: string;
  country: string;
  latitude: number;
  longitude: number;
  match: object[];
}
