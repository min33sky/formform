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
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export default function RegisterForm() {
  const [formStep, setFormStep] = useState(0);

  const form = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordCheck: '',
      name: '',
      year: '',
    },
  });

  const onSubmit = (data: RegisterType) => {
    console.log(data);
  };

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>회원가입</CardTitle>
        <CardDescription>아래 항목을 입력해주세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="relative overflow-x-hidden"
          >
            <motion.div
              className={cn('space-y-10', {
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
                      <Input placeholder="Enter your name..." {...field} />
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
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email..." {...field} />
                    </FormControl>
                    <FormMessage className="dark:text-orange-300" />
                  </FormItem>
                )}
              />
              {/* year */}
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-orange-300">
                      Year of study
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[10, 11, 12, 13].map((year) => {
                          return (
                            <SelectItem value={year.toString()} key={year}>
                              Year {year}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage className="dark:text-orange-300" />
                  </FormItem>
                )}
              />
            </motion.div>
            <motion.div
              className={cn('space-y-3 absolute top-0 left-0 right-0', {
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
                        placeholder="Enter your password..."
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
                        placeholder="Please confirm your password..."
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage className="dark:text-orange-300" />
                  </FormItem>
                )}
              />
            </motion.div>

            <div className="flex mt-6 gap-2">
              <Button
                type="submit"
                className={cn({
                  hidden: formStep == 0,
                })}
              >
                Submit
              </Button>
              <Button
                type="button"
                variant={'ghost'}
                className={cn({
                  hidden: formStep == 1,
                })}
                onClick={() => {
                  // validation
                  form.trigger(['email', 'name', 'year']);
                  const emailState = form.getFieldState('email');
                  const nameState = form.getFieldState('name');
                  const yearState = form.getFieldState('year');

                  if (!emailState.isDirty || emailState.invalid) return;
                  if (!nameState.isDirty || nameState.invalid) return;
                  if (!yearState.isDirty || yearState.invalid) return;

                  setFormStep(1);
                }}
              >
                다음 단계
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                type="button"
                variant={'ghost'}
                onClick={() => {
                  setFormStep(0);
                }}
                className={cn({
                  hidden: formStep == 0,
                })}
              >
                Go Back
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
