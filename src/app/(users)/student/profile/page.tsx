'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useGetStudentByIdQuery } from '@/store/student/studentApi'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Calendar, CircleUser, Phone } from 'lucide-react'
import NonEditableProfileFields from '@/components/NonEditableProfileFields'

const Page = () => {
	const router = useRouter()
	const { getItem: getCurrUser } = useLocalStorage('currUser')
	const currUser = getCurrUser()

	const [imageUrl, setImageUrl] = useState<string | null>(null)
	const [error, setError] = useState<string | null>(null)

	const { data, isLoading, isFetching, isError, isSuccess } =
		useGetStudentByIdQuery(currUser.id!)

	useEffect(() => {
		const fetchStudentPicture = async () => {
			try {
				const response = await axios.get(
					`http://localhost:5099/api/user/student/picture/${currUser.id}`,
					{
						responseType: 'arraybuffer',
					},
				)

				const blob = new Blob([response.data], {
					type: response.headers['content-type'],
				})
				const imageUrl = URL.createObjectURL(blob)
				setImageUrl(imageUrl)
			} catch (err: any) {
				setError('Error fetching image')
			}
		}

		fetchStudentPicture()
	}, [])

	const handleSubmit = () => {
		router.push('/student/profile/edit')
	}

	return (
		<div>
			{isLoading || isFetching ? (
				<div>Loading...</div>
			) : isError ? (
				<div>Error</div>
			) : isSuccess ? (
				<div>
					<div className='flex justify-center pt-20 md:pl-40'>
						<Avatar className='w-40 h-40'>
							<AvatarImage
								src={error ? 'https://github.com/shadcn.png' : imageUrl || ''}
								alt='@shadcn'
							/>
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					</div>

					<div className='container min-h-screen rounded-t-full bg-slate-100 md:bg-white mt-10'>
						<div className='grid md:grid-cols-2 gap-8 pt-40 md:pt-0 md:pl-60'>
							<div className='flex flex-col items-start mb-8 space-y-8'>
								<NonEditableProfileFields
									ProfileFieldItems={{
										icon: <CircleUser />,
										text: 'Full Name',
										value: `${data?.data?.firstName} ${data?.data?.lastName}`,
									}}
								/>
								<NonEditableProfileFields
									ProfileFieldItems={{
										icon: <Calendar />,
										text: 'Date of Birth',
										value: `${data?.data?.dateOfBirth}`,
									}}
								/>
							</div>
							<div className='flex flex-col items-start mb-8 space-y-8'>
								<NonEditableProfileFields
									ProfileFieldItems={{
										icon: <Phone />,
										text: 'Phone',
										value: `${data?.data?.phoneNumber}`,
									}}
								/>
							</div>
						</div>
						<div className='flex justify-center mt-10 ml-24 w-full'>
							<Button
								className='text-center md:w-2/12 w-4/12'
								onClick={handleSubmit}
							>
								Edit
							</Button>
						</div>
					</div>
				</div>
			) : null}
		</div>
	)
}

export default Page
