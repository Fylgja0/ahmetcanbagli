import React from 'react';
import { sql } from '@/lib/db';
import { getAwardsVisibility } from '@/lib/settings';
import { HomeAwardsTeaserClient } from './HomeAwardsTeaserClient';
import { OdulKaydi } from './AwardsContent';

export async function HomeAwardsTeaser() {
    const isVisible = await getAwardsVisibility();
    if (!isVisible) {
        return null;
    }

    let awards: OdulKaydi[] = [];

    try {
        // En yeni 4 ödülü listele (yayinda = true)
        const rows = await sql`
            SELECT o.*, ot.ad AS kategori_adi 
            FROM oduller o
            LEFT JOIN odul_turleri ot ON ot.id = o.kategori_id
            WHERE o.yayinda = true
            ORDER BY o.tarih DESC NULLS LAST
            LIMIT 4
        `;
        awards = rows as unknown as OdulKaydi[];
    } catch (err) {
        console.error('HomeAwardsTeaser veritabanı sorgu hatası:', err);
    }

    if (!awards || awards.length === 0) {
        return null;
    }

    return <HomeAwardsTeaserClient awards={awards} />;
}
