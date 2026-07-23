import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSend, FiCheck, FiAlertCircle, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import emailjs from '@emailjs/browser'
import SectionHeading from '../components/SectionHeading'
import GlassCard from '../components/GlassCard'
import MagneticButton from '../components/MagneticButton'
import { isValidEmail } from '../utils/helpers'
import { EMAILJS_CONFIG } from '../utils/emailjs'

const initialForm = { name: '', email: '', subject: '', message: '' }

const contactInfo = [
  { id: 1, icon: FiMail,    label: 'Email',    value: 'sobanamjad097@gmail.com'      },
  { id: 2, icon: FiPhone,   label: 'Phone',    value: '+92 3083996052'              },
  { id: 3, icon: FiMapPin,  label: 'Location', value: 'Pakistan, Multan · Remote'  },
]

export default function Contact() {
  const [form, setForm]     = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const validate = () => {
    const next = {}
    if (!form.name.trim())    next.name    = 'Please enter your name.'
    if (!form.email.trim())   next.email   = 'Please enter your email.'
    else if (!isValidEmail(form.email)) next.email = 'Enter a valid email address.'
    if (!form.message.trim()) next.message = 'Tell me a bit about your project.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('loading')
    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          from_name:  form.name,
          from_email: form.email,
          subject:    form.subject || 'No subject',
          message:    form.message,
          to_name:    'Soban',
        },
        EMAILJS_CONFIG.publicKey
      )
      setStatus('success')
      setForm(initialForm)
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section id="contact" className="section-pad relative">
      <div className="container-max">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something great together"
          subtitle="Have a project in mind or just want to say hi? My inbox is always open."
        />

        <div className="grid lg:grid-cols-5 gap-8">
          {/* ── Contact info cards ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-4"
          >
            {contactInfo.map(({ id, icon: Icon, label, value }) => (
              <GlassCard key={id} hover={false} className="p-5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet/20 to-cyan/20 flex items-center justify-center text-violet-soft text-lg shrink-0">
                  <Icon />
                </div>
                <div>
                  <p className="text-ink-faint text-xs font-mono">{label}</p>
                  <p className="text-ink text-sm">{value}</p>
                </div>
              </GlassCard>
            ))}
          </motion.div>

          {/* ── Contact form ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <GlassCard hover={false} className="p-6 sm:p-8 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-16 gap-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-violet to-cyan flex items-center justify-center text-2xl text-void"
                    >
                      <FiCheck />
                    </motion.div>
                    <h3 className="font-display text-xl text-ink font-medium">Message sent!</h3>
                    <p className="text-ink-muted text-sm max-w-xs">
                      Thanks for reaching out — I'll get back to you within 1–2 business days.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    noValidate
                    className="space-y-5"
                  >
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field
                        label="Your Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        error={errors.name}
                        placeholder="Jane Doe"
                      />
                      <Field
                        label="Email Address"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        error={errors.email}
                        placeholder="jane@company.com"
                      />
                    </div>

                    <Field
                      label="Subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Project inquiry"
                    />

                    <div>
                      <label htmlFor="message" className="text-xs font-mono text-ink-muted mb-2 block">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project..."
                        className={`w-full bg-white/[0.03] border rounded-xl px-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none transition-colors resize-none ${
                          errors.message ? 'border-pink/60' : 'border-white/10 focus:border-violet/60'
                        }`}
                      />
                      {errors.message && <p className="text-pink text-xs mt-1.5">{errors.message}</p>}
                    </div>

                    {/* Error banner */}
                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-sm bg-pink/10 border border-pink/20 text-pink rounded-xl px-4 py-3"
                      >
                        <FiAlertCircle className="shrink-0" />
                        Something went wrong. Please try again or email me directly.
                      </motion.div>
                    )}

                    <MagneticButton
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn-glow w-full sm:w-auto disabled:opacity-70"
                    >
                      {status === 'loading' ? (
                        <>
                          <motion.span
                            className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <FiSend /> Send Message
                        </>
                      )}
                    </MagneticButton>
                  </motion.form>
                )}
              </AnimatePresence>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Field({ label, name, value, onChange, error, type = 'text', placeholder }) {
  return (
    <div>
      <label htmlFor={name} className="text-xs font-mono text-ink-muted mb-2 block">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-white/[0.03] border rounded-xl px-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none transition-colors ${
          error ? 'border-pink/60' : 'border-white/10 focus:border-violet/60'
        }`}
      />
      {error && <p className="text-pink text-xs mt-1.5">{error}</p>}
    </div>
  )
}
