import { useParams, useNavigate } from 'react-router-dom'
import cases from '../data/cases.json'
import CaseDetail from '../components/CaseDetail'

export default function CaseDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const index = cases.findIndex(c => c.id === id)

  if (index === -1) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ backgroundColor: '#f5f4f2', color: '#94a3b8' }}>
        <p className="text-lg font-semibold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#334155' }}>
          Case not found.
        </p>
        <button
          onClick={() => navigate('/')}
          className="text-sm font-semibold hover:underline"
          style={{ color: '#1d4ed8' }}
        >
          Back to all cases
        </button>
      </div>
    )
  }

  const caseData = cases[index]
  const prevCase = index > 0 ? cases[index - 1] : null
  const nextCase = index < cases.length - 1 ? cases[index + 1] : null

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f4f2' }}>

      {/* ── Top nav bar ──────────────────────────────────── */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e8e5e0',
          boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
        }}
      >
        <div className="max-w-3xl mx-auto px-5 md:px-6 py-3.5 flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
            style={{
              background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              boxShadow: '0 2px 8px rgba(29,78,216,0.3)',
            }}
          >
            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <span
            className="text-sm font-bold"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1e293b' }}
          >
            PHP Training Camp
          </span>
          <span style={{ color: '#cbd5e1', margin: '0 2px' }}>/</span>
          <span
            className="text-sm truncate"
            style={{ color: '#64748b', fontWeight: 500 }}
          >
            {caseData.caseTitle}
          </span>
        </div>
      </div>

      <CaseDetail
        caseData={caseData}
        prevCase={prevCase}
        nextCase={nextCase}
      />
    </div>
  )
}
