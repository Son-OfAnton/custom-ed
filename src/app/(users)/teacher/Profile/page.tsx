'use client'

import React, { useState } from 'react'

import { Calendar, CircleUser, Library, Pencil, Phone } from 'lucide-react'
import Image from 'next/image'

import EditableProfileDatePickerField from '@/components/EditableProfileDatePickerField'
import EditableProfileFields from '@/components/EditableProfileFields'
import NonEditableProfileFields from '@/components/NonEditableProfileFields'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

const Page = () => {
	const [isClicked, setIsClicked] = useState(false)
	const [avatarUrl, setAvatarUrl] = useState('https://github.com/shadcn.png')

	const toggleIsClicked = () => {
		setIsClicked(!isClicked)
	}

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = () => {
				if (typeof reader.result === 'string') {
					setAvatarUrl(reader.result)
				} else {
					console.error('Error reading file')
				}
			}
			reader.readAsDataURL(file)
		}
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
			{isClicked ? (
				<div>
					<div className='flex justify-center pt-20 md:pl-40'>
						<Avatar className='w-40 h-40'>
							<AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					</div>

					<div className='md:pl-60 md:ml-0 ml-6'>
						<div className='md:flex justify-around w-full mb-8 space-y-8 md:space-y-0 my-14 '>
							<EditableProfileFields
								ProfileFieldItems={{
									icon: <CircleUser />,
									text: 'Full Name',
									value: 'Shadman Ahmed',
								}}
							/>
							<EditableProfileFields
								ProfileFieldItems={{
									icon: <Library />,
									text: 'Department',
									value: 'Computer science',
								}}
							/>
						</div>
						<div className='md:flex justify-around w-full   mb-8 space-y-8 md:space-y-0'>
							<EditableProfileDatePickerField
								ProfileFieldItems={{
									icon: <Calendar />,
									text: 'Date of Birth',
									value: 'June 2, 2002',
								}}
							/>
							<EditableProfileFields
								ProfileFieldItems={{
									icon: <Phone />,
									text: 'Phone',
									value: '+25197979779',
								}}
							/>
						</div>
						<div className='flex justify-center mt-10 w-full'>
							<Button className='text-center w-2/12' onClick={toggleIsClicked}>
								Save
							</Button>
						</div>
					</div>
				</div>
			) : (
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

					<div className='container min-h-screen rounded-t-full bg-slate-100 md:bg-white'>
						<div className='md:pl-60 md:mx-auto w-full my-14'>
							<div className='md:flex justify-around pt-40 md:pt-0'>
								<div className='md:flex flex-col items-start mb-8 space-y-8 md:space-y-0'>
									<NonEditableProfileFields
										ProfileFieldItems={{
											icon: <CircleUser />,
											text: 'Full Name',
											value: 'Shadman Ahmed',
										}}
									/>
									<NonEditableProfileFields
										ProfileFieldItems={{
											icon: <Library />,
											text: 'Department',
											value: 'Computer science',
										}}
									/>
								</div>
								<div className='md:flex flex-col items-start  mb-8 space-y-8 md:space-y-0'>
									<NonEditableProfileFields
										ProfileFieldItems={{
											icon: <Calendar />,
											text: 'Date of Birth',
											value: 'June 2, 2002',
										}}
									/>
									<NonEditableProfileFields
										ProfileFieldItems={{
											icon: <Phone />,
											text: 'Phone',
											value: '+25197979779',
										}}
									/>
								</div>
							</div>
						</div>
						<div className='flex justify-center mt-10 w-full'>
							<Button
								className='text-center w-2/12 md:ml-40 '
								onClick={toggleIsClicked}
							>
								Edit
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Page
