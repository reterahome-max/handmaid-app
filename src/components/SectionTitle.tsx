import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Sparkle } from './Decor'

/** セクション見出し：紙のラベル（しおり）＋手書き風タイトル＋小さなきらめき */
export function SectionTitle({
  emoji,
  children,
  moreTo,
}: {
  emoji: string
  children: ReactNode
  moreTo?: string
}) {
  return (
    <div className="mb-3.5 flex items-center justify-between gap-2">
      <h2 className="flex items-center gap-2 text-[1.25rem] text-[#4A2F22]">
        <span
          aria-hidden
          className="label-tag flex h-9 w-9 shrink-0 items-center justify-center text-[1.05rem]"
        >
          {emoji}
        </span>
        <span className="font-display underline-craft">{children}</span>
        <Sparkle className="text-[0.8rem]" />
      </h2>
      {moreTo && (
        <Link
          to={moreTo}
          className="shrink-0 whitespace-nowrap text-[0.85rem] font-bold text-[#B8793E]"
        >
          もっと ›
        </Link>
      )}
    </div>
  )
}
