'use server';

import { sql } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export interface ContactActionResult {
    success: boolean;
    message?: string;
    error?: string;
}

export async function sendMessageAction(
    prevState: ContactActionResult | null,
    formData: FormData
): Promise<ContactActionResult> {
    try {
        const ad_soyad = formData.get('ad_soyad')?.toString().trim();
        const eposta = formData.get('eposta')?.toString().trim().toLowerCase();
        const mesaj = formData.get('mesaj')?.toString().trim();
        const kvkk_onay = formData.get('kvkk_onay') === 'true' || formData.get('kvkk_onay') === 'on';

        // 1. Sunucu tarafı zorunlu alan kontrolü
        if (!ad_soyad || !eposta || !mesaj) {
            return {
                success: false,
                error: 'Lütfen ad-soyad, e-posta ve mesaj alanlarının tümünü doldurunuz.'
            };
        }

        // 2. Alan uzunluk doğrulamaları (Görev 5 kuralı: Boş veya çok uzun alanları sunucuda reddedin)
        if (ad_soyad.length < 2 || ad_soyad.length > 100) {
            return {
                success: false,
                error: 'Ad Soyad 2 ile 100 karakter arasında olmalıdır.'
            };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(eposta) || eposta.length > 254) {
            return {
                success: false,
                error: 'Lütfen geçerli bir e-posta adresi giriniz (en fazla 254 karakter).'
            };
        }

        if (mesaj.length < 5 || mesaj.length > 5000) {
            return {
                success: false,
                error: 'Mesaj metni 5 ile 5000 karakter arasında olmalıdır.'
            };
        }

        // 3. KVKK Onay kontrolü (Görev 5 & Bilişim Hukuku kuralı)
        if (!kvkk_onay) {
            return {
                success: false,
                error: 'Mesaj gönderebilmek için KVKK Aydınlatma Metnini onaylamanız gerekmektedir.'
            };
        }

        // 4. Veritabanına güvenli ekleme (SQL Injection koruması: tagged template)
        await sql`
            INSERT INTO iletisim_mesajlari (ad_soyad, eposta, mesaj, kvkk_onay, okundu)
            VALUES (${ad_soyad}, ${eposta}, ${mesaj}, ${kvkk_onay}, false)
        `;

        // 5. Admin paneli önbelleğini tazele
        revalidatePath('/admin/mesajlar');
        revalidatePath('/admin');

        return {
            success: true,
            message: 'Mesajınız başarıyla veritabanına kaydedildi. En kısa sürede geri dönüş yapılacaktır.'
        };
    } catch (error) {
        console.error('Mesaj gönderme hatası:', error);
        return {
            success: false,
            error: 'Mesaj iletilirken bir sunucu hatası oluştu. Lütfen daha sonra tekrar deneyiniz.'
        };
    }
}
