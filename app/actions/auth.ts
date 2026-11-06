'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { sql } from '@/lib/db';
import { getClientDevice } from '@/lib/auth';

export async function loginAction(formData: FormData): Promise<void> {
  const email = (formData.get('email') || formData.get('eposta'))?.toString().trim();
  const password = (formData.get('password') || formData.get('sifre'))?.toString();

  if (!email || !password) {
    redirect(`/login?error=${encodeURIComponent('Invalid email or password')}`);
  }

  try {
    // 1. Find administrator by email
    const users = await sql`SELECT * FROM yoneticiler WHERE eposta = ${email}`;
    if (!users || users.length === 0) {
      redirect(`/login?error=${encodeURIComponent('Invalid email or password')}`);
    }

    const adminRow = users[0] as { id: number; eposta: string; sifre_hash: string };

    // 2. Verify password with bcrypt
    const isPasswordValid = await bcrypt.compare(password, adminRow.sifre_hash);
    if (!isPasswordValid) {
      redirect(`/login?error=${encodeURIComponent('Invalid email or password')}`);
    }

    // 3. Generate 2-hour random session token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000);
    const userAgent = await getClientDevice();

    await sql`
      INSERT INTO oturumlar (token, yonetici_id, bitis, son_aktivite, cihaz)
      VALUES (${token}, ${adminRow.id}, ${expiresAt.toISOString()}, now(), ${userAgent})
    `;

    // 4. Set httpOnly, secure, sameSite cookie
    const cookieStore = await cookies();
    cookieStore.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: expiresAt,
      path: '/',
    });
  } catch (err: unknown) {
    const errorObj = err as { message?: string; digest?: string };
    if (
      errorObj?.message?.includes('NEXT_REDIRECT') ||
      errorObj?.digest?.includes('NEXT_REDIRECT')
    ) {
      throw err;
    }
    console.error('Login error:', err);
    redirect(`/login?error=${encodeURIComponent('Invalid email or password')}`);
  }

  redirect('/admin');
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (token) {
    try {
      await sql`DELETE FROM oturumlar WHERE token = ${token}`;
    } catch (err) {
      console.error('Failed to delete session on logout:', err);
    }
    cookieStore.delete('admin_token');
  }

  redirect('/login');
}
