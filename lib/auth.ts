import { sql } from './db';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

export interface AdminUser {
    id: number;
    eposta: string;
}

// Aktif yöneticiyi ve oturum geçerliliğini kontrol eder (Görev 6.2 kuralı)
export async function getAdmin(): Promise<AdminUser | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token) return null;

    // 30 dakika işlem yapılmayan ya da bitiş süresi dolan oturum düşer
    const rows = await sql`
        SELECT y.id, y.eposta FROM oturumlar o
        JOIN yoneticiler y ON y.id = o.yonetici_id
        WHERE o.token = ${token} 
          AND o.bitis > now()
          AND o.son_aktivite > now() - interval '30 minutes'
    `;

    if (rows && rows.length > 0) {
        // Son aktivite zamanını güncelle
        await sql`UPDATE oturumlar SET son_aktivite = now() WHERE token = ${token}`;
        return rows[0] as unknown as AdminUser;
    }

    return null;
}

// İstemcinin tarayıcı/cihaz bilgisini alır (Görev 6.3 kuralı)
export async function getClientDevice(): Promise<string> {
    const headersList = await headers();
    return headersList.get('user-agent') || 'Bilinmeyen Cihaz';
}

// Server Action veya korumalı sayfalar için yetki doğrulaması
export async function requireAdmin(): Promise<AdminUser> {
    const admin = await getAdmin();
    if (!admin) {
        redirect('/giris');
    }
    return admin;
}
