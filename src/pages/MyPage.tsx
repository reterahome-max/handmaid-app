import { Link } from 'react-router-dom'
import { FONT_SIZE_OPTIONS, useSettings } from '../context/SettingsContext'
import { useFavorites } from '../context/FavoritesContext'
import { Flourish } from '../components/Decor'

export function MyPage() {
  const { fontSize, setFontSize } = useSettings()
  const { count } = useFavorites()

  return (
    <div>
      <header className="px-5 pb-3 pt-8 text-center">
        <Flourish className="text-[1rem]" />
        <h1 className="font-display mt-1.5 flex items-center justify-center gap-2 text-[1.7rem] text-[#4A2F22]">
          <span aria-hidden>🍃</span>もりの設定
        </h1>
      </header>

      <main className="space-y-5 px-5 py-3">
        {/* わたしのレシピブック（件数） */}
        <Link to="/favorites" className="parchment craft-tap flex items-center justify-between p-5">
          <div className="flex items-center gap-3">
            <span aria-hidden className="text-3xl">
              📖
            </span>
            <div>
              <p className="font-display text-[1.15rem] text-[#4A2F22]">わたしのレシピブック</p>
              <p className="text-[0.85rem] text-[#7A5A45]">集めたレシピを見る</p>
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-display text-2xl text-[#B8793E]">{count}</span>
            <span className="text-[0.85rem] text-[#7A5A45]">件 ›</span>
          </div>
        </Link>

        {/* 文字サイズ設定 */}
        <section className="parchment p-5">
          <h2 className="mb-1 flex items-center gap-2">
            <span className="label-tag flex h-8 w-8 items-center justify-center text-[1rem]" aria-hidden>
              🔠
            </span>
            <span className="font-display text-[1.25rem] text-[#4A2F22]">読みやすさ</span>
          </h2>
          <p className="text-[0.88rem] text-[#7A5A45]">読みやすい大きさに変えられます。</p>
          <div className="mt-4 grid grid-cols-3 gap-2.5">
            {FONT_SIZE_OPTIONS.map((opt) => {
              const isSel = fontSize === opt.key
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setFontSize(opt.key)}
                  aria-pressed={isSel}
                  className="craft-tap flex flex-col items-center justify-center gap-1 rounded-xl border-2 px-2 py-3"
                  style={{
                    borderColor: isSel ? '#B8793E' : '#D8B982',
                    backgroundColor: isSel ? '#FBEAC9' : '#FFF8E4',
                  }}
                >
                  <span
                    aria-hidden
                    className="leading-none text-[#8A5A2C]"
                    style={{ fontSize: `${opt.samplePx}px` }}
                  >
                    あA
                  </span>
                  <span
                    className="font-display text-[0.95rem]"
                    style={{ color: isSel ? '#B8793E' : '#7A5A45' }}
                  >
                    {opt.label}
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        {/* レシピ帳の使い方 */}
        <section className="parchment p-5">
          <h2 className="mb-1 flex items-center gap-2">
            <span className="label-tag flex h-8 w-8 items-center justify-center text-[1rem]" aria-hidden>
              📖
            </span>
            <span className="font-display text-[1.25rem] text-[#4A2F22]">レシピ帳の使い方</span>
          </h2>
          <ol className="mt-3 space-y-3.5">
            {[
              { n: '1', t: '読みやすい文字サイズを選ぶ', d: 'いつでもこのページで変えられます。' },
              { n: '2', t: 'ジャンルや目的から探す', d: 'おうちや「さがす」から選べます。' },
              { n: '3', t: '気になる作品を選ぶ', d: 'カードを押すと、くわしく見られます。' },
              { n: '4', t: '材料・道具・作り方を確認', d: '代わりに使える道具もわかります。' },
              { n: '5', t: 'レシピ帳に書きとめる', d: '♡ を押すと、いつでも見返せます。' },
            ].map((s) => (
              <li key={s.n} className="flex gap-3">
                <span className="font-display flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#D8B982] bg-[#FBEFD0] text-[0.95rem] font-bold text-[#9A6B2E]">
                  {s.n}
                </span>
                <div>
                  <p className="font-display text-[1.02rem] text-[#4A2F22]">{s.t}</p>
                  <p className="text-[0.85rem] text-[#7A5A45]">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* はじめての方へ（付せん風） */}
        <section className="memo p-5" style={{ backgroundColor: '#E4EEE0', borderColor: '#BBD0B0' }}>
          <h2 className="font-display flex items-center gap-2 text-[1.2rem] text-[#3D5E3E]">
            <span aria-hidden>🌱</span>はじめての方へ
          </h2>
          <p className="mt-2 leading-relaxed text-[#4E6F50]">
            むずかしい言葉は、なるべく使っていません。まずは「はじめて」や「かんたん（★☆☆）」、
            「道具少なめ」のレシピからどうぞ。作り方は1ステップずつ、絵といっしょに見られるので、
            自分のペースで進められます。
          </p>
        </section>

        <p className="font-display pt-1 text-center text-[0.8rem] text-[#A98C72]">
          クラフトのもり ・ おとぎの国のハンドメイドレシピ帳
        </p>
      </main>
    </div>
  )
}
