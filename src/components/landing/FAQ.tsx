import { FAQS } from '@/lib/constants'

export function FAQ() {
  return (
    <section className="sec-light py-24 sm:py-36">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 reveal">
          <div className="flex items-center justify-center gap-4 mb-7">
            <div className="h-px w-8 bg-gold" />
            <div className="eyebrow">Preguntas</div>
            <div className="h-px w-8 bg-gold" />
          </div>
          <h2 className="font-display text-display-lg text-ink">
            <span data-editable="faq-h">
              Lo que te preguntas<br />
              <span className="italic text-magenta">antes de reservar.</span>
            </span>
          </h2>
        </div>

        <div className="space-y-3 reveal">
          {FAQS.map((faq, i) => (
            <details key={i} className="border border-ink/15 group overflow-hidden hover:border-ink/40 transition bg-paper">
              <summary className="flex items-center justify-between gap-4 p-6 hover:bg-bone-dark transition cursor-pointer list-none">
                <span className="font-display italic text-xl sm:text-2xl text-ink" data-editable={`faq-${i + 1}-q`}>
                  {faq.q}
                </span>
                <span className="text-magenta text-3xl font-light shrink-0 transition-transform duration-300 group-open:rotate-45" aria-hidden>
                  +
                </span>
              </summary>
              <div className="px-6 pb-6 text-charcoal leading-relaxed text-base font-light" data-editable={`faq-${i + 1}-a`}>
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
