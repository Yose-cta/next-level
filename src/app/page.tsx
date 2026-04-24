import {
  Closing,
  CostOfInaction,
  ExperienceBlocks,
  FAQ,
  Footer,
  Guarantee,
  Hero,
  Mentors,
  Mirror,
  PromiseSection,
  StickyBar,
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
      <PromiseSection />
      <ExperienceBlocks />
      <Mentors />
      <Tickets />
      <Testimonials />
      <Guarantee />
      <FAQ />
      <Closing />
      <Footer />
    </main>
  )
}
