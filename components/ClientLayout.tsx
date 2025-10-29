'use client';

import { useTheme } from './ThemeProvider';
import Header from './Header';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const { theme } = useTheme();
  
  return (
    <>
      <Header theme={theme} />
      {children}
    </>
  );
}
