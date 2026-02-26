'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { COLORS } from '@/data/colors'
import { useShuffledQuestions } from '@/hooks/useShuffledQuestions'
import { NavButton } from '@/app/components/NavButton'
import type { QuizQuestion } from '@/app/components/QuizClient'

type Answer = 'A' | 'B' | 'C'

const TOTAL_SECONDS = 40 * 60
const PASS_MARK = 32

function formatTime(s: number): string {
  const m = Math.floor(s / 60).toString().padStart(2, '0')
  const sec = (s % 60).toString().padStart(2, '0')
  return `${m}:${sec}`
}

export default function CvicnyTestClient({ questions }: { questions: QuizQuestion[] }) {
  const shuffled = useShuffledQuestions(questions)
  const [phase, setPhase] = useState<'quiz' | 'results'>('quiz')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, Answer>>({})
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS)

  const timedOut = secondsLeft === 0
  const showResults = phase === 'results' || secondsLeft === 0

  const question = shuffled[currentIndex]
  const userAnswer = answers[question?.id ?? '']
  const isAnswered = userAnswer !== undefined
  const isLast = currentIndex === shuffled.length - 1
  const score = shuffled.filter((q) => answers[q.id] === q.correct).length
  const progress = ((currentIndex + (isAnswered ? 1 : 0)) / shuffled.length) * 100
  const isWarning = secondsLeft <= 300 // < 5 min

  useEffect(() => {
    if (phase !== 'quiz') return
    if (secondsLeft <= 0) return
    const t = window.setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => window.clearTimeout(t)
  }, [secondsLeft, phase])

  function selectAnswer(letter: Answer) {
    if (isAnswered) return
    setAnswers((prev) => ({ ...prev, [question.id]: letter }))
  }

  function goNext() {
    if (isLast) setPhase('results')
    else setCurrentIndex((i) => i + 1)
  }

  function goPrev() {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1)
  }

  function reset() {
    setAnswers({})
    setCurrentIndex(0)
    setPhase('quiz')
    setSecondsLeft(TOTAL_SECONDS)
  }

  if (showResults) {
    const passed = score >= PASS_MARK
    return (
      <main className="min-h-screen flex flex-col" style={{ backgroundColor: COLORS.pageBg }}>
        <div style={{ backgroundColor: COLORS.primary }} className="py-10 px-4">
          <div className="max-w-2xl mx-auto">
            <Link href="/testy/s" className="inline-block text-sm mb-4 hover:opacity-80 transition-opacity" style={{ color: COLORS.accent }}>
              ← Späť na oblasti testovania
            </Link>
            <h1 className="text-2xl font-bold text-white">Cvičný test SBS — Typ S</h1>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl overflow-hidden">
            <div
              className="py-10 px-8 text-center"
              style={{ backgroundColor: timedOut ? '#b45309' : passed ? '#16a34a' : '#dc2626' }}
            >
              {timedOut && (
                <p className="text-white text-base font-semibold mb-3 opacity-90">Čas vypršal!</p>
              )}
              <div className="text-white text-7xl font-black mb-2">
                {score}/{shuffled.length}
              </div>
              <div className="text-white text-base font-semibold opacity-90">
                {score * 2} / 80 bodov
              </div>
              <div className="text-white text-lg font-semibold mt-2 opacity-90">
                {passed ? 'Úspešne ste zvládli test!' : 'Skúste to ešte raz.'}
              </div>
              <div className="text-white text-sm mt-1 opacity-70">
                Potrebných: {PASS_MARK}/40 správnych odpovedí (64/80 bodov)
              </div>
            </div>

            <div className="px-8 py-6">
              {shuffled.some((q) => answers[q.id] !== q.correct) && (
                <div className="mb-6">
                  <p className="text-sm font-semibold mb-3" style={{ color: COLORS.primary }}>
                    Nesprávne odpovede:
                  </p>
                  <div className="flex flex-col gap-2">
                    {shuffled
                      .filter((q) => answers[q.id] !== q.correct)
                      .map((q, idx) => (
                        <div key={q.id} className="rounded-lg px-4 py-3 text-sm" style={{ backgroundColor: '#fef2f2', borderLeft: '3px solid #dc2626' }}>
                          <span className="font-bold text-gray-500 mr-2">{idx + 1}.</span>
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
      {/* Hero */}
      <div style={{ backgroundColor: COLORS.primary }} className="py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <Link href="/testy/s" className="inline-block text-sm mb-4 hover:opacity-80 transition-opacity" style={{ color: COLORS.accent }}>
            ← Späť na oblasti testovania
          </Link>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Cvičný test SBS — Typ S</h1>
              <p className="text-sm mt-1" style={{ color: COLORS.accent }}>40 otázok · 40 minút</p>
            </div>
            {/* Timer */}
            <div
              className="shrink-0 px-4 py-2 rounded-xl font-mono font-bold text-lg"
              style={{
                backgroundColor: isWarning ? '#dc2626' : COLORS.accent,
                color: isWarning ? 'white' : COLORS.primary,
              }}
            >
              {formatTime(secondsLeft)}
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5" style={{ backgroundColor: '#d1d5db' }}>
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${progress}%`, backgroundColor: COLORS.accent }}
        />
      </div>

      {/* Question area */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          {/* Counter + dots */}
          <div className="flex items-center justify-between mb-5">
            <span className="text-lg font-bold" style={{ color: COLORS.primary }}>
              Otázka {currentIndex + 1}{' '}
              <span className="font-normal text-gray-400" style={{ fontSize: '1rem' }}>/ {shuffled.length}</span>
            </span>
            <div className="flex gap-2 flex-wrap justify-end" style={{ maxWidth: '60%' }}>
              {shuffled.map((q, i) => (
                <div
                  key={q.id}
                  className="rounded-full"
                  style={{
                    width: 12,
                    height: 12,
                    backgroundColor:
                      answers[q.id] !== undefined
                        ? answers[q.id] === q.correct
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

          {/* Question card */}
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
                  bg = '#16a34a'; border = '#16a34a'; textColor = 'white'
                  labelBg = 'rgba(255,255,255,0.2)'; labelColor = 'white'
                } else if (showRed) {
                  bg = '#dc2626'; border = '#dc2626'; textColor = 'white'
                  labelBg = 'rgba(255,255,255,0.2)'; labelColor = 'white'
                } else if (!isAnswered && isSelected) {
                  bg = '#eff6ff'; border = COLORS.primary; textColor = COLORS.primary
                  labelBg = COLORS.primary; labelColor = 'white'
                } else if (isDimmed) {
                  opacity = 0.45
                }

                return (
                  <button
                    key={letter}
                    disabled={isAnswered}
                    onClick={() => selectAnswer(letter)}
                    className="flex items-start gap-4 text-left rounded-xl border-2 px-5 py-4 transition-all duration-200"
                    style={{ backgroundColor: bg, borderColor: border, color: textColor, opacity, cursor: isAnswered ? 'default' : 'pointer' }}
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

      {/* Fixed bottom nav */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'white', borderTop: '1px solid #e5e7eb', boxShadow: '0 -4px 20px rgba(0,0,0,0.07)', zIndex: 50 }}>
        <div className="max-w-2xl mx-auto px-4 flex items-center justify-between" style={{ height: '4.5rem' }}>
          <div>
            {currentIndex > 0 ? (
              <NavButton variant="outline" onClick={goPrev}>← Predošlá</NavButton>
            ) : (
              <span />
            )}
          </div>
          {isAnswered ? (
            <NavButton variant="primary" onClick={goNext}>
              {isLast ? 'Zobraziť výsledok →' : 'Ďalšia otázka →'}
            </NavButton>
          ) : (
            <span className="text-sm" style={{ color: '#9ca3af' }}>Vyberte odpoveď…</span>
          )}
        </div>
      </div>
    </main>
  )
}
