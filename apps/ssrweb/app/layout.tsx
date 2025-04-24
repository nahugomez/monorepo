import type { Metadata } from 'next';
import { ViewTransitions } from 'next-view-transitions';
import './globals.css';

export const metadata: Metadata = {
  title: 'SSR Web Next.js',
  description: 'Next.js con SSR',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ViewTransitions>
      <html lang="es">
        <body>{children}</body>
      </html>
    </ViewTransitions>
  );
}
