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
import { RegisterType, registerSchema } from '@/libs/validators/registerSchema';
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

export default function RegisterForm() {
  const [formStep, setFormStep] = useState(0);
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

  // console.log(form.formState.errors);

  // useEffect(() => {
  //   if (Object.keys(form.formState.errors).length > 0) {
  //     toast({
  //       title: '회원가입 실패',
  //       description: '회원가입에 실패했습니다.',
  //       variant: 'destructive',
  //     });
  //   }
  // }, [form.formState.errors, toast]);

  const onNextStep = useCallback(() => {
    // validation
    form.trigger(['email', 'name', 'password', 'passwordCheck']);
    const emailState = form.getFieldState('email');
    const nameState = form.getFieldState('name');
    const passwordState = form.getFieldState('password');
    const passwordCheckState = form.getFieldState('passwordCheck');

    if (!emailState.isDirty || emailState.invalid) return;
    if (!nameState.isDirty || nameState.invalid) return;
    if (!passwordState.isDirty || passwordState.invalid) return;
    if (!passwordCheckState.isDirty || passwordCheckState.invalid) return;

    setFormStep(1);
  }, [form]);

  const onSubmit = (data: RegisterType) => {
    console.log(data);

    toast({
      title: '회원가입 성공',
      description: '회원가입에 성공했습니다.',
      variant: 'default',
    });
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
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                onNextStep();
              }
            }}
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
