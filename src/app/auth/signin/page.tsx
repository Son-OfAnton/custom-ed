'use client';

import { useState } from 'react';



import { useStudentSendOtpForForgotPasswordMutation, useStudentSigninMutation } from '@/store/student/studentApi';
import { useTeacherSendOtpForForgotPasswordMutation, useTeacherSigninMutation } from '@/store/teacher/teacherApi';
import { StudentLoginResponse } from '@/types/auth/studentAuth.type';
import { ExtendedError } from '@/types/Error.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDownIcon, ReloadIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';



import { cn } from '@/lib/utils';



import { PasswordInput } from '@/components/PasswordInput';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';





const formSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Please enter a valid email format' }),
	password: z
		.string({ required_error: 'Password is required' })
		.min(8, { message: 'Password must contain at least 8 characters' }),
	role: z.string({ required_error: 'Role is required' }),
})

type FormType = z.infer<typeof formSchema>

const SigninPage = () => {
	const form = useForm<FormType>({
		resolver: zodResolver(formSchema),
	})

	const [
		studentSignin,
		{
			data: studentSigninData,
			isLoading: isLoadingStudentSignin,
			isSuccess: isSuccessStudentSignin,
			isError: isErrorStudentSignin,
			error: studentSigninError,
		},
	] = useStudentSigninMutation()

	const [
		teacherSignin,
		{
			data: teacherSigninData,
			isLoading: isLoadingTeacherSignin,
			isSuccess: isSuccessTeacherSignin,
			isError: isErrorTeacherSignin,
			error: teacherSigninError,
		},
	] = useTeacherSigninMutation()
	const [
		studentSendOtpForForgotPassword,
		{
			data: StudentotpVerifyDataForgotPassword,
			isLoading: StudentisLoadingOtpVerifyForgotPassword,
			isError: StudentisErrorOtpVerifyForgotPassword,
			error: StudentotpVerifyErrorForgotPassword,
		},
	] = useStudentSendOtpForForgotPasswordMutation()
	const [
		teacherSendOtpForForgotPassword,
		{
			data: TeacherotpVerifyDataForgotPassword,
			isLoading: TeacheisLoadingOtpVerifyForgotPassword,
			isError: TeacheisErrorOtpVerifyForgotPassword,
			error: TeacheotpVerifyErrorForgotPassword,
		},
	] = useTeacherSendOtpForForgotPasswordMutation()
	const onSubmit = (credentials: FormType) => {
		console.log(`credentials ${JSON.stringify(credentials)}`)
		const { email, password } = credentials
		if (credentials.role.toLowerCase() === 'student') {
			studentSignin({ email, password })
				.unwrap()
				.then((res: StudentLoginResponse) => {
					console.log(`response ${JSON.stringify(res)}`)
					toast.success('Signin successful')
					localStorage.setItem('token', res.data.token)
					localStorage.setItem('role', 'student')
					localStorage.setItem('id', JSON.stringify(res.data.id))
					router.push('/students/classroom/classroom-list')
				})
				.catch((err: ExtendedError) => {
					console.log(`error ${JSON.stringify(err)}`)
					toast.error('Can not sign in')
				})
		} else if (credentials.role.toLowerCase() === 'teacher') {
			teacherSignin({ email, password })
				.unwrap()
				.then((res) => {
					console.log(`response ${JSON.stringify(res)}`)
					localStorage.setItem('token', res.data.token)
					localStorage.setItem('role', 'teacher')
					localStorage.setItem('id', JSON.stringify(res.data.id))
					toast.success('Signin successful')
					router.push('/teacher/classroom/classroom-list')
				})
				.catch((err: ExtendedError) => {
					console.log(`error ${JSON.stringify(err)}`)
					toast.error('Can not sign in')
				})
		}
	}
	
	
	const router = useRouter()
	const [email, setEmail] = useState("")
	const [roleForOtp, setRoleForOtp] = useState('')
	const handleSelectRole = (role: string) => {
		setRoleForOtp(role)
	}
	const handleDialogButton = () => {
		localStorage.setItem('email', email)
		localStorage.setItem('source', 'forgotpassword')
		localStorage.setItem('role', roleForOtp.toLowerCase())
		
		if (localStorage.getItem("role")?.toLowerCase() === 'student') {
				studentSendOtpForForgotPassword({ Email: email })
					.unwrap()
					.then((res) => {
						console.log('OTP Verify Response: ', JSON.stringify(res))
						toast.success('OTP Verified Successfully')
						router.push(`/auth/verify-email`)
					})
					.catch((err) => {
						console.error('OTP Verification Error: ', err)
						toast.error('OTP Verification Failed. Please try again.')
					})
			} else if (localStorage.getItem("role")?.toLowerCase() === 'teacher') {
				teacherSendOtpForForgotPassword({ Email: email })
					.unwrap()
					.then((res) => {
						console.log('OTP Verify Response: ', JSON.stringify(res))
						toast.success('OTP Verified Successfully')
						router.push(`/auth/verify-email`)
					})
					.catch((err) => {
						console.error('OTP Verification Error: ', err)
						toast.error('OTP Verification Failed. Please try again.')
					})
			}

		}
		
	

	return (
		<main className='flex h-screen w-screen justify-center items-center bg-[url(/signup-bg.jpg)]'>
			<div className='flex h-[80vh] w-[80vw] shadow-lg'>
				<section className='hidden lg:flex lg:flex-col lg:justify-center lg:items-center gap-8 rounded-l-2xl w-1/2 bg-zinc-800'>
					<h1 className='text-white text-3xl font-extrabold'>
						Welcome to CustomEd
					</h1>
					<Image
						src='/signin-illustration.svg'
						width={400}
						height={400}
						alt='Signup Illustration'
					/>
					<span className='text-primary-foreground'>
						Don't have an account ?{' '}
						<Link className='hover:underline' href='/auth/signup'>
							Signup
						</Link>
					</span>
				</section>

				<section className='flex flex-col items-center justify-center rounded-r-2xl lg:w-1/2 w-full bg-slate-50'>
					<div className='space-y-4 mb-10'>
						<h2 className='text-primary text-center text-xl font-bold'>
							Signin
						</h2>
						<p className='text-center text-gray-500'>Welcome to CustomEd</p>
					</div>
					<Form {...form}>
						<form
							method='POST'
							onSubmit={form.handleSubmit(onSubmit)}
							className='flex flex-col w-3/4 space-y-6'
						>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												className='font-semibold text-primary'
												placeholder='Email'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<PasswordInput
												className='font-semibold text-primary'
												placeholder='Password'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='role'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Select onValueChange={field.onChange}>
												<FormControl>
													<SelectTrigger
														className={cn(
															'font-semibold text-muted-foreground',
															{
																'text-primary': field.value !== undefined,
															},
														)}
													>
														<SelectValue placeholder='Role' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem
														className='font-semibold text-primary'
														value='teacher'
													>
														Teacher
													</SelectItem>
													<SelectItem
														className='font-semibold text-primary'
														value='student'
													>
														Student
													</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
								
								<Dialog>
									<DialogTrigger asChild>
										<Button variant='link' className=' text-gray-500 self-end'>
											Forgot password ?
										</Button>
									</DialogTrigger>
									<DialogContent className='sm:max-w-[425px]'>
										<DialogHeader>
											<DialogTitle>Recover password</DialogTitle>
											<DialogDescription>
												Please provide your email to recover your password.
											</DialogDescription>
										</DialogHeader>
										<div className='grid gap-4 py-4'>
											<div className='grid grid-cols-4 items-center gap-4'>
												<Label htmlFor='email' className='text-right'>
													Email
												</Label>
												<Input id='email' className='col-span-3' onChange={(e) => setEmail(e.target.value)} />
											</div>
											<div className='grid grid-cols-4 items-center gap-4'>
												<span className='text-right'>Role</span>
												<DropdownMenu>
																	<DropdownMenuTrigger className="col-span-3 border rounded-md p-2">
																		<div className='flex justify-between w-full items-center'>
																	{roleForOtp ? roleForOtp : 'Select a role'}
																	<ChevronDownIcon/>
																		</div>
																</DropdownMenuTrigger>
																<DropdownMenuContent>
																	<DropdownMenuItem onClick={() => handleSelectRole('Teacher')}>
																	Teacher
																	</DropdownMenuItem>
																	<DropdownMenuItem onClick={() => handleSelectRole('Student')}>
																	Student
																	</DropdownMenuItem>
																</DropdownMenuContent>
														</DropdownMenu>
												</div>

										</div>
										<DialogFooter>
											
											<Button type='submit' onClick={() => handleDialogButton()}
									className={cn('w-full', {
										'bg-primary/90':
											StudentisLoadingOtpVerifyForgotPassword || TeacheisLoadingOtpVerifyForgotPassword,
									})}
									disabled={StudentisLoadingOtpVerifyForgotPassword || TeacheisLoadingOtpVerifyForgotPassword}
								>
									{StudentisLoadingOtpVerifyForgotPassword || TeacheisLoadingOtpVerifyForgotPassword ? (
										<ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
									) : null}
									Send Otp
								</Button>
										</DialogFooter>
									</DialogContent>
								</Dialog>
							
							<div className='flex flex-col gap-y-4 w-full'>
								<Button
									className={cn('w-full', {
										'bg-primary/90':
											isLoadingStudentSignin || isLoadingTeacherSignin,
									})}
									disabled={isLoadingStudentSignin || isLoadingTeacherSignin}
									type='submit'
								>
									{isLoadingStudentSignin || isLoadingTeacherSignin ? (
										<ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
									) : null}
									Signin
								</Button>
								<span className='md:hidden text-primary text-center text-sm'>
									Don't have an account ?
									<Link
										href='/auth/signup'
										className='text-primary ml-2 underline'
									>
										Signup
									</Link>
								</span>
							</div>
						</form>
					</Form>
				</section>
			</div>
		</main>
	)
}
export default SigninPage