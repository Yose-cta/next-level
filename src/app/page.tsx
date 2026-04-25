import {
  Closing,
  CostOfInaction,
  FAQ,
  Footer,
  Guarantee,
  Hero,
  Mentors,
  Mirror,
  StickyBar,
  Takeaways,
  Testimonials,
  Tickets,
  Ticker,
} from '@/components/landing'

export default function HomePage() {
  return (
    <main>
      <StickyBar />
      <Hero />
      <Ticker />
      <Mirror />
      <CostOfInaction />
      <Mentors />
      <Takeaways />
      <Tickets />
      <Testimonials />
      <Guarantee />
      <FAQ />
      <Closing />
      <Footer />
    </main>
  )
}
