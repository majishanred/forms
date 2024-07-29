import { z } from 'zod';

export const projectSchema = z
  .object({
    name: z.string().trim().min(1, 'Обязательное поле'),
    skills: z.string().array().nonempty('Укажите хотя бы один навык, плз'),
    role: z.string(),
    beginDate: z.string().date(),
    endDate: z.string().date().optional(),
  })
  .refine((arg) => {
    const { beginDate, endDate } = arg;
    if (!endDate) return true;
    if (new Date(endDate).getTime() < new Date(beginDate).getTime()) {
      return false;
    }
  }, 'Залупа');

export type ProjectFormFields = z.infer<typeof projectSchema>;
