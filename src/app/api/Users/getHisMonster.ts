import { GetMonstersOfUserType } from 'src/model/user.schema';
import { GET } from '../route';

export async function getHisMonster(id: GetMonstersOfUserType) {
  const res = await GET(`http://localhost:4000/monster/${id}`);
  return res.json();
}
