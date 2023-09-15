import DashboardComponent from '@/components/app/dashboard';
import AppLayoutComponent from '@/components/app/layout/AppLayout';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={`min-h-screen ${inter.className}`}>
      <AppLayoutComponent>
        <DashboardComponent />
      </AppLayoutComponent>
    </main>
  );
}
