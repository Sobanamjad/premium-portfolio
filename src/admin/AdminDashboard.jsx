import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiMail, FiUser, FiCalendar, FiMessageSquare, FiLogOut,
  FiTrash2, FiRefreshCw, FiSearch, FiChevronDown, FiChevronUp,
  FiAlertCircle, FiInbox
} from 'react-icons/fi'
import SkillsManager from './SkillsManager'
import ServicesManager from './ServicesManager'
import ProjectsManager from './ProjectsManager'
import ExperienceManager from './ExperienceManager'

function formatDate(iso) {
  return new Date(iso).toLocaleString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export default function AdminDashboard({ token, onLogout }) {
  const [activeTab, setActiveTab] = useState('contacts')
  const [contacts, setContacts] = useState([])
  const [skills, setSkills] = useState([])
  const [services, setServices] = useState([])
  const [projects, setProjects] = useState([])
  const [experience, setExperience] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState('')
  const [search, setSearch]     = useState('')
  const [expanded, setExpanded] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchContacts = async (silent = false) => {
    if (!silent) setLoading(true)
    else setRefreshing(true)
    setError('')
    try {
      const res = await fetch('/api/admin/contacts', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.status === 401) { onLogout(); return }
      const data = await res.json()
      setContacts(data.contacts || [])
    } catch {
      setError('Failed to load contacts.')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const fetchSkills = async (silent = false) => {
    if (!silent) setLoading(true)
    else setRefreshing(true)
    setError('')
    try {
      const res = await fetch('/api/admin/skills', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.status === 401) { onLogout(); return }
      const data = await res.json()
      setSkills(data.skills || [])
    } catch {
      setError('Failed to load skills.')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const fetchServices = async (silent = false) => {
    if (!silent) setLoading(true)
    else setRefreshing(true)
    setError('')
    try {
      const res = await fetch('/api/admin/services', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.status === 401) { onLogout(); return }
      const data = await res.json()
      setServices(data.services || [])
    } catch {
      setError('Failed to load services.')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const fetchProjects = async (silent = false) => {
    if (!silent) setLoading(true)
    else setRefreshing(true)
    setError('')
    try {
      const res = await fetch('/api/admin/projects', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.status === 401) { onLogout(); return }
      const data = await res.json()
      setProjects(data.projects || [])
    } catch {
      setError('Failed to load projects.')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const fetchExperience = async (silent = false) => {
    if (!silent) setLoading(true)
    else setRefreshing(true)
    setError('')
    try {
      const res = await fetch('/api/admin/experience', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.status === 401) { onLogout(); return }
      const data = await res.json()
      setExperience(data.experience || [])
    } catch {
      setError('Failed to load experience.')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    if (activeTab === 'contacts') fetchContacts()
    else if (activeTab === 'skills') fetchSkills()
    else if (activeTab === 'services') fetchServices()
    else if (activeTab === 'projects') fetchProjects()
    else if (activeTab === 'experience') fetchExperience()
  }, [activeTab])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return
    setDeleting(id)
    try {
      const res = await fetch(`/api/admin/contacts?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) setContacts(c => c.filter(x => x.id !== id))
    } catch {
      alert('Delete failed.')
    } finally {
      setDeleting(null)
    }
  }

  const handleAddSkill = async (skill) => {
    try {
      const res = await fetch('/api/admin/skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(skill),
      })
      if (res.ok) {
        fetchSkills(true)
      }
    } catch {
      alert('Failed to add skill.')
    }
  }

  const handleEditSkill = async (skill) => {
    try {
      const res = await fetch('/api/admin/skills', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(skill),
      })
      if (res.ok) {
        fetchSkills(true)
      }
    } catch {
      alert('Failed to update skill.')
    }
  }

  const handleDeleteSkill = async (id) => {
    if (!window.confirm('Delete this skill?')) return
    try {
      const res = await fetch(`/api/admin/skills?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) setSkills(s => s.filter(x => x.id !== id))
    } catch {
      alert('Delete failed.')
    }
  }

  const handleSeedSkills = async () => {
    try {
      const res = await fetch('/api/admin/seed-skills', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (res.ok) {
        alert(data.message)
        fetchSkills(true)
      }
    } catch {
      alert('Failed to seed skills.')
    }
  }

  const handleAddService = async (service) => {
    try {
      const res = await fetch('/api/admin/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(service),
      })
      if (res.ok) {
        fetchServices(true)
      }
    } catch {
      alert('Failed to add service.')
    }
  }

  const handleEditService = async (service) => {
    try {
      const res = await fetch('/api/admin/services', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(service),
      })
      if (res.ok) {
        fetchServices(true)
      }
    } catch {
      alert('Failed to update service.')
    }
  }

  const handleDeleteService = async (id) => {
    if (!window.confirm('Delete this service?')) return
    try {
      const res = await fetch(`/api/admin/services?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) setServices(s => s.filter(x => x.id !== id))
    } catch {
      alert('Delete failed.')
    }
  }

  const handleAddProject = async (project) => {
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(project),
      })
      if (res.ok) {
        fetchProjects(true)
      }
    } catch {
      alert('Failed to add project.')
    }
  }

  const handleEditProject = async (project) => {
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(project),
      })
      if (res.ok) {
        fetchProjects(true)
      }
    } catch {
      alert('Failed to update project.')
    }
  }

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Delete this project?')) return
    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) setProjects(p => p.filter(x => x.id !== id))
    } catch {
      alert('Delete failed.')
    }
  }

  const handleAddExperience = async (exp) => {
    try {
      const res = await fetch('/api/admin/experience', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(exp),
      })
      if (res.ok) {
        fetchExperience(true)
      }
    } catch {
      alert('Failed to add experience.')
    }
  }

  const handleEditExperience = async (exp) => {
    try {
      const res = await fetch('/api/admin/experience', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(exp),
      })
      if (res.ok) {
        fetchExperience(true)
      }
    } catch {
      alert('Failed to update experience.')
    }
  }

  const handleDeleteExperience = async (id) => {
    if (!window.confirm('Delete this experience?')) return
    try {
      const res = await fetch(`/api/admin/experience?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) setExperience(e => e.filter(x => x.id !== id))
    } catch {
      alert('Delete failed.')
    }
  }

  const handleSeedProjects = async () => {
    try {
      const res = await fetch('/api/admin/seed-projects', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (res.ok) {
        alert(data.message)
        fetchProjects(true)
      }
    } catch {
      alert('Failed to seed projects.')
    }
  }

  const handleSeedExperience = async () => {
    try {
      const res = await fetch('/api/admin/seed-experience', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (res.ok) {
        alert(data.message)
        fetchExperience(true)
      }
    } catch {
      alert('Failed to seed experience.')
    }
  }

  const filtered = contacts.filter(c =>
    [c.name, c.email, c.subject, c.message]
      .join(' ').toLowerCase()
      .includes(search.toLowerCase())
  )

  const stats = [
    { label: 'Total Messages', value: contacts.length,  icon: FiInbox },
    { label: 'This Month',     value: contacts.filter(c => new Date(c.created_at).getMonth() === new Date().getMonth()).length, icon: FiCalendar },
    { label: 'Unique Emails',  value: new Set(contacts.map(c => c.email)).size, icon: FiMail },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">

      {/* Navbar */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center text-sm font-bold text-white shadow-md">
              SA
            </div>
            <div>
              <p className="text-base font-semibold text-gray-900 leading-none">Admin Dashboard</p>
              <p className="text-xs text-gray-400 font-mono mt-0.5">soban.dev</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 rounded-lg hover:bg-gray-100 font-medium"
          >
            <FiLogOut className="text-base" /> Logout
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('contacts')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'contacts'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Contacts
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'skills'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Skills
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'services'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Services
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'projects'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab('experience')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'experience'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Experience
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
        {/* Conditional content based on active tab */}
        {activeTab === 'contacts' && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-4 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center text-white text-lg shrink-0 shadow-md">
                    <s.icon />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{s.value}</p>
                    <p className="text-sm text-gray-500 mt-0.5">{s.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-xl font-bold text-gray-900">Contact Messages</h2>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Search */}
                <div className="relative flex-1 sm:flex-none">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search messages..."
                    className="w-full sm:w-64 bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
                  />
                </div>
                {/* Refresh */}
                <button
                  onClick={() => fetchContacts(true)}
                  disabled={refreshing}
                  className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all disabled:opacity-50 shadow-sm"
                >
                  <motion.span
                    animate={refreshing ? { rotate: 360 } : {}}
                    transition={{ duration: 0.7, repeat: refreshing ? Infinity : 0, ease: 'linear' }}
                    className="block"
                  >
                    <FiRefreshCw className="text-base" />
                  </motion.span>
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 text-sm bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 mb-6">
                <FiAlertCircle /> {error}
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
            <FiInbox className="text-5xl mx-auto mb-4 opacity-40" />
            <p className="text-base font-medium">
              {search ? 'No messages match your search.' : 'No messages yet.'}
            </p>
            <p className="text-sm mt-2">Contact form submissions will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {filtered.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.04 }}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 hover:shadow-md transition-all shadow-sm"
                >
                  {/* Row */}
                  <div
                    className="flex items-center gap-4 px-5 py-4 cursor-pointer select-none"
                    onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                  >
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center text-sm font-semibold text-white shrink-0 shadow-md">
                      {c.name.charAt(0).toUpperCase()}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-gray-900 truncate">{c.name}</span>
                        <span className="text-xs text-gray-500 font-mono truncate">{c.email}</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate mt-0.5">
                        {c.subject || 'No subject'} — {c.message.slice(0, 60)}{c.message.length > 60 ? '…' : ''}
                      </p>
                    </div>

                    {/* Date + actions */}
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs text-gray-400 font-mono hidden sm:block">
                        {formatDate(c.created_at)}
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(c.id) }}
                        disabled={deleting === c.id}
                        className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all disabled:opacity-40"
                      >
                        {deleting === c.id
                          ? <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} className="block w-4 h-4 rounded-full border-2 border-gray-300 border-t-gray-600" />
                          : <FiTrash2 className="text-base" />
                        }
                      </button>
                      {expanded === c.id
                        ? <FiChevronUp className="text-gray-400 text-base" />
                        : <FiChevronDown className="text-gray-400 text-base" />
                      }
                    </div>
                  </div>

                  {/* Expanded message */}
                  <AnimatePresence>
                    {expanded === c.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-gray-200 px-6 py-5 grid sm:grid-cols-2 gap-6 bg-gray-50">
                          <div className="space-y-4">
                            <Detail icon={FiUser}        label="Name"    value={c.name} />
                            <Detail icon={FiMail}        label="Email"   value={c.email} href={`mailto:${c.email}`} />
                            <Detail icon={FiMessageSquare} label="Subject" value={c.subject || '—'} />
                            <Detail icon={FiCalendar}    label="Received" value={formatDate(c.created_at)} />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">Message</p>
                            <p className="text-sm text-gray-700 leading-relaxed bg-white rounded-xl p-4 border border-gray-200 whitespace-pre-wrap shadow-sm">
                              {c.message}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
          </>
        )}

        {activeTab === 'skills' && (
          <SkillsManager
            skills={skills}
            loading={loading}
            error={error}
            onRefresh={() => fetchSkills(true)}
            onAdd={handleAddSkill}
            onEdit={handleEditSkill}
            onDelete={handleDeleteSkill}
            onSeed={handleSeedSkills}
          />
        )}

        {activeTab === 'services' && (
          <ServicesManager
            services={services}
            loading={loading}
            error={error}
            onRefresh={() => fetchServices(true)}
            onAdd={handleAddService}
            onEdit={handleEditService}
            onDelete={handleDeleteService}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsManager
            projects={projects}
            loading={loading}
            error={error}
            onRefresh={() => fetchProjects(true)}
            onAdd={handleAddProject}
            onEdit={handleEditProject}
            onDelete={handleDeleteProject}
            onSeed={handleSeedProjects}
          />
        )}

        {activeTab === 'experience' && (
          <ExperienceManager
            experience={experience}
            loading={loading}
            error={error}
            onRefresh={() => fetchExperience(true)}
            onAdd={handleAddExperience}
            onEdit={handleEditExperience}
            onDelete={handleDeleteExperience}
            onSeed={handleSeedExperience}
          />
        )}
      </main>
    </div>
  )
}

function Detail({ icon: Icon, label, value, href }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="text-gray-500 text-base mt-0.5 shrink-0" />
      <div>
        <p className="text-xs font-medium text-gray-500 mb-0.5">{label}</p>
        {href
          ? <a href={href} className="text-sm text-gray-900 hover:text-gray-700 hover:underline font-medium">{value}</a>
          : <p className="text-sm text-gray-900 font-medium">{value}</p>
        }
      </div>
    </div>
  )
}
