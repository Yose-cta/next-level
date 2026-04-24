import { FAQS } from '@/lib/constants'

export function FAQ() {
  return (
    <section className="py-24 sm:py-32 border-b border-champagne/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <div className="secnum mb-4">09 — PREGUNTAS</div>
          <h2 className="font-display text-4xl sm:text-5xl text-cream font-light">
            <span data-editable="faq-h">Lo que la gente nos pregunta antes de reservar.</span>
          </h2>
        </div>

        <div className="space-y-3 reveal">
          {FAQS.map((faq, i) => (
            <details
              key={i}
              className="border border-champagne/20 rounded-sm group [&_.faq-icon]:open:rotate-45"
            >
              <summary className="flex items-center justify-between gap-4 p-6 hover:bg-champagne/5 transition cursor-pointer list-none">
                <span
                  className="font-display text-xl text-cream"
                  data-editable={`faq-${i + 1}-q`}
                >
                  {faq.q}
                </span>
                <span
                  className="faq-icon text-electric text-2xl font-light shrink-0 transition-transform"
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <div
                className="px-6 pb-6 text-cream/75 leading-relaxed"
                data-editable={`faq-${i + 1}-a`}
              >
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
