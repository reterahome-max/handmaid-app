import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useWorkNotes } from '../context/WorkNotesContext'
import { Thumb } from '../components/Thumb'
import { EmptyState } from '../components/EmptyState'
import { Flourish } from '../components/Decor'

function formatDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`
}

export function WorkNotePage() {
  const { notes, addNote, updateMemo, removeNote } = useWorkNotes()
  const [title, setTitle] = useState('')
  const [memo, setMemo] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const t = title.trim()
    if (!t) return
    addNote({
      title: t,
      memo: memo.trim(),
      emoji: '✏️',
      colors: ['#FBEFD0', '#ecd6a8'] as [string, string],
    })
    setTitle('')
    setMemo('')
  }

  return (
    <div>
      <header className="px-5 pb-3 pt-8 text-center">
        <Flourish className="text-[1rem]" />
        <h1 className="font-display mt-1.5 flex items-center justify-center gap-2 text-[1.7rem] text-[#4A2F22]">
          <span aria-hidden>📓</span>作品ノート
        </h1>
        <p className="mt-1 text-[0.85rem] text-[#7A5A45]">
          作ったものを書きとめる、小さな記録帳。
        </p>
      </header>

      <main className="space-y-5 px-5 py-3">
        {/* 自分で書きとめる */}
        <form onSubmit={submit} className="parchment p-4">
          <h2 className="font-display mb-2 flex items-center gap-2 text-[1.1rem] text-[#4A2F22]">
            <span aria-hidden>🪶</span>作ったものを書く
          </h2>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="なにを作った？（例：レジンのおまもり）"
            aria-label="作ったもの"
            className="w-full rounded-xl border-2 border-[#D6A84F] bg-[#FFF8E4] px-3.5 py-2.5 text-[1rem] text-[#4A2F22] outline-none placeholder:text-[#A98C72] focus:border-[#B8793E]"
          />
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="ひとことメモ（うまくできた／次はこうしたい…）"
            aria-label="メモ"
            rows={2}
            className="mt-2.5 w-full resize-none rounded-xl border-2 border-[#D6A84F] bg-[#FFF8E4] px-3.5 py-2.5 text-[1rem] text-[#4A2F22] outline-none placeholder:text-[#A98C72] focus:border-[#B8793E]"
          />
          <button
            type="submit"
            disabled={!title.trim()}
            className="btn-primary font-display mt-3 w-full px-5 py-3 text-[1.05rem] disabled:opacity-50"
          >
            ノートに書きとめる
          </button>
        </form>

        {/* 記録一覧 */}
        {notes.length === 0 ? (
          <EmptyState
            emoji="📓"
            title="まっさらな作品ノート"
            message={'まだ作品ノートはありません。\n作ったものを記録して、あなたの小さな作品集を育てましょう。'}
            actionLabel="レシピをさがす"
            actionTo="/search"
          />
        ) : (
          <div>
            <p className="font-display mb-3 text-[1rem] text-[#7A5A45]">
              これまでに {notes.length} 作品
            </p>
            <div className="space-y-4">
              {notes.map((n) => (
                <article key={n.id} className="parchment p-3">
                  <div className="flex items-start gap-3">
                    <Thumb
                      emoji={n.emoji}
                      colors={n.colors}
                      className="h-16 w-16 shrink-0"
                      emojiClassName="text-[1.8em]"
                      rounded="rounded-lg"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display text-[1.1rem] leading-snug text-[#4A2F22]">
                          {n.recipeId ? (
                            <Link to={`/recipe/${n.recipeId}`} className="underline-craft">
                              {n.title}
                            </Link>
                          ) : (
                            n.title
                          )}
                        </h3>
                        <button
                          type="button"
                          onClick={() => removeNote(n.id)}
                          aria-label="この記録を消す"
                          className="shrink-0 rounded-full px-2 py-0.5 text-[#A98C72] hover:text-[#A8552F]"
                        >
                          ✕
                        </button>
                      </div>
                      <p className="mt-0.5 inline-flex items-center gap-1 rounded-md bg-[#F2E2B8] px-2 py-0.5 text-[0.75rem] font-semibold text-[#9A6B2E]">
                        🗓 {formatDate(n.dateISO)} に作った
                      </p>
                    </div>
                  </div>
                  {/* メモ（編集可能） */}
                  <textarea
                    value={n.memo}
                    onChange={(e) => updateMemo(n.id, e.target.value)}
                    placeholder="ひとことメモを書く…"
                    aria-label="メモ"
                    rows={2}
                    className="mt-3 w-full resize-none rounded-lg border border-dashed border-[#D6A84F] bg-[#FFF8E4] px-3 py-2 text-[1rem] leading-relaxed text-[#4A2F22] outline-none placeholder:text-[#A98C72] focus:border-[#B8793E]"
                  />
                </article>
              ))}
            </div>
          </div>
        )}

        <Flourish className="pt-2 text-[1rem]" />
      </main>
    </div>
  )
}
