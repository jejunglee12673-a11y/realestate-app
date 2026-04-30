import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './lib/supabase'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PropertiesPage from './pages/PropertiesPage'

// ログイン済みユーザーのみアクセスできるルートガード
function PrivateRoute({ session, children }) {
  if (session === undefined) return null // セッション確認中は何も表示しない
  return session ? children : <Navigate to="/login" replace />
}

export default function App() {
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    // 初回マウント時に現在のセッションを取得する
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // 認証状態の変化（ログイン・ログアウト）を監視する
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/"
        element={
          <PrivateRoute session={session}>
            <PropertiesPage />
          </PrivateRoute>
        }
      />
      {/* 未定義パスはトップへリダイレクト */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
