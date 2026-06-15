import { NavLink } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import { useWorkNotes } from '../context/WorkNotesContext'

const TABS = [
  { to: '/', label: 'おうち', emoji: '🏠', end: true },
  { to: '/search', label: 'さがす', emoji: '🔍', end: false },
  { to: '/favorites', label: 'レシピ帳', emoji: '📖', end: false },
  { to: '/notes', label: '作品ノート', emoji: '📓', end: false },
  { to: '/mypage', label: 'せってい', emoji: '🍃', end: false },
]

export function BottomTabs() {
  const { count: favCount } = useFavorites()
  const { count: noteCount } = useWorkNotes()

  const badgeFor = (to: string) => {
    if (to === '/favorites') return favCount
    if (to === '/notes') return noteCount
    return 0
  }

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-[#D8B982] bg-[#F7E4B5]/97 backdrop-blur-md pb-safe">
      <div className="mx-auto flex max-w-md items-stretch justify-around">
        {TABS.map((tab) => {
          const badge = badgeFor(tab.to)
          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.end}
              className="relative flex min-h-[3.7rem] flex-1 flex-col items-center justify-center gap-0.5 px-0.5 py-1.5 text-[0.66rem] font-bold"
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute top-0 h-1 w-8 rounded-full bg-[#B8793E]"
                    />
                  )}
                  <span
                    className="relative text-[1.3rem] leading-none"
                    style={{ filter: isActive ? 'none' : 'grayscale(0.4) opacity(0.75)' }}
                  >
                    <span aria-hidden>{tab.emoji}</span>
                    {badge > 0 && (
                      <span className="absolute -right-2.5 -top-1.5 min-w-[1.05rem] rounded-full bg-[#B8793E] px-1 text-center text-[0.58rem] font-bold leading-[1.05rem] text-white">
                        {badge}
                      </span>
                    )}
                  </span>
                  <span
                    className="whitespace-nowrap"
                    style={{ color: isActive ? '#B8793E' : '#A98C72' }}
                  >
                    {tab.label}
                  </span>
                </>
              )}
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
