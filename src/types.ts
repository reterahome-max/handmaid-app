export type Difficulty = 'かんたん' | 'ふつう' | 'じっくり'

/** 代替できる道具（注意点つき） */
export interface ToolAlt {
  tool: string
  alt: string
  note?: string
}

/** 作り方の1ステップ（1ステップ1動作） */
export interface Step {
  caption: string
  description: string
  emoji: string
}

export interface Recipe {
  id: string
  title: string
  /** カバー画像のかわりに使う絵文字 */
  emoji: string
  /** プレースホルダー画像のグラデーション色（淡いパステル2色） */
  colors: [string, string]
  genres: string[]
  difficulty: Difficulty
  /** 表示用の制作時間（例: "30分", "2時間"） */
  time: string
  /** 並べ替え・絞り込み用の分換算 */
  timeMinutes: number
  materials: string[]
  tools: string[]
  alternatives: ToolAlt[]
  steps: Step[]
  description: string
  cautions: string[]
  beginnerPoints: string[]
  purposes: string[]
  beginnerFriendly: boolean
  isNew: boolean
}
