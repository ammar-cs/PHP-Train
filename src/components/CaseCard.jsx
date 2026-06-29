import { useNavigate } from 'react-router-dom'

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

// Clearly saturated and distinct per agent — readable at a glance
const AGENT_AVATAR = {
  Sam:    { bg: '#dbeafe', color: '#1d4ed8' },
  Jason:  { bg: '#d1fae5', color: '#065f46' },
  Brian:  { bg: '#ede9fe', color: '#5b21b6' },
  Ivana:  { bg: '#fce7f3', color: '#9d174d' },
  Arthur: { bg: '#fef3c7', color: '#92400e' },
}
const DEFAULT_AVATAR = { bg: '#e2e8f0', color: '#334155' }

// Plain text color per tag — matches the filter pill palette
const TAG_TEXT_COLOR = {
  'insurance-objection':   '#b91c1c',
  'scheduling-conflict':   '#c2410c',
  'already-inspected':     '#7e22ce',
  'gate-access':           '#15803d',
  'wrong-address':         '#4b5563',
  'skeptical-homeowner':   '#b45309',
  'second-opinion-pitch':  '#1d4ed8',
  'hoa-confusion':         '#6d28d9',
  'ladder-vs-walk':        '#0e7490',
  'tenant-property':       '#0f766e',
}

export default function CaseCard({ caseData }) {
  const navigate = useNavigate()
  const avatar = AGENT_AVATAR[caseData.agentName] ?? DEFAULT_AVATAR

  // Max 2 tags as plain dot-separated text
  const visibleTags = caseData.objectionTags
    .slice(0, 2)
    .map(t => OBJECTION_LABELS[t] ?? t)
  const overflow = caseData.objectionTags.length - 2

  return (
    <button
      onClick={() => navigate(`/case/${caseData.id}`)}
      className="animate-fade-up text-left w-full rounded-2xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid #d1d5db',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)',
        padding: '1.375rem 1.5rem',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.11)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Top row: avatar + company label */}
      <div className="flex items-center justify-between mb-3.5">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
          style={{ backgroundColor: avatar.bg, color: avatar.color }}
          aria-hidden="true"
        >
          {caseData.agentName[0]}
        </div>
        <span
          className="text-xs font-semibold uppercase"
          style={{ color: '#6b7280', letterSpacing: '0.08em' }}
        >
          {caseData.company}
        </span>
      </div>

      {/* Case title — primary visual anchor */}
      <h3
        className="font-bold leading-snug mb-1.5"
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '0.975rem',
          color: '#0f172a',
          letterSpacing: '-0.01em',
        }}
      >
        {caseData.caseTitle}
      </h3>

      {/* Agent · Homeowner — metadata line */}
      <p
        className="text-xs mb-3.5"
        style={{ color: '#6b7280', fontWeight: 500 }}
      >
        {caseData.agentName} · {caseData.homeownerName}
      </p>

      {/* Tags — colored plain text per type, dot-separated, no pills */}
      <p className="text-xs leading-snug" style={{ fontWeight: 500 }}>
        {visibleTags.map((label, i) => {
          const tag = caseData.objectionTags[i]
          const color = TAG_TEXT_COLOR[tag] ?? '#6b7280'
          return (
            <span key={tag}>
              {i > 0 && <span style={{ color: '#9ca3af' }}> · </span>}
              <span style={{ color }}>{label}</span>
            </span>
          )
        })}
        {overflow > 0 && (
          <span style={{ color: '#9ca3af' }}> · +{overflow} more</span>
        )}
      </p>
    </button>
  )
}
