'use client';

import { useState } from 'react';



import { useChangePasswordMutation } from "@/store/student/studentApi";
import { useChangeTeacherPasswordMutation } from "@/store/teacher/teacherApi";
import { changePasswordResponse } from "@/types/auth/profile.type";
import { ExtendedError } from '@/types/Error.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { tuple, z } from 'zod';



import { cn } from '@/lib/utils';



import { PasswordInput } from '@/components/PasswordInput';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';





const formSchema = z
	.object({
		newPassword: z
			.string({ required_error: 'Password is required' })
			.min(8, { message: 'Password must contain at least 8 characters' }),
		confirmPassword: z
			.string({ required_error: 'Password is required' })
			.min(8, { message: 'Password must contain at least 8 characters' }),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'Passwords do not match',
	})

type FormType = z.infer<typeof formSchema>

const ForgotPasswordPage = () => {
	const form = useForm<FormType>({
		resolver: zodResolver(formSchema),
	})

const role = localStorage.getItem("role")
const email = localStorage.getItem("email") ?? ""
	const [
		changePassword,
		{
			data: studentChangePasswordData,
			isLoading: isLoadingStudentchangePassword,
			isSuccess: isSuccessStudentchangePassword,
			isError: isErrorStudentchangePassword,
			error: StudentchangePasswordError,
		},
	] = useChangePasswordMutation()

	const [
		changeTeacherPassword,
		{
			data: teacherChangePassword,
			isLoading: isLoadingTeacherChangePassword,
			isSuccess: isSuccessTeacherChangePassword,
			isError: isErrorTeacherChangePassword,
			error: teacherChangePasswordError,
		},
	] = useChangeTeacherPasswordMutation()
	const onSubmit = (credentials: FormType) => {
		console.log(credentials)
		console.log(`credentials ${JSON.stringify(credentials)}`)
		const { newPassword } = credentials
		if (role?.toLowerCase() === 'student') {
			changePassword({ email, newPassword })
				.unwrap()
				.then((res: changePasswordResponse) => {
					console.log(`response ${JSON.stringify(res)}`)
					toast.success('Password changed successfully')
					
				})
				.catch((err: ExtendedError) => {
					console.log(`error ${JSON.stringify(err)}`)
					toast.success('Password changed successfully')
				})
		} else if (role?.toLowerCase() === 'teacher') {
			changeTeacherPassword({ email, newPassword })
				.unwrap()
				.then((res: changePasswordResponse) => {
					console.log(`response ${JSON.stringify(res)}`)
					toast.success('Password changed successfully')
				})
				.catch((err: ExtendedError) => {
					console.log(`error ${JSON.stringify(err)}`)
					toast.success('Password changed successfully')
				})
		}
	}
	return (
		<main className='flex h-screen w-screen justify-center items-center bg-[url(/signup-bg.jpg)]'>
			<div className='flex h-[80vh] w-[80vw] shadow-lg'>
				<section className='hidden lg:flex lg:flex-col lg:justify-center lg:items-center gap-8 rounded-l-2xl w-1/2 bg-zinc-800'>
					<h1 className='text-white text-3xl font-extrabold'>
						Reset your password
					</h1>
					<Image
						src='/forgot-password.svg'
						width={400}
						height={400}
						alt='Forgot Password Illustration'
					/>
				</section>

				<section className='relative flex flex-col items-center justify-center rounded-r-2xl lg:w-1/2 w-full bg-slate-50'>
					<h2 className='mb-10 text-primary text-center text-xl font-bold'>
						Reset your password
					</h2>
					<Form {...form}>
						<form
							method='POST'
							onSubmit={form.handleSubmit(onSubmit)}
							className='w-3/4 space-y-6'
						>
							<FormField
								control={form.control}
								name='newPassword'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<PasswordInput
												className='font-semibold text-primary'
												placeholder='New Password'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='confirmPassword'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<PasswordInput
												className='font-semibold text-primary'
												placeholder='Confirm Password'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className='flex flex-col gap-y-4 w-full'>
								<Button type='submit'
									className={cn('w-full', {
										'bg-primary/90':
											isLoadingStudentchangePassword ||isLoadingTeacherChangePassword,
									})}
									disabled={isLoadingStudentchangePassword ||isLoadingTeacherChangePassword}
								>
									{isLoadingStudentchangePassword ||isLoadingTeacherChangePassword? (
										<ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
									) : null}
									Submit
								</Button>
							</div>
						</form>
					</Form>
				</section>
			</div>
		</main>
	)
}
export default ForgotPasswordPage