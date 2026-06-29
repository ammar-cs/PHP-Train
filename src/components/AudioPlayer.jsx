import { useRef, useState, useEffect } from 'react'

function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function AudioPlayer({ src }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [error, setError] = useState(false)

  useEffect(() => {
    setPlaying(false)
    setCurrentTime(0)
    setDuration(0)
    setError(false)
  }, [src])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
    } else {
      audio.play().catch(() => setError(true))
    }
    setPlaying(!playing)
  }

  const handleTimeUpdate = () => setCurrentTime(audioRef.current?.currentTime ?? 0)
  const handleLoadedMetadata = () => setDuration(audioRef.current?.duration ?? 0)
  const handleEnded = () => setPlaying(false)

  const handleSeek = (e) => {
    const newTime = Number(e.target.value)
    if (audioRef.current) audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolume = (e) => {
    const v = Number(e.target.value)
    if (audioRef.current) audioRef.current.volume = v
    setVolume(v)
  }

  const skip = (seconds) => {
    if (!audioRef.current) return
    audioRef.current.currentTime = Math.max(0, Math.min(duration, currentTime + seconds))
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div
      className="rounded-2xl p-6"
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e8e5e0',
        boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
      }}
    >
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onError={() => setError(true)}
        preload="metadata"
      />

      {error && (
        <div
          className="flex items-center gap-2 text-sm mb-4 px-4 py-3 rounded-xl"
          style={{ backgroundColor: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca' }}
        >
          <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-11.25a.75.75 0 011.5 0v4.5a.75.75 0 01-1.5 0v-4.5zm.75 7.5a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
          </svg>
          Audio file not found — place it in <code className="font-mono text-xs ml-1">/public/audio/</code>
        </div>
      )}

      {/* Progress label */}
      <div className="flex justify-between items-baseline mb-2">
        <span
          className="text-lg font-bold tabular-nums"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#0f172a' }}
        >
          {formatTime(currentTime)}
        </span>
        <span className="text-sm font-medium" style={{ color: '#94a3b8' }}>
          {formatTime(duration)}
        </span>
      </div>

      {/* Scrubber */}
      <div className="mb-5">
        <input
          type="range"
          className="seek-bar"
          min={0}
          max={duration || 0}
          step={0.1}
          value={currentTime}
          onChange={handleSeek}
          style={{
            background: `linear-gradient(to right, #1d4ed8 ${progress}%, #e8e5e0 ${progress}%)`,
          }}
          aria-label="Seek"
        />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">

        {/* Skip back 15s */}
        <button
          onClick={() => skip(-15)}
          title="Back 15s"
          className="flex flex-col items-center gap-0.5 transition-all duration-150 focus:outline-none"
          style={{ color: '#94a3b8' }}
          onMouseEnter={e => e.currentTarget.style.color = '#1d4ed8'}
          onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
          aria-label="Skip back 15 seconds"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 .49-3.43" />
          </svg>
          <span className="text-xs font-bold" style={{ fontSize: '10px' }}>15s</span>
        </button>

        {/* Play / Pause */}
        <button
          onClick={togglePlay}
          className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-150 focus:outline-none"
          style={{
            background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
            boxShadow: '0 4px 16px rgba(29,78,216,0.4)',
            color: '#ffffff',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #1d4ed8, #1e40af)'
            e.currentTarget.style.boxShadow = '0 6px 22px rgba(29,78,216,0.5)'
            e.currentTarget.style.transform = 'scale(1.04)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #2563eb, #1d4ed8)'
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(29,78,216,0.4)'
            e.currentTarget.style.transform = 'scale(1)'
          }}
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" rx="1.5" />
              <rect x="14" y="4" width="4" height="16" rx="1.5" />
            </svg>
          ) : (
            <svg className="w-6 h-6 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Skip forward 15s */}
        <button
          onClick={() => skip(15)}
          title="Forward 15s"
          className="flex flex-col items-center gap-0.5 transition-all duration-150 focus:outline-none"
          style={{ color: '#94a3b8' }}
          onMouseEnter={e => e.currentTarget.style.color = '#1d4ed8'}
          onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
          aria-label="Skip forward 15 seconds"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-.49-3.43" />
          </svg>
          <span className="text-xs font-bold" style={{ fontSize: '10px' }}>15s</span>
        </button>

        <div className="flex-1" />

        {/* Volume */}
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 shrink-0"
            style={{ color: '#94a3b8' }}
            fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5 6 9H2v6h4l5 4V5z" />
            {volume > 0 && <path strokeLinecap="round" strokeLinejoin="round" d="M15.54 8.46a5 5 0 0 1 0 7.07" />}
          </svg>
          <input
            type="range"
            className="volume-bar w-20"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={handleVolume}
            style={{
              background: `linear-gradient(to right, #1d4ed8 ${volume * 100}%, #e8e5e0 ${volume * 100}%)`,
            }}
            aria-label="Volume"
          />
        </div>
      </div>
    </div>
  )
}
