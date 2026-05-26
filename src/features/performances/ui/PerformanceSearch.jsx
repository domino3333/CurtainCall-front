export function PerformanceSearch({ value, onChange }) {
  return (
    <section className="search-section">
      <div className="search-copy">
        <span>now showing</span>
        <h1>지금 볼 만한 공연과 전시를 한 곳에서 찾기</h1>
      </div>
      <input
        className="search-input"
        type="search"
        placeholder="공연명, 장소, 지역으로 검색"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </section>
  )
}
