import { useEffect, useRef, useState } from 'react'
import { GateOpeningAnimation } from './GateOpeningAnimation'
import { Flourish } from '../Decor'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

/** 扉が開いてから次へ進むまでの時間（ms） */
const OPEN_DURATION = 2100

/**
 * 初回オープニング画面。
 * 「もりの扉をひらく」で扉がひらく演出を見せ、終わったら onEnter() を呼ぶ。
 * 右上のスキップ、prefers-reduced-motion にも対応。
 */
export function OpeningGateScreen({ onEnter }: { onEnter: () => void }) {
  const reduced = usePrefersReducedMotion()
  const [opening, setOpening] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  const enter = () => {
    window.clearTimeout(timer.current)
    onEnter()
  }

  const openGate = () => {
    if (reduced) {
      enter()
      return
    }
    setOpening(true)
    timer.current = window.setTimeout(enter, OPEN_DURATION)
  }

  useEffect(() => () => window.clearTimeout(timer.current), [])

  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 py-10 text-center">
      {/* スキップ（演出中は出さない） */}
      {!opening && (
        <button
          type="button"
          onClick={enter}
          className="absolute right-4 top-4 rounded-full border border-[#D8B982] bg-[#FFF1CF]/80 px-3.5 py-1.5 text-[0.8rem] font-bold text-[#7A5A45]"
        >
          スキップ ›
        </button>
      )}

      {/* タイトル（演出が始まったらそっと消える） */}
      <div
        className={`transition-opacity duration-500 ${opening ? 'opacity-0' : 'opacity-100'}`}
      >
        <Flourish className="text-[1.1rem]" />
        <h1 className="font-display mt-2 text-[2.3rem] leading-tight text-[#4A2F22]">
          クラフトのもり
        </h1>
        <p className="mt-1.5 text-[0.98rem] text-[#7A5A45]">
          おとぎの国のハンドメイドレシピ帳
        </p>
      </div>

      {/* もりの扉 */}
      <div className="my-8">
        <GateOpeningAnimation open={opening} />
      </div>

      {/* ボタン（演出が始まったらそっと消える） */}
      <div
        className={`transition-opacity duration-500 ${opening ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
      >
        <button
          type="button"
          onClick={openGate}
          className="btn-primary font-display px-8 py-4 text-[1.25rem]"
        >
          🌿 もりの扉をひらく
        </button>
        <p className="mt-3 text-[0.8rem] text-[#A98C72]">
          そっと押すと、レシピ帳がひらきます
        </p>
      </div>
    </div>
  )
}
