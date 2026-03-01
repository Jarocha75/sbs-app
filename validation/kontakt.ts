import { z } from "zod";

export const kontaktSchema = z.object({
  meno: z.string().min(2, "Meno musí mať aspoň 2 znaky"),
  priezvisko: z.string().min(2, "Priezvisko musí mať aspoň 2 znaky"),
  telefon: z
    .string()
    .regex(/^[+]?[\d\s\-()\u00a0]{9,20}$/, "Neplatné telefónne číslo"),
  email: z.string().email("Neplatná emailová adresa"),
  sprava: z
    .string()
    .min(10, "Správa musí mať aspoň 10 znakov")
    .max(1000, "Správa je príliš dlhá"),
});

export type KontaktFormData = z.infer<typeof kontaktSchema>;
export type KontaktFormErrors = Partial<Record<keyof KontaktFormData, string>>;
