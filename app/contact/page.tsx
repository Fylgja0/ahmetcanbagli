'use client';

import React from 'react';
import { usePortfolio } from '@/context/portfolio-context';
import { PageBreadcrumb } from '@/components/ui/PageBreadcrumb';
import { ContactSection } from '@/components/sections/ContactSection';
import { PageFooterNavigation } from '@/components/ui/PageFooterNavigation';

export default function ContactPage() {
  const { t } = usePortfolio();

  return (
    <div className="py-4 min-h-[80vh] flex flex-col justify-between">
      <div>
        <PageBreadcrumb
          currentPage={t.nav.contact}
          badge="06_CONTACT"
          prevPage={{ href: '/focus', label: t.nav.currentFocus }}
          nextPage={{ href: '/', label: t.nav.home }}
        />
        <ContactSection />
      </div>
      <PageFooterNavigation
        prevPage={{ href: '/focus', label: t.nav.currentFocus, badge: '05_FOCUS' }}
        nextPage={{ href: '/', label: t.nav.home, badge: '00_HOME' }}
      />
    </div>
  );
}
