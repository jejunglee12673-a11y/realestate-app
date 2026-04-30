-- ============================================================
-- 不動産管理アプリ：propertiesテーブル定義
-- Supabase の SQL Editor に貼り付けて実行してください
-- ============================================================

-- propertiesテーブルを作成する
CREATE TABLE properties (
  id         uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name       text        NOT NULL,
  rent       integer     NOT NULL CHECK (rent > 0),
  area       text        NOT NULL,
  layout     text        NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- ============================================================
-- Row Level Security（RLS）の設定
-- ============================================================

-- RLSを有効にする（デフォルトで全行アクセス拒否になる）
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- 自分が登録した物件のみ参照できるポリシー
CREATE POLICY "自分の物件のみ参照"
  ON properties
  FOR SELECT
  USING (auth.uid() = user_id);

-- 自分のuser_idで登録する場合のみINSERTを許可するポリシー
CREATE POLICY "自分の物件のみ登録"
  ON properties
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 自分が登録した物件のみ更新できるポリシー
CREATE POLICY "自分の物件のみ更新"
  ON properties
  FOR UPDATE
  USING (auth.uid() = user_id);

-- 自分が登録した物件のみ削除できるポリシー
CREATE POLICY "自分の物件のみ削除"
  ON properties
  FOR DELETE
  USING (auth.uid() = user_id);
