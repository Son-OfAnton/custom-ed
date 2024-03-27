import React from 'react'

import background from '@public/assets/profile_background.svg'
import { Calendar, CircleUser, Library, Phone } from 'lucide-react'
import Image from 'next/image'

import ProfileFields from '@/components/profileFields'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

const page = () => {
	return (
		<div>
			<div className='flex justify-center pt-20 md:pl-40'>
				<Avatar className='w-40 h-40'>
					<AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			</div>

			{/* for the picture */}

			<div className='md:pl-60 md:ml-0 ml-6'>
				<div className='md:flex justify-around w-full mb-8 space-y-8 md:space-y-0 my-14'>
					<ProfileFields
						ProfileFieldItems={{
							icon: <CircleUser />,
							text: 'Full Name',
							value: 'Shadman Ahmed',
						}}
					/>
					<ProfileFields
						ProfileFieldItems={{
							icon: <Library />,
							text: 'Department',
							value: 'Computer science',
						}}
					/>
				</div>
				<div className='md:flex justify-around w-full   mb-8 space-y-8 md:space-y-0'>
					<ProfileFields
						ProfileFieldItems={{
							icon: <Calendar />,
							text: 'Date of Birth',
							value: 'June 2, 2002',
						}}
					/>
					<ProfileFields
						ProfileFieldItems={{
							icon: <Phone />,
							text: 'Phone',
							value: '+25197979779',
						}}
					/>
				</div>
				<div className='flex justify-center mt-10 w-full'>
					<Button className='text-center w-6/12'>Save</Button>
				</div>
			</div>
		</div>
	)
}

export default page
