import { GET } from "../route";

export async function getArenas() {
  const res = await GET("http://localhost:4000/arenas/");
  return res.json();
}
