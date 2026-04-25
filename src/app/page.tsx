import {
  AntesDespues,
  Closing,
  CostOfInaction,
  FAQ,
  Footer,
  Guarantee,
  Hero,
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
      <CostOfInaction />
      <ParaTiSi />
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
