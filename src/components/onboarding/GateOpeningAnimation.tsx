import type { CSSProperties } from 'react'

/** 扉が開くときに、ふわっと舞う星と葉 */
const PARTICLES: {
  glyph: string
  top: string
  left: string
  dx: string
  dy: string
  rot: string
  delay: string
  color: string
  size: string
}[] = [
  { glyph: '✦', top: '20%', left: '14%', dx: '-46px', dy: '-80px', rot: '-25deg', delay: '0.05s', color: '#D6A84F', size: '1.2rem' },
  { glyph: '❀', top: '30%', left: '82%', dx: '52px', dy: '-70px', rot: '30deg', delay: '0.15s', color: '#E8A7B8', size: '1.1rem' },
  { glyph: '⋆', top: '50%', left: '8%', dx: '-60px', dy: '-40px', rot: '0deg', delay: '0.25s', color: '#D6A84F', size: '1rem' },
  { glyph: '✦', top: '60%', left: '88%', dx: '60px', dy: '-50px', rot: '20deg', delay: '0.1s', color: '#a9c79a', size: '0.95rem' },
  { glyph: '❀', top: '14%', left: '50%', dx: '0px', dy: '-90px', rot: '-15deg', delay: '0.2s', color: '#D6A84F', size: '1rem' },
  { glyph: '⋆', top: '72%', left: '24%', dx: '-30px', dy: '-30px', rot: '10deg', delay: '0.3s', color: '#9A82B8', size: '0.9rem' },
  { glyph: '✦', top: '40%', left: '94%', dx: '46px', dy: '-30px', rot: '-20deg', delay: '0.35s', color: '#D6A84F', size: '0.85rem' },
  { glyph: '⋆', top: '24%', left: '30%', dx: '-20px', dy: '-72px', rot: '0deg', delay: '0.4s', color: '#D6A84F', size: '0.8rem' },
  { glyph: '❀', top: '64%', left: '6%', dx: '-54px', dy: '-44px', rot: '25deg', delay: '0.45s', color: '#9DBBA0', size: '0.95rem' },
  { glyph: '✦', top: '78%', left: '74%', dx: '40px', dy: '-26px', rot: '15deg', delay: '0.2s', color: '#D6A84F', size: '0.9rem' },
]

/**
 * もりの扉（木の両開き扉）。open=true で扉がひらき、星と葉がふわっと舞う。
 * アニメーションは CSS（prefers-reduced-motion 対応）で制御する。
 */
export function GateOpeningAnimation({ open }: { open: boolean }) {
  return (
    <div className={`gate-stage ${open ? 'is-open' : ''}`} aria-hidden>
      <div className="gate-glow" />

      <div className="gate-frame">
        <div className="gate-leaf gate-leaf-left">
          <span className="gate-carve">❀</span>
          <span className="gate-knob" style={{ right: '0.55rem' }} />
        </div>
        <div className="gate-leaf gate-leaf-right">
          <span className="gate-carve">✦</span>
          <span className="gate-knob" style={{ left: '0.55rem' }} />
        </div>
      </div>

      <div className="gate-particles">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="gate-particle"
            style={
              {
                top: p.top,
                left: p.left,
                color: p.color,
                fontSize: p.size,
                animationDelay: p.delay,
                '--dx': p.dx,
                '--dy': p.dy,
                '--rot': p.rot,
              } as CSSProperties
            }
          >
            {p.glyph}
          </span>
        ))}
      </div>
    </div>
  )
}
