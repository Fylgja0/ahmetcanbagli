import React from 'react';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { sql } from '@/lib/db';
import { getAdmin, getClientDevice } from '@/lib/auth';
import { AdminLoginClient } from '@/components/admin/AdminLoginClient';

export const dynamic = 'force-dynamic';

interface LoginPageProps {
    searchParams?: Promise<{ error?: string }>;
}

async function loginAction(formData: FormData) {
    'use server';

    const eposta = formData.get('eposta')?.toString().trim();
    const sifre = formData.get('sifre')?.toString();

    if (!eposta || !sifre) {
        redirect(`/login?error=${encodeURIComponent('Invalid email or password')}`);
    }

    try {
        // 1. Find administrator by email
        const users = await sql`SELECT * FROM yoneticiler WHERE eposta = ${eposta}`;
        if (!users || users.length === 0) {
            redirect(`/login?error=${encodeURIComponent('Invalid email or password')}`);
        }

        const yonetici = users[0];

        // 2. Verify password with bcrypt
        const sifreDogru = await bcrypt.compare(sifre, yonetici.sifre_hash);
        if (!sifreDogru) {
            redirect(`/login?error=${encodeURIComponent('Invalid email or password')}`);
        }

        // 3. Generate 2-hour random token
        const token = crypto.randomBytes(32).toString('hex');
        const bitis = new Date(Date.now() + 2 * 60 * 60 * 1000);
        const cihaz = await getClientDevice();

        await sql`
            INSERT INTO oturumlar (token, yonetici_id, bitis, son_aktivite, cihaz)
            VALUES (${token}, ${yonetici.id}, ${bitis.toISOString()}, now(), ${cihaz})
        `;

        // 4. Set httpOnly, secure, sameSite cookie
        const cookieStore = await cookies();
        cookieStore.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            expires: bitis,
            path: '/',
        });
    } catch (err: unknown) {
        const errorObj = err as { message?: string; digest?: string };
        if (errorObj?.message?.includes('NEXT_REDIRECT') || errorObj?.digest?.includes('NEXT_REDIRECT')) {
            throw err;
        }
        console.error('Login error:', err);
        redirect(`/login?error=${encodeURIComponent('Invalid email or password')}`);
    }

    redirect('/admin');
}

export default async function LoginPage(props: LoginPageProps) {
    const searchParams = await props.searchParams;
    const error = searchParams?.error;

    // Redirect to admin panel if already logged in
    const admin = await getAdmin();
    if (admin) {
        redirect('/admin');
    }

    return (
        <AdminLoginClient error={error} onLogin={loginAction} />
    );
}
