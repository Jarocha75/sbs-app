export type Lesson = {
  id: string
  title: string
  order: number
  videoUrl: string | null
  duration: number | null
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

export type QuizAnswer = 'A' | 'B' | 'C'

export type QuizQuestion = {
  id: string
  text: string
  options: { A: string; B: string; C: string }
  correct: QuizAnswer
}

export type QuizContent = {
  hero: {
    title: string
    subtitle: string
  }
  backHref: string
  backLabel: string
  result: {
    passMark: number
    passed: string
    failed: string
  }
}
