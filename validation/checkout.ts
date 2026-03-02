import { z } from 'zod'

export const checkoutSchema = z.object({
  email: z.string().email('Neplatná emailová adresa'),
  courseType: z.enum(['S', 'P'], { error: 'Vyberte typ kurzu' }),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>
export type CheckoutFormErrors = Partial<Record<keyof CheckoutFormData, string>>
