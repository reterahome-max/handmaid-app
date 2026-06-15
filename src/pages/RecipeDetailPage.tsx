import { useState, type ReactNode } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getRecipe } from '../data/recipes'
import { itemEmoji, genreTheme, DIFFICULTY_THEME } from '../lib/icons'
import { Thumb } from '../components/Thumb'
import { FavoriteButton } from '../components/FavoriteButton'
import { GenreTag } from '../components/GenreTag'
import { ToolChecklist } from '../components/ToolChecklist'
import { Flourish, Sparkle } from '../components/Decor'
import { useWorkNotes } from '../context/WorkNotesContext'
import type { Recipe } from '../types'

export function RecipeDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const recipe = getRecipe(id)

  if (!recipe) {
    return (
      <div className="px-5 py-20 text-center">
        <div className="mb-3 text-5xl">😿</div>
        <p className="font-display text-[1.2rem] text-[#4A2F22]">
          レシピが見つかりませんでした
        </p>
        <Link to="/search" className="btn-primary font-display mt-5 inline-block px-6 py-3">
          レシピをさがす
        </Link>
      </div>
    )
  }

  const gt = genreTheme(recipe.genres[0])

  return (
    <div>
      {/* 上部バー（戻る／お気に入り） */}
      <div className="sticky top-0 z-30 flex items-center justify-between bg-[#FFF7E8]/95 px-3 py-2.5 backdrop-blur-md">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="craft-card craft-tap flex items-center gap-1 px-4 py-2 text-[0.9rem] font-bold text-[#7A5A45]"
        >
          <span aria-hidden>‹</span> もどる
        </button>
        <FavoriteButton id={recipe.id} size="lg" />
      </div>

      {/* 完成イメージ画像（写真が主役・ポラロイド風） */}
      <div className="px-5 pt-1">
        <Thumb
          emoji={recipe.emoji}
          colors={recipe.colors}
          label="完成イメージ"
          className="aspect-[4/3] w-full"
          emojiClassName="text-[5.5em]"
          rounded="rounded-lg"
          frame
        />
      </div>

      <main className="px-5 pb-4">
        {/* タイトル＆メタ */}
        <div className="mt-5">
          <div className="mb-2.5 flex flex-wrap gap-1.5">
            {recipe.genres.map((g) => (
              <GenreTag key={g} genre={g} />
            ))}
          </div>

          <Flourish className="justify-start text-[0.95rem]" />
          <h1 className="font-display mt-1 text-[2rem] leading-snug text-[#4A2F22]">
            {recipe.title}
            <Sparkle className="ml-2 align-middle text-[1rem]" />
          </h1>

          {/* レシピ本の情報欄のような帯 */}
          <div className="craft-card mt-4 grid grid-cols-3 divide-x divide-[#E6D3AB] overflow-hidden text-center">
            <InfoCell label="難易度">
              <span className="flex flex-col items-center leading-tight">
                <span
                  aria-hidden
                  className="text-[0.95rem] tracking-tight"
                  style={{ color: DIFFICULTY_THEME[recipe.difficulty].ink, letterSpacing: '-0.05em' }}
                >
                  {'★'.repeat(DIFFICULTY_THEME[recipe.difficulty].stars)}
                  <span style={{ opacity: 0.3 }}>
                    {'★'.repeat(3 - DIFFICULTY_THEME[recipe.difficulty].stars)}
                  </span>
                </span>
                <span
                  className="font-display text-[0.92rem]"
                  style={{ color: DIFFICULTY_THEME[recipe.difficulty].ink }}
                >
                  {recipe.difficulty}
                </span>
              </span>
            </InfoCell>
            <InfoCell label="時間">
              <span className="font-display text-[1.05rem] text-[#4A2F22]">🕒 {recipe.time}</span>
            </InfoCell>
            <InfoCell label="使うもの">
              <span className="font-display text-[1.05rem] text-[#4A2F22]">
                🧶 {recipe.materials.length}つ
              </span>
            </InfoCell>
          </div>

          {recipe.beginnerFriendly && (
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[#BBD0B0] bg-[#E4EEE0] px-3 py-1.5 text-[0.9rem] font-bold text-[#4E6F50]">
              🌱 初心者さんにおすすめ
            </div>
          )}

          <p className="mt-4 leading-relaxed text-[#7A5A45]">{recipe.description}</p>
        </div>

        {/* 必要な材料（レシピ本の材料欄・点線リスト） */}
        <Section emoji="🧶" title="使うもの" accent={gt.ink}>
          <ul className="craft-card divide-y divide-dashed divide-[#E6D3AB] overflow-hidden">
            {recipe.materials.map((m) => (
              <li key={m} className="flex items-center gap-3 px-4 py-3">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg"
                  style={{ backgroundColor: recipe.colors[0] }}
                  aria-hidden
                >
                  {itemEmoji(m)}
                </span>
                <span className="text-[1rem] font-medium text-[#4A2F22]">{m}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* 使う道具（チェックリスト風） */}
        <Section emoji="🛠️" title="使う道具" accent={gt.ink}>
          <p className="-mt-1 mb-2.5 text-[0.85rem] text-[#7A5A45]">
            用意できたら、タップしてチェック✓
          </p>
          <ToolChecklist tools={recipe.tools} />
        </Section>

        {/* 代替できる道具（「代わりに使えるもの」付せん風） */}
        <Section emoji="💡" title="代わりに使えるもの" accent={gt.ink}>
          <p className="-mt-1 mb-3 text-[0.85rem] text-[#7A5A45]">
            おうちにあるもので代用できます。
          </p>
          <div className="space-y-3">
            {recipe.alternatives.map((a) => (
              <div
                key={a.tool}
                className="memo p-3.5"
                style={{ backgroundColor: '#FBEFD0', borderColor: '#D8B982' }}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-md border border-[#D8B982] bg-[#FFF1CF] px-2.5 py-1 text-[0.9rem] font-semibold text-[#4A2F22]">
                    {itemEmoji(a.tool)} {a.tool}
                  </span>
                  <span aria-hidden className="font-display text-[#9A6B2E]">
                    がなければ →
                  </span>
                  <span className="font-display text-[1rem] text-[#8A5A2C]">{a.alt}</span>
                </div>
                {a.note && (
                  <p className="mt-2.5 flex gap-1.5 rounded-lg bg-[#FFF1CF]/80 p-2.5 text-[0.88rem] leading-relaxed text-[#7A5A45]">
                    <span aria-hidden>📝</span>
                    <span>{a.note}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        </Section>

        {/* 作り方ステップ（レシピ本のように） */}
        <Section emoji="📖" title="作り方の手順" accent={gt.ink}>
          <div className="space-y-4">
            {recipe.steps.map((step, i) => (
              <div key={i} className="craft-card overflow-hidden p-3.5">
                {/* ステップ見出し：丸い印（ろう封風）＋しおりラベル */}
                <div className="label-tag mb-3 inline-flex items-center gap-2 py-1.5 pl-1.5 pr-3">
                  <span className="font-display flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#B8793E] text-[0.95rem] font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">
                    {i + 1}
                  </span>
                  <span className="font-display text-[1.02rem] text-[#7A5A45]">{step.caption}</span>
                </div>
                {/* 参考画像（左）＋説明（右）。狭い画面でも見切れないよう調整 */}
                <div className="flex items-start gap-3.5">
                  <Thumb
                    emoji={step.emoji}
                    colors={recipe.colors}
                    className="h-28 w-28 shrink-0"
                    emojiClassName="text-[2.7em]"
                    rounded="rounded-lg"
                  />
                  <p className="min-w-0 flex-1 self-center text-[1.02rem] leading-relaxed text-[#4A2F22]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* 注意点（付せん風） */}
        <Section emoji="⚠️" title="気をつけること" accent={gt.ink}>
          <ul
            className="memo space-y-2 p-4"
            style={{ backgroundColor: '#F6E0D2', borderColor: '#D8A98C' }}
          >
            {recipe.cautions.map((c, i) => (
              <li key={i} className="flex gap-2 leading-relaxed text-[#A8552F]">
                <span aria-hidden className="shrink-0">
                  ・
                </span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* 初心者向けポイント（付せん風） */}
        <Section emoji="🌱" title="初心者さんのコツ" accent={gt.ink}>
          <ul
            className="memo space-y-2 p-4"
            style={{ backgroundColor: '#E4EEE0', borderColor: '#BBD0B0' }}
          >
            {recipe.beginnerPoints.map((p, i) => (
              <li key={i} className="flex gap-2 leading-relaxed text-[#4E6F50]">
                <span aria-hidden className="shrink-0">
                  ✓
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* 作ったよ！を作品ノートに記録 */}
        <div className="mt-8">
          <MadeItButton recipe={recipe} />
        </div>

        {/* お気に入りボタン（下部・大きめ） */}
        <div className="craft-card mt-4 flex items-center justify-center gap-3 p-4">
          <span className="font-display text-[1.05rem] text-[#7A5A45]">レシピブックにしまう</span>
          <FavoriteButton id={recipe.id} size="lg" />
        </div>

        <Flourish className="mt-6 text-[1rem]" />
      </main>
    </div>
  )
}

/** 「作ったよ！」を作品ノートに書きとめるボタン */
function MadeItButton({ recipe }: { recipe: Recipe }) {
  const { addNote } = useWorkNotes()
  const [done, setDone] = useState(false)

  if (done) {
    return (
      <div className="memo flex flex-wrap items-center justify-center gap-2 p-4 text-center" style={{ backgroundColor: '#E4EEE0', borderColor: '#BBD0B0' }}>
        <span className="font-display text-[1.05rem] text-[#3D5E3E]">
          📓 作品ノートに書きとめました！
        </span>
        <Link to="/notes" className="btn-soft font-display px-4 py-2 text-[0.95rem]">
          ノートを見る ›
        </Link>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => {
        addNote({
          recipeId: recipe.id,
          title: recipe.title,
          emoji: recipe.emoji,
          colors: recipe.colors,
          memo: '',
        })
        setDone(true)
      }}
      className="btn-primary font-display flex w-full items-center justify-center gap-2 px-6 py-4 text-[1.2rem]"
    >
      🪡 作ったよ！ノートに書く
    </button>
  )
}

function InfoCell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="px-2 py-3">
      <p className="mb-1 text-[0.72rem] font-bold tracking-wider text-[#A98C72]">{label}</p>
      <div className="flex items-center justify-center">{children}</div>
    </div>
  )
}

function Section({
  emoji,
  title,
  accent,
  children,
}: {
  emoji: string
  title: string
  accent: string
  children: ReactNode
}) {
  return (
    <section className="mt-8">
      <h2 className="mb-3 flex items-center gap-2 text-[1.3rem] text-[#4A2F22]">
        {/* 紙のラベル（しおり）風の見出し */}
        <span
          aria-hidden
          className="label-tag flex h-9 w-9 shrink-0 items-center justify-center text-[1.1rem]"
          style={{ borderColor: accent + '66' }}
        >
          {emoji}
        </span>
        <span className="font-display underline-craft">{title}</span>
        <Sparkle className="text-[0.75rem]" />
      </h2>
      {children}
    </section>
  )
}
