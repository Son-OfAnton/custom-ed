'use client';

import React, { useState } from 'react';



import { useTeacherGetPictureByIdQuery, useTeacherGetProfileByIdQuery, useTeacherUpdatePhoneNumberMutation, useUploadImageTeacherMutation } from '@/store/teacher/teacherApi';
import { updateProfileFieldResponse } from '@/types/auth/profile.type';
import { ExtendedError } from '@/types/Error.type';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Calendar, CircleUser, Library, Pencil, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';



import { cn } from '@/lib/utils';



import NonEditableProfileFields from '@/components/NonEditableProfileFields';
import PhoneField from '@/components/PhoneField';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';





const Page = () => {
	const router = useRouter()
	const [phoneError, setPhoneError] = useState('')
	const [InputError, setInputError] = useState('')
	const [phone, setPhone] = useState('097979779')
	const id = localStorage.getItem('id') ?? ''
	const data = useTeacherGetProfileByIdQuery({ id })
	const url = useTeacherGetPictureByIdQuery({ id }) 
	const [avatarUrl, setAvatarUrl] = useState(url.data?.data)
	const user = data?.data?.data
	const [
		teacherUpdatePhoneNumber,
		{
			data: TeacherUpdatePhoneNumberData,
			isLoading: TeacherUpdatePhoneNumberisLoading,
			isError: TeacherUpdatePhoneNumberisError,
			error: TeacherUpdatePhoneNumberError,
		},
	] = useTeacherUpdatePhoneNumberMutation()

	const [
		uploadImageTeacher,
		{
			data: TeacherUploadImageData,
			isLoading: TeacherUploadImageisLoading,
			isError: TeacherUploadImageisError,
			error: TeacherUploadImageError,
		},
	] = useUploadImageTeacherMutation()

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = () => {
				if (reader.result) {
					const binaryArray = new Uint8Array(reader.result as ArrayBuffer)
					const binaryData = new TextDecoder().decode(binaryArray)

					if (binaryData !== avatarUrl) {
						uploadImageTeacher({ image: binaryData })
							.unwrap()
							.then((res) => {
								toast.success('Image uploaded successfully')
								setAvatarUrl(URL.createObjectURL(file))
							})
							.catch((err: ExtendedError) => {
								console.error('Error uploading image:', err)
								toast.error('Failed to upload image')
							})
					}
				} else {
					console.error('Error reading file')
				}
			}
			reader.readAsArrayBuffer(file)
		}
	}

	const handleInputChange = (value: string) => {
		setPhone(value)
	}
	const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		console.log(phoneError)
		if (phoneError || InputError) {
			return
		}
		teacherUpdatePhoneNumber({ phoneNumber: phone })
			.unwrap()
			.then((res: updateProfileFieldResponse) => {
				toast.success('Profile Updated successfully')
				router.push('/teacher/Profile')
			})
			.catch((err: ExtendedError) => {
				console.log(`signup error ${JSON.stringify(err)}`)
				toast.error(err.data.errors![0])
			})
	}

	const handleFileInputChange = (event: Event) => {
		const target = event.target as HTMLInputElement
		if (target.files) {
			handleFileUpload({
				target,
				currentTarget: target,
			} as React.ChangeEvent<HTMLInputElement>)
		}
	}

	const handleFileUploadClick = () => {
		const fileInput = document.createElement('input')
		fileInput.type = 'file'
		fileInput.accept = 'image/*'
		fileInput.onchange = handleFileInputChange
		fileInput.click()
	}

	return (
		<div>
			<div>
				<div className='flex justify-center pt-20 md:pl-40'>
					<div className='relative'>
						<Avatar className='w-40 h-40'>
							<AvatarImage src={avatarUrl} alt='Avatar' />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<Button
							className='absolute bottom-1 right-0'
							onClick={handleFileUploadClick}
						>
							<Pencil size={15} />
						</Button>
					</div>
				</div>
				<div className='md:pl-60 md:ml-0 ml-6'>
					<div className='md:flex justify-around w-full mb-8 space-y-8 md:space-y-0 my-14 '>
						<NonEditableProfileFields
							ProfileFieldItems={{
								icon: <CircleUser />,
								text: 'Full Name',
								value: user?.firstName + ' ' + user?.lastName,
							}}
						/>
						<NonEditableProfileFields
							ProfileFieldItems={{
								icon: <Library />,
								text: 'Department',
								value: String(user?.department) ?? '',
							}}
						/>
					</div>
					<div className='md:flex flex-col md:ml-0 ml-3 items-start mb-8 space-y-8 md:space-y-0'>
						{/* Changed items-center to items-start */}
						<NonEditableProfileFields
							ProfileFieldItems={{
								icon: <Calendar />,
								text: 'Year',
								value: String(user?.year),
							}}
						/>
						<PhoneField
							ProfileFieldItems={{
								icon: <Phone />,
								text: 'Phone',
								value: phone,
								onChange: (value) => handleInputChange(value),
								setError: setPhoneError,
							}}
						/>
					</div>
					<div className='flex justify-center mt-10 w-full'>
						<Button
							type='submit'
							onClick={handleSubmit}
							className={cn('w-full', {
										'bg-primary/90':
											TeacherUpdatePhoneNumberisLoading,
									})}
									disabled={TeacherUpdatePhoneNumberisLoading}
								>
									{TeacherUpdatePhoneNumberisLoading? (
										<ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
									) : null}
							Save
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Page