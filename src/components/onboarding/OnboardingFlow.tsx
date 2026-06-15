import { useState } from 'react'
import { OpeningGateScreen } from './OpeningGateScreen'
import { FontSizeSetupScreen } from './FontSizeSetupScreen'

type Step = 'gate' | 'font'

/**
 * 初回起動の流れ：
 *   もりの扉（オープニング） → 文字サイズ選択 →（はじめる）→ ホーム
 * 完了すると SettingsContext の onboarded が true になり、次回以降は表示されない。
 */
export function OnboardingFlow() {
  const [step, setStep] = useState<Step>('gate')

  if (step === 'gate') {
    return <OpeningGateScreen onEnter={() => setStep('font')} />
  }
  return <FontSizeSetupScreen />
}
