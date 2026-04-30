# CLAUDE.md — realestate-app

## プロジェクト概要

不動産情報アプリ (SAMURAI SPRINT)。物件情報の検索・閲覧・管理を行うWebアプリケーション。

## Git 運用ルール

**コードを変更するたびに必ずGitHubにプッシュすること。**

### 手順

```bash
git add <変更ファイル>
git commit -m "コミットメッセージ"
git push origin <ブランチ名>
```

### ブランチ戦略

- `main` — 本番相当のブランチ。直接プッシュ禁止
- `develop` — 開発統合ブランチ
- `feature/<機能名>` — 機能開発ブランチ
- `fix/<バグ名>` — バグ修正ブランチ

### コミットメッセージの形式

```
<type>: <概要>（日本語可）

type: feat / fix / refactor / docs / test / chore
```

例:
- `feat: 物件検索フィルター機能を追加`
- `fix: 物件詳細ページのレイアウト崩れを修正`

### 厳守事項

- 作業ごとに `git push` を実行する（ローカルにためない）
- `.env` ファイルやシークレット情報はコミットしない
- `--force` プッシュは `main`/`develop` ブランチに対して禁止

## 開発コマンド

```bash
# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# テスト
npm test
```

## コーディング規約

- コメントは原則書かない。名前で意図が伝わるように命名する
- 不要な抽象化・過剰な汎化は避ける
- セキュリティ: ユーザー入力は必ずバリデーションする
- エラーハンドリングは外部境界（API・ユーザー入力）のみ

## ディレクトリ構成（予定）

```
realestate-app/
├── src/
│   ├── components/   # UIコンポーネント
│   ├── pages/        # ページ
│   ├── hooks/        # カスタムフック
│   ├── lib/          # ユーティリティ
│   └── types/        # 型定義
├── public/
├── CLAUDE.md
└── package.json
```
