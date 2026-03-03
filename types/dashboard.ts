export type Lesson = {
  id: string
  title: string
  order: number
}

export type TestItem = {
  id: string
  title: string
  questionCount: number
}

export type ResultItem = {
  id: string
  score: number
  passed: boolean
  createdAt: Date
  testTitle: string
}
