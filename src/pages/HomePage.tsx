import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
} from '../lib/icons'
import { SectionTitle } from '../components/SectionTitle'
import { RecipeCard } from '../components/RecipeCard'
import { SearchField } from '../components/SearchField'
import { Flourish, Sparkle } from '../components/Decor'

export function HomePage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : '/search')
  }

  const dayIndex = Math.floor(Date.now() / 86400000) % RECIPES.length
  const featured = RECIPES[dayIndex]
  const beginnerRecipes = RECIPES.filter((r) => r.beginnerFriendly).slice(0, 3)
  const popular = RECIPES.filter((r) => r.id !== featured.id).slice(0, 3)

  const goDifficulty = (label: string) => {
    if (label === 'はじめて') navigate('/search?beginner=1')
    else navigate(`/search?difficulty=${encodeURIComponent(label)}`)
  }

  return (
    <div>
      {/* 絵本の表紙のようなヘッダー（高さは控えめに） */}
      <header className="relative px-5 pb-3 pt-8 text-center">
        <Flourish className="text-[1.1rem]" />
        <h1 className="font-display mt-1.5 text-[1.7rem] leading-tight text-[#4A2F22]">
          <Sparkle className="mr-1 align-middle text-[0.9rem]" />
          クラフトのもり
          <Sparkle className="ml-1 align-middle text-[0.9rem]" />
        </h1>
        <p className="mt-1 text-[0.85rem] text-[#7A5A45]">〜 おとぎの国のハンドメイドレシピ帳 〜</p>
      </header>

      <main className="space-y-9 px-5 pt-2">
        {/* 入口のあいさつ＋魔法の検索 */}
        <section className="parchment relative overflow-hidden p-5 text-center">
          <h2 className="font-display text-[1.5rem] leading-snug text-[#4A2F22]">
            今日はなにを作る？
          </h2>
          <p className="mt-1.5 text-[0.92rem] leading-relaxed text-[#7A5A45]">
            小さなレシピ帳から、作りたいものを探してみましょう。
          </p>

          <div className="mt-4">
            <SearchField value={query} onChange={setQuery} onSubmit={submitSearch} />
          </div>
        </section>

        {/* 今日のおすすめ */}
        <section>
          <SectionTitle emoji="📖">今日のおすすめレシピ</SectionTitle>
          <div className="relative">
            <span
              aria-hidden
              className="washi left-6 -top-2 z-10 rotate-[-4deg] rounded-[2px]"
              style={{ backgroundColor: 'rgba(184,121,62,0.55)' }}
            />
            <RecipeCard recipe={featured} variant="hero" />
          </div>
        </section>

        {/* やってみたいこと */}
        <section>
          <SectionTitle emoji="💭">やってみたいこと</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {PURPOSES.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => navigate(`/search?purpose=${encodeURIComponent(p)}`)}
                className="signboard craft-tap inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.9rem] font-semibold text-[#7A5A45]"
              >
                <span aria-hidden className="text-base">
                  {PURPOSE_EMOJI[p]}
                </span>
                {p}
              </button>
            ))}
          </div>
        </section>

        {/* むずかしさ（はじめて／かんたん／ふつう／じっくり） */}
        <section>
          <SectionTitle emoji="⭐">むずかしさで探す</SectionTitle>
          <div className="grid grid-cols-2 gap-2.5">
            {DIFFICULTY_FILTERS.map((d) => {
              const beginner = d === 'はじめて'
              const t = beginner ? BEGINNER_THEME : DIFFICULTY_THEME[d as Difficulty]
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => goDifficulty(d)}
                  className="craft-tap flex min-h-[3.6rem] items-center justify-center gap-2 rounded-xl border-2"
                  style={{ backgroundColor: t.bg, borderColor: t.border, color: t.ink }}
                >
                  <span aria-hidden className="text-[1.05rem] tracking-tight">
                    {beginner ? '🌱' : difficultyStars(d as Difficulty)}
                  </span>
                  <span className="font-display text-[1.05rem]">{d}</span>
                </button>
              )
            })}
          </div>
        </section>

        {/* ジャンル＝森の看板（おとぎの国のもくじ） */}
        <section>
          <SectionTitle emoji="🗺️">どこへ行く？</SectionTitle>
          <div className="space-y-2.5">
            {GENRES.map((g) => {
              const t = genreTheme(g)
              return (
                <button
                  key={g}
                  type="button"
                  onClick={() => navigate(`/search?genre=${encodeURIComponent(g)}`)}
                  className="signboard craft-tap flex w-full items-center gap-3 px-3 py-2.5 text-left"
                >
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#0000000f] text-2xl"
                    style={{ backgroundColor: t.bg }}
                    aria-hidden
                  >
                    {GENRE_EMOJI[g]}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="font-display block text-[1.1rem] leading-tight" style={{ color: t.ink }}>
                      {GENRE_SUBTITLE[g]}
                    </span>
                    <span className="text-[0.8rem] text-[#7A5A45]">{g}</span>
                  </span>
                  <span aria-hidden className="shrink-0 text-[#A98C72]">
                    ›
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        {/* はじめてさんにおすすめ */}
        <section>
          <SectionTitle emoji="🌱" moreTo="/search?beginner=1">
            はじめてのレシピ
          </SectionTitle>
          <div className="space-y-4">
            {beginnerRecipes.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        </section>

        {/* 人気のレシピ */}
        <section>
          <SectionTitle emoji="🔥" moreTo="/search">
            みんなが見ているレシピ
          </SectionTitle>
          <div className="space-y-4">
            {popular.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        </section>

        <Flourish className="pt-2 text-[1rem]" />
      </main>
    </div>
  )
}
