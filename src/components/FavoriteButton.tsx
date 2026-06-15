import { useFavorites } from '../context/FavoritesContext'

/**
 * お気に入りボタン（はんこ風のハート）。
 * カード内（Link の中）でも使えるよう、クリックは伝播を止める。
 */
export function FavoriteButton({
  id,
  size = 'md',
}: {
  id: string
  size?: 'md' | 'lg'
}) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const active = isFavorite(id)
  const box = size === 'lg' ? 'h-12 w-12 text-[1.45rem]' : 'h-10 w-10 text-[1.15rem]'

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleFavorite(id)
      }}
      aria-pressed={active}
      aria-label={active ? 'レシピブックから外す' : 'レシピブックにしまう'}
      className={`flex shrink-0 items-center justify-center rounded-full border-2 transition active:scale-90 ${box}`}
      style={
        active
          ? { backgroundColor: '#F6DCE4', borderColor: '#DCA0AE', color: '#B86A86' }
          : { backgroundColor: '#FFF1CF', borderColor: '#E6D3AB', color: '#A98C72' }
      }
    >
      <span aria-hidden>{active ? '❤' : '♡'}</span>
    </button>
  )
}
