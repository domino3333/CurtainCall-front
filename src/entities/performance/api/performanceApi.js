import { normalizePerformanceResponse } from '../model/normalizePerformanceResponse.js'

const AREA_PERFORMANCE_ENDPOINT = '/api/performance/area'
const PERFORMANCE_LIST_ENDPOINT = '/api/performance/list'

export async function getPerformance(seq, signal) {
  const response = await fetch(`/api/performance/${seq}`, { signal })

  if (!response.ok) {
    throw new Error(`공연 상세정보를 불러오지 못했습니다. (${response.status})`)
  }

  return response.json()
}

export async function getPerformances({ page, size, keyword, realm, signal }) {
  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
    realm: realm || 'all',
  })

  if (keyword?.trim()) {
    params.set('keyword', keyword.trim())
  }

  const response = await fetch(`${PERFORMANCE_LIST_ENDPOINT}?${params.toString()}`, { signal })

  if (!response.ok) {
    throw new Error(`공연 목록을 불러오지 못했습니다. (${response.status})`)
  }

  return response.json()
}

export async function getAreaPerformances() {
  const response = await fetch(AREA_PERFORMANCE_ENDPOINT)

  if (!response.ok) {
    throw new Error(`공연정보를 불러오지 못했습니다. (${response.status})`)
  }

  const contentType = response.headers.get('content-type') ?? ''
  const text = await response.text()

  return normalizePerformanceResponse(text, contentType)
}
