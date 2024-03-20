"use client"
import React, { useState } from 'react'

import { profileFieldItems } from '@/types/profileFieldItems'

import { Input } from '@/components/ui/input'

interface profileFieldsProps {
	ProfileFieldItems: profileFieldItems
}

const ProfileFields = ({ ProfileFieldItems }: profileFieldsProps) => {
	const [value, setValue] = useState(ProfileFieldItems.value)

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value)
	}

	return (
		<div className='flex items-center space-x-2'>
			<span>{ProfileFieldItems.icon}</span>
			<span className='flex-grow whitespace-nowrap'>
				{ProfileFieldItems.text}:
			</span>
			<Input value={value} onChange={handleChange} />
		</div>
	)
}

export default ProfileFields
