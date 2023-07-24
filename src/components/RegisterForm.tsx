'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';
import { RegisterType, registerSchema } from '@/lib/validators/registerSchema';
import sleep from '@/lib/sleep';

export default function RegisterForm() {
  const [formStep, setFormStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordCheck: '',
      name: '',
    },
  });

  /**
   * Step1 -> Step2 이동 시 폼 검증 후 이동
   */
  const onNextStep = useCallback(async () => {
    try {
      // validation
      const isValid = await form.trigger([
        'email',
        'name',
        'password',
        'passwordCheck',
      ]);

      if (!isValid) return;

      /**
       *? Next-Auth or Clerk과 같은 인증 라이브러리로 회원가입 요청 후
       *? 회원가입 성공 시 setFormStep(1) 호출
       */

      // TODO: 회원가입 요청 API 호출

      setFormStep(1);
    } catch (error) {
      return toast({
        title: '회원가입 실패',
        description: '회원가입에 실패했습니다.',
        variant: 'destructive',
      });
    }
  }, [form, toast]);

  /**
   * 키보드 이벤트 핸들러
   */
  const onKeyUp = useCallback(
    async (e: React.KeyboardEvent<HTMLFormElement>) => {
      const errorCount = Object.keys(form.formState.errors).length;
      const password = form.watch('password');
      const passwordCheck = form.watch('passwordCheck');

      if (password !== passwordCheck) {
        console.log('비밀번호가 일치하지 않습니다.');
        form.setError('passwordCheck', {
          message: '비밀번호가 일치하지 않습니다.',
        });
        return;
      } else {
        form.clearErrors('passwordCheck');
      }

      if (e.key === 'Enter') {
        onNextStep();
      } else if (errorCount > 0) {
        await form.trigger(['email', 'name', 'password']);
      }

      console.log('에러수: ', errorCount);
    },

    [form, onNextStep],
  );

  /**
   * 최종 폼 제출 핸들러 (Step2)
   */
  const onSubmit = async (data: RegisterType) => {
    // console.log(data);

    try {
      setIsLoading(true);

      await sleep(3000);

      toast({
        title: '회원가입 성공',
        description: '회원가입에 성공했습니다.',
        variant: 'default',
      });

      router.replace('/success');
    } catch (error) {
      toast({
        title: '회원가입 실패',
        description: '회원가입에 실패했습니다.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="custom-scrollbar w-full mt-24 mb-10 max-w-xl overflow-y-auto dark:custom-scrollbar-dark">
      <CardHeader>
        <CardTitle className="pl-1">회원가입</CardTitle>
        <CardDescription className="pl-1">
          아래 항목을 입력해주세요.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onKeyUp={onKeyUp}
            className="relative overflow-x-hidden "
          >
            <motion.div
              className={cn('space-y-2 px-1', {
                // hidden: formStep == 1,
              })}
              // formStep == 0 -> translateX == 0
              // formStep == 1 -> translateX == '-100%'
              animate={{
                translateX: `-${formStep * 100}%`,
              }}
              transition={{
                ease: 'easeInOut',
              }}
            >
              {/* name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-orange-300">이름</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="이름은 3자 ~ 10자로 입력하세요."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      활동할 때 사용 할 이름입니다.
                    </FormDescription>
                    <FormMessage className="dark:text-orange-300" />
                  </FormItem>
                )}
              />
              {/* email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-orange-300">
                      이메일
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="예) user@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage className="dark:text-orange-300" />
                  </FormItem>
                )}
              />
              {/* password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-orange-300">
                      비밀번호
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="소문자, 숫자, 특수문자를 포함한 8자 ~ 15자로 입력하세요."
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage className="dark:text-orange-300" />
                  </FormItem>
                )}
              />
              {/*  password check */}
              <FormField
                control={form.control}
                name="passwordCheck"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-orange-300">
                      비밀번호 확인
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="비밀번호를 다시 입력해주세요..."
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage className="dark:text-orange-300" />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              className={cn('space-y-2 absolute top-0 left-0 right-0 p-1', {
                hidden: formStep == 0,
              })}
              // formStep == 0 -> translateX == 100%
              // formStep == 1 -> translateX == 0
              animate={{
                translateX: `${100 - formStep * 100}%`,
              }}
              style={{
                translateX: `${100 - formStep * 100}%`,
              }}
              transition={{
                ease: 'easeInOut',
              }}
            >
              {/* year */}
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-orange-300">
                      년도 선택
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="년도를 선택해주세요." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-48">
                        <SelectGroup>
                          <SelectLabel>년도</SelectLabel>
                          {Array(100)
                            .fill(2023)
                            .map((year, idx) => {
                              return (
                                <SelectItem
                                  value={(year - 10 + idx).toString()}
                                  key={idx}
                                >
                                  {year - 10 + idx}년
                                </SelectItem>
                              );
                            })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage className="dark:text-orange-300" />
                  </FormItem>
                )}
              />
            </motion.div>

            <footer className="flex justify-end mt-6 p-1 gap-2">
              <Button
                type="button"
                variant={'secondary'}
                onClick={() => {
                  setFormStep(0);
                }}
                className={cn({
                  hidden: formStep == 0,
                })}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                이전 단계
              </Button>

              <Button
                type="button"
                variant={'default'}
                className={cn({
                  hidden: formStep == 1,
                })}
                onClick={onNextStep}
              >
                다음 단계
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              {formStep == 1 && (
                <Button
                  type="submit"
                  isLoading={isLoading}
                  disabled={isLoading}
                  // className={cn({
                  //   hidden: formStep == 0,
                  // })}
                >
                  확인
                </Button>
              )}
              {/* <Button
                type="submit"
                className={cn({
                  hidden: formStep == 0,
                })}
              >
                확인
              </Button> */}
            </footer>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
