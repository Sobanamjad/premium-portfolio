import { FiBriefcase, FiCode, FiUsers, FiAward } from 'react-icons/fi'

// Fetch about from API
export async function fetchAbout() {
  try {
    const res = await fetch('/api/about')
    const data = await res.json()
    return data.about
  } catch (err) {
    console.error('Failed to fetch about:', err)
    return null
  }
}

export const stats = [
  { id: 1, icon: FiBriefcase, value: 3, suffix: '+', label: 'Years Experience' },
  { id: 2, icon: FiCode, value: 25, suffix: '+', label: 'Projects Shipped' },
  { id: 3, icon: FiUsers, value: 6, suffix: '+', label: 'Happy Clients' },
  { id: 4, icon: FiAward, value: 2, suffix: '', label: 'Awards & Certs' },
]
