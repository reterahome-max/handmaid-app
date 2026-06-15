import { Link } from 'react-router-dom'
import type { Recipe } from '../types'
import { Thumb } from './Thumb'
import { DifficultyBadge } from './DifficultyBadge'
import { FavoriteButton } from './FavoriteButton'
import { GenreTag } from './GenreTag'
import { Bookmark } from './Decor'
import { itemEmoji, genreTheme } from '../lib/icons'

/**
 * レシピカード。羊皮紙のページに、しおりを挟んだような見た目。
 * variant="hero" は「今日のおすすめ」用の大きいカード。
 */
export function RecipeCard({
  recipe,
  variant = 'list',
}: {
  recipe: Recipe
  variant?: 'list' | 'hero'
}) {
  const isHero = variant === 'hero'
  const gt = genreTheme(recipe.genres[0])

  return (
    <Link
      to={`/recipe/${recipe.id}`}
      className="craft-card craft-tap relative block overflow-hidden"
    >
      {/* 写真（主役・大きめ） */}
      <div className="relative">
        <Thumb
          emoji={recipe.emoji}
          colors={recipe.colors}
          className={`w-full ${isHero ? 'aspect-[16/10]' : 'aspect-[16/9]'}`}
          emojiClassName={isHero ? 'text-[5.5em]' : 'text-[4em]'}
          rounded="rounded-none"
        />

        {/* しおり（左上から下がる）／お気に入り（右上） */}
        <Bookmark color={gt.ink} className="absolute left-5 top-0 z-10 h-7" />
        <div className="absolute right-2.5 top-2.5">
          <FavoriteButton id={recipe.id} />
        </div>

        {/* 写真の下：難易度＋はじめてラベル */}
        <div className="absolute bottom-2.5 left-2.5 flex flex-wrap items-center gap-1.5">
          <DifficultyBadge difficulty={recipe.difficulty} />
          {recipe.beginnerFriendly && (
            <span className="rounded-md border border-[#BBD0B0] bg-[#E4EEE0]/95 px-2 py-0.5 text-[0.72rem] font-bold text-[#4E6F50]">
              🌱 はじめてOK
            </span>
          )}
        </div>
      </div>

      {/* 本文 */}
      <div className="px-3.5 pb-3.5 pt-3">
        <div className="mb-1.5">
          <GenreTag genre={recipe.genres[0]} />
        </div>

        <h3
          className={`font-display line-clamp-2 leading-snug text-[#4A2F22] ${
            isHero ? 'text-[1.45rem]' : 'text-[1.2rem]'
          }`}
        >
          {recipe.title}
        </h3>

        {isHero && (
          <p className="mt-1.5 line-clamp-2 text-[0.95rem] leading-relaxed text-[#7A5A45]">
            {recipe.description}
          </p>
        )}

        {/* 時間・材料数 */}
        <div className="mt-2 flex flex-wrap items-center gap-x-3.5 gap-y-1 text-[0.85rem] text-[#7A5A45]">
          <span className="inline-flex items-center gap-1 whitespace-nowrap">
            <span aria-hidden>🕒</span>
            {recipe.time}
          </span>
          <span className="inline-flex items-center gap-1 whitespace-nowrap">
            <span aria-hidden>🧶</span>
            使うもの {recipe.materials.length}つ
          </span>
        </div>

        {/* 必要な道具の一部をちらっと */}
        <div className="mt-2.5 flex items-center gap-1.5 border-t border-dashed border-[#D8B982] pt-2.5 text-[0.8rem] text-[#7A5A45]">
          <span className="shrink-0 font-semibold text-[#A98C72]">使う道具</span>
          <span className="truncate">
            {recipe.tools.slice(0, 3).map((t) => `${itemEmoji(t)} ${t}`).join('  ')}
            {recipe.tools.length > 3 ? ' …' : ''}
          </span>
        </div>

        {/* レシピを見る（カード全体がリンク・その見た目の合図） */}
        <div className="mt-3 flex justify-end">
          <span className="btn-soft font-display inline-flex items-center gap-1 px-4 py-1.5 text-[0.85rem]">
            レシピを見る <span aria-hidden>›</span>
          </span>
        </div>
      </div>
    </Link>
  )
}
