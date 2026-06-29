export default function TranscriptViewer({ transcript }) {
  const lines = transcript
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean)

  return (
    <div>
      <h2
        className="text-xs font-bold uppercase tracking-widest mb-4"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#64748b' }}
      >
        Full Transcript
      </h2>

      <div
        className="rounded-2xl p-6 md:p-8 space-y-4 max-h-[600px] overflow-y-auto"
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e8e5e0',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          lineHeight: '1.8',
        }}
      >
        {lines.length === 0 ? (
          <p className="text-sm italic" style={{ color: '#94a3b8' }}>
            No transcript available yet. Paste the full transcript into <code className="font-mono text-xs">cases.json</code> for this case.
          </p>
        ) : (
          lines.map((line, i) => {
            const speakerMatch = line.match(/^([A-Za-z][A-Za-z\s]{0,20}):\s*(.+)$/)
            if (speakerMatch) {
              const [, speaker, text] = speakerMatch
              return (
                <p key={i} className="text-[15px]" style={{ color: '#334155' }}>
                  <span
                    className="font-bold mr-1"
                    style={{
                      color: '#1d4ed8',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    {speaker}:
                  </span>
                  {text}
                </p>
              )
            }
            return (
              <p key={i} className="text-[15px] italic" style={{ color: '#94a3b8' }}>
                {line}
              </p>
            )
          })
        )}
      </div>
    </div>
  )
}
