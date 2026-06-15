import { useFavorites } from '../context/FavoritesContext'
import { RECIPES } from '../data/recipes'
import { RecipeCard } from '../components/RecipeCard'
import { EmptyState } from '../components/EmptyState'
import { Flourish } from '../components/Decor'

export function FavoritesPage() {
  const { favorites } = useFavorites()
  const items = [...favorites]
    .reverse()
    .map((id) => RECIPES.find((r) => r.id === id))
    .filter((r): r is NonNullable<typeof r> => Boolean(r))

  return (
    <div>
      <header className="px-5 pb-3 pt-8 text-center">
        <Flourish className="text-[1rem]" />
        <h1 className="font-display mt-1.5 flex items-center justify-center gap-2 text-[1.7rem] text-[#4A2F22]">
          <span aria-hidden>📖</span>わたしのレシピブック
        </h1>
        <p className="mt-1 text-[0.85rem] text-[#7A5A45]">
          気に入ったレシピを集めた、自分だけの一冊。
        </p>
      </header>

      <main className="px-5 py-3">
        {items.length === 0 ? (
          <EmptyState
            emoji="📖"
            title="レシピブックはまだ空っぽ"
            message={'まだレシピブックにしまったレシピはありません。\n気になるレシピを見つけたら、ここにしまっておけます。'}
            actionLabel="レシピをさがしに行く"
            actionTo="/search"
          />
        ) : (
          <>
            <p className="font-display mb-3 text-[1rem] text-[#7A5A45]">
              {items.length}件のレシピをしまってあります
            </p>
            {/* 本棚に並んでいるように：カードの下に木の棚 */}
            <div className="space-y-5">
              {items.map((r) => (
                <div key={r.id}>
                  <RecipeCard recipe={r} />
                  <div className="shelf mx-2 h-2" aria-hidden />
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
