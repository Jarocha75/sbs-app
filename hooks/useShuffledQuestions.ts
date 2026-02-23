import { useState } from 'react'

export function useShuffledQuestions<T>(questions: T[]): T[] {
  const [shuffled] = useState(() => [...questions].sort(() => Math.random() - 0.5))
  return shuffled
}
