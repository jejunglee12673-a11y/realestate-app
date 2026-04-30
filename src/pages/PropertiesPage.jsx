import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import PropertyCard from '../components/PropertyCard'
import PropertyForm from '../components/PropertyForm'

export default function PropertiesPage() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  // null: フォーム非表示, undefined: 新規登録モード, object: 編集モード（対象物件）
  const [editingProperty, setEditingProperty] = useState(null)

  // 自分が登録した物件一覧をSupabaseから取得する（SELECT）
  async function fetchProperties() {
    setLoading(true)
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) setProperties(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  // 物件を新規登録する（INSERT）
  async function handleCreate(formData) {
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase
      .from('properties')
      .insert({ ...formData, user_id: user.id })

    if (!error) {
      setEditingProperty(null)
      fetchProperties()
    }
    return { error }
  }

  // 物件情報を更新する（UPDATE）
  async function handleUpdate(formData) {
    const { error } = await supabase
      .from('properties')
      .update(formData)
      .eq('id', editingProperty.id)

    if (!error) {
      setEditingProperty(null)
      fetchProperties()
    }
    return { error }
  }

  // 物件を削除する（DELETE）
  async function handleDelete(id) {
    if (!window.confirm('この物件を削除しますか？')) return

    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id)

    if (!error) fetchProperties()
  }

  async function handleLogout() {
    await supabase.auth.signOut()
  }

  // 新規登録・編集で共通のonSubmitハンドラ
  function handleFormSubmit(formData) {
    return editingProperty === undefined
      ? handleCreate(formData)
      : handleUpdate(formData)
  }

  return (
    <div className="properties-container">
      <header className="properties-header">
        <h1>物件一覧</h1>
        <div className="header-actions">
          <button onClick={() => setEditingProperty(undefined)} className="btn-primary">
            ＋ 物件を登録
          </button>
          <button onClick={handleLogout} className="btn-logout">
            ログアウト
          </button>
        </div>
      </header>

      <main>
        {loading ? (
          <p className="loading-text">読み込み中...</p>
        ) : properties.length === 0 ? (
          <div className="empty-state">
            <p>登録されている物件はありません。</p>
            <button onClick={() => setEditingProperty(undefined)} className="btn-primary">
              最初の物件を登録する
            </button>
          </div>
        ) : (
          <>
            <p className="properties-count">{properties.length}件の物件が登録されています</p>
            <div className="properties-grid">
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onEdit={() => setEditingProperty(property)}
                  onDelete={() => handleDelete(property.id)}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {/* editingPropertyがnull以外のときモーダルを表示する */}
      {editingProperty !== null && (
        <PropertyForm
          editingProperty={editingProperty === undefined ? null : editingProperty}
          onSubmit={handleFormSubmit}
          onClose={() => setEditingProperty(null)}
        />
      )}
    </div>
  )
}
