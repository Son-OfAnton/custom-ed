'use client'

import React, { useState } from 'react'

import { profileFieldItems } from '@/types/profileFieldItems'


interface profileFieldsProps {
	ProfileFieldItems: profileFieldItems
}

const NonEditableProfileFields = ({ ProfileFieldItems }: profileFieldsProps) => {
	const [value, setValue] = useState(ProfileFieldItems.value)

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value)
	}

	return (
		
            <div className="flex  justify-center">
			<div className='flex items-center space-x-2'>
				<span>{ProfileFieldItems.icon}</span>
				<span className='flex-grow whitespace-nowrap'>
					{ProfileFieldItems.text}:
				</span>
			</div>
			<div className="my-4 mx-5">{value}</div>
            </div>
		
	)
}

export default NonEditableProfileFields
