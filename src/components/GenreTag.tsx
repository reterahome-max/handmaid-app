import { genreTheme, GENRE_EMOJI } from '../lib/icons'

/** ジャンルの色タグ（図鑑のラベルのように、ジャンルごとに柔らかく色分け） */
export function GenreTag({
  genre,
  size = 'sm',
}: {
  genre: string
  size?: 'sm' | 'md'
}) {
  const t = genreTheme(genre)
  const pad = size === 'md' ? 'px-3 py-1 text-[0.9rem]' : 'px-2.5 py-0.5 text-[0.74rem]'
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-md border font-semibold ${pad}`}
      style={{ backgroundColor: t.bg, color: t.ink, borderColor: t.ink + '33' }}
    >
      <span aria-hidden>{GENRE_EMOJI[genre] ?? '🧶'}</span>
      {genre}
    </span>
  )
}
