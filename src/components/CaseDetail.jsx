import { useNavigate } from 'react-router-dom'
import AudioPlayer from './AudioPlayer'
import TranscriptViewer from './TranscriptViewer'

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

const TAG_COLORS = {
  'insurance-objection':  { bg: '#fef2f2', color: '#b91c1c', border: '#fecaca' },
  'scheduling-conflict':  { bg: '#fff7ed', color: '#c2410c', border: '#fed7aa' },
  'already-inspected':    { bg: '#faf5ff', color: '#7e22ce', border: '#e9d5ff' },
  'gate-access':          { bg: '#f0fdf4', color: '#15803d', border: '#bbf7d0' },
  'wrong-address':        { bg: '#f8fafc', color: '#475569', border: '#e2e8f0' },
  'skeptical-homeowner':  { bg: '#fffbeb', color: '#b45309', border: '#fde68a' },
  'second-opinion-pitch': { bg: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe' },
  'hoa-confusion':        { bg: '#f5f3ff', color: '#6d28d9', border: '#ddd6fe' },
  'ladder-vs-walk':       { bg: '#ecfeff', color: '#0e7490', border: '#a5f3fc' },
  'tenant-property':      { bg: '#f0fdfa', color: '#0f766e', border: '#99f6e4' },
}

export default function CaseDetail({ caseData, prevCase, nextCase }) {
  const navigate = useNavigate()
  const audioSrc = `/audio/${caseData.audioFile}`

  return (
    <div className="max-w-3xl mx-auto px-5 md:px-6 py-8 md:py-10">

      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-1.5 text-sm font-semibold mb-8 transition-all duration-150 group focus:outline-none"
        style={{ color: '#64748b' }}
        onMouseEnter={e => e.currentTarget.style.color = '#1d4ed8'}
        onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
      >
        <svg
          className="w-4 h-4 transition-transform duration-150 group-hover:-translate-x-0.5"
          fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        All Cases
      </button>

      {/* Page heading */}
      <h1
        className="text-2xl md:text-[1.85rem] font-extrabold leading-tight mb-3"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#0f172a' }}
      >
        {caseData.caseTitle}
      </h1>

      {/* Meta line */}
      <p className="text-sm font-medium mb-5" style={{ color: '#94a3b8' }}>
        <span style={{ color: '#334155', fontWeight: 600 }}>{caseData.agentName}</span>
        <span style={{ color: '#cbd5e1' }}> · </span>
        <span>{caseData.homeownerName}</span>
        <span style={{ color: '#cbd5e1' }}> · </span>
        <span>{caseData.company}</span>
        {caseData.location && caseData.location !== 'Unknown' && (
          <>
            <span style={{ color: '#cbd5e1' }}> · </span>
            <span>{caseData.location}</span>
          </>
        )}
      </p>

      {/* Objection tags */}
      <div className="flex flex-wrap gap-2 mb-7">
        {caseData.objectionTags.map(tag => {
          const t = TAG_COLORS[tag] ?? { bg: '#f8fafc', color: '#475569', border: '#e2e8f0' }
          return (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full font-semibold"
              style={{ backgroundColor: t.bg, color: t.color, border: `1px solid ${t.border}` }}
            >
              {OBJECTION_LABELS[tag] ?? tag}
            </span>
          )
        })}
      </div>

      {/* Audio player */}
      <div className="mb-7">
        <AudioPlayer src={audioSrc} />
      </div>

      {/* ── Key Takeaway — most prominent element on page ── */}
      <div
        className="rounded-2xl p-6 md:p-7 mb-8"
        style={{
          background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
          border: '1.5px solid #fde68a',
          boxShadow: '0 4px 20px rgba(245,158,11,0.12)',
        }}
      >
        <div className="flex gap-4 items-start">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
            style={{
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              boxShadow: '0 3px 10px rgba(217,119,6,0.3)',
            }}
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m1.343-5.657-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div className="flex-1">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#92400e' }}
            >
              Key Takeaway
            </p>
            <p
              className="text-[15px] leading-relaxed font-medium"
              style={{ color: '#78350f' }}
            >
              {caseData.keyTakeaway}
            </p>
          </div>
        </div>
      </div>

      {/* Transcript */}
      <div className="mb-10">
        <TranscriptViewer transcript={caseData.transcript} />
      </div>

      {/* Prev / Next navigation */}
      <div
        className="flex justify-between gap-4 pt-7"
        style={{ borderTop: '1px solid #e8e5e0' }}
      >
        {prevCase ? (
          <button
            onClick={() => navigate(`/case/${prevCase.id}`)}
            className="group flex items-center gap-2.5 text-sm font-medium transition-all duration-150 max-w-[45%] text-left focus:outline-none"
            style={{ color: '#64748b' }}
            onMouseEnter={e => e.currentTarget.style.color = '#1d4ed8'}
            onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
          >
            <svg
              className="w-4 h-4 shrink-0 transition-transform duration-150 group-hover:-translate-x-0.5"
              fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="truncate">
              <span className="block text-xs font-semibold mb-0.5" style={{ color: '#94a3b8', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Previous
              </span>
              {prevCase.caseTitle}
            </span>
          </button>
        ) : <div />}

        {nextCase ? (
          <button
            onClick={() => navigate(`/case/${nextCase.id}`)}
            className="group flex items-center gap-2.5 text-sm font-medium transition-all duration-150 max-w-[45%] text-right ml-auto focus:outline-none"
            style={{ color: '#64748b' }}
            onMouseEnter={e => e.currentTarget.style.color = '#1d4ed8'}
            onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
          >
            <span className="truncate">
              <span className="block text-xs font-semibold mb-0.5" style={{ color: '#94a3b8', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Next
              </span>
              {nextCase.caseTitle}
            </span>
            <svg
              className="w-4 h-4 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5"
              fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ) : <div />}
      </div>
    </div>
  )
}
