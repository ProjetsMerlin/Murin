import { Metadata } from 'next';
import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

export const metadata: Metadata = {
  title: {
    template: 'Murin Dashboard | %s',
    default: 'Murin Dashboard',
  },
  description: 'Votre facturation ave Muin',
  metadataBase: new URL('https://murin.vercel.app'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr-BE">
      <body className={`murin ${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
