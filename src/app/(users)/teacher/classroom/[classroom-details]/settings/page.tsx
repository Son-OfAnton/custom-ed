"use client";

import React, { useState } from 'react';



import { useAddStudentMutation, useDeleteClassroomMutation, useEditClassroomMutation } from '@/store/classroom/classroomApi';
import { useStudentGetProfileByNameQuery } from '@/store/student/studentApi';
import { EditClassroomResponse } from '@/types/classroom/classroom.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Pencil, Plus, Trash } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';



import { cn } from '@/lib/utils';



import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';





const classroomSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	courseNo: z.string().min(1, 'Course number is required'),
	description: z.string().min(1, 'Description is required'),
})

const studentSchema = z.object({
	studentName: z.string().min(1, 'Student name is required'),
})

type ClassroomFormValues = z.infer<typeof classroomSchema>
type StudentFormValues = z.infer<typeof studentSchema>

const Page: React.FC = () => {

	const router = useRouter()
	const pathname = usePathname()
	const classroomId = pathname.split('/')[3]
	const [
		editClassroom,
		{
			data: editClassroomData,
			isLoading: isLoadingEditClassroom,
			isSuccess: isSuccessEditClassroom,
			isError: isErrorEditClassroom,
			error: editClassroomError,
		},
	] = useEditClassroomMutation()
	const [
		deleteClassroom,
		{
			data: deleteClassroomData,
			isLoading: isLoadingDeleteClassroom,
			isSuccess: isSuccessDeleteClassroom,
			isError: isErrorDeleteClassroom,
			error: deleteClassroomError,
		},
	] = useDeleteClassroomMutation()
	// const [
	// 	addStudent,
	// 	{
	// 		data: addStudentData,
	// 		isLoading: isLoadingAddStudent,
	// 		isSuccess: isSuccessAddStudent,
	// 		isError: isErrorAddStudent,
	// 		error: addStudentError,
	// 	},
	// ] = useAddStudentMutation()
	console.log("id:", {classroomId})	
	const editClassForm = useForm<ClassroomFormValues>({
		resolver: zodResolver(classroomSchema),
	})
	const addStudentForm = useForm<StudentFormValues>({
		resolver: zodResolver(studentSchema),
	})

		const  onSubmitClassroom = (courseData: ClassroomFormValues) => {
				const req = {
					id: classroomId,
					...courseData,
				}
			console.log(req)
				editClassroom(req)
					.unwrap()
					.then((res: EditClassroomResponse) => {
						console.log(`response ${JSON.stringify(res)}`)
						toast.success('Edited classroom successfully')
						router.push('/teacher/classroom/classroom-list')
					})
					.catch((err) => {
						console.log(`error ${JSON.stringify(err)}`)
						toast.error('Can not edit the classroom')
					})
		}

	
	const OnSubmitStudent: SubmitHandler<StudentFormValues> = (data) => {
		
		
	}
	const onClickDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		deleteClassroom(classroomId)
			.unwrap()
			.then((res) => {
				console.log(res)
				toast.success('Deleted classroom successfully')
				router.push('/teacher/classroom/classroom-list')
			})
			.catch((err) => {
				console.log(err)
				toast.error('Can not delete the classroom')
			})
	}

	return (
		<div>
			<Dialog >
                <DialogTrigger asChild>
                <div className='flex justify-center md:ml-20 lg:ml-0'>
				<Card className='md:w-6/12 w-full mt-20'>
					<CardContent>
						<div
							className='flex space-x-4 px-7 mt-6 cursor-pointer'
						>
							<Pencil />
							<p>Edit Classroom</p>
						</div>
					</CardContent>
				</Card>
			</div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
				<div className='p-4'>
					<h2 className='mb-4 font-bold text-xl'>Edit Classroom</h2>
					<Form {...editClassForm}>
					<form method='POST'
							onSubmit={editClassForm.handleSubmit(onSubmitClassroom)}>
						<FormField
								control={editClassForm.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
							placeholder='Name'
							{...field}
							className='mb-4'
							
						/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						<FormField
								control={editClassForm.control}
								name='courseNo'
								render={({ field }) => (
									<FormItem>
										<FormControl>
										<Input
							placeholder='Course No'
							{...field}
							className='mb-4'
							 
						/>
							
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						<FormField
								control={editClassForm.control}
								name='description'
								render={({ field }) => (
									<FormItem>
										<FormControl>
										<Input
							placeholder='Description'
							{...field}
							className='mb-4'
							
						/>
							
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						<Button
									className={cn('w-full', {
										'bg-primary/90':
											isLoadingEditClassroom,
									})}
									disabled={isLoadingEditClassroom}
									type='submit'
								>
									{isLoadingEditClassroom ? (
										<ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
									) : null}
									Save
								</Button>
					</form>
					</Form>
				</div>
                </DialogContent>
			</Dialog>

			<Dialog>
                <DialogTrigger asChild>
            <div className='flex justify-center md:ml-20 lg:ml-0'>
				<Card className='md:w-6/12 w-full mt-20'>
					<CardContent>
						<div
							className='flex space-x-4 px-7 mt-6 cursor-pointer'
							
						>
							<Trash />
							<p>Delete Classroom</p>
						</div>
					</CardContent>
				</Card>
			</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
				<div className='p-4'>
					<h2 className='mb-4 font-bold text-xl'>Confirm Delete</h2>
					<p className='mb-4'>Are you sure you want to delete this classroom?</p>
					<Button
									className={cn('w-full bg-red-800', {
										'bg-red-800':
											isLoadingDeleteClassroom,
									})}
									disabled={isLoadingDeleteClassroom}
									type='submit'
									onClick={onClickDelete}
								>
									{isLoadingDeleteClassroom ? (
										<ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
									) : null}
									Delete
								</Button>
				</div>
</DialogContent>
			</Dialog>

			{/* <Dialog>
                <DialogTrigger asChild>
       <div className='flex justify-center md:ml-20 lg:ml-0'>
				<Card className='md:w-6/12 w-full mt-20'>
					<CardContent>
						<div
							className='flex space-x-4 px-7 mt-6 cursor-pointer'
						>
							<Plus />
							<p>Add a Student</p>
						</div>
					</CardContent>
				</Card>
			</div>
      </DialogTrigger>
        <DialogContent className="sm:max-w-md"> 
				<div className='p-4'>
					<h2 className="mb-4 font-bold text-xl">Add a Student</h2>
					<Form {...addStudentForm}>
					<form 
					method='POST'
					onSubmit={addStudentForm.handleSubmit(onSubmitStudent)}>
						<FormField
								control={addStudentForm.control}
								name='studentName'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
							placeholder='Student Name'
							{...field}
							className='mb-4'
						/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>	
						<Button type='submit'>Add Student</Button>
					</form>
					</Form>
				</div>
                </DialogContent>
			</Dialog> */}
		</div>
	)
}

export default Page