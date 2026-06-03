export function PerformanceSearch({ value, onChange, onSubmit }) {
  return (
    <form className="search-section" aria-label="공연정보 검색" onSubmit={onSubmit}>
      <div className="search-copy">
        <span>검색</span>
        <h2>공연명, 장소, 지역으로 찾아보세요.</h2>
      </div>
      <div className="search-control">
        <input
          className="search-input"
          type="search"
          placeholder="예: 대학로, 전시, 부산"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        <button type="submit">검색</button>
      </div>
    </form>
  )
}
