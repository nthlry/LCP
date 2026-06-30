import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import ContactModal from '@/components/ContactModal';
import ThemeScope from '@/components/ThemeScope';
import AnimLoader from '@/components/AnimLoader';

export const metadata: Metadata = {
  metadataBase: new URL('https://le-campus-paris.fr'),
  authors: [{ name: 'Le Campus Paris' }],
  robots: 'index, follow',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" type="image/png" href="/assets/logo.png" />
        <link rel="apple-touch-icon" href="/assets/logo.png" />
        <link href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700,800,900&display=swap" rel="stylesheet" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="theme-site font-body-md antialiased">
        {/* Filtre SVG de distorsion partagé par tous les éléments
            ".liquid-glass" / ".glass-card" du site : c'est lui qui
            donne le vrai effet "liquide" (réfraction du fond derrière
            le verre), au-delà d'un simple flou. Invisible. */}
        <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true" focusable="false">
          <filter id="liquid-distortion">
            <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="2" seed="7" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="22" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
        <ThemeScope />
        <Header />
        <ContactModal />
        {children}
        <AnimLoader />
        {/* Script de suivi HubSpot : pose le cookie « hubspotutk » qui permet
            de relier les soumissions du formulaire à un vrai visiteur. Sans lui,
            HubSpot classe les soumissions de la Forms API en spam. */}
        <Script
          id="hs-script-loader"
          strategy="afterInteractive"
          src="https://js.hs-scripts.com/2822390.js"
        />
      </body>
    </html>
  );
}
