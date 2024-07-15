import Providers from '@/components/providers';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import ToastProvider from '@/components/providers/ToastProvider';
import Layout from '@/components/layout';

const SF_Pro_Rounded = localFont({
  src: [
    {
      path: '../../public/fonts/SF-Pro-Rounded-Regular.otf',
      weight: '400',
    },
    {
      path: '../../public/fonts/SF-Pro-Rounded-Medium.otf',
      weight: '500',
    },
    {
      path: '../../public/fonts/SF-Pro-Rounded-SemiBold.otf',
      weight: '600',
    },
    {
      path: '../../public/fonts/SF-Pro-Rounded-Bold.otf',
      weight: '700',
    },
  ],
  variable: '--font-SF_Pro_Rounded',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'OnlyBlinks',
  description: 'Share blinks',
  openGraph: {
    images: 'https://onlyblinks.com/og.jpeg',
  },
  icons: {
    icon: 'https://onlyblinks.com/favicon.jpeg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang='en'>
        <body className={`${SF_Pro_Rounded.variable} ${inter.variable}`}>
          <ToastProvider>
            <Layout>{children}</Layout>
          </ToastProvider>
        </body>
      </html>
    </Providers>
  );
}
