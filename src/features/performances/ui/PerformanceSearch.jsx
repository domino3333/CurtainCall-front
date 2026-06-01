export function PerformanceSearch({ value, onChange }) {
  return (
    <section className="search-section" aria-label="공연정보 검색">
      <div className="search-copy">
        <span>direct search</span>
        <h2>이미 찾고 싶은 공연이 있다면 바로 검색하세요.</h2>
      </div>
      <input
        className="search-input"
        type="search"
        placeholder="공연명, 장소, 지역, 분야로 검색"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </section>
  )
}
