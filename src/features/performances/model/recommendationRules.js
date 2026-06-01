export const INITIAL_GUIDE_STATE = {
  weather: 'any',
  companion: 'any',
  mood: 'any',
  realm: 'any',
  area: 'any',
}

export const GUIDE_STEPS = [
  {
    key: 'weather',
    title: '오늘 날씨는?',
    description: '날씨에 따라 실내 중심인지, 가볍게 움직일지 먼저 좁혀요.',
    options: [
      { value: 'any', label: '상관없음', helper: '전체에서 추천' },
      { value: 'rain', label: '비 오는 날', helper: '실내 위주' },
      { value: 'sunny', label: '날씨 좋음', helper: '축제와 체험도 포함' },
      { value: 'cloudy', label: '흐린 날', helper: '차분한 일정' },
    ],
  },
  {
    key: 'companion',
    title: '누구와 보나요?',
    description: '같이 가는 사람을 고르면 장소와 분위기를 조금 더 맞춰요.',
    options: [
      { value: 'any', label: '상관없음', helper: '무난한 추천' },
      { value: 'alone', label: '혼자', helper: '전시와 미술관' },
      { value: 'date', label: '데이트', helper: '감성적인 장소' },
      { value: 'family', label: '가족', helper: '체험과 박물관' },
      { value: 'friends', label: '친구', helper: '가볍고 활동적인 일정' },
    ],
  },
  {
    key: 'mood',
    title: '오늘 원하는 분위기는?',
    description: '사용자가 직접 장르를 몰라도 감정으로 추천을 시작할 수 있게 해요.',
    options: [
      { value: 'any', label: '상관없음', helper: '균형 있게' },
      { value: 'light', label: '가볍게', helper: '부담 적은 일정' },
      { value: 'emotional', label: '감성적', helper: '전시와 공연' },
      { value: 'immersive', label: '몰입감 있게', helper: '연극과 공연' },
      { value: 'new', label: '새로운 경험', helper: '축제와 체험' },
    ],
  },
  {
    key: 'realm',
    title: '끌리는 분야가 있나요?',
    description: '분야를 모르겠다면 상관없음을 둬도 돼요.',
    options: [
      { value: 'any', label: '상관없음', helper: '전체 분야' },
      { value: 'exhibition', label: '전시', helper: '미술관과 박물관' },
      { value: 'theater', label: '연극', helper: '무대 중심' },
      { value: 'performance', label: '공연', helper: '라이브와 무대' },
      { value: 'festival', label: '축제/체험', helper: '활동적인 일정' },
    ],
  },
  {
    key: 'area',
    title: '어느 지역이 편한가요?',
    description: '지금은 공공데이터 지역값 기준으로 먼저 추천해요.',
    options: [
      { value: 'any', label: '상관없음', helper: '전국 추천' },
      { value: 'seoul', label: '서울', helper: '서울권' },
      { value: 'gyeonggi', label: '경기', helper: '경기권' },
      { value: 'busan', label: '부산', helper: '부산권' },
      { value: 'nearby', label: '내 주변', helper: '위치 기반은 예정' },
    ],
  },
]

const REALM_KEYWORDS = {
  exhibition: ['전시', '미술', '박물관', '갤러리'],
  theater: ['연극', '뮤지컬', '극장', '무대'],
  performance: ['공연', '콘서트', '음악', '아트', '무용'],
  festival: ['축제', '행사', '체험', '교육', '페스티벌'],
}

const AREA_KEYWORDS = {
  seoul: ['서울'],
  gyeonggi: ['경기'],
  busan: ['부산'],
}

function getPerformanceText(performance) {
  return [
    performance.serviceName,
    performance.title,
    performance.place,
    performance.realmName,
    performance.area,
    performance.sigungu,
  ].join(' ')
}

function hasAnyKeyword(text, keywords) {
  return keywords.some((keyword) => text.includes(keyword))
}

function addReason(reasons, reason) {
  if (!reasons.includes(reason)) {
    reasons.push(reason)
  }
}

function scoreWeather(performance, text, weather, reasons) {
  if (weather === 'any') {
    return 0
  }

  if (weather === 'rain') {
    if (hasAnyKeyword(text, ['전시', '미술관', '박물관', '극장', '센터', '공간'])) {
      addReason(reasons, '비 오는 날에도 부담 적은 실내형 일정이에요.')
      return 18
    }

    return -8
  }

  if (weather === 'sunny') {
    if (hasAnyKeyword(text, ['축제', '행사', '체험', '공원'])) {
      addReason(reasons, '날씨 좋은 날 움직이기 좋은 일정이에요.')
      return 14
    }

    return 3
  }

  if (weather === 'cloudy') {
    if (hasAnyKeyword(text, ['전시', '박물관', '미술관', '공간'])) {
      addReason(reasons, '흐린 날 차분하게 보기 좋은 콘텐츠예요.')
      return 12
    }
  }

  return 0
}

