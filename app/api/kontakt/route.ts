import { NextRequest, NextResponse } from 'next/server'
import { kontaktSchema } from '@/validation/kontakt'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const result = kontaktSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0].message },
      { status: 400 }
    )
  }

  // Tu môžeš pridať odosielanie emailu (napr. Resend, Nodemailer)
  console.log('Nová kontaktná správa:', result.data)

  return NextResponse.json({ success: true }, { status: 200 })
}
