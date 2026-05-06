import {
  AntesDespues,
  Closing,
  FAQ,
  Footer,
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
import { TicketsCTA } from '@/components/landing/TicketsCTA'

export default function HomePage() {
  return (
    <main>
      <StickyBar />
      <Hero />
      <Ticker />
      <Mirror />
      <ParaTiSi />
      <Hook />
      <Tickets />
      <Mentors />
      <VIPDetail />
      <Takeaways />
      <AntesDespues />
      <Testimonials />
      <TicketsCTA />
      <FAQ />
      <Closing />
      <Footer />
    </main>
  )
}
