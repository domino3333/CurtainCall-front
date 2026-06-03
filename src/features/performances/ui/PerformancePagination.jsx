export function PerformancePagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null
  }

  const pages = createPageItems(page, totalPages)

  return (
    <nav className="pagination" aria-label="공연 목록 페이지 이동">
      <button type="button" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        이전
      </button>

      <div className="pagination-pages">
        {pages.map((pageItem, index) =>
          pageItem === 'ellipsis' ? (
            <span className="pagination-ellipsis" key={`ellipsis-${index}`}>
              ...
            </span>
          ) : (
            <button
              type="button"
              data-active={page === pageItem}
              key={pageItem}
              onClick={() => onPageChange(pageItem)}
            >
              {pageItem}
            </button>
          ),
        )}
      </div>

      <button type="button" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
        다음
      </button>
    </nav>
  )
}

function createPageItems(currentPage, totalPages) {
  const pageSet = new Set([1, totalPages])

  for (let page = currentPage - 2; page <= currentPage + 2; page += 1) {
    if (page >= 1 && page <= totalPages) {
      pageSet.add(page)
    }
  }

  const sortedPages = [...pageSet].sort((left, right) => left - right)
  const pageItems = []

  sortedPages.forEach((page, index) => {
    const previousPage = sortedPages[index - 1]

    if (previousPage && page - previousPage > 1) {
      pageItems.push('ellipsis')
    }

    pageItems.push(page)
  })

  return pageItems
}
