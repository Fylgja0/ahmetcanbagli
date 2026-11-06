import React from 'react';
import { sql } from '@/lib/db';
import { notFound } from 'next/navigation';
import { getAdmin } from '@/lib/auth';
import { getAwardsVisibility } from '@/lib/settings';
import { AwardsContent, OdulKaydi } from '@/components/sections/AwardsContent';

export const dynamic = 'force-dynamic';

export default async function AwardsPage() {
    const isVisible = await getAwardsVisibility();
    const admin = await getAdmin();

    // If awards is hidden on public site and no admin session exists, return 404
    if (!isVisible && !admin) {
        notFound();
    }

    let oduller: OdulKaydi[] = [];
    let oneCikanlar: OdulKaydi[] = [];

    try {
        const tumKayitlar = await sql`
            SELECT o.*, ot.ad AS kategori_adi 
            FROM oduller o
            LEFT JOIN odul_turleri ot ON ot.id = o.kategori_id
            WHERE o.yayinda = true
            ORDER BY o.tarih DESC NULLS LAST, o.id DESC
        `;
        oduller = tumKayitlar as unknown as OdulKaydi[];

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
        console.error('Database query error in AwardsPage:', err);
    }

    return (
        <AwardsContent
            oduller={oduller}
            oneCikanlar={oneCikanlar}
            isVisible={isVisible}
        />
    );
}

