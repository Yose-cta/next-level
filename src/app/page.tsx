import {
  AntesDespues,
  Closing,
  FAQ,
  Footer,
  Guarantee,
  Hero,
  Hook,
  Mentors,
  Mirror,
  ParaTiSi,
  StickyBar,
  Takeaways,
  Testimonials,
  Ticker,
  Tickets,
  VIPDetail,
} from '@/components/landing'

export default function HomePage() {
  return (
    <main>
      <StickyBar />
      <Hero />
      <Ticker />
      <Mirror />
      <ParaTiSi />
      <Hook />
      <Mentors />
      <Takeaways />
      <AntesDespues />
      <Tickets />
      <VIPDetail />
      <Testimonials />
      <Guarantee />
      <FAQ />
      <Closing />
      <Footer />
    </main>
  )
}