function scoreCompanion(text, companion, reasons) {
  if (companion === 'alone') {
    if (hasAnyKeyword(text, ['전시', '미술관', '박물관', '공간'])) {
      addReason(reasons, '혼자 천천히 보기 좋은 장소 중심이에요.')
      return 14
    }
  }

  if (companion === 'date') {
    if (hasAnyKeyword(text, ['전시', '미술', '공연', '극장', '아트'])) {
      addReason(reasons, '데이트 코스로 이야기 나누기 좋은 분위기예요.')
      return 14
    }
  }

  if (companion === 'family') {
    if (hasAnyKeyword(text, ['체험', '박물관', '어린이', '가족', '교육'])) {
      addReason(reasons, '가족과 함께 고르기 쉬운 콘텐츠예요.')
      return 16
    }
  }

  if (companion === 'friends') {
    if (hasAnyKeyword(text, ['축제', '행사', '체험', '공연'])) {
      addReason(reasons, '친구와 가볍게 움직이기 좋은 선택이에요.')
      return 12
    }
  }

  return 0
}

function scoreMood(text, mood, reasons) {
  if (mood === 'light') {
    if (hasAnyKeyword(text, ['전시', '체험', '박물관'])) {
      addReason(reasons, '처음 보는 사람도 부담 없이 접근하기 좋아요.')
      return 10
    }
  }

  if (mood === 'emotional') {
    if (hasAnyKeyword(text, ['전시', '미술', '공연', '아트'])) {
      addReason(reasons, '감성적인 시간을 보내기 좋은 분야예요.')
      return 13
    }
  }

  if (mood === 'immersive') {
    if (hasAnyKeyword(text, ['연극', '공연', '극장', '무대'])) {
      addReason(reasons, '몰입해서 보기 좋은 무대형 콘텐츠예요.')
      return 15
    }
  }

  if (mood === 'new') {
    if (hasAnyKeyword(text, ['축제', '체험', '행사', '교육'])) {
      addReason(reasons, '새로운 경험을 찾을 때 어울리는 선택이에요.')
      return 15
    }
  }

  return 0
}

function scoreRealm(text, realm, reasons) {
  if (realm === 'any') {
    return 0
  }

  const keywords = REALM_KEYWORDS[realm] ?? []

  if (hasAnyKeyword(text, keywords)) {
    addReason(reasons, '선택한 분야와 잘 맞아요.')
    return 28
  }

  return -12
}

function scoreArea(performance, area, reasons) {
  if (area === 'any' || area === 'nearby') {
    if (area === 'nearby') {
      addReason(reasons, '내 주변 추천은 백엔드 위치 기반 검색과 연결할 예정이에요.')
    }
    return 0
  }

  const keywords = AREA_KEYWORDS[area] ?? []
  const location = `${performance.area ?? ''} ${performance.sigungu ?? ''}`

  if (hasAnyKeyword(location, keywords)) {
    addReason(reasons, '선택한 지역에서 볼 수 있어요.')
    return 34
  }

  return -20
}

function scoreFreshness(performance, reasons) {
  const startDate = String(performance.startDate ?? '')
  const endDate = String(performance.endDate ?? '')

  if (startDate.length === 8 && endDate.length === 8) {
    addReason(reasons, '공연 기간 정보가 확인된 항목이에요.')
    return 4
  }

  return 0
}

export function recommendPerformances(performances, selections) {
  return performances
    .map((performance) => {
      const text = getPerformanceText(performance)
      const reasons = []
      const score =
        10 +
        scoreWeather(performance, text, selections.weather, reasons) +
        scoreCompanion(text, selections.companion, reasons) +
        scoreMood(text, selections.mood, reasons) +
        scoreRealm(text, selections.realm, reasons) +
        scoreArea(performance, selections.area, reasons) +
        scoreFreshness(performance, reasons)

      return {
        performance,
        score,
        reasons:
          reasons.length > 0 ? reasons.slice(0, 2) : ['조건을 넓게 보고 무난하게 추천했어요.'],
      }
    })
    .filter((result) => result.score > 0)
    .sort((first, second) => second.score - first.score)
    .slice(0, 3)
}
