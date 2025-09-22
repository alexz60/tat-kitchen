'use client';

import { HeroUIProvider } from '@heroui/react';
import Header from '@/components/UI/layout/header';

export function Providers({ children }: { children: React.ReactNode }) {
    return <HeroUIProvider>{children}</HeroUIProvider>;
}
