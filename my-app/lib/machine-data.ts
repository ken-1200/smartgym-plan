import { Machine } from './types'

export const machines: Machine[] = [
  {
    id: 'chest_press',
    name: 'チェストプレス',
    part: '胸',
    minWeight: 5,
    maxWeight: 100,
    defaultSets: 3,
    defaultRestTime: 60
  },
  {
    id: 'lat_pull_down',
    name: 'ラットプルダウン',
    part: '背中',
    minWeight: 10,
    maxWeight: 80,
    defaultSets: 3,
    defaultRestTime: 60
  },
  {
    id: 'leg_press',
    name: 'レッグプレス',
    part: '脚',
    minWeight: 20,
    maxWeight: 150,
    defaultSets: 3,
    defaultRestTime: 90
  },
  {
    id: 'shoulder_press',
    name: 'ショルダープレス',
    part: '肩',
    minWeight: 5,
    maxWeight: 60,
    defaultSets: 3,
    defaultRestTime: 60
  },
  {
    id: 'bicep_curl',
    name: 'バイセップカール',
    part: '腕',
    minWeight: 5,
    maxWeight: 40,
    defaultSets: 3,
    defaultRestTime: 45
  },
  {
    id: 'leg_extension',
    name: 'レッグエクステンション',
    part: '脚前',
    minWeight: 10,
    maxWeight: 80,
    defaultSets: 3,
    defaultRestTime: 60
  }
]