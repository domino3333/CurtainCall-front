export function PerformanceSearch({ value, onChange }) {
  return (
    <section className="search-section">
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
