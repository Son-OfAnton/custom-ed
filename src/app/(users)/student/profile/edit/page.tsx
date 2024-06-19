'use client'

import React, { useEffect, useState } from 'react'

import { useLocalStorage } from '@/hooks/useLocalStorage'
import {
	useEditStudentProfileMutation,
	useGetStudentByIdQuery,
} from '@/store/student/studentApi'
import axios from 'axios'
import Spinner from '@/components/Spinner'
import { Calendar, CircleUser, Phone } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { toMonthAndDay } from '@/lib/helpers'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const Page = () => {
	const router = useRouter()
	const [avatarUrl, setAvatarUrl] = useState('https://github.com/shadcn.png')
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

	const [
		editProfile,
		{
			isLoading: isLoadingEditProfile,
			isSuccess: isSuccessEditProfile,
			error: editProfileError,
			isError: isErrorEditProfile,
		},
	] = useEditStudentProfileMutation()
	
	const [fullName, setFullName] = useState('')
	const [dateOfBirth, setDateOfBirth] = useState('')
	const [phone, setPhone] = useState('')

	const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		editProfile({
			studentId: data?.data?.studentId as string,
			phoneNumber: phone,
			firstName: fullName.split(' ')[0],
			lastName: fullName.split(' ')[1],
			section: data?.data?.section as string,
			id: data?.data?.id as string,
			email: data?.data?.email as string,
			department: data?.data?.department as number,
			joinDate: '2024-05-19',
			dateOfBirth: dateOfBirth,
			year: data?.data?.year as number,
		})
			.unwrap()
			.then((res) => {
				toast.success('Profile updated successfuly')
			})
			.catch((res) => {
				toast.error('Profile update failed')
			})
	}

	return (
		<div>
			{isLoading || isFetching ? (
				<div className='flex justify-center items-center'>
					<Spinner />
				</div>
			) : isError ? (
				<div>Error</div>
			) : isSuccess ? (
				<div>
					<div className='flex justify-center pt-20 md:pl-40'>
						<div className='relative'>
							<Avatar className='w-40 h-40'>
								<AvatarImage
									src={imageUrl || 'https://github.com/shadcn.png'}
									alt='Avatar'
								/>
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
						</div>
					</div>
					{error && <div style={{ color: 'red' }}>{error}</div>}
					<div className='md:pl-72 md:ml-0 ml-6'>
						<div className='grid md:grid-cols-2 gap-8 my-14'>
							<div className='flex flex-col'>
								<label className='flex items-center'>
									<CircleUser className='mr-2' />
									Full Name
								</label>
								<Input
									placeholder='Full Name'
									defaultValue={
										data?.data?.firstName + ' ' + data?.data?.lastName
									}
									onChange={(e) => {
										setFullName(e.target.value)
									}}
								/>
							</div>
							<div className='flex flex-col'>
								<label className='flex items-center'>
									<Calendar className='mr-2' />
									Date of Birth
								</label>
								<Input
									defaultValue={`${data?.data?.dateOfBirth}`}
									onChange={(e) => {
										setDateOfBirth(e.target.value)
									}}
								/>
							</div>
							<div className='flex flex-col'>
								<label className='flex items-center'>
									<Phone className='mr-2' />
									Phone
								</label>
								<Input
									placeholder='Phone'
									defaultValue={data?.data?.phoneNumber}
									onChange={(e) => {
										setPhone(e.target.value)
									}}
								/>
							</div>
						</div>
						<div className='flex justify-center mt-10 w-full'>
							<Button
								className='text-center md:w-2/12 w-4/12'
								type='submit'
								onClick={handleSubmit}
							>
								Save
							</Button>
						</div>
					</div>
				</div>
			) : null}
		</div>
	)
}
export default Page
