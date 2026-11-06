'use server';

import { revalidatePath } from 'next/cache';
import { sql } from '@/lib/db';

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
    const fullName = (formData.get('name') || formData.get('ad_soyad'))
      ?.toString()
      .trim();
    const email = (formData.get('email') || formData.get('eposta'))
      ?.toString()
      .trim()
      .toLowerCase();
    const message = (formData.get('message') || formData.get('mesaj'))
      ?.toString()
      .trim();
    const consentGiven =
      formData.get('consent') === 'true' ||
      formData.get('consent') === 'on' ||
      formData.get('kvkk_onay') === 'true' ||
      formData.get('kvkk_onay') === 'on';

    // 1. Validate required fields on the server
    if (!fullName || !email || !message) {
      return {
        success: false,
        error: 'Please fill in your full name, email address, and message.',
      };
    }

    // 2. Validate field length constraints
    if (fullName.length < 2 || fullName.length > 100) {
      return {
        success: false,
        error: 'Full name must be between 2 and 100 characters.',
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.length > 254) {
      return {
        success: false,
        error: 'Please enter a valid email address (maximum 254 characters).',
      };
    }

    if (message.length < 5 || message.length > 5000) {
      return {
        success: false,
        error: 'Message must be between 5 and 5000 characters.',
      };
    }

    // 3. Verify explicit data privacy (GDPR / KVKK) consent
    if (!consentGiven) {
      return {
        success: false,
        error: 'Please accept the Data Privacy Notice before sending your message.',
      };
    }

    // 4. Parameterized insert to prevent SQL injection
    await sql`
      INSERT INTO iletisim_mesajlari (ad_soyad, eposta, mesaj, kvkk_onay, okundu)
      VALUES (${fullName}, ${email}, ${message}, ${consentGiven}, false)
    `;

    // 5. Revalidate admin routes
    revalidatePath('/admin/messages');
    revalidatePath('/admin');

    return {
      success: true,
      message:
        'Your message has been saved to the database. We will get back to you shortly.',
    };
  } catch (error) {
    console.error('Contact message submission error:', error);
    return {
      success: false,
      error: 'A server error occurred while sending your message. Please try again later.',
    };
  }
}
