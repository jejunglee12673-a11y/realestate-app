// 物件情報を表示するカードコンポーネント
export default function PropertyCard({ property }) {
  const { name, rent, area, size, rooms } = property

  return (
    <div className="property-card">
      <div className="property-card-header">
        <span className="property-rooms">{rooms}</span>
      </div>
      <h2 className="property-name">{name}</h2>
      <div className="property-details">
        <p className="property-area">📍 {area}</p>
        <p className="property-size">📐 {size}</p>
      </div>
      <p className="property-rent">
        <span className="rent-amount">{rent.toLocaleString()}</span>
        <span className="rent-unit">円 / 月</span>
      </p>
    </div>
  )
}
