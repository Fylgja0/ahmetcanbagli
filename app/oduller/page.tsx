import React from 'react';
import { sql } from '@/lib/db';
import { notFound } from 'next/navigation';
import { getAdmin } from '@/lib/auth';
import { getAwardsVisibility } from '@/lib/settings';
import { AwardsContent, OdulKaydi } from '@/components/sections/AwardsContent';

export const dynamic = 'force-dynamic';

export default async function OdullerPage() {
    const isVisible = await getAwardsVisibility();
    const admin = await getAdmin();

    // Eğer ana sitede gizlendiyse ve giriş yapmış bir admin yoksa 404 döndür
    if (!isVisible && !admin) {
        notFound();
    }

    let oduller: OdulKaydi[] = [];
    let oneCikanlar: OdulKaydi[] = [];

    try {
        // Yalnızca yayinda = true olan kayıtlar gösterilsin
        const tumKayitlar = await sql`
            SELECT o.*, ot.ad AS kategori_adi 
            FROM oduller o
            LEFT JOIN odul_turleri ot ON ot.id = o.kategori_id
            WHERE o.yayinda = true
            ORDER BY o.tarih DESC NULLS LAST, o.id DESC
        `;
        oduller = tumKayitlar as unknown as OdulKaydi[];

        // Öne Çıkanlar (En yeni 4 ödül)
        const enYeniDort = await sql`
            SELECT o.*, ot.ad AS kategori_adi 
            FROM oduller o
            LEFT JOIN odul_turleri ot ON ot.id = o.kategori_id
            WHERE o.yayinda = true
            ORDER BY o.tarih DESC NULLS LAST
            LIMIT 4
        `;
        oneCikanlar = enYeniDort as unknown as OdulKaydi[];
    } catch (err) {
        console.error('Ödüller veritabanından çekilirken hata:', err);
    }

    return (
        <AwardsContent
            oduller={oduller}
            oneCikanlar={oneCikanlar}
            isVisible={isVisible}
        />
    );
}
