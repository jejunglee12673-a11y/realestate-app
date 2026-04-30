import { useState, useEffect } from 'react'

// 物件の新規登録・編集に使うモーダルフォーム
// editingProperty が null なら新規登録モード、値があれば編集モード
export default function PropertyForm({ editingProperty, onSubmit, onClose }) {
  const isEditMode = editingProperty !== null

  const [formData, setFormData] = useState({
    name: '',
    rent: '',
    area: '',
    layout: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 編集モードのとき、既存データをフォームに初期セットする
  useEffect(() => {
    if (isEditMode) {
      setFormData({
        name: editingProperty.name,
        rent: String(editingProperty.rent),
        area: editingProperty.area,
        layout: editingProperty.layout,
      })
    }
  }, [editingProperty, isEditMode])

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    // rentは整数に変換して渡す
    const payload = {
      ...formData,
      rent: parseInt(formData.rent, 10),
    }

    const result = await onSubmit(payload)
    if (result?.error) {
      setError('保存に失敗しました。入力内容を確認してください。')
    }
    setLoading(false)
  }

  // モーダル背景クリックで閉じる
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-card">
        <div className="modal-header">
          <h2>{isEditMode ? '物件を編集' : '物件を新規登録'}</h2>
          <button className="modal-close" onClick={onClose} aria-label="閉じる">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">物件名</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="例：サンライズマンション 301号室"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="rent">家賃（円）</label>
            <input
              id="rent"
              name="rent"
              type="number"
              value={formData.rent}
              onChange={handleChange}
              placeholder="例：85000"
              min={1}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="area">エリア名</label>
            <input
              id="area"
              name="area"
              type="text"
              value={formData.area}
              onChange={handleChange}
              placeholder="例：東京都渋谷区"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="layout">間取り</label>
            <input
              id="layout"
              name="layout"
              type="text"
              value={formData.layout}
              onChange={handleChange}
              placeholder="例：1LDK"
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              キャンセル
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? '保存中...' : isEditMode ? '更新する' : '登録する'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
