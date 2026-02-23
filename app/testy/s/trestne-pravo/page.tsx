'use client'

import { useState } from 'react'
import Link from 'next/link'
import { COLORS } from '@/data/colors'
import { trestneContent, questions, type Answer } from '@/data/test-trestne-pravo'
import { useShuffledQuestions } from '@/hooks/useShuffledQuestions'
import { NavButton, type Phase } from '@/app/components/NavButton'

export default function TrestnePravoPage() {
  const { hero, backHref, backLabel, result } = trestneContent
  const shuffledQuestions = useShuffledQuestions(questions)

  const [phase, setPhase] = useState<Phase>('quiz')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, Answer>>({})

  const question = shuffledQuestions[currentIndex]
  const userAnswer = answers[question.id]
  const isAnswered = userAnswer !== undefined
  const isLast = currentIndex === shuffledQuestions.length - 1
  const progress = ((currentIndex + (isAnswered ? 1 : 0)) / shuffledQuestions.length) * 100

  const score = shuffledQuestions.filter((q) => answers[q.id] === q.correct).length

  function selectAnswer(letter: Answer) {
    if (isAnswered) return
    setAnswers((prev) => ({ ...prev, [question.id]: letter }))
  }

  function goNext() {
    if (isLast) {
      setPhase('results')
    } else {
      setCurrentIndex((i) => i + 1)
    }
  }

  function goPrev() {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1)
  }

  function reset() {
    setAnswers({})
    setCurrentIndex(0)
    setPhase('quiz')
  }

  if (phase === 'results') {
    const passed = score >= result.passMark
    return (
      <main className="min-h-screen flex flex-col" style={{ backgroundColor: COLORS.pageBg }}>
        <div style={{ backgroundColor: COLORS.primary }} className="py-10 px-4">
          <div className="max-w-2xl mx-auto">
            <Link href={backHref} className="inline-block text-sm mb-4 hover:opacity-80 transition-opacity" style={{ color: COLORS.accent }}>
              {backLabel}
            </Link>
            <h1 className="text-2xl font-bold text-white">{hero.title}</h1>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl overflow-hidden">
            <div
              className="py-10 px-8 text-center"
              style={{ backgroundColor: passed ? '#16a34a' : '#dc2626' }}
            >
              <div className="text-white text-7xl font-black mb-2">
                {score}/{shuffledQuestions.length}
              </div>
              <div className="text-white text-lg font-semibold opacity-90">
                {passed ? result.passed : result.failed}
              </div>
            </div>

            <div className="px-8 py-6">
              {shuffledQuestions.some((q) => answers[q.id] !== q.correct) && (
                <div className="mb-6">
                  <p className="text-sm font-semibold mb-3" style={{ color: COLORS.primary }}>
                    Nesprávne odpovede:
                  </p>
                  <div className="flex flex-col gap-2">
                    {shuffledQuestions
                      .filter((q) => answers[q.id] !== q.correct)
                      .map((q) => (
                        <div key={q.id} className="rounded-lg px-4 py-3 text-sm" style={{ backgroundColor: '#fef2f2', borderLeft: '3px solid #dc2626' }}>
                          <span className="font-bold text-gray-500 mr-2">{q.id}.</span>
                          <span className="text-gray-700">{q.text.slice(0, 70)}…</span>
                          <span className="block mt-1 text-xs font-semibold" style={{ color: '#16a34a' }}>
                            Správna odpoveď: {q.correct}) {q.options[q.correct]}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              <button
                onClick={reset}
                className="w-full py-4 rounded-xl font-bold text-white text-base"
                style={{ backgroundColor: COLORS.primary }}
              >
                Zopakovať test
              </button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex flex-col" style={{ backgroundColor: COLORS.pageBg, minHeight: '100vh', paddingBottom: '5rem' }}>
      <div style={{ backgroundColor: COLORS.primary }} className="py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <Link href={backHref} className="inline-block text-sm mb-4 hover:opacity-80 transition-opacity" style={{ color: COLORS.accent }}>
            {backLabel}
          </Link>
          <h1 className="text-2xl font-bold text-white">{hero.title}</h1>
          <p className="text-sm mt-1" style={{ color: COLORS.accent }}>{hero.subtitle}</p>
        </div>
      </div>

      <div className="w-full h-1.5" style={{ backgroundColor: '#d1d5db' }}>
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${progress}%`, backgroundColor: COLORS.accent }}
        />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <div className="flex items-center justify-between mb-5">
            <span className="text-lg font-bold" style={{ color: COLORS.primary }}>
              Otázka {currentIndex + 1}{' '}
              <span className="font-normal text-gray-400" style={{ fontSize: '1rem' }}>/ {shuffledQuestions.length}</span>
            </span>
            <div className="flex gap-2 flex-wrap justify-end" style={{ maxWidth: '60%' }}>
              {shuffledQuestions.map((_, i) => (
                <div
                  key={i}
                  className="rounded-full"
                  style={{
                    width: 12,
                    height: 12,
                    backgroundColor:
                      answers[shuffledQuestions[i].id] !== undefined
                        ? answers[shuffledQuestions[i].id] === shuffledQuestions[i].correct
                          ? '#16a34a'
                          : '#dc2626'
                        : i === currentIndex
                          ? COLORS.accent
                          : '#d1d5db',
                  }}
                />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-7 py-7 border-b border-gray-100">
              <p className="text-lg font-semibold leading-relaxed" style={{ color: COLORS.primary }}>
                {question.text}
              </p>
            </div>

            <div className="px-7 py-5 flex flex-col gap-3">
              {(['A', 'B', 'C'] as Answer[]).map((letter) => {
                const isSelected = userAnswer === letter
                const isCorrectOption = question.correct === letter
                const showGreen = isAnswered && isCorrectOption
                const showRed = isAnswered && isSelected && !isCorrectOption
                const isDimmed = isAnswered && !isSelected && !isCorrectOption

                let bg = 'white'
                let border = '#e5e7eb'
                let textColor = '#374151'
                let labelBg = '#f3f4f6'
                let labelColor = '#6b7280'
                let opacity = 1

                if (showGreen) {
                  bg = '#16a34a'
                  border = '#16a34a'
                  textColor = 'white'
                  labelBg = 'rgba(255,255,255,0.2)'
                  labelColor = 'white'
                } else if (showRed) {
                  bg = '#dc2626'
                  border = '#dc2626'
                  textColor = 'white'
                  labelBg = 'rgba(255,255,255,0.2)'
                  labelColor = 'white'
                } else if (!isAnswered && isSelected) {
                  bg = '#eff6ff'
                  border = COLORS.primary
                  textColor = COLORS.primary
                  labelBg = COLORS.primary
                  labelColor = 'white'
                } else if (isDimmed) {
                  opacity = 0.45
                }

                return (
                  <button
                    key={letter}
                    disabled={isAnswered}
                    onClick={() => selectAnswer(letter)}
                    className="flex items-start gap-4 text-left rounded-xl border-2 px-5 py-4 transition-all duration-200"
                    style={{
                      backgroundColor: bg,
                      borderColor: border,
                      color: textColor,
                      opacity,
                      cursor: isAnswered ? 'default' : 'pointer',
                    }}
                  >
                    <span
                      className="text-sm font-bold w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: labelBg, color: labelColor }}
                    >
                      {letter}
                    </span>
                    <span className="leading-relaxed" style={{ fontSize: '0.9375rem' }}>{question.options[letter]}</span>
                  </button>
                )
              })}
            </div>

            {isAnswered && (
              <div className="px-7 pb-6">
                <div
                  className="rounded-xl px-5 py-3 text-sm font-semibold"
                  style={{
                    backgroundColor: userAnswer === question.correct ? '#dcfce7' : '#fee2e2',
                    color: userAnswer === question.correct ? '#15803d' : '#b91c1c',
                  }}
                >
                  {userAnswer === question.correct
                    ? '✓ Správne!'
                    : `✗ Nesprávne. Správna odpoveď: ${question.correct}) ${question.options[question.correct]}`}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          borderTop: '1px solid #e5e7eb',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.07)',
          zIndex: 50,
        }}
      >
        <div
          className="max-w-2xl mx-auto px-4 flex items-center justify-between"
          style={{ height: '4.5rem' }}
        >
          <div>
            {currentIndex > 0 ? (
              <NavButton variant="outline" onClick={goPrev}>
                ← Predošlá
              </NavButton>
            ) : (
              <span />
            )}
          </div>

          {isAnswered ? (
            <NavButton variant="primary" onClick={goNext}>
              {isLast ? 'Zobraziť výsledok →' : 'Ďalšia otázka →'}
            </NavButton>
          ) : (
            <span className="text-sm" style={{ color: '#9ca3af' }}>
              Vyberte odpoveď…
            </span>
          )}
        </div>
      </div>
    </main>
  )
}
