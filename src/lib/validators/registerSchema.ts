import { z } from 'zod';

export const registerSchema = z
  .object({
    email: z
      .string()
      .nonempty({
        message: '이메일을 입력해주세요.',
      })
      .email({
        message: '이메일 형식이 올바르지 않습니다.',
      }),
    name: z
      .string()
      .min(3, { message: '이름은 3글자 이상이어야 합니다.' })
      .max(10, { message: '이름은 10글자 이하여야 합니다.' }),
    password: z
      .string()
      .nonempty('비밀번호를 입력해주세요.')
      .regex(
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
        '영문+숫자+특수문자(! @ # $ % & * ?) 조합 8~15자리를 입력해주세요.',
      ),
    passwordCheck: z
      .string()
      .nonempty('비밀번호를 다시 입력해주세요.')
      .regex(
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
        '영문+숫자+특수문자(! @ # $ % & * ?) 조합 8~15자리를 입력해주세요.',
      ),
    year: z.string({
      required_error: '생년월일을 입력해주세요.',
    }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    path: ['passwordCheck'],
    message: '비밀번호가 일치하지 않습니다.',
  });

export type RegisterType = z.infer<typeof registerSchema>;
