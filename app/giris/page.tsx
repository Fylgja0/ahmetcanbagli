import React from 'react';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { sql } from '@/lib/db';
import { getAdmin, getClientDevice } from '@/lib/auth';
import Link from 'next/link';
import { ShieldCheck, Lock, Mail, ArrowLeft, AlertCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface GirisPageProps {
    searchParams?: Promise<{ error?: string }>;
}

async function girisYapAction(formData: FormData) {
    'use server';

    const eposta = formData.get('eposta')?.toString().trim();
    const sifre = formData.get('sifre')?.toString();

    if (!eposta || !sifre) {
        redirect(`/giris?error=${encodeURIComponent('E-posta veya şifre hatalı')}`);
    }

    try {
        // 1. Yöneticiyi e-postaya göre bul
        const users = await sql`SELECT * FROM yoneticiler WHERE eposta = ${eposta}`;
        if (!users || users.length === 0) {
            redirect(`/giris?error=${encodeURIComponent('E-posta veya şifre hatalı')}`);
        }

        const yonetici = users[0];

        // 2. bcrypt ile şifre doğrulaması
        const sifreDogru = await bcrypt.compare(sifre, yonetici.sifre_hash);
        if (!sifreDogru) {
            redirect(`/giris?error=${encodeURIComponent('E-posta veya şifre hatalı')}`);
        }

        // 3. 2 saat geçerli rastgele token üret (Görev 4.1 & 6.1)
        const token = crypto.randomBytes(32).toString('hex');
        const bitis = new Date(Date.now() + 2 * 60 * 60 * 1000);
        const cihaz = await getClientDevice();

        await sql`
            INSERT INTO oturumlar (token, yonetici_id, bitis, son_aktivite, cihaz)
            VALUES (${token}, ${yonetici.id}, ${bitis.toISOString()}, now(), ${cihaz})
        `;

        // 4. httpOnly, secure, sameSite çerezi yaz
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
        console.error('Giriş hatası:', err);
        redirect(`/giris?error=${encodeURIComponent('E-posta veya şifre hatalı')}`);
    }

    redirect('/admin');
}

export default async function GirisPage(props: GirisPageProps) {
    const searchParams = await props.searchParams;
    const error = searchParams?.error;

    // Zaten giriş yapmışsa direkt admin paneline yönlendir
    const admin = await getAdmin();
    if (admin) {
        redirect('/admin');
    }

    return (
        <div className="min-h-[85vh] flex items-center justify-center p-4 pt-24 sm:pt-28 pb-12 relative">
            <div className="w-full max-w-md relative z-10">
                {/* Portfolyoya Geri Dön Butonu */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-xs font-mono text-white/70 hover:text-[var(--theme-accent)] transition-colors mb-6 group px-3.5 py-2 rounded-lg bg-[var(--theme-surface)]/80 border border-[var(--theme-border)] shadow-md"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>← Portfolyo Ana Sayfasına Dön</span>
                </Link>

                <div className="bg-[var(--theme-card)]/90 backdrop-blur-xl border border-[var(--theme-border)] rounded-2xl shadow-2xl p-6 sm:p-8">
                    {/* Başlık ve Kilit İkonu */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[var(--theme-badge-bg)] border border-[var(--theme-border)] text-[var(--theme-accent)] mb-4 shadow-inner">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-white font-mono">
                            Yönetici Girişi
                        </h1>
                        <p className="text-xs text-white/60 mt-1.5 font-mono">
                            BVA 2205 Siber Güvenlik ve Bilişim Hukuku Paneli
                        </p>
                    </div>

                    {/* Hata Bildirimi (Ödev kuralı: Yalnızca "E-posta veya şifre hatalı" deyin) */}
                    {error && (
                        <div className="mb-6 p-3.5 rounded-lg bg-red-950/60 border border-red-500/30 text-red-300 text-xs flex items-center gap-2.5">
                            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Giriş Formu */}
                    <form action={girisYapAction} className="space-y-4 font-mono text-xs">
                        <div>
                            <label className="block text-white/80 font-medium mb-1.5">
                                Yönetici E-Posta
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <input
                                    type="email"
                                    name="eposta"
                                    required
                                    autoComplete="email"
                                    placeholder="ornek@yonetici.com"
                                    className="w-full pl-10 pr-4 py-2.5 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[var(--theme-accent)] focus:ring-1 focus:ring-[var(--theme-accent)] transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-white/80 font-medium mb-1.5">
                                Yönetici Şifresi
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                                    <Lock className="w-4 h-4" />
                                </div>
                                <input
                                    type="password"
                                    name="sifre"
                                    required
                                    autoComplete="current-password"
                                    placeholder="••••••••••••"
                                    className="w-full pl-10 pr-4 py-2.5 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[var(--theme-accent)] focus:ring-1 focus:ring-[var(--theme-accent)] transition-all"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-2 py-3 px-4 bg-[var(--theme-accent)] hover:opacity-90 text-black font-mono text-xs font-bold rounded-lg shadow-lg shadow-[var(--theme-accent)]/20 transition-all cursor-pointer"
                        >
                            Güvenli Giriş Yap
                        </button>
                    </form>

                    <div className="mt-6 pt-5 border-t border-white/10 text-center">
                        <p className="text-[11px] text-white/50 font-mono">
                            2 saatlik oturum süresi • 30 dk hareketsizlik zaman aşımı • bcrypt şifre özeti
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
