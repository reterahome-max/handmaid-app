import { Link } from 'react-router-dom'

/**
 * 空状態の共通表示（羊皮紙＋点線の縫い目）。
 * レシピブック・作品ノート・検索結果なしで使う。
 */
export function EmptyState({
  emoji,
  title,
  message,
  actionLabel,
  actionTo,
}: {
  emoji: string
  title: string
  message: string
  actionLabel?: string
  actionTo?: string
}) {
  return (
    <div className="parchment stitch px-6 py-12 text-center">
      <div className="mb-3 text-5xl" aria-hidden>
        {emoji}
      </div>
      <p className="font-display text-[1.25rem] text-[#4A2F22]">{title}</p>
      <p className="mt-1.5 whitespace-pre-line text-[0.92rem] leading-relaxed text-[#7A5A45]">
        {message}
      </p>
      {actionLabel && actionTo && (
        <Link to={actionTo} className="btn-primary font-display mt-5 inline-block px-6 py-3 text-[1.05rem]">
          {actionLabel}
        </Link>
      )}
    </div>
  )
}
