// 物件情報を表示するカード。編集・削除ボタンを持つ
export default function PropertyCard({ property, onEdit, onDelete }) {
  const { name, rent, area, layout } = property

  return (
    <div className="property-card">
      <div className="property-card-header">
        <span className="property-rooms">{layout}</span>
        <div className="property-actions">
          <button className="btn-edit" onClick={onEdit}>編集</button>
          <button className="btn-delete" onClick={onDelete}>削除</button>
        </div>
      </div>
      <h2 className="property-name">{name}</h2>
      <div className="property-details">
        <p className="property-area">📍 {area}</p>
      </div>
      <p className="property-rent">
        <span className="rent-amount">{rent.toLocaleString()}</span>
        <span className="rent-unit">円 / 月</span>
      </p>
    </div>
  )
}
