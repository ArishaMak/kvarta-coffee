import { z } from 'zod';

const rbPhoneRegex = /^(\+375|80)(25|29|33|44|17)\d{7}$/;

export const CreateLeadSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать от 2 символов').max(50),
  phone: z
    .string()
    .transform((val: string) => val.replace(/[\s\-\(\)]/g, ''))
    .pipe(
      z
        .string()
        .regex(
          rbPhoneRegex,
          'Укажите корректный номер РБ (+375XX... или 80XX...)',
        ),
    ),
  type: z.enum(['subscription', 'single', 'question']),
  comment: z.string().max(500).optional(),
  utm: z
    .object({
      source: z.string().optional(),
      medium: z.string().optional(),
      campaign: z.string().optional(),
      content: z.string().optional(),
      term: z.string().optional(),
    })
    .optional(),
});

export type CreateLeadDto = z.infer<typeof CreateLeadSchema>;
