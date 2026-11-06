import React from 'react';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getAdmin } from '@/lib/auth';
import { sql } from '@/lib/db';
import { AdminHeader } from '@/components/admin/AdminHeader';

export const dynamic = 'force-dynamic';

async function cikisYapAction() {
    'use server';
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (token) {
        await sql`DELETE FROM oturumlar WHERE token = ${token}`;
        cookieStore.delete('admin_token');
    }

    redirect('/login');
}

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
            <AdminHeader email={admin.eposta} onSignOut={cikisYapAction} />
            <main>
                {children}
            </main>
        </div>
    );
}
