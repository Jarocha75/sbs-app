import { NextRequest, NextResponse } from 'next/server'
import { checkoutSchema } from '@/validation/checkout'
import { stripe } from '@/lib/stripe'
import { STRIPE_PRICES } from '@/data/stripe'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const result = checkoutSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0].message },
      { status: 400 }
    )
  }

  const { email, courseType } = result.data
  const priceId = STRIPE_PRICES[courseType]
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

  if (!priceId) {
    return NextResponse.json(
      { error: 'Cenová položka pre daný kurz nie je nakonfigurovaná.' },
      { status: 500 }
    )
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { email, courseType },
      success_url: `${appUrl}/platba/uspech?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/platba/zrusenie`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[checkout] Stripe error:', err)
    return NextResponse.json(
      { error: 'Nepodarilo sa vytvoriť platobnú reláciu.' },
      { status: 500 }
    )
  }
}
