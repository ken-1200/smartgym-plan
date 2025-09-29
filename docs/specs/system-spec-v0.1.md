# システム仕様書（MVP）v0.1

- 作成日: 2025-09-29
- 対象: MVP（DB な / S3+CloudFront / フロント完結）
- 目的: 低コストで「自宅カウンセリング → 来店即メニュー → 進捗＆シェア」体験を実現

---

## 1. 目的 / コンセプト

- **自宅**でプロフィール・目標を入力し、**来店**時に**店舗データ or マシン選択**から**最適メニュー**を自動生成。
- **トレーナー代替の最小体験**（カウンセリング → 指導 → アドバイス）を、**DB なし**で実現。
- データあり店舗は**マシン選択をスキップ**し、最短でメニュー提示。

---

## 2. スコープ（MVP）

- プロフィール入力、目標選択＋深掘り（ダイエット/筋増/維持/美容/健康）
- ブランド → 都道府県 → 店舗の選択（**データ有**なら直でメニューへ）
- **データ無**時: **Machine Catalog**（デフォルト一覧）＋**ユーザー定義マシン追加**で選択
- メニュー自動生成（種目 / 重量 / 回数 × セット / 有酸素・週頻度アドバイス）
- 進捗チェック、スクショ前提のシェア（端末共有シート）

---

## 3. 用語

- **GymFile**: 店舗本体 JSON
- **Machine Catalog**: データ無店舗向けのデフォルト機械一覧
- **ユーザー定義マシン**: リストに無いマシンをユーザーが追加（端末ローカルのみ）

---

## 4. 全体アーキテクチャ

```text
[Browser (Next.js/TS)]
   ├─ Fetch S3 JSON (CloudFront配信)
   ├─ LocalStorage: profile/goal/today_menu/custom_machines
   └─ UI: 画面遷移・メニュー生成・共有

[S3 + CloudFront]
   └─ gyms/
      ├─ brands.json
      ├─ <brand>/
      │  ├─ index.json
      │  ├─ _defaults/machine-catalog.json (任意)
      │  └─ <pref>/<gym_id>.json
      └─ _defaults/machine-catalog.json
```

- **API サーバなし**（MVP）。S3 直取得。
- **キャッシュ**は CloudFront ＋強キャッシュ＋`?v=<hash>`で更新反映。

---

## 5. ユーザーフロー / 画面

1. **プロフィール**（自宅）

   - 年齢 / 身長 / 体重 / 経験（初心者・中級・上級）

2. **目標＋深掘り**（自宅）

   - 目標: ダイエット / 筋増 / 維持 / 美容 / 健康
   - 共通深掘り: 気になる部位（上/下/全身/部位指定）、目標期間（週/ヶ月）

3. **店舗選択**（来店前 or 来店時）

   - ブランド → 都道府県 → 店舗
   - **店舗データ 200** ⇒ **マシン選択スキップ**でメニュー生成
   - **404** ⇒ **Machine Catalog**＋**ユーザー定義マシン追加**でチェック選択

4. **メニュー提案**

   - 種目カード（種目 / 推奨重量 / 回数 × セット / 有酸素時間）
   - 週頻度アドバイス（例: 週 3 回 推奨）

5. **進捗チェック / シェア**
   - チェック ON/OFF、LocalStorage 保存
   - スクショ前提の整形レイアウト＋ネイティブ共有シート

---

## 6. 機能要件（主要）

- **データ有無判定**: `GET gyms/<brand>/<pref>/<gym_id>.json` → 200/404 で分岐
- **マシン候補の統合**（表示順）:
  1. **ユーザー定義** > 2) **店舗 JSON** > 3) **Machine Catalog**（重複は `machine_id` 優先）
- **メニュー生成**:
  - 基準重量 = 体重 × 係数（初心者 0.3 / 中級 0.5 / 上級 0.7）
  - 目標別レップ＆セット＆有酸素（例: ダイエット 12×3 ＋有酸素 15–30 分）
  - 推奨重量レンジ未設定時は**基準重量**を四捨五入
- **週頻度計算**: 目標/期間から目安（ダイエット 3–5、筋増 3–4、維持 2–3、美容 2–3 ＋有酸素、健康 3+）
- **ユーザー定義マシン**:
  - 入力: 名称（必須）/ カテゴリ（cardio|strength|free_weight 必須）/ メモ任意
  - `machine_id` 例: `user_sissy-squat_1695100000000`（slug+timestamp）

---

## 7. データ仕様（S3 / LocalStorage）

### 7.1 S3 パス

