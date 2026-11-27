import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiEdit2, FiX, FiRefreshCw, FiUser } from 'react-icons/fi'

export default function AboutManager({ about, loading, error, onRefresh, onUpdate, onSeed }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    eyebrow: '',
    title: '',
    subtitle: '',
    description: '',
    cv_link: '',
    stats: []
  })

  const openModal = () => {
    if (about) {
      setFormData({
        eyebrow: about.eyebrow,
        title: about.title,
        subtitle: about.subtitle,
        description: about.description.join('\n\n'),
        cv_link: about.cv_link || '',
        stats: about.stats || []
      })
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const description = formData.description.split('\n\n').filter(p => p.trim())
    onUpdate({
      ...formData,
      id: about?.id,
      description
    })
    closeModal()
  }

  const handleStatChange = (index, field, value) => {
    const newStats = [...formData.stats]
    newStats[index] = { ...newStats[index], [field]: value }
    setFormData({ ...formData, stats: newStats })
  }

  const addStat = () => {
    setFormData({
      ...formData,
      stats: [...formData.stats, { id: Date.now(), icon: 'FiUser', value: 0, suffix: '+', label: 'New Stat' }]
    })
  }

  const removeStat = (index) => {
    setFormData({
      ...formData,
      stats: formData.stats.filter((_, i) => i !== index)
    })
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-gray-900">About Section</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={onRefresh}
            className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all shadow-sm"
          >
            <FiRefreshCw className="text-base" />
          </button>
          <button
            onClick={openModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-all shadow-md"
          >
            <FiEdit2 /> Edit About
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 text-sm bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 mb-6">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="bg-gray-100 border border-gray-200 rounded-2xl h-64 animate-pulse" />
      ) : !about ? (
        <div className="text-center py-24 text-gray-400">
          <FiUser className="text-5xl mx-auto mb-4 opacity-40" />
          <p className="text-base font-medium mb-4">No about content yet.</p>
          <button
            onClick={onSeed}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-all shadow-md"
          >
            Seed Default Content
          </button>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="space-y-4">
            <div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Eyebrow</span>
              <p className="text-sm text-gray-900 mt-1">{about.eyebrow}</p>
            </div>
            <div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Title</span>
              <p className="text-base font-semibold text-gray-900 mt-1">{about.title}</p>
            </div>
            <div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Subtitle</span>
              <p className="text-sm text-gray-600 mt-1">{about.subtitle}</p>
            </div>
            <div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Description</span>
              <div className="text-sm text-gray-600 mt-1 space-y-2">
                {about.description.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
            {about.cv_link && (
              <div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">CV Link</span>
                <a href={about.cv_link} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline mt-1 block">
                  {about.cv_link}
                </a>
              </div>
            )}
            {about.stats && about.stats.length > 0 && (
              <div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Stats</span>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {about.stats.map((stat, i) => (
                    <div key={i} className="bg-gray-50 rounded-lg p-3">
                      <p className="text-lg font-semibold text-gray-900">{stat.value}{stat.suffix}</p>
                      <p className="text-xs text-gray-500">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Edit About Section</h3>
                <button onClick={closeModal} className="p-1 rounded-lg hover:bg-gray-100">
                  <FiX className="text-gray-500" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Eyebrow</label>
                  <input
                    type="text"
                    value={formData.eyebrow}
                    onChange={e => setFormData({ ...formData, eyebrow: e.target.value })}
                    placeholder="e.g., About Me"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Building products with craft and curiosity"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Subtitle</label>
                  <textarea
                    value={formData.subtitle}
                    onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="Brief subtitle..."
                    rows={2}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all resize-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Description (separate paragraphs with double newline)</label>
                  <textarea
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Paragraph 1&#10;&#10;Paragraph 2&#10;&#10;Paragraph 3"
                    rows={6}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all resize-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">CV Link</label>
                  <input
                    type="url"
                    value={formData.cv_link}
                    onChange={e => setFormData({ ...formData, cv_link: e.target.value })}
                    placeholder="https://example.com/resume.pdf"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Stats</label>
                    <button
                      type="button"
                      onClick={addStat}
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                    >
                      + Add Stat
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.stats.map((stat, i) => (
                      <div key={i} className="flex gap-2 items-start">
                        <input
                          type="number"
                          value={stat.value}
                          onChange={e => handleStatChange(i, 'value', parseInt(e.target.value) || 0)}
                          placeholder="Value"
                          className="w-20 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-400 transition-all"
                        />
                        <input
                          type="text"
                          value={stat.suffix}
                          onChange={e => handleStatChange(i, 'suffix', e.target.value)}
                          placeholder="Suffix (e.g., +)"
                          className="w-16 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-400 transition-all"
                        />
                        <input
                          type="text"
                          value={stat.label}
                          onChange={e => handleStatChange(i, 'label', e.target.value)}
                          placeholder="Label"
                          className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-400 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => removeStat(i)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-semibold text-sm text-white bg-gray-900 hover:bg-gray-800 transition-all shadow-lg"
                >
                  Update About
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
