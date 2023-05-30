import { EditUserType } from 'src/model/user.schema';
import { PATCH } from '../route';

export async function patchUser(userData: EditUserType) {
  const res = await PATCH(`http://localhost:4000/user/${userData.id}`, {
    body: JSON.stringify(userData),
  });

  return res.json();
}
