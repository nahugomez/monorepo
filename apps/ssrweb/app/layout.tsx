import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SSR Web Next.js',
  description: 'Next.js con SSR',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
