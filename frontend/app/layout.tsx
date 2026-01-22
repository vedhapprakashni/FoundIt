import type { Metadata } from 'next';
import { Outfit } from 'next/font/google'; // Using Outfit for a more modern/GenZ look than Inter
import './globals.css';
import DoodleBackground from '@/components/DoodleBackground';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'FoundIt - Campus Lost & Found',
  description: 'AI-powered lost and found for students.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased relative overflow-x-hidden min-h-screen`}>
        <DoodleBackground />
        <main className="relative z-10 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
