import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { RECIPES, GENRES, DIFFICULTY_FILTERS, PURPOSES } from '../data/recipes'
import type { Difficulty } from '../types'
import {
  GENRE_EMOJI,
  GENRE_SUBTITLE,
  PURPOSE_EMOJI,
  DIFFICULTY_THEME,
  BEGINNER_THEME,
  difficultyStars,
  genreTheme,
  GENRE_DESCRIPTION,
} from '../lib/icons'
import { RecipeCard } from '../components/RecipeCard'
import { SearchField } from '../components/SearchField'
import { EmptyState } from '../components/EmptyState'
import { Sparkle } from '../components/Decor'

function readList(params: URLSearchParams, key: string): string[] {
  return (params.get(key) ?? '').split(',').filter(Boolean)
}

export function SearchPage() {
  const [params, setParams] = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)

  const q = params.get('q') ?? ''
  const genres = readList(params, 'genre')
  const difficulties = readList(params, 'difficulty')
  const purposes = readList(params, 'purpose')
  const beginner = params.get('beginner') === '1'

  const activeCount =
    genres.length + difficulties.length + purposes.length + (beginner ? 1 : 0)

  const update = (key: string, value: string | null) => {
    const next = new URLSearchParams(params)
    if (value === null || value === '') next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true })
  }

  const toggleInList = (key: string, value: string) => {
    const current = readList(params, key)
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    update(key, next.join(','))
  }

  const clearAll = () => {
    const next = new URLSearchParams()
    if (q) next.set('q', q)
    setParams(next, { replace: true })
  }

  const results = useMemo(() => {
    const keyword = q.trim().toLowerCase()
    return RECIPES.filter((r) => {
      if (keyword) {
        const haystack = [r.title, ...r.materials, ...r.tools, ...r.genres]
          .join(' ')
          .toLowerCase()
        if (!haystack.includes(keyword)) return false
      }
      if (beginner && !r.beginnerFriendly) return false
      if (genres.length && !genres.some((g) => r.genres.includes(g))) return false
      if (difficulties.length && !difficulties.includes(r.difficulty as Difficulty)) return false
      if (purposes.length && !purposes.some((p) => r.purposes.includes(p))) return false
      return true
    })
  }, [q, genres, difficulties, purposes, beginner])

  // ジャンルがちょうど1つだけのときは「ジャンル別ページ」の章扉を表示
  const soloGenre =
    genres.length === 1 &&
    difficulties.length === 0 &&
    purposes.length === 0 &&
    !beginner &&
    !q
      ? genres[0]
      : null
  const gt = soloGenre ? genreTheme(soloGenre) : null

  return (
    <div>
      {/* ジャンル別ページの章扉（森の看板のように） */}
      {soloGenre && gt && (
        <div
          className="px-5 pb-5 pt-8 text-center"
          style={{ background: `radial-gradient(120% 90% at 50% 0%, ${gt.bg}, transparent 70%)` }}
        >
          <div className="text-4xl" aria-hidden>
            {GENRE_EMOJI[soloGenre]}
          </div>
          <p className="mt-1 text-[0.78rem] font-bold tracking-[0.2em]" style={{ color: gt.ink }}>
            <Sparkle className="text-[0.7rem]" /> もりのエリア <Sparkle className="text-[0.7rem]" />
          </p>
          <h1 className="font-display mt-0.5 text-[1.9rem] leading-tight text-[#4A2F22]">
            {GENRE_SUBTITLE[soloGenre]}
          </h1>
          <p className="mt-1 text-[0.95rem] text-[#7A5A45]">
            {soloGenre}・{GENRE_DESCRIPTION[soloGenre]}
          </p>
        </div>
      )}

      <header
        className={`sticky top-0 z-30 border-b border-[#D8B982] bg-[#FFF7E8]/95 px-5 pb-3 backdrop-blur-md ${
          soloGenre ? 'pt-3' : 'pt-7'
        }`}
      >
        {!soloGenre && (
          <h1 className="font-display mb-3 flex items-center gap-1.5 text-[1.5rem] text-[#4A2F22]">
            <Sparkle className="text-[0.9rem]" />
            レシピをさがす
          </h1>
        )}

        {/* 検索バー */}
        <SearchField value={q} onChange={(v) => update('q', v)} onClear={() => update('q', null)} />

        {/* 絞り込みトグル（しおり風） */}
        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            className="flex items-center gap-1.5 rounded-full border-2 px-3.5 py-2 text-[0.88rem] font-bold"
            style={
              activeCount > 0
                ? { borderColor: '#D8A98C', backgroundColor: '#F3E0CF', color: '#A8552F' }
                : { borderColor: '#C9A86A', backgroundColor: '#F7E4B5', color: '#7A5A45' }
            }
          >
            <span aria-hidden>🔖</span>
            しぼりこむ
            {activeCount > 0 && (
              <span className="ml-0.5 rounded-full bg-[#B8793E] px-1.5 text-xs text-white">
                {activeCount}
              </span>
            )}
            <span aria-hidden className="text-xs">
              {filtersOpen ? '▲' : '▼'}
            </span>
          </button>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="rounded-full px-2 py-1 text-[0.85rem] text-[#7A5A45] underline-offset-2 hover:underline"
            >
              すべて解除
            </button>
          )}
        </div>
      </header>

      {/* フィルターパネル */}
      {filtersOpen && (
        <div className="space-y-5 border-b border-[#D8B982] bg-[#F7E4B5] px-5 py-4">
          {/* むずかしさ（はじめて含む） */}
          <div>
            <h3 className="font-display mb-2 text-[1rem] text-[#4A2F22]">むずかしさ</h3>
            <div className="flex flex-wrap gap-2">
              {DIFFICULTY_FILTERS.map((d) => {
                const isBeginnerChip = d === 'はじめて'
                const isSel = isBeginnerChip ? beginner : difficulties.includes(d)
                const theme = isBeginnerChip ? BEGINNER_THEME : DIFFICULTY_THEME[d as Difficulty]
                const style: React.CSSProperties = isSel
                  ? { backgroundColor: theme.ink, borderColor: theme.ink, color: '#fff' }
                  : { backgroundColor: theme.bg, borderColor: theme.border, color: theme.ink }
                return (
                  <button
                    key={d}
                    type="button"
                    aria-pressed={isSel}
                    onClick={() =>
                      isBeginnerChip
                        ? update('beginner', beginner ? null : '1')
                        : toggleInList('difficulty', d)
                    }
                    className="rounded-full border-2 px-3 py-2 text-[0.88rem] font-semibold transition active:scale-95"
                    style={style}
                  >
                    <span aria-hidden>
                      {isBeginnerChip ? '🌱 ' : difficultyStars(d as Difficulty) + ' '}
                    </span>
                    {d}
                  </button>
                )
              })}
            </div>
          </div>

          <FilterGroup
            label="やってみたいこと"
            options={[...PURPOSES]}
            selected={purposes}
            onToggle={(v) => toggleInList('purpose', v)}
            iconMap={PURPOSE_EMOJI}
          />
          <FilterGroup
            label="もりのエリア"
            options={[...GENRES]}
            selected={genres}
            onToggle={(v) => toggleInList('genre', v)}
            kind="genre"
          />
        </div>
      )}

      {/* 結果 */}
      <main className="px-5 py-4">
        <p className="font-display mb-3 text-[1rem] text-[#7A5A45]">
          {results.length}件のレシピ
        </p>
        {results.length === 0 ? (
          <EmptyState
            emoji="🗺️"
            title="レシピが見つかりませんでした"
            message={'しぼりこみを減らすか、\n別のことばで探してみてください。'}
          />
        ) : (
          <div className="space-y-4">
            {results.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

function FilterGroup({
  label,
  options,
  selected,
  onToggle,
  iconMap,
  kind,
}: {
  label: string
  options: string[]
  selected: string[]
  onToggle: (value: string) => void
  iconMap?: Record<string, string>
  kind?: 'genre'
}) {
  return (
    <div>
      <h3 className="font-display mb-2 text-[1rem] text-[#4A2F22]">{label}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isSel = selected.includes(opt)
          let style: React.CSSProperties
          if (kind === 'genre') {
            const t = genreTheme(opt)
            style = isSel
              ? { backgroundColor: t.ink, borderColor: t.ink, color: '#fff' }
              : { backgroundColor: t.bg, borderColor: t.ink + '33', color: t.ink }
          } else {
            style = isSel
              ? { backgroundColor: '#B8793E', borderColor: '#B8793E', color: '#fff' }
              : { backgroundColor: '#F7E4B5', borderColor: '#C9A86A', color: '#7A5A45' }
          }
          const icon = kind === 'genre' ? GENRE_EMOJI[opt] : iconMap?.[opt]
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onToggle(opt)}
              aria-pressed={isSel}
              className="rounded-full border-2 px-3 py-2 text-[0.88rem] font-semibold transition active:scale-95"
              style={style}
            >
              {icon ? <span aria-hidden>{icon} </span> : null}
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}
