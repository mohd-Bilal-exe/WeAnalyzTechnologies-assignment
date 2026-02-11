import { dummyUsers } from '../store/tempData';

export default function getUser(id: string) {
  const users = dummyUsers;
  return users.find(user => user.id === id);
}
