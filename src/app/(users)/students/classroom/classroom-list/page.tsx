'use client';

import React from 'react';



import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useStudentClassroomQuery } from '@/store/classroom/classroomApi';
import { setCurrClassroomId, setCurrClassroomName } from '@/store/features/classroomSlice';
import { Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';



import SearchAndBell from '@/components/SearchAndBell';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';





const ListOfClassroomPage = () => {
	const router = useRouter()
	const {
		data: classrooms,
		isSuccess: isSuccessClassrooms,
		isLoading: isLoadingClassrooms,
		isFetching: isFetchingClassrooms,
		isError: isErrorClassrooms,
		error: classroomsError,
	} = useStudentClassroomQuery()
	console.log(classrooms)
	const dispatch = useDispatch()
	const handleCardClick = (id: string, name: string) => {
		dispatch(setCurrClassroomId(id))
		dispatch(setCurrClassroomName(name))
		router.push(`/students/classroom/${id}/analytics`)
	}
	return (
		<div className='md:flex overflow-x-hidden md:w-11/12 md:ml-auto h-screen'>
			<div className='flex-1 mt-20 md:pl-40'>
				<div>
					<SearchAndBell />
				</div>

				<div className='md:grid  md:grid-cols-2 lg:grid-cols-3 gap-4  md:mx-7 left-0 mx-auto '>
					{classrooms?.data.map((classroom) => (
						<div
							key={classroom.id}
							className='w-full mb-2 md:mb-0 cursor-pointer hover:border hover:border-primary hover:rounded-xl'
							onClick={() => handleCardClick(classroom.id, classroom.name)}
						>
							<Card>
								<CardHeader>
									<CardTitle>{classroom.name}</CardTitle>
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
							</Card>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default ListOfClassroomPage