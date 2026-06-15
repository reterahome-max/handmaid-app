import type { Difficulty, Recipe } from '../types'

/** 対応ジャンル（フィルター用） */
export const GENRES = [
  'レジン',
  'ビーズ',
  '刺繍',
  '編み物',
  '布小物',
  '紙工作',
  'キーホルダー',
  'アクセサリー',
  'フェルト',
  'インテリア雑貨',
  '子ども工作',
] as const

/** 難易度（3段階） */
export const DIFFICULTIES: Difficulty[] = ['かんたん', 'ふつう', 'じっくり']

/**
 * むずかしさのフィルター表示。
 * 「はじめて」は初心者さん向け（beginnerFriendly）を表す特別なラベル。
 */
export const DIFFICULTY_FILTERS = ['はじめて', 'かんたん', 'ふつう', 'じっくり'] as const

/** やりたいこと（目的フィルター） */
export const PURPOSES = [
  'プレゼントを作りたい',
  '子どもと楽しみたい',
  '短時間で作りたい',
  '家に飾りたい',
  'アクセサリーを作りたい',
  '初心者向け',
  '道具少なめ',
  '販売向けアイデア',
] as const

export const RECIPES: Recipe[] = [
  {
    id: 'resin-keyholder',
    title: 'レジンキーホルダー',
    emoji: '🔑',
    colors: ['#FFE0E9', '#FFC9D6'],
    genres: ['レジン', 'キーホルダー', 'アクセサリー'],
    difficulty: 'かんたん',
    time: '30分',
    timeMinutes: 30,
    materials: ['UVレジン', 'モールド', 'ラメ', 'シェルパーツ', 'キーホルダー金具', '着色剤'],
    tools: ['UVライト', 'ピンセット', 'つまようじ', 'ハサミ'],
    alternatives: [
      { tool: 'ピンセット', alt: '竹串' },
      { tool: 'つまようじ', alt: '細い棒' },
      {
        tool: 'UVライト',
        alt: '日光硬化対応レジンなら日光でも可',
        note: '日光で固める場合は、固まるまで時間がかかることがあります。',
      },
    ],
    steps: [
      {
        caption: '流し込む',
        emoji: '🫧',
        description: 'モールドの底が隠れるくらい、UVレジンをそっと流し込みます。',
      },
      {
        caption: 'パーツを置く',
        emoji: '🐚',
        description: 'ピンセットで、シェルパーツやラメを好きな場所に置きます。',
      },
      {
        caption: '気泡を取る',
        emoji: '🪥',
        description: 'レジンを足して、つまようじで気泡をやさしく取りのぞきます。',
      },
      {
        caption: '光で固める',
        emoji: '💡',
        description: 'UVライトに2〜3分あてて、しっかり固めます。',
      },
      {
        caption: '金具をつける',
        emoji: '🔑',
        description: 'モールドから外し、キーホルダー金具をつけたら完成です。',
      },
    ],
    description:
      '透明なレジンの中に、キラキラのパーツを閉じこめる人気のレシピです。短い時間で作れるので、はじめてのハンドメイドにぴったりです。',
    cautions: [
      '気泡が入りやすいので、レジンはゆっくり入れましょう。',
      '硬化が足りないとベタつきます。光をしっかりあてましょう。',
      'パーツを入れすぎると固まりにくくなります。',
    ],
    beginnerPoints: [
      'レジンは少しずつ入れると失敗しにくいです。',
      '気泡は早めにつまようじで取りましょう。',
      'パーツは欲ばらず、少なめが◎。',
    ],
    purposes: ['プレゼントを作りたい', 'アクセサリーを作りたい', '初心者向け', '短時間で作りたい', '販売向けアイデア'],
    beginnerFriendly: true,
    isNew: false,
  },
  {
    id: 'beads-bracelet',
    title: 'ビーズブレスレット',
    emoji: '📿',
    colors: ['#D8F3E8', '#B8E6D4'],
    genres: ['ビーズ', 'アクセサリー'],
    difficulty: 'かんたん',
    time: '40分',
    timeMinutes: 40,
    materials: ['ビーズ', 'テグス', '留め具', '接着剤'],
    tools: ['ハサミ', '定規', 'ピンセット'],
    alternatives: [
      { tool: 'ピンセット', alt: '指先で作業しても可' },
      { tool: '定規', alt: 'メジャーでも可' },
    ],
    steps: [
      {
        caption: '長さを切る',
        emoji: '📏',
        description: 'テグスを手首より15cmくらい長く切ります。',
      },
      {
        caption: 'ビーズを通す',
        emoji: '🔵',
        description: '好きな順番で、ビーズをテグスに通していきます。',
      },
      {
        caption: '仮あわせ',
        emoji: '✋',
        description: '手首に合わせて、ちょうどいい長さか確認します。',
      },
      {
        caption: '留め具をつける',
        emoji: '🔗',
        description: '両はしに留め具をつけて、しっかり結びます。',
      },
      {
        caption: '仕上げ',
        emoji: '✂️',
        description: '結び目に接着剤を少しつけて補強し、余分なテグスを切ります。',
      },
    ],
    description:
      '好きな色のビーズを通すだけで作れる、かわいいブレスレットです。色の組み合わせを考えるのも楽しいレシピです。',
    cautions: [
      'テグスを引っぱりすぎると切れることがあります。',
      '留め具はしっかり結びましょう。',
      '小さなお子さんは、ビーズの誤飲に注意しましょう。',
    ],
    beginnerPoints: [
      'テグスは長めに切ると作業しやすいです。',
      '色は3色くらいにまとめると、まとまって見えます。',
    ],
    purposes: ['アクセサリーを作りたい', 'プレゼントを作りたい', '初心者向け', '短時間で作りたい', '道具少なめ'],
    beginnerFriendly: true,
    isNew: false,
  },
  {
    id: 'felt-cake',
    title: 'フェルトのミニケーキ',
    emoji: '🍰',
    colors: ['#FFF1D6', '#FFE3B3'],
    genres: ['フェルト', '子ども工作'],
    difficulty: 'かんたん',
    time: '45分',
    timeMinutes: 45,
    materials: ['フェルト', '綿', '糸', 'ボンド'],
    tools: ['ハサミ', '針', 'チャコペン'],
    alternatives: [
      { tool: 'チャコペン', alt: '鉛筆で薄く印をつけても可' },
      {
        tool: '針と糸',
        alt: '布用ボンドでも可',
        note: 'ボンドを使うときは、乾くまで形をおさえておきましょう。',
      },
    ],
    steps: [
      {
        caption: '型を写す',
        emoji: '✏️',
        description: 'フェルトに、チャコペンで丸い型を写します。',
      },
      {
        caption: '切る',
        emoji: '✂️',
        description: '線にそって、フェルトをていねいに切ります。',
      },
      {
        caption: '巻く',
        emoji: '🧁',
        description: '細長いフェルトをくるくる巻いて、ケーキの土台を作ります。',
      },
      {
        caption: '綿を詰める',
        emoji: '☁️',
        description: '中に綿を入れて、ふっくらさせます。',
      },
      {
        caption: '飾る',
        emoji: '🍓',
        description: '小さく切ったフェルトをボンドで貼って、かわいく飾ります。',
      },
    ],
    description:
      'ふわふわのフェルトで作る、本物みたいなミニケーキです。針を使わずボンドでも作れるので、お子さんと一緒に楽しめます。',
    cautions: ['ボンドが乾くまで、形をおさえておきましょう。', '綿は入れすぎないようにしましょう。'],
    beginnerPoints: [
      'フェルトは切りやすいので、はじめてでも安心です。',
      'ボンドはうすくのばして塗りましょう。',
    ],
    purposes: ['子どもと楽しみたい', '初心者向け', '家に飾りたい', '道具少なめ'],
    beginnerFriendly: true,
    isNew: false,
  },
  {
    id: 'embroidery-pouch',
    title: '刺繍ポーチ',
    emoji: '👝',
    colors: ['#E9E2FB', '#D7C9F5'],
    genres: ['刺繍', '布小物'],
    difficulty: 'ふつう',
    time: '2時間',
    timeMinutes: 120,
    materials: ['布', '刺繍糸', 'ファスナー', '裏地'],
    tools: ['刺繍針', '刺繍枠', 'ハサミ', 'チャコペン'],
    alternatives: [
      { tool: '刺繍枠', alt: '小さい図案ならなしでも可' },
      { tool: 'チャコペン', alt: '鉛筆で薄く下書きしても可' },
    ],
    steps: [
      {
        caption: '下書き',
        emoji: '✏️',
        description: '布に、チャコペンで好きな図案を写します。',
      },
      {
        caption: '枠にはめる',
        emoji: '🔘',
        description: '刺繍枠に布をピンと張ってはめます。',
      },
      {
        caption: '刺繍する',
        emoji: '🧵',
        description: '図案にそって、ゆっくり刺繍していきます。',
      },
      {
        caption: '裁断する',
        emoji: '✂️',
        description: '布と裏地を、ポーチの形に切ります。',
      },
      {
        caption: '縫う',
        emoji: '🪡',
        description: '中表にして、まわりを縫い合わせます。',
      },
      {
        caption: 'ファスナー',
        emoji: '🔒',
        description: 'ファスナーを縫いつけ、表に返したら完成です。',
      },
    ],
    description:
      '好きな模様を刺繍して作る、自分だけのポーチです。少し時間はかかりますが、できあがったときの達成感が大きいレシピです。',
    cautions: [
      '針でけがをしないよう、気をつけましょう。',
      'ファスナーは曲がらないよう、まち針でとめてから縫いましょう。',
    ],
    beginnerPoints: [
      '小さな図案から始めると、とちゅうで挫折しにくいです。',
      '糸は長すぎるとからまるので、短めにしましょう。',
    ],
    purposes: ['プレゼントを作りたい', '販売向けアイデア'],
    beginnerFriendly: false,
    isNew: false,
  },
  {
    id: 'origami-flower',
    title: '折り紙フラワー',
    emoji: '🌸',
    colors: ['#DCEEFB', '#C3E0F7'],
    genres: ['紙工作', 'インテリア雑貨', '子ども工作'],
    difficulty: 'かんたん',
    time: '20分',
    timeMinutes: 20,
    materials: ['折り紙', 'のり', '画用紙'],
    tools: ['ハサミ', 'のり', 'ペン'],
    alternatives: [
      { tool: 'のり', alt: 'テープでも可' },
      { tool: '画用紙', alt: '厚紙でも可' },
    ],
    steps: [
      {
        caption: '折る',
        emoji: '📄',
        description: '折り紙を半分に折り、さらに三角に折ります。',
      },
      {
        caption: '花びら',
        emoji: '🌸',
        description: '開いて、花びらの形になるように折ります。',
      },
      {
        caption: 'のりづけ',
        emoji: '🧴',
        description: '花びらのはしにのりをつけて、くるっと丸めます。',
      },
      {
        caption: '組み立て',
        emoji: '✨',
        description: 'いくつか作って、画用紙に貼り合わせます。',
      },
      {
        caption: '仕上げ',
        emoji: '✏️',
        description: '中心にペンで模様を描いたら完成です。',
      },
    ],
    description:
      '折り紙だけで作れる、かわいいお花です。道具が少なく短時間でできるので、お子さんとの工作にもおすすめです。',
    cautions: ['小さなお子さんは、ハサミの扱いに気をつけましょう。'],
    beginnerPoints: [
      '折り目はしっかりつけると、きれいに仕上がります。',
      'のりはつけすぎないようにしましょう。',
    ],
    purposes: ['子どもと楽しみたい', '短時間で作りたい', '家に飾りたい', '道具少なめ', '初心者向け'],
    beginnerFriendly: true,
    isNew: false,
  },
  {
    id: 'amigurumi-bear',
    title: 'あみぐるみのくま',
    emoji: '🧸',
    colors: ['#F3E6D8', '#E8D2B5'],
    genres: ['編み物'],
    difficulty: 'じっくり',
    time: '3時間',
    timeMinutes: 180,
    materials: ['毛糸', 'わた', '目のパーツ'],
    tools: ['かぎ針', 'はさみ', 'とじ針'],
    alternatives: [
      { tool: '目のパーツ', alt: '刺繍で目を描いても可' },
      { tool: 'とじ針', alt: '毛糸用の太い針でも可' },
    ],
    steps: [
      {
        caption: '輪を作る',
        emoji: '🧶',
        description: '毛糸で輪を作り、細編みを6目編みます。',
      },
      {
        caption: '増し目',
        emoji: '⭕',
        description: 'ぐるぐると増し目しながら、丸く編んでいきます。',
      },
      {
        caption: 'わたを詰める',
        emoji: '☁️',
        description: 'ある程度編んだら、中にわたを詰めます。',
      },
      {
        caption: 'パーツ',
        emoji: '🧸',
        description: '耳と手足も、同じように編みます。',
      },
      {
        caption: 'つなげる',
        emoji: '🪡',
        description: 'とじ針で、パーツを体につなげます。',
      },
      {
        caption: '顔',
        emoji: '🐻',
        description: '目をつけ、鼻や口を刺繍したら完成です。',
      },
    ],
    description:
      '毛糸で編む、まんまるなくまのあみぐるみです。基本の編み方をくり返すだけで作れます。',
    cautions: ['わたは少しずつ詰めると、形がきれいになります。', '編み目をきつくしすぎないようにしましょう。'],
    beginnerPoints: [
      '細編みの基本をくり返すだけです。',
      '目を数えながら編むと、形が整います。',
    ],
    purposes: ['プレゼントを作りたい', '子どもと楽しみたい', '道具少なめ'],
    beginnerFriendly: false,
    isNew: true,
  },
  {
    id: 'macrame-hanger',
    title: 'マクラメのプラントハンガー',
    emoji: '🪴',
    colors: ['#E5EFD9', '#CFE3B8'],
    genres: ['インテリア雑貨'],
    difficulty: 'ふつう',
    time: '1時間',
    timeMinutes: 60,
    materials: ['マクラメ用ひも', '木のリング', '植木鉢'],
    tools: ['はさみ', 'メジャー', 'テープ'],
    alternatives: [
      { tool: '木のリング', alt: '丈夫なひもの輪でも可' },
      { tool: 'メジャー', alt: '定規でも可' },
    ],
    steps: [
      {
        caption: 'ひもを切る',
        emoji: '✂️',
        description: 'ひもを、同じ長さに4本切ります。',
      },
      {
        caption: 'リングに結ぶ',
        emoji: '⭕',
        description: '木のリングに、4本をまとめて結びます。',
      },
      {
        caption: '結んでいく',
        emoji: '🪢',
        description: '2本ずつ結び目を作って、あみ目にしていきます。',
      },
      {
        caption: '下をまとめる',
        emoji: '🔗',
        description: '下のほうで、全部まとめて結びます。',
      },
      {
        caption: '鉢を入れる',
        emoji: '🪴',
        description: '植木鉢を入れて、つるしたら完成です。',
      },
    ],
    description:
      'ひもを結んで作る、おしゃれなプラントハンガーです。お部屋に飾ると、ぐっと素敵になります。',
    cautions: ['結び目の左右がそろうように気をつけましょう。'],
    beginnerPoints: [
      '同じ結び方のくり返しなので、覚えやすいです。',
      'ひもは長めに用意すると安心です。',
    ],
    purposes: ['家に飾りたい', '販売向けアイデア', '道具少なめ'],
    beginnerFriendly: false,
    isNew: true,
  },
]

export function getRecipe(id: string | undefined): Recipe | undefined {
  return RECIPES.find((r) => r.id === id)
}
