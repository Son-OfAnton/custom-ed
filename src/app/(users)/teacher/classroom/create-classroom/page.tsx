'use client'

import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { MessagesSquare, School, User } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import LeftSideBar from '@/components/LeftSideBar'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const currentYear = new Date().getFullYear()

const formSchema = z.object({
	courseName: z.string({ required_error: 'Course Name is required' }),
	courseCode: z
		.string({ required_error: 'Course Code is required' })
		.min(3, { message: 'Course code must contain at least 3 characters' })
		.max(6, { message: 'Course code must contain at most 6 characters' }),
	Department: z.enum(
		[
			'Computer Science',
			'Mathematics',
			'Physics',
			'History',
			'English Literature',
		],
		{ required_error: 'Department is required' },
	),
	courseDescription: z.string({ required_error: 'Description is required' }),
	Year: z
		.number({ required_error: 'Year is required' })
		.min(1800)
		.max(currentYear),
})

const CreateClassroomPage = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})

	const handleSubmit = (data: z.infer<typeof formSchema>) => {
		console.log(data.Year)
	}

	return (
		<div>
			<div className='pt-20 w-full md:pl-40'>
				<h1 className='md:text-3xl  text-2xl font-bold text-center mb-10'>
					Create Classroom
				</h1>

				<Form {...form}>
					<form
						method='POST'
						className='md:w-6/12  md:mx-auto mx-5 flex flex-col gap-4'
						onSubmit={form.handleSubmit(handleSubmit)}
					>
						<FormField
							control={form.control}
							name='courseName'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Course name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='courseCode'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Course code</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='Department'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Department</FormLabel>
									<Select onValueChange={field.onChange}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Select department' />
											</SelectTrigger>
										</FormControl>

										<SelectContent>
											{[
												'Computer Science',
												'Mathematics',
												'Physics',
												'History',
												'English Literature',
											].map((department: string) => (
												<SelectItem key={department} value={department}>
													{department}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='courseDescription'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder='Type your Description here.'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='Year'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Year of the class (ex: 2023)</FormLabel>
									<FormControl>
										<Input
											{...field}
											type='number'
											onChange={(e) => field.onChange(parseInt(e.target.value))}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type='submit'>Submit</Button>
					</form>
				</Form>
			</div>
		</div>
	)
}

export default CreateClassroomPage
