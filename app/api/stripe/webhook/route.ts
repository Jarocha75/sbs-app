import { NextRequest, NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { resend } from '@/lib/resend'
import { generateActivationToken } from '@/lib/token'
import { buildActivationEmail } from '@/lib/emails/activation'

export async function POST(req: NextRequest) {
  const payload = await req.text()
  const signature = req.headers.get('stripe-signature') ?? ''

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('[webhook] Signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const email = session.metadata?.email
    const courseType = session.metadata?.courseType as 'S' | 'P' | undefined

    if (!email || !courseType) {
      console.error('[webhook] Missing metadata on session:', session.id)
      return NextResponse.json({ error: 'Missing metadata' }, { status: 400 })
    }

    const course = await prisma.course.findFirst({
      where: { type: courseType },
      select: { id: true, title: true },
    })

    if (!course) {
      console.error('[webhook] Course not found for type:', courseType)
      return NextResponse.json({ error: 'Course not found' }, { status: 500 })
    }

    const { token, expiry } = generateActivationToken()

    const user = await prisma.user.upsert({
      where: { email },
      update: {
        activationToken: token,
        activationExpiry: expiry,
        stripeSessionId: session.id,
      },
      create: {
        email,
        status: 'PENDING',
        activationToken: token,
        activationExpiry: expiry,
        stripeSessionId: session.id,
      },
    })

    await prisma.enrollment.upsert({
      where: { userId_courseId: { userId: user.id, courseId: course.id } },
      update: {
        paidAt: new Date(),
        stripePaymentIntentId: session.payment_intent as string | null,
      },
      create: {
        userId: user.id,
        courseId: course.id,
        paidAt: new Date(),
        stripePaymentIntentId: session.payment_intent as string | null,
      },
    })

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
    const activationUrl = `${appUrl}/aktivacia?token=${token}`
    const { subject, html } = buildActivationEmail({
      activationUrl,
      courseTitle: course.title,
    })

    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM!,
        to: email,
        subject,
        html,
      })
    } catch (emailErr) {
      // Nevrátim 500 – Stripe by opakoval webhook. User existuje, admin môže resendnúť.
      console.error('[webhook] Failed to send activation email:', emailErr)
    }

    console.log(`[webhook] User ${email} created/updated, enrollment for course ${courseType}`)
  }

  return NextResponse.json({ received: true })
}
