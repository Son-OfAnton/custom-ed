'use client'

import React from 'react'

import {
	useTeacherGetPictureByIdQuery,
	useTeacherGetProfileByIdQuery,
} from '@/store/teacher/teacherApi'
import { Calendar, CircleUser, Library, Phone } from 'lucide-react'
import { useRouter } from 'next/navigation'

import NonEditableProfileFields from '@/components/NonEditableProfileFields'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
const Page = () => {
	const router = useRouter()
	const unsilced_id = localStorage.getItem('id') ?? ''
	const id = unsilced_id.slice(1, -1)
	const { data: pictureData, isFetching: isFetchingPicture } =
		useTeacherGetPictureByIdQuery({ id })
	const { data: profileData, isFetching: isFetchingProfile } =
		useTeacherGetProfileByIdQuery({ id })
	const user = profileData?.data

	const FullName = user ? `${user.firstName} ${user.lastName}` : 'Loading...'

	if (isFetchingProfile) {
		return <div>Loading...</div> // Optionally add a loading indicator
	}

	return (
		<div>
			<div className='flex justify-center pt-20 md:pl-40'>
				<Avatar className='w-40 h-40'>
					<AvatarImage src={user?.imageUrl} alt='Profile Picture' />
					<AvatarFallback>
						{user?.firstName ? user.firstName[0] : 'N/A'}
					</AvatarFallback>
				</Avatar>
			</div>

			<div className='container min-h-screen rounded-t-full bg-slate-100 md:bg-white mt-10'>
				<div className='md:flex justify-around pt-40 md:pt-0 md:pl-60'>
					<div className='md:flex flex-col md:ml-0 ml-3 items-start mb-8 space-y-8 md:space-y-0'>
						<NonEditableProfileFields
							ProfileFieldItems={{
								icon: <CircleUser />,
								text: 'Full Name',
								value: FullName || '',
							}}
						/>
						<NonEditableProfileFields
							ProfileFieldItems={{
								icon: <Library />,
								text: 'Department',
								value: String(user?.department) || 'N/A',
							}}
						/>
					</div>
					<div className='md:flex flex-col md:ml-0 ml-3 items-start mb-8 space-y-8 md:space-y-0'>
						
						<NonEditableProfileFields
							ProfileFieldItems={{
								icon: <Phone />,
								text: 'Phone',
								value: String(user?.phoneNumber) || 'N/A',
							}}
						/>
					</div>
				</div>
				<div className='flex justify-center mt-10 w-full md:ml-0'>
					<Button
						className='text-center md:w-2/12 w-4/12 md:ml-40 '
						onClick={() => router.push(`/teacher/Profile/Edit`)}
					>
						Edit
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Page
