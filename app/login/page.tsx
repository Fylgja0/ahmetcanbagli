import React from 'react';
import { redirect } from 'next/navigation';
import { getAdmin } from '@/lib/auth';
import { loginAction } from '@/app/actions/auth';
import { AdminLoginClient } from '@/components/admin/AdminLoginClient';
import { LoginErrorCode } from '@/types/admin';

export const dynamic = 'force-dynamic';

interface LoginPageProps {
  searchParams?: Promise<{ error?: string }>;
}

function parseLoginErrorCode(rawError?: string): LoginErrorCode | undefined {
  if (rawError === 'rate_limited') {
    return 'rate_limited';
  }
  if (rawError === 'temporarily_unavailable') {
    return 'temporarily_unavailable';
  }
  if (rawError === 'invalid_credentials' || rawError === 'Invalid email or password') {
    return 'invalid_credentials';
  }
  return undefined;
}

export default async function LoginPage(props: LoginPageProps) {
  const searchParams = await props.searchParams;
  const error = parseLoginErrorCode(searchParams?.error);

  const admin = await getAdmin();
  if (admin) {
    redirect('/admin');
  }

  return <AdminLoginClient error={error} onLogin={loginAction} />;
}
