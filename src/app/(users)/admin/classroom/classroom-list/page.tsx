'use client'

import React, { useEffect, useState } from 'react'

import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useGetAllClassroomsQuery } from '@/store/classroom/classroomApi'
import { openDialog, setTeacherId } from '@/store/features/adminDialogSlice'
import { GraduationCap, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'

import ClassroomDeleteDialog from '@/components/ClassroomDeleteDialog'
import EmailDialog from '@/components/EmailDialog'
import { EllipsisVertical } from '@/components/Icons'
import SearchAndBell from '@/components/SearchAndBell'
import Spinner from '@/components/Spinner'
import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const ListOfClassroomPage = () => {
	const router = useRouter()
	const { getItem: getCurrUser } = useLocalStorage('currUser')
	const currUser = getCurrUser()
	const currUserType =
		currUser?.role === 0
			? 'student'
			: currUser?.role === 1
				? 'teacher'
				: 'admin'
	console.debug('currUserType', currUserType)
	const dispatch = useDispatch()

	const {
		data: classrooms,
		isSuccess: isSuccessClassrooms,
		isLoading: isLoadingClassrooms,
		isFetching: isFetchingClassrooms,
		isError: isErrorClassrooms,
		error: classroomsError,
		refetch: refetchClassrooms,
	} = useGetAllClassroomsQuery({})

	return (
		<div className='md:flex overflow-x-hidden md:w-11/12 md:ml-auto h-screen'>
			<EmailDialog />
			<div className='flex-1 mt-20 md:pl-40'>
				<div>
					<SearchAndBell />
				</div>

				{isLoadingClassrooms || isFetchingClassrooms ? (
					<div className='flex justify-center items-center'>
						<Spinner />
					</div>
				) : classrooms?.data.length === 0 ? (
					<div className='flex justify-center items-center'>
						<p className='text-2xl text-gray-400 font-bold'>
							No classroom available
						</p>
					</div>
				) : (
					<div className='md:grid  md:grid-cols-2 lg:grid-cols-3 gap-4  md:mx-7 left-0 mx-auto '>
						{classrooms?.data.map((classroom: any) => (
							<div
								key={classroom.id}
								className='w-full mb-2 md:mb-0 hover:border hover:border-primary hover:rounded-xl transition duration-300 cursor-pointer'
								onClick={() =>
									router.push(`/admin/classroom/${classroom.id}/announcement`)
								}
							>
								<Card>
									<CardHeader className='flex flex-row justify-between'>
										<CardTitle>{classroom.name}</CardTitle>
										<DropdownMenu>
											<DropdownMenuTrigger>
												<EllipsisVertical className='h-4 w-4' />
											</DropdownMenuTrigger>
											<DropdownMenuContent>
												<DropdownMenuItem
													className='focus:bg-blue-500 focus:text-white cursor-pointer'
													onClick={(e) => {
														e.stopPropagation()
														dispatch(openDialog())
														dispatch(setTeacherId(classroom.creator.id))
													}}
												>
													Email teacher
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</CardHeader>

									<CardFooter>
										<div className='flex items-center w-full justify-between'>
											<div className='flex items-center'>
												<Users size={20} className='mr-2' />
												<p>{classroom.members?.length}</p>
											</div>
											<p>{classroom.courseNo}</p>
										</div>
									</CardFooter>
									<div className='ml-6 mb-4 flex items-center'>
										<GraduationCap size={22} className='mr-2' />
										<p>
											{`${classroom.creator.firstName} ${classroom.creator.lastName}`}
										</p>
									</div>
								</Card>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default ListOfClassroomPage
