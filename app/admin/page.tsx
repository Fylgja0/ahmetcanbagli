import React from 'react';
import { sql } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { getAwardsVisibility } from '@/lib/settings';
import { toggleAwardsVisibilityAction } from '@/app/actions/settings';
import { AdminDashboardClient } from '@/components/admin/AdminDashboardClient';

export const dynamic = 'force-dynamic';

export default async function AdminHomePage() {
    const admin = await requireAdmin();

    let toplamOdul = 0;
    let toplamProje = 0;
    let toplamMesaj = 0;
    let okunmamisMesaj = 0;
    let aktifOturum = 1;
    let awardsVisible = true;

    try {
        const [odulCountRes, projeCountRes, mesajCountRes, okunmamisCountRes, oturumCountRes, visibility] = await Promise.all([
            sql`SELECT COUNT(*)::int AS toplam FROM oduller`,
            sql`SELECT COUNT(*)::int AS toplam FROM projeler`.catch(() => [{ toplam: 0 }]),
            sql`SELECT COUNT(*)::int AS toplam FROM iletisim_mesajlari`,
            sql`SELECT COUNT(*)::int AS okunmamis FROM iletisim_mesajlari WHERE okundu = false`,
            sql`SELECT COUNT(*)::int AS aktif_oturum FROM oturumlar WHERE bitis > now() AND son_aktivite > now() - interval '30 minutes'`,
            getAwardsVisibility()
        ]);

        toplamOdul = odulCountRes[0]?.toplam || 0;
        toplamProje = projeCountRes[0]?.toplam || 0;
        toplamMesaj = mesajCountRes[0]?.toplam || 0;
        okunmamisMesaj = okunmamisCountRes[0]?.okunmamis || 0;
        aktifOturum = oturumCountRes[0]?.aktif_oturum || 1;
        awardsVisible = visibility;
    } catch (e) {
        console.error('Failed to load dashboard metrics:', e);
    }

    return (
        <AdminDashboardClient
            adminEmail={admin.eposta}
            awardsVisible={awardsVisible}
            toplamOdul={toplamOdul}
            toplamProje={toplamProje}
            okunmamisMesaj={okunmamisMesaj}
            toplamMesaj={toplamMesaj}
            aktifOturum={aktifOturum}
            onToggleAwardsVisibility={toggleAwardsVisibilityAction}
        />
    );
}
