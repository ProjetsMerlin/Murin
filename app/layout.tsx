import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr-BE">
      <title>Murin</title>
      <body className={`murin ${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
