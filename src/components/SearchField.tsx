import type { FormEvent } from 'react'

/**
 * 「魔法のレシピを探す」検索バー（ホームとさがすで共通）。
 * onSubmit を渡すと form として動作（ホーム）、
 * onClear を渡すと入力中に ✕ を表示（さがす）。
 */
export function SearchField({
  value,
  onChange,
  placeholder = 'レシピを探す',
  onSubmit,
  onClear,
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  onSubmit?: (e: FormEvent) => void
  onClear?: () => void
}) {
  const box = (
    <div className="flex items-center gap-2 rounded-full border-2 border-[#D6A84F] bg-[#FFF8E4] px-4 py-2.5 shadow-[inset_0_1px_2px_rgba(160,130,85,0.18)] focus-within:border-[#B8793E]">
      <span aria-hidden className="text-lg">
        🔮
      </span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="min-w-0 flex-1 bg-transparent text-[1rem] text-[#4A2F22] outline-none placeholder:text-[#A98C72]"
      />
      {onClear && value && (
        <button
          type="button"
          onClick={onClear}
          aria-label="検索文字を消す"
          className="shrink-0 text-[#A98C72]"
        >
          ✕
        </button>
      )}
    </div>
  )

  return onSubmit ? <form onSubmit={onSubmit}>{box}</form> : box
}