```text
gyms/
  brands.json
  _defaults/machine-catalog.json           # グローバルCatalog（任意）
  <brand>/
    index.json                             # 県一覧
    _defaults/machine-catalog.json         # ブランドCatalog（任意）
    <pref>/
      index.json                           # 店舗軽量メタ
      <gym_id>.json                        # 店舗本体
```

### 7.2 JSON（抜粋）

- **brands.json**

```json
{
  "brands": [{ "brand": "fitplace", "display_name": "FitPlace" }],
  "_version": 1
}
```

- **//index.json**

```json
{
  "brand": "fitplace",
  "prefecture": "tokyo",
  "gyms": [
    { "gym_id": "aomonoyokocho", "gym_name": "青物横丁", "location": "..." }
  ],
  "_version": 1
}
```

- **GymFile（店舗本体）**

```json
{
  "brand": "fitplace",
  "prefecture": "tokyo",
  "gym_id": "aomonoyokocho",
  "gym_name": "青物横丁",
  "location": "東京都品川区...",
  "machines": {
    "cardio_machines": [
      { "machine_id": "treadmill", "name": "ランニングマシン", "quantity": 5 }
    ],
    "strength_machines": [
      { "machine_id": "chest_press", "name": "チェストプレス", "quantity": 1 }
    ],
    "free_weights": [
      { "machine_id": "power_rack", "name": "パワーラック", "quantity": 3 }
    ]
  },
  "_version": 1
}
```

- **Machine Catalog（デフォルト一覧）**

```json
{
  "catalog": {
    "cardio_machines": [
      { "machine_id": "treadmill", "name": "ランニングマシン" }
    ],
    "strength_machines": [
      { "machine_id": "chest_press", "name": "チェストプレス" }
    ],
    "free_weights": [{ "machine_id": "power_rack", "name": "パワーラック" }]
  },
  "_version": 1
}
```

### 7.3 LocalStorage キー

- `profile`, `goal`, `today_menu_<YYYY-MM-DD>`
- `custom_machines::<brand>::<pref>::<gym_id>`（ユーザー定義マシン）

---

## 8. アルゴリズム（擬似コード）

```ts
/**
 * マシン候補を統合して返す
 * 優先: user > gym > catalog
 */
function mergeMachines(user, gym, catalog) {
  const map = new Map<string, any>();
  for (const m of catalog)
    map.set(m.machine_id || slug(m.name), { ...m, source: "catalog" });
  for (const m of gym)
    map.set(m.machine_id || slug(m.name), { ...m, source: "gym" });
  for (const m of user) map.set(m.machine_id, { ...m, source: "user" }); // 最優先で上書き
  return Array.from(map.values());
}

/**
 * 重量/回数/セットを決める（MVP v1）
 */
function plan(profile, goal, machine) {
  const coef = { beginner: 0.3, intermediate: 0.5, advanced: 0.7 }[
    profile.experience
  ];
  let base = Math.round(profile.weight * coef);
  // レップ/セット
  const repSet = {
    lose_weight: { reps: 12, sets: 3, cardioMin: [15, 30] },
    muscle_gain: { reps: 8, sets: 3 },
    maintain: { reps: 10, sets: 2 },
    beauty: { reps: 12, sets: 3 },
    health: { reps: 12, sets: 2, cardioMin: [20, 30] },
  }[goal.category];
  return { weightKg: base, reps: repSet.reps, sets: repSet.sets };
}
```

---

## 9. 非機能要件

- **性能**: 初期表示は `brands/index` の軽量 JSON のみ取得、店舗本体は詳細時に初回ロード。P95 でメニュー到達 3 分以内。
- **キャッシュ**: CloudFront 強キャッシュ＋`?v=<hash>`で更新。
- **オフライン**: 直近メニューは LocalStorage から再表示。
- **セキュリティ**: ユーザー入力はサニタイズ（XSS 防止）。S3 は読み取り公開・書込は運用者のみ。
- **アクセシビリティ**: 文字サイズ/コントラスト配慮、タップ領域 44px 以上。
- **対応 OS/ブラウザ**: iOS/Android の最新 2 メジャー、Chrome/Safari/Edge 最新版。

---

## 10. 計測 / ログ（クライアント）

- 計測イベント: `profile_saved`, `goal_saved`, `gym_selected`, `gym_data_hit/miss`, `machine_added_user`, `menu_generated`, `share_clicked`
- 主要指標: メニュー到達率、初回生成時間、データ無 →Catalog 利用率、ユーザー定義マシン追加率、共有率。

---

## 11. テスト / 受け入れ基準（抜粋）

