import { useState, useMemo } from 'react'
import cases from '../data/cases.json'
import FilterBar from '../components/FilterBar'
import CaseCard from '../components/CaseCard'

// Collect all unique tags from the dataset
const ALL_TAGS = [...new Set(cases.flatMap(c => c.objectionTags))].sort()

export default function Home() {
  const [selectedAgents, setSelectedAgents] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  const toggleAgent = (agent) => {
    setSelectedAgents(prev =>
      prev.includes(agent) ? prev.filter(a => a !== agent) : [...prev, agent]
    )
  }

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  const filtered = useMemo(() => {
    return cases.filter(c => {
      if (selectedAgents.length > 0 && !selectedAgents.includes(c.agentName)) return false
      if (selectedTags.length > 0 && !selectedTags.some(t => c.objectionTags.includes(t))) return false
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const inTitle = c.caseTitle.toLowerCase().includes(q)
        const inHomeowner = c.homeownerName.toLowerCase().includes(q)
        if (!inTitle && !inHomeowner) return false
      }
      return true
    })
  }, [selectedAgents, selectedTags, searchQuery])

  const hasActiveFilters = selectedAgents.length > 0 || selectedTags.length > 0 || searchQuery.trim()

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f4f2' }}>

      {/* ── Header ─────────────────────────────────────────── */}
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e8e5e0' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-8 md:py-11">
          <div className="flex items-center gap-4 mb-2">

            {/* Logo badge */}
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 60%, #1e40af 100%)',
                boxShadow: '0 4px 14px rgba(29,78,216,0.35)',
              }}
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>

            <div>
              <h1
                className="text-3xl md:text-4xl font-extrabold tracking-tight leading-none"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#0f172a' }}
              >
                PHP Training Camp
              </h1>
              <p className="text-base text-slate-500 mt-1 font-medium">
                Real call breakdowns for Pharaoh Phone roofing sales agents
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 md:px-8 py-8 md:py-10">

        {/* ── Filter bar ─────────────────────────────────────── */}
        <div
          className="rounded-2xl p-6 md:p-7 mb-8"
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e8e5e0',
            boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
          }}
        >
          <FilterBar
            selectedAgents={selectedAgents}
            toggleAgent={toggleAgent}
            selectedTags={selectedTags}
            toggleTag={toggleTag}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            allTags={ALL_TAGS}
          />
        </div>

        {/* ── Result count + clear ───────────────────────────── */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm font-medium" style={{ color: '#6b7280' }}>
            {filtered.length === cases.length
              ? `${cases.length} cases`
              : `${filtered.length} of ${cases.length} cases`}
          </p>
          {hasActiveFilters && (
            <button
              onClick={() => {
                setSelectedAgents([])
                setSelectedTags([])
                setSearchQuery('')
              }}
              className="text-sm font-semibold transition-colors"
              style={{ color: '#1d4ed8' }}
              onMouseEnter={e => e.target.style.color = '#1e40af'}
              onMouseLeave={e => e.target.style.color = '#1d4ed8'}
            >
              Clear filters
            </button>
          )}
        </div>

        {/* ── Card grid ──────────────────────────────────────── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-grid">
            {filtered.map(c => (
              <CaseCard key={c.id} caseData={c} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24" style={{ color: '#94a3b8' }}>
            <svg className="w-12 h-12 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            <p className="text-lg font-semibold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              No cases match your filters
            </p>
            <p className="text-sm mt-1.5">Try adjusting or clearing the filters above.</p>
          </div>
        )}
      </main>
    </div>
  )
}
