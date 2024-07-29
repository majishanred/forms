import { z } from 'zod';

export const contactsSchema = z.object({
  firstName: z.string().trim().min(1, 'Обязательное поле'),
  middleName: z.optional(z.string().trim().min(1, 'Обязательное поле')),
  lastName: z.string().trim().min(1, 'Обязательное поле'),
  phoneNumber: z
    .string()
    .regex(/\+7[0-9]{10}/, 'Номер состоит из +7 и 10 цифр за ними')
    .length(12, 'Номер телефона состоит из 11 цифр'),
  email: z.optional(z.string().email('Некоректный Email')),
  luboiDvij: z.boolean().refine((check) => check, 'Ты обязан быть за любой движ'),
});

export type ContactsFormFields = z.infer<typeof contactsSchema>;
