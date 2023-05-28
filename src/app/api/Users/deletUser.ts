import { DELETE } from '../route';

export async function deleteUser(id: number) {
  const res = await DELETE(`http://localhost:4000/user/${id}`);
  return res.json();
}
