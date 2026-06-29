const AGENTS = ['Sam', 'Jason', 'Brian', 'Ivana', 'Arthur']

const OBJECTION_LABELS = {
  'insurance-objection':   'Insurance Objection',
  'scheduling-conflict':   'Scheduling Conflict',
  'already-inspected':     'Already Inspected',
  'gate-access':           'Gate Access',
  'wrong-address':         'Wrong Address',
  'skeptical-homeowner':   'Skeptical Homeowner',
  'second-opinion-pitch':  'Second Opinion Pitch',
  'hoa-confusion':         'HOA Confusion',
  'ladder-vs-walk':        'Ladder vs. Walk',
  'tenant-property':       'Tenant / Landlord',
}

export default function FilterBar({
  selectedAgents,
  toggleAgent,
  selectedTags,
  toggleTag,
  searchQuery,
  setSearchQuery,
  allTags,
}) {
  return (
    <div className="space-y-5">

      {/* Search */}
      <div className="relative">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
          style={{ color: '#94a3b8' }}
          fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Search by homeowner name or case title…"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl text-sm font-medium transition-shadow"
          style={{
            border: '1.5px solid #e2ddd8',
            backgroundColor: '#faf9f7',
            color: '#1e293b',
            outline: 'none',
            fontFamily: "'Inter', sans-serif",
          }}
          onFocus={e => {
            e.target.style.borderColor = '#2563eb'
            e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.12)'
          }}
          onBlur={e => {
            e.target.style.borderColor = '#e2ddd8'
            e.target.style.boxShadow = 'none'
          }}
        />
      </div>

      {/* Agent filter */}
      <div
        className="rounded-xl p-4"
        style={{ backgroundColor: '#f8f7f5', border: '1px solid #d1d5db' }}
      >
        <p
          className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ color: '#374151', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Filter by Agent
        </p>
        <div className="flex flex-wrap gap-2">
          {AGENTS.map(agent => {
            const active = selectedAgents.includes(agent)
            return (
              <button
                key={agent}
                onClick={() => toggleAgent(agent)}
                className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200"
                style={active ? {
                  backgroundColor: '#1d4ed8',
                  color: '#ffffff',
                  boxShadow: '0 2px 8px rgba(29,78,216,0.35)',
                  border: '1.5px solid #1d4ed8',
                } : {
                  backgroundColor: '#ffffff',
                  color: '#374151',
                  border: '1.5px solid #9ca3af',
                }}
                onMouseEnter={e => {
                  if (!active) {
                    e.currentTarget.style.borderColor = '#2563eb'
                    e.currentTarget.style.color = '#1d4ed8'
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    e.currentTarget.style.borderColor = '#9ca3af'
                    e.currentTarget.style.color = '#374151'
                  }
                }}
              >
                {agent}
              </button>
            )
          })}
        </div>
      </div>

      {/* Objection tag filter */}
      <div
        className="rounded-xl p-4"
        style={{ backgroundColor: '#f8f7f5', border: '1px solid #d1d5db' }}
      >
        <p
          className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ color: '#374151', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Filter by Objection Type
        </p>
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => {
            const active = selectedTags.includes(tag)
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className="px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200"
                style={active ? {
                  backgroundColor: '#d97706',
                  color: '#ffffff',
                  boxShadow: '0 2px 8px rgba(217,119,6,0.35)',
                  border: '1.5px solid #d97706',
                } : {
                  backgroundColor: '#ffffff',
                  color: '#374151',
                  border: '1.5px solid #9ca3af',
                }}
                onMouseEnter={e => {
                  if (!active) {
                    e.currentTarget.style.borderColor = '#d97706'
                    e.currentTarget.style.color = '#b45309'
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    e.currentTarget.style.borderColor = '#9ca3af'
                    e.currentTarget.style.color = '#374151'
                  }
                }}
              >
                {OBJECTION_LABELS[tag] ?? tag}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
