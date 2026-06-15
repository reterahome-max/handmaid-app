import { Routes, Route, Navigate } from 'react-router-dom'
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

  // 初回起動時のみ：もりの扉（オープニング）→ 文字サイズ選択 を表示
  if (isFirstLaunch) {
    return <OnboardingFlow />
  }

  return (
    <div className="mx-auto min-h-[100dvh] max-w-md pb-24">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/notes" element={<WorkNotePage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <BottomTabs />
    </div>
  )
}
