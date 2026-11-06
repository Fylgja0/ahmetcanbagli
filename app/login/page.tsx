import React from 'react';
import { redirect } from 'next/navigation';
import { getAdmin } from '@/lib/auth';
import { loginAction } from '@/app/actions/auth';
import { AdminLoginClient } from '@/components/admin/AdminLoginClient';

export const dynamic = 'force-dynamic';

interface LoginPageProps {
  searchParams?: Promise<{ error?: string }>;
}

export default async function LoginPage(props: LoginPageProps) {
  const searchParams = await props.searchParams;
  const error = searchParams?.error;

  const admin = await getAdmin();
  if (admin) {
    redirect('/admin');
  }

  return <AdminLoginClient error={error} onLogin={loginAction} />;
}
