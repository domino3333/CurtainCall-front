function getXmlText(parent, tagName) {
  return parent.querySelector(tagName)?.textContent?.trim() ?? ''
}

function toPerformanceItem(item) {
  return {
    seq: String(item.seq ?? ''),
    serviceName: item.serviceName ?? '',
    title: item.title ?? '',
    startDate: String(item.startDate ?? ''),
    endDate: String(item.endDate ?? ''),
    place: item.place ?? '',
    realmName: item.realmName ?? '',
    area: item.area ?? '',
    sigungu: item.sigungu ?? '',
    thumbnail: item.thumbnail ?? '',
  }
}

function normalizeJsonResponse(text) {
  const data = JSON.parse(text)
  const rawItems = data?.body?.items?.item ?? data?.body?.items ?? []
  const items = Array.isArray(rawItems) ? rawItems : [rawItems]

  return items.map(toPerformanceItem)
}

function normalizeXmlResponse(xmlText) {
  const document = new DOMParser().parseFromString(xmlText, 'application/xml')
  const parserError = document.querySelector('parsererror')

  if (parserError) {
    throw new Error('공연정보 XML을 읽지 못했습니다.')
  }

  return [...document.querySelectorAll('item')].map((item) =>
    toPerformanceItem({
      seq: getXmlText(item, 'seq'),
      serviceName: getXmlText(item, 'serviceName'),
      title: getXmlText(item, 'title'),
      startDate: getXmlText(item, 'startDate'),
      endDate: getXmlText(item, 'endDate'),
      place: getXmlText(item, 'place'),
      realmName: getXmlText(item, 'realmName'),
      area: getXmlText(item, 'area'),
      sigungu: getXmlText(item, 'sigungu'),
      thumbnail: getXmlText(item, 'thumbnail'),
    }),
  )
}

export function normalizePerformanceResponse(text, contentType) {
  if (contentType.includes('application/json')) {
    return normalizeJsonResponse(text)
  }

  return normalizeXmlResponse(text)
}
