import { logOut } from '@/actions/auth';
import { redirect } from 'next/navigation';

const LogoutPage = async () => {
  async function handleLogout() {
    'use server';

    await logOut();
  }
  handleLogout();
  redirect('/');
};

export default LogoutPage;
