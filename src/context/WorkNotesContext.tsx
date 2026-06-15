import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

/** 作品ノートの1件（「作ったよ」の記録） */
export interface WorkNote {
  id: string
  recipeId?: string
  title: string
  emoji: string
  colors: [string, string]
  dateISO: string
  memo: string
}

const STORAGE_NOTES = 'cn_worknotes'

interface WorkNotesValue {
  notes: WorkNote[]
  addNote: (n: Omit<WorkNote, 'id' | 'dateISO'>) => void
  updateMemo: (id: string, memo: string) => void
  removeNote: (id: string) => void
  count: number
}

const WorkNotesContext = createContext<WorkNotesValue | null>(null)

function readNotes(): WorkNote[] {
  try {
    const raw = localStorage.getItem(STORAGE_NOTES)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed as WorkNote[]
  } catch {
    /* 壊れたデータは無視 */
  }
  return []
}

function makeId(): string {
  return `n_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
}

export function WorkNotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<WorkNote[]>(readNotes)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_NOTES, JSON.stringify(notes))
    } catch {
      /* noop */
    }
  }, [notes])

  const addNote = useCallback((n: Omit<WorkNote, 'id' | 'dateISO'>) => {
    setNotes((prev) => [{ ...n, id: makeId(), dateISO: new Date().toISOString() }, ...prev])
  }, [])

  const updateMemo = useCallback((id: string, memo: string) => {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, memo } : n)))
  }, [])

  const removeNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const value = useMemo<WorkNotesValue>(
    () => ({ notes, addNote, updateMemo, removeNote, count: notes.length }),
    [notes, addNote, updateMemo, removeNote],
  )

  return <WorkNotesContext.Provider value={value}>{children}</WorkNotesContext.Provider>
}

export function useWorkNotes(): WorkNotesValue {
  const ctx = useContext(WorkNotesContext)
  if (!ctx) throw new Error('useWorkNotes must be used within WorkNotesProvider')
  return ctx
}
