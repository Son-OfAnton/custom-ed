'use client'

import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useAdminSigninMutation } from '@/store/admin/adminApi'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReloadIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { z } from 'zod'

import { cn } from '@/lib/utils'

import { PasswordInput } from '@/components/PasswordInput'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Please enter a valid email format' }),
	password: z
		.string({ required_error: 'Password is required' })
		.min(8, { message: 'Password must contain at least 8 characters' }),
})

type FormType = z.infer<typeof formSchema>

const SigninPage = () => {
	const router = useRouter()
	const form = useForm<FormType>({
		resolver: zodResolver(formSchema),
	})

	const [signin, { data, isLoading, isSuccess, isError, error }] =
		useAdminSigninMutation()
	const { setItem: setCurrUser } = useLocalStorage('currUser')

	const onSubmit = (credentials: FormType) => {
		signin(credentials)
			.unwrap()
			.then((res) => {
				if (res.data) {
					toast.success('Signin successful')
					setCurrUser(res.data)
					router.push('/admin/classroom/classroom-list')
				} else {
					toast.error('Signin failed')
				}
			})
			.catch((err) => {
				toast.error('Signin failed')
			})
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
							<div className='flex flex-col gap-y-4 w-full'>
								<Button
									className={cn('w-full', {
										'bg-primary/90': false,
									})}
									disabled={false}
									type='submit'
								>
									{false ? (
										<ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
									) : null}
									Signin
								</Button>
							</div>
						</form>
					</Form>
				</section>
			</div>
		</main>
	)
}
export default SigninPage
