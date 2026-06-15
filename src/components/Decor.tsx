/**
 * 世界観のための小さな装飾パーツ（控えめに使う）。
 * 絵文字の原色は避け、テキスト記号をブラウン／ゴールドで色づけする。
 */

/** 中央寄せの飾り（✦ ⋆ ❀ ⋆ ✦） */
export function Flourish({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`flex items-center justify-center gap-2 text-[#D6A84F] ${className}`}
    >
      <span className="text-[0.7em]">✦</span>
      <span className="text-[0.6em] opacity-70">⋆</span>
      <span className="text-[0.95em] text-[#B8793E]">❀</span>
      <span className="text-[0.6em] opacity-70">⋆</span>
      <span className="text-[0.7em]">✦</span>
    </div>
  )
}

/** 見出しの両脇などに置く、小さなきらめき */
export function Sparkle({ className = '' }: { className?: string }) {
  return (
    <span aria-hidden className={`text-[#D6A84F] ${className}`}>
      ✦
    </span>
  )
}

/** しおり（リボン）タブ。色は指定可能。 */
export function Bookmark({
  color = '#B8793E',
  className = '',
}: {
  color?: string
  className?: string
}) {
  return (
    <span
      aria-hidden
      className={`bookmark inline-block h-6 w-4 ${className}`}
      style={{ backgroundColor: color, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35)' }}
    />
  )
}
