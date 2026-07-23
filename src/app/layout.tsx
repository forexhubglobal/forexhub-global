import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ForexHub Global - Platform Perbandingan Broker Forex Terbaik Malaysia",
  description: "Bandingkan spread, regulation, bonus, cashback, platform dan ciri broker sebelum membuka akaun. Pendidikan trading dan tools untuk trader Malaysia.",
  keywords: ["Broker Forex Malaysia", "Review Broker Forex", "Forex Trading", "PAMM", "Prop Firm Malaysia"],
  openGraph: {
    title: 'ForexHub Global - Banding Broker & Trading Hub',
    description: 'Portal perbandingan broker forex #1 di Malaysia. Akses tools percuma, kalendar ekonomi, dan analisa berita AI.',
    url: 'https://forexhubglobal.com',
    siteName: 'ForexHub Global',
    images: [
      {
        url: '/images/og-image.jpg', // Placeholder for OG image
        width: 1200,
        height: 630,
        alt: 'ForexHub Global Preview',
      },
    ],
    locale: 'ms_MY',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ForexHub Global - Platform Perbandingan Broker',
    description: 'Bandingkan spread, margin, dan leverage broker forex terbaik sebelum daftar.',
    images: ['/images/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

import Script from 'next/script';
import LiveTicker from '@/components/LiveTicker';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getDataBySlug } from '@/lib/markdown';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Ambil tetapan WhatsApp jika ada (disetkan di Admin > Tetapan)
  const settings = await getDataBySlug('settings', 'main');
  const whatsappNumber = settings?.whatsappNumber || "60123456789";
  const whatsappMessage = settings?.whatsappMessage || "Hi ForexHubGlobal, saya nak tanya tentang broker...";
  
  // Google Analytics ID (can be set in .env.local)
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html
      lang="ms"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* Google Analytics Setup */}
      {gaId && (
        <head>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </head>
      )}
      <body className="min-h-full flex flex-col">
        <Script id="google-translate-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{
          __html: `
            window.googleTranslateElementInit = function() {
              new window.google.translate.TranslateElement({
                pageLanguage: 'ms', 
                includedLanguages: 'en,ms,ar,id,hi,ko,zh-CN,zh-TW,th,ja,pt,es,ru',
                layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
              }, 'google_translate_element');
            };
          `
        }} />
        <Script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" strategy="afterInteractive" />
        
        <LiveTicker />
        <Header />
        
        <div className="flex-grow flex flex-col">
          {children}
        </div>

        <Footer />
        <FloatingWhatsApp phoneNumber={whatsappNumber} message={whatsappMessage} />
      </body>
    </html>
  );
}
