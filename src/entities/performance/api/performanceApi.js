import { normalizePerformanceResponse } from '../model/normalizePerformanceResponse.js'

const AREA_PERFORMANCE_ENDPOINT = '/api/performance/test'

export async function getAreaPerformances() {
  const response = await fetch(AREA_PERFORMANCE_ENDPOINT)

  if (!response.ok) {
    throw new Error(`공연정보를 불러오지 못했습니다. (${response.status})`)
  }

  const contentType = response.headers.get('content-type') ?? ''
  const text = await response.text()

  return normalizePerformanceResponse(text, contentType)
}
