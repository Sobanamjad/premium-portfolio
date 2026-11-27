import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiEdit2, FiTrash2, FiX, FiRefreshCw, FiSearch, FiBriefcase } from 'react-icons/fi'

export default function ExperienceManager({ experience, loading, error, onRefresh, onAdd, onEdit, onDelete, onSeed }) {
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingExp, setEditingExp] = useState(null)
  const [formData, setFormData] = useState({
    role: '',
    company: '',
    location: '',
    period: '',
    description: '',
    tech: '',
    type: 'work'
  })

  const filtered = experience.filter(e =>
    [e.role, e.company, e.location, e.description, e.tech.join(' ')].join(' ').toLowerCase().includes(search.toLowerCase())
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    const tech = formData.tech.split(',').map(t => t.trim()).filter(t => t)
    if (editingExp) {
      onEdit({ ...formData, tech, id: editingExp.id })
    } else {
      onAdd({ ...formData, tech })
    }
    closeModal()
  }

  const openModal = (exp = null) => {
    if (exp) {
      setEditingExp(exp)
      setFormData({
        role: exp.role,
        company: exp.company,
        location: exp.location,
        period: exp.period,
        description: exp.description,
        tech: exp.tech.join(', '),
        type: exp.type
      })
    } else {
      setEditingExp(null)
      setFormData({
        role: '',
        company: '',
        location: '',
        period: '',
        description: '',
        tech: '',
        type: 'work'
      })
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingExp(null)
    setFormData({
      role: '',
      company: '',
      location: '',
      period: '',
      description: '',
      tech: '',
      type: 'work'
    })
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-gray-900">Experience</h2>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search experience..."
              className="w-full sm:w-64 bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
            />
          </div>
          <button
            onClick={onRefresh}
            className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all shadow-sm"
          >
            <FiRefreshCw className="text-base" />
          </button>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-all shadow-md"
          >
            <FiPlus /> Add Experience
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
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-100 border border-gray-200 rounded-2xl h-24 animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-24 text-gray-400">
          <FiBriefcase className="text-5xl mx-auto mb-4 opacity-40" />
          <p className="text-base font-medium mb-4">
            {search ? 'No experience matches your search.' : 'No experience yet.'}
          </p>
          {!search && (
            <button
              onClick={onSeed}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-all shadow-md"
            >
              <FiPlus /> Seed Default Experience
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-gray-300 hover:shadow-md transition-all shadow-sm"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                      {exp.period}
                    </span>
                    <h3 className="text-base font-semibold text-gray-900">{exp.role}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{exp.company} • {exp.location}</p>
                  <p className="text-xs text-gray-500 line-clamp-2">{exp.description}</p>
                </div>
                <div className="flex items-center gap-1 ml-4">
                  <button
                    onClick={() => openModal(exp)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all"
                  >
                    <FiEdit2 className="text-sm" />
                  </button>
                  <button
                    onClick={() => onDelete(exp.id)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
                  >
                    <FiTrash2 className="text-sm" />
                  </button>
                </div>
              </div>
              {exp.tech.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {exp.tech.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {exp.tech.length > 4 && (
                    <span className="text-xs text-gray-400">+{exp.tech.length - 4} more</span>
                  )}
                </div>
              )}
            </motion.div>
          ))}
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
              className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">
                  {editingExp ? 'Edit Experience' : 'Add New Experience'}
                </h3>
                <button onClick={closeModal} className="p-1 rounded-lg hover:bg-gray-100">
                  <FiX className="text-gray-500" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Role</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g., Full-Stack Developer"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g., Google"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={e => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g., Remote"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Period</label>
                    <input
                      type="text"
                      value={formData.period}
                      onChange={e => setFormData({ ...formData, period: e.target.value })}
                      placeholder="e.g., Jan 2020 — Present"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of your role..."
                    rows={3}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all resize-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Technologies (comma separated)</label>
                  <input
                    type="text"
                    value={formData.tech}
                    onChange={e => setFormData({ ...formData, tech: e.target.value })}
                    placeholder="React, Laravel, MySQL"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Type</label>
                  <select
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
                  >
                    <option value="work">Work</option>
                    <option value="education">Education</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-semibold text-sm text-white bg-gray-900 hover:bg-gray-800 transition-all shadow-lg"
                >
                  {editingExp ? 'Update Experience' : 'Add Experience'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
