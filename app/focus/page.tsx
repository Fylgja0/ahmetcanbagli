'use client';

import React from 'react';
import { usePortfolio } from '@/context/portfolio-context';
import { PageBreadcrumb } from '@/components/ui/PageBreadcrumb';
import { CurrentFocusSection } from '@/components/sections/CurrentFocusSection';
import { PageFooterNavigation } from '@/components/ui/PageFooterNavigation';

export default function FocusPage() {
  const { t } = usePortfolio();

  return (
    <div className="py-4 min-h-[80vh] flex flex-col justify-between">
      <div>
        <PageBreadcrumb
          currentPage={t.nav.currentFocus}
          badge="05_FOCUS"
          prevPage={{ href: '/education', label: t.nav.education }}
          nextPage={{ href: '/contact', label: t.nav.contact }}
        />
        <CurrentFocusSection />
      </div>
      <PageFooterNavigation
        prevPage={{ href: '/education', label: t.nav.education, badge: '04_EDUCATION' }}
        nextPage={{ href: '/contact', label: t.nav.contact, badge: '06_CONTACT' }}
      />
    </div>
  );
}
