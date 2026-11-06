import React from 'react';
import { redirect } from 'next/navigation';
import { getAdmin } from '@/lib/auth';
import { logoutAction } from '@/app/actions/auth';
import { AdminHeader } from '@/components/admin/AdminHeader';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAdmin();
  if (!admin) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <AdminHeader email={admin.email} onSignOut={logoutAction} />
      <main>{children}</main>
    </div>
  );
}
