import { z } from 'zod';
export const projectSchema = z
  .object({
    name: z.string().trim().min(1, 'Обязательное поле'),
    skills: z.string().array().nonempty('Укажите хотя бы один навык, плз'),
    role: z.string(),
    beginDate: z.string().date(),
    endDate: z.string().date().optional(),
  })
  .superRefine((arg, ctx) => {
    const { beginDate, endDate } = arg;
    if (!endDate) {
      return;
    }
    if (new Date(endDate).getTime() < new Date(beginDate).getTime()) {
      ctx.addIssue({
        path: ['endDate'],
        code: z.ZodIssueCode.custom,
        message: 'Дата завершения не может быть раньше даты начала',
      });
    }
  });

export type ProjectFormFields = z.infer<typeof projectSchema>;
