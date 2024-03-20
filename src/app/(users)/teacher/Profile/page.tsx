import React from 'react'

import background from '@public/assets/profile_background.svg'
import { Calendar, Library, Phone } from 'lucide-react'
import Image from 'next/image'

import ProfileFields from '@/components/profileFields'
import { Button } from '@/components/ui/button'

const page = () => {
	return (
		<div>
			<div>
				<Image
					src={background}
					width={0}
					height={0}
					alt='background'
					className='w-full md:pl-40 mb-4 hidden md:block'
				/>
			</div>
			{/* for the picture */}
			<div></div>
			<div className='xl:mt-28 lg:mt-14 md:pl-60 mx-4 md:mx-0'>
				<div className='space-y-10 xl:w-4/12 md:w-8/12 mx-auto md:my-10 my-auto py-40 md:py-0'>
					<div className='text-3xl font-bold'>Admas Terefe</div>
					<ProfileFields
						ProfileFieldItems={{
							icon: <Library />,
							text: 'Department',
							value: 'Computer science',
						}}
					/>
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
					<div className='flex mt-10 w-full'>
						<Button className='text-center w-6/12'>Save</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default page
