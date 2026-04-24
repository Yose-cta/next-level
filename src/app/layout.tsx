import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter, Spline_Sans_Mono } from 'next/font/google'
import { EditModeProvider } from '@/components/editable/EditModeProvider'
import { WhatsAppFloating } from '@/components/landing/WhatsAppFloating'
import { Trackers } from '@/components/tracking/Trackers'
import { CONTACT, META, WORKSHOP } from '@/lib/constants'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const splineSansMono = Spline_Sans_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['300', '400', '500'],
})

export const metadata: Metadata = {
  metadataBase: new URL(CONTACT.url),
  title: {
    default: META.title,
    template: '%s · Next Level',
  },
  description: META.description,
  keywords: [
    'workshop presencial',
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
    siteName: 'Next Level Workshop',
    title: META.title,
    description: META.description,
    images: [
      {
        url: META.ogImage,
        width: 1200,
        height: 630,
        alt: 'Next Level Workshop · 16 Mayo 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: META.title,
    description: META.description,
    images: [META.ogImage],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: CONTACT.url },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
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
      className={`${fraunces.variable} ${inter.variable} ${splineSansMono.variable} scroll-smooth`}
    >
      <body className="bg-noir text-cream font-sans antialiased grain-overlay">
        {children}
        <WhatsAppFloating />
        <EditModeProvider />
        <Trackers />
      </body>
    </html>
  )
}
