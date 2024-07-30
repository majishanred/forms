import { z } from 'zod';

export const contactsSchema = z.object({
  firstName: z.string().trim().min(1, 'Обязательное поле'),
  middleName: z.optional(z.string().trim().min(1, 'Обязательное поле')),
  lastName: z.string().trim().min(1, 'Обязательное поле'),
  phoneNumber: z.string().regex(/^\+7\(\d{3}\)\d{3}\d{2}\d{2}/, 'Некоректный номер телефона'),
  email: z.optional(z.string().email('Некоректный Email')),
  luboiDvij: z.boolean().refine((check) => check, 'Ты обязан быть за любой движ'),
});

export type ContactsFormFields = z.infer<typeof contactsSchema>;
