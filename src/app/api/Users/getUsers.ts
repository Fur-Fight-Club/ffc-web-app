import { GET } from '../route';

export async function getUsers() {
  const res = await GET('http://localhost:4000/user/');
  return res.json();
}
