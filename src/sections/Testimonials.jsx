import { FiStar } from 'react-icons/fi'
import SectionHeading from '../components/SectionHeading'
import GlassCard from '../components/GlassCard'
import Marquee from '../components/Marquee'
import { testimonials } from '../data/testimonials'

function TestimonialCard({ t }) {
  return (
    <GlassCard hover={false} className="p-6 w-[320px] sm:w-[380px] shrink-0">
      <div className="flex gap-1 text-gold text-xs mb-4">
        {Array.from({ length: 5 }).map((_, i) => <FiStar key={i} fill="currentColor" />)}
      </div>
      <p className="text-ink-muted text-sm leading-relaxed mb-6">"{t.quote}"</p>
      <div className="flex items-center gap-3">
        <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
        <div>
          <p className="text-ink text-sm font-medium">{t.name}</p>
          <p className="text-ink-faint text-xs">{t.role}</p>
        </div>
      </div>
    </GlassCard>
  )
}

export default function Testimonials() {
  const half = Math.ceil(testimonials.length / 2)
  const row1 = testimonials.slice(0, half)
  const row2 = testimonials.slice(half)

  return (
    <section id="testimonials" className="section-pad relative overflow-hidden">
      <div className="container-max">
        <SectionHeading
          eyebrow="Testimonials"
          title="Kind words from people I've worked with"
          subtitle="A few notes from teammates, clients, and managers on what it's like to collaborate day to day."
        />
      </div>

      <div className="space-y-6">
        <Marquee>
          {row1.map((t) => <TestimonialCard key={t.id} t={t} />)}
        </Marquee>
        <Marquee reverse>
          {row2.length ? row2.map((t) => <TestimonialCard key={t.id} t={t} />) : row1.map((t) => <TestimonialCard key={`r2-${t.id}`} t={t} />)}
        </Marquee>
      </div>
    </section>
  )
}