- **機能**
  - データ有店舗で**マシン選択画面が出ない**こと
  - データ無店舗で**Catalog ＋ユーザー追加 UI が出る**こと
  - 目標・期間変更で**提案が即更新**されること
  - 週頻度が**数値で提示**されること（例: 週 3 回）
  - 進捗チェックが LocalStorage に**保存/復元**されること
- **データ**
  - すべての JSON が Schema 検証を**パス**
  - 旧ファイル差し替え時に**キャッシュバスティング**が効くこと
- **UI/UX**
  - これは必須要件です。全ての UI/UX 実装において、Apple HIG に準拠してください。\*\*
    - **公式ドキュメント**: <https://developer.apple.com/design/human-interface-guidelines/>
    - **タッチターゲット**: 最小 44px × 44px
    - **タイポグラフィ**: Apple HIG のテキスト階層を使用
    - **フォーカス状態**: アクセシビリティのための明確なフォーカスインジケーター
    - **インタラクション**: 一貫性のあるフィードバックとアニメーション
    - **カラーコントラスト**: WCAG AA レベル以上のコントラスト比

---

## 12. 運用 / デプロイ

- **手順**
  - JSON は PR→CI で**Schema 検証**→S3 配置 →`index.json`更新 →`?v=<hash>`更新
- **障害対応**
  - JSON 破損時は前バージョンへロールバック。
  - 404 増加時は Catalog 導線の表示強化。

---

## 13. 課金（将来）

| 機能                | 無料       | 有料（目安 ¥1,500/月） |
| ------------------- | ---------- | ---------------------- |
| 基本メニュー生成    | 〇         | 〇（個別最適化）       |
| 週頻度アドバイス    | 〇（定型） | 〇（履歴反映）         |
| 進捗/シェア         | 〇         | 〇                     |
| 周期プラン/漸進負荷 | –          | 〇                     |

---

## 14. 将来拡張

- **DB 移行**: DynamoDB 単一テーブル（PK=GYM#…/SK=MACHINE#…） or RDS（gyms/machines/gym_machines）
- 認証・同期（端末間） / 履歴分析 / クローラー連携 / 公式データへのユーザー提案昇格フロー

---

## 15. リスクと対応

- **データ欠落**: Catalog ＋ユーザー定義で補完 / 公式化ワークフロー
- **品質ばらつき**: 名前正規化・重複警告 / 将来モデレーション
- **端末依存**: 将来認証導入でクラウド同期

---

## 16. ディレクトリ構成（提案）

```text
repo-root/
├─ docs/
│  └─ specs/
│     └─ system-spec-v0.1.md
├─ src/                 # Next.js
│  ├─ app/
│  │  ├─ profile/  ├ goal/  ├ gyms/  ├ menu/  └ share/
│  ├─ lib/
│  │  ├─ types.ts        # GymFile / MachineCatalog / UserMachine 型
│  │  ├─ menu-rules.ts   # メニュー生成ロジック
│  │  └─ storage.ts      # LocalStorage I/F
│  └─ public/schemas/
│     ├─ gym.schema.json
│     └─ machine-catalog.schema.json
├─ data/ (dev sample)
│  └─ gyms/brands.json, _defaults/machine-catalog.json, ...
└─ .github/workflows/validate-json.yml
```

---

## 17. 参考（TS 型・Doc コメント・例）

```ts
/**
 * ユーザー定義マシンと店舗/Catalogを統合し、表示用リストを返す
 * - 優先度: user > gym > catalog
 * - machine_id がない場合は name から slug を生成して重複排除
 * @example
 * const list = buildMachineList(userMachines, gymFile?.machines, catalog?.catalog);
 */
export function buildMachineList(
  user: UserMachine[],
  gym?: {
    cardio_machines: GymMachine[];
    strength_machines: GymMachine[];
    free_weights: GymMachine[];
  },
  catalog?: {
    cardio_machines: GymMachine[];
    strength_machines: GymMachine[];
    free_weights: GymMachine[];
  }
) {
  /* 実装 */
}

/**
 * メニューを生成（MVP v1）
 * @param profile {weight, experience}
 * @param goal {category, periodWeeks, targetPart}
 * @param machines 統合済みマシン配列
 * @returns MenuItem[]
 * @example
 * const menu = generateMenu(p, g, machines);
 * console.log(menu[0]); // { id:'chest_press', weightKg:40, reps:8, sets:3 }
 */
export function generateMenu(
  profile: Profile,
  goal: Goal,
  machines: Machine[]
): MenuItem[] {
  /* 実装 */
}
```
