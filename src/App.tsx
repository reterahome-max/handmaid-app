import { useEffect, useRef } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useFirstLaunch } from './hooks/useFirstLaunch'
import { OnboardingFlow } from './components/onboarding/OnboardingFlow'
import { BottomTabs } from './components/BottomTabs'
import { HomePage } from './pages/HomePage'
import { SearchPage } from './pages/SearchPage'
import { FavoritesPage } from './pages/FavoritesPage'
import { WorkNotePage } from './pages/WorkNotePage'
import { MyPage } from './pages/MyPage'
import { RecipeDetailPage } from './pages/RecipeDetailPage'

export default function App() {
  const { isFirstLaunch } = useFirstLaunch()
  const mainRef = useRef<HTMLElement>(null)
  const { pathname } = useLocation()

  // 画面遷移したら本体スクロールを先頭に戻す（詳細を途中から開かないように）
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 })
  }, [pathname])

  // 初回起動時のみ：もりの扉（オープニング）→ 文字サイズ選択
  if (isFirstLaunch) {
    return (
      <div className="app-shell">
        <div className="app-main">
          <OnboardingFlow />
        </div>
      </div>
    )
  }

  return (
    <div className="app-shell">
      {/* スクロールするのはこの本体だけ。ヘッダー（各ページの sticky）と下部ナビは固定。 */}
      <main ref={mainRef} className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/notes" element={<WorkNotePage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <BottomTabs />
    </div>
  )
}
