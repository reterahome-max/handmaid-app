import type { Difficulty } from '../types'
import { DIFFICULTY_THEME } from '../lib/icons'

/** 難易度バッジ：星（★☆）＋ラベルで直感的に */
export function DifficultyBadge({
  difficulty,
  size = 'sm',
}: {
  difficulty: Difficulty
  size?: 'sm' | 'md'
}) {
  const t = DIFFICULTY_THEME[difficulty]
  const pad = size === 'md' ? 'px-3 py-1.5 text-[0.95rem]' : 'px-2.5 py-1 text-[0.8rem]'
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border font-bold ${pad}`}
      style={{ backgroundColor: t.bg, color: t.ink, borderColor: t.border }}
    >
      <span aria-hidden className="tracking-tight" style={{ letterSpacing: '-0.05em' }}>
        {'★'.repeat(t.stars)}
        <span style={{ opacity: 0.35 }}>{'★'.repeat(3 - t.stars)}</span>
      </span>
      {difficulty}
    </span>
  )
}
