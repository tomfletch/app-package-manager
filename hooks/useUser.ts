import { DefaultSession } from 'next-auth';
import { useSession } from 'next-auth/react';

export default function useUser() {
  const { data: session } = useSession();

  let isLoggedIn = false;
  let user: DefaultSession['user'] | null = null;

  if (session && session.user) {
    isLoggedIn = true;
    user = session.user;
  }

  return {
    isLoggedIn,
    user
  }
}