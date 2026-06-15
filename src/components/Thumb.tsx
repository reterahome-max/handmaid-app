/**
 * 仮の「イメージ画像」。写真が主役になるよう、レシピ本の写真のような枠と
 * キャプションをつけて表示する（実写真に差し替えやすい設計）。
 */
export function Thumb({
  emoji,
  colors,
  label,
  className = '',
  emojiClassName = 'text-[2.4em]',
  rounded = 'rounded-xl',
  frame = false,
}: {
  emoji: string
  colors: [string, string]
  label?: string
  className?: string
  emojiClassName?: string
  rounded?: string
  /** ポラロイド風の白フチをつける（完成イメージなど大きめ写真向け） */
  frame?: boolean
}) {
  const [c1, c2] = colors
  return (
    <div
      className={`relative ${rounded} ${className} ${
        frame ? 'bg-[#FFF1CF] p-2 shadow-[0_3px_0_0_rgba(196,174,138,0.45)] ring-1 ring-[#E6D3AB]' : ''
      }`}
      role="img"
      aria-label={label ? `${label}のイメージ画像` : 'イメージ画像'}
    >
      <div
        className={`relative flex h-full w-full items-center justify-center overflow-hidden ${rounded} ring-1 ring-black/5`}
        style={{ background: `linear-gradient(150deg, ${c1}, ${c2})` }}
      >
        {/* 紙のドット質感 */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)',
            backgroundSize: '12px 12px',
          }}
        />
        {/* やわらかい光 */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-5 -top-7 h-20 w-20 rounded-full bg-white/40 blur-lg"
        />
        <span aria-hidden className={`relative select-none leading-none drop-shadow-sm ${emojiClassName}`}>
          {emoji}
        </span>
        {label && (
          <span className="font-display absolute bottom-2 left-2 rounded-md border border-[#E6D3AB] bg-[#FFF1CF]/90 px-2 py-0.5 text-[0.66rem] font-semibold text-[#7A5A45] shadow-sm">
            {label}
          </span>
        )}
      </div>
    </div>
  )
}
