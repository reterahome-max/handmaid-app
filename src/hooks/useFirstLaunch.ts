import { useSettings } from '../context/SettingsContext'

/**
 * 初回起動かどうかの判定ロジック。
 * SettingsContext の onboarded（localStorage: hm_onboarded）をもとに、
 * 初回オープニング〜文字サイズ選択を表示すべきかを返す。
 */
export function useFirstLaunch(): { isFirstLaunch: boolean } {
  const { onboarded } = useSettings()
  return { isFirstLaunch: !onboarded }
}
