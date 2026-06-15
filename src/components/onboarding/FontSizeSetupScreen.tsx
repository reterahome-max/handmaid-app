import { useState } from 'react'
import {
  FONT_SIZE_OPTIONS,
  useSettings,
  type FontSizeKey,
} from '../../context/SettingsContext'
import { Flourish } from '../Decor'

/**
 * 文字サイズ選択画面（オープニングのあとに表示）。
 * 「はじめる」で文字サイズを保存し、初回フローを完了する（→ ホームへ）。
 */
export function FontSizeSetupScreen() {
  const { completeOnboarding } = useSettings()
  const [selected, setSelected] = useState<FontSizeKey>('standard')

  return (
    <div className="min-h-[100dvh] px-5 pb-10 pt-12">
      <div className="mx-auto flex max-w-md flex-col">
        <div className="text-center">
          <Flourish className="text-[1rem]" />
          <h1 className="font-display mt-2 text-[1.7rem] leading-snug text-[#4A2F22]">
            まずは文字の大きさをえらびましょう
          </h1>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-[#7A5A45]">
            読みやすい大きさで、レシピをもっと楽しく。
          </p>
        </div>

        <div className="parchment mt-7 p-5">
          <div className="flex flex-col gap-3">
            {FONT_SIZE_OPTIONS.map((opt) => {
              const isSel = selected === opt.key
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setSelected(opt.key)}
                  aria-pressed={isSel}
                  className="craft-tap flex items-center justify-between gap-3 rounded-xl border-2 px-4 py-3.5 text-left"
                  style={{
                    borderColor: isSel ? '#B8793E' : '#D8B982',
                    backgroundColor: isSel ? '#FBEAC9' : '#FFF8E4',
                  }}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs"
                      style={
                        isSel
                          ? { borderColor: '#B8793E', backgroundColor: '#B8793E', color: '#fff' }
                          : { borderColor: '#C9AE86', color: 'transparent' }
                      }
                    >
                      <span aria-hidden>✓</span>
                    </span>
                    <span>
                      <span className="font-display block text-[1.15rem] text-[#4A2F22]">
                        {opt.label}
                      </span>
                      <span className="text-[0.78rem] text-[#A98C72]">{opt.hint}</span>
                    </span>
                  </span>
                  <span
                    className="shrink-0 leading-none text-[#8A5A2C]"
                    style={{ fontSize: `${opt.samplePx}px` }}
                  >
                    あA
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={() => completeOnboarding(selected)}
          className="btn-primary font-display mt-7 w-full px-6 py-4 text-[1.3rem]"
        >
          はじめる
        </button>

        <p className="mt-4 text-center text-[0.85rem] text-[#A98C72]">
          あとから「じぶん」のページで変えられます
        </p>
      </div>
    </div>
  )
}
