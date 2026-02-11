export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'developer' | 'designer' | 'qa';
  avatar: string;
};
