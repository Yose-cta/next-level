import type { Metadata, Viewport } from 'next'
import { Instrument_Serif, Inter, JetBrains_Mono } from 'next/font/google'
import { EditModeProvider } from '@/components/editable/EditModeProvider'
import { LuxuryEffects } from '@/components/LuxuryEffects'
import { RevealOnScroll } from '@/components/RevealOnScroll'
import { WhatsAppFloating } from '@/components/landing/WhatsAppFloating'
import { Trackers } from '@/components/tracking/Trackers'
import { CONTACT, META, WORKSHOP } from '@/lib/constants'
import './globals.css'

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(CONTACT.url),
  title: { default: META.title, template: '%s · Next Level Experience' },
  description: META.description,
  keywords: [
    'Next Level Experience',
    'Half-Day Workshop',
    'IA aplicada',
    'Claude AI',
    'imagen y color',
    'comunicación y ventas',
    'Santiago de Chile',
    'Yoselvia Adam',
    `${WORKSHOP.date.display}`,
  ],
  authors: [{ name: 'Yoselvia Adam', url: CONTACT.url }],
  creator: 'Yoselvia Adam',
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: CONTACT.url,
    siteName: 'Next Level Experience',
    title: META.title,
    description: META.description,
    images: [{ url: META.ogImage, width: 1200, height: 630, alt: 'Next Level Experience · 16 Mayo 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: META.title,
    description: META.description,
    images: [META.ogImage],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: CONTACT.url },
  icons: {
    icon: '/next-level-logo.png',
    apple: '/next-level-logo.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0820',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es"
      className={`${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="bg-midnight text-white font-sans antialiased">
        {children}
        <WhatsAppFloating />
        <EditModeProvider />
        <RevealOnScroll />
        <LuxuryEffects />
        <Trackers />
      </body>
    </html>
  )
}
