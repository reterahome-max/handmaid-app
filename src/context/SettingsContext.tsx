import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

export type FontSizeKey = 'small' | 'standard' | 'large'

export interface FontSizeOption {
  key: FontSizeKey
  label: string
  /** 補足の説明 */
  hint: string
  /** アプリ全体に適用するルート font-size（px） */
  rootPx: number
  /** 選択画面のプレビュー用サンプル文字サイズ（px・常に固定） */
  samplePx: number
}

export const FONT_SIZE_OPTIONS: FontSizeOption[] = [
  { key: 'small', label: '小', hint: 'たくさん見たい方に', rootPx: 16, samplePx: 16 },
  { key: 'standard', label: '標準', hint: 'おすすめ', rootPx: 18.5, samplePx: 20 },
  { key: 'large', label: '大', hint: '読みやすさ優先', rootPx: 22, samplePx: 25 },
]

const STORAGE_FONT = 'hm_font_size'
const STORAGE_ONBOARDED = 'hm_onboarded'

interface SettingsValue {
  fontSize: FontSizeKey
  setFontSize: (key: FontSizeKey) => void
  onboarded: boolean
  completeOnboarding: (key: FontSizeKey) => void
}

const SettingsContext = createContext<SettingsValue | null>(null)

function readFontSize(): FontSizeKey {
  try {
    const v = localStorage.getItem(STORAGE_FONT)
    if (v === 'small' || v === 'standard' || v === 'large') return v
  } catch {
    /* localStorage が使えない場合は標準にフォールバック */
  }
  return 'standard'
}

function readOnboarded(): boolean {
  try {
    return localStorage.getItem(STORAGE_ONBOARDED) === 'true'
  } catch {
    return false
  }
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSizeState] = useState<FontSizeKey>(readFontSize)
  const [onboarded, setOnboarded] = useState<boolean>(readOnboarded)

  // ルート font-size を更新して、アプリ全体に文字サイズを反映する
  useEffect(() => {
    const opt = FONT_SIZE_OPTIONS.find((o) => o.key === fontSize) ?? FONT_SIZE_OPTIONS[0]
    document.documentElement.style.fontSize = `${opt.rootPx}px`
  }, [fontSize])

  const setFontSize = useCallback((key: FontSizeKey) => {
    setFontSizeState(key)
    try {
      localStorage.setItem(STORAGE_FONT, key)
    } catch {
      /* 保存に失敗しても画面表示は続行 */
    }
  }, [])

  const completeOnboarding = useCallback(
    (key: FontSizeKey) => {
      setFontSize(key)
      setOnboarded(true)
      try {
        localStorage.setItem(STORAGE_ONBOARDED, 'true')
      } catch {
        /* noop */
      }
    },
    [setFontSize],
  )

  return (
    <SettingsContext.Provider value={{ fontSize, setFontSize, onboarded, completeOnboarding }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings(): SettingsValue {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider')
  return ctx
}
