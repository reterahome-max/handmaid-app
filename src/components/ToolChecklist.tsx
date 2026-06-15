import { useState } from 'react'
import { itemEmoji } from '../lib/icons'

/**
 * 使う道具のチェックリスト。
 * 用意できたものをタップしてチェックできる（メモのチェックリスト風）。
 */
export function ToolChecklist({ tools }: { tools: string[] }) {
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  return (
    <ul className="craft-card divide-y divide-dashed divide-[#E6D3AB] overflow-hidden">
      {tools.map((tool) => {
        const on = !!checked[tool]
        return (
          <li key={tool}>
            <button
              type="button"
              onClick={() => setChecked((c) => ({ ...c, [tool]: !c[tool] }))}
              aria-pressed={on}
              className="flex w-full items-center gap-3 px-4 py-3 text-left transition active:bg-[#F7E4B5]"
            >
              {/* チェックボックス */}
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border-2 text-[0.9rem] font-bold"
                style={
                  on
                    ? { backgroundColor: '#6F8F72', borderColor: '#6F8F72', color: '#fff' }
                    : { backgroundColor: '#FFF1CF', borderColor: '#C9AE86', color: 'transparent' }
                }
              >
                <span aria-hidden>✓</span>
              </span>
              <span aria-hidden className="text-xl">
                {itemEmoji(tool)}
              </span>
              <span
                className="text-[1rem] font-medium"
                style={{
                  color: on ? '#A98C72' : '#4A2F22',
                  textDecoration: on ? 'line-through' : 'none',
                }}
              >
                {tool}
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
