import { supabase } from '../lib/supabase'
import PropertyCard from '../components/PropertyCard'

// ダミーの物件データ
const DUMMY_PROPERTIES = [
  { id: 1, name: 'サンライズマンション 301号室', rent: 85000, area: '東京都渋谷区', size: '35㎡', rooms: '1LDK' },
  { id: 2, name: 'グリーンヒルズ 202号室', rent: 72000, area: '東京都世田谷区', size: '28㎡', rooms: '1K' },
  { id: 3, name: 'シティパレス 501号室', rent: 120000, area: '東京都港区', size: '52㎡', rooms: '2LDK' },
  { id: 4, name: 'ブルーリッジ 105号室', rent: 65000, area: '神奈川県横浜市', size: '25㎡', rooms: '1K' },
  { id: 5, name: 'オークタワー 803号室', rent: 98000, area: '東京都新宿区', size: '42㎡', rooms: '1LDK' },
  { id: 6, name: 'メープルコート 201号室', rent: 55000, area: '埼玉県さいたま市', size: '22㎡', rooms: 'ワンルーム' },
]

export default function PropertiesPage() {
  async function handleLogout() {
    // Supabaseのセッションを破棄してログアウトする
    await supabase.auth.signOut()
  }

  return (
    <div className="properties-container">
      <header className="properties-header">
        <h1>物件一覧</h1>
        <button onClick={handleLogout} className="btn-logout">
          ログアウト
        </button>
      </header>
      <main>
        <p className="properties-count">{DUMMY_PROPERTIES.length}件の物件が見つかりました</p>
        <div className="properties-grid">
          {DUMMY_PROPERTIES.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </main>
    </div>
  )
}
